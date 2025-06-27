USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetContactAccBranch]    Script Date: 25-Jun-25 11:08:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER  PROCEDURE [dbo].[CMLDLQ_GetContactAccZone]
    @filterType VARCHAR(50) = NULL, -- branch, all lro
    @brIds VARCHAR(50) = NULL,-- format must be '1,2,3'
    @zone_name VARCHAR(10) = NULL, -- 'pnp', 'srp', 'btb'
    @filter_iuser_id INT = NULL -- user id selected from @filterValue
AS
BEGIN
    SET NOCOUNT ON;
    --tem store convert br id
    CREATE TABLE #branchIds
    (
        br_id INT
    )
    -- Fill #branchIds based on zone or input
    IF LOWER(@filterType) = 'zone'
    BEGIN
        INSERT INTO #branchIds
            (br_id)
        SELECT B.IBR_ID
        FROM PERM_DTL P
            JOIN BRANCH_MST B ON B.IBR_ID = P.PERMISSION
        WHERE P.PERM_TYPE = 1004
            AND (
              (LOWER(@zone_name) = 'pnp' AND P.IUSERID = 1747) OR
            (LOWER(@zone_name) = 'srp' AND P.IUSERID = 1052) OR
            (LOWER(@zone_name) = 'btb' AND P.IUSERID = 1522)
          );
    END
    ELSE IF LOWER(@filterType) = 'branch'
    BEGIN
        INSERT INTO #branchIds
            (br_id)
        SELECT TRY_CAST(value AS INT)
        FROM STRING_SPLIT(@brIds, ',')
        WHERE ISNUMERIC(value) = 1;
    END

    -- Temporary result set with filtered data
    SELECT
        FORMAT(L.contact_date, 'yyyy-MM-dd') AS contact_date,
        B.BR_CD as BR_CD
    INTO #ContactData
    FROM CMLDLQ_loan_overdue L
        JOIN USER_PROFILE_MST U ON L.iuser_id = U.IUSER_ID
        JOIN BRANCH_MST B ON L.branchID = B.IBR_ID
    WHERE (
		(
			--filter by RO name
			LOWER(@filterType) LIKE '%recovery team%'
            AND U.ROLE_ID = 32 AND L.iuser_id = @filter_iuser_id
		)
        OR (
			--filter by 'branch', 'zone'
			LOWER(@filterType) IN ('branch', 'zone') AND
            L.branchID IN (SELECT br_id FROM #branchIds) 
		)
	)
    AND dbo.fn_CMLDLQ_MonthStatus(L.contact_date) IN ('p', 'c')
    ORDER BY L.contact_date, U.NAME;

    -- Dynamic pivot: generate column list
    DECLARE @cols NVARCHAR(MAX), @sql NVARCHAR(MAX);
    SELECT @cols = STRING_AGG(QUOTENAME(BR_CD), ',')
    FROM (SELECT DISTINCT BR_CD
        FROM #ContactData) AS names;

    -- Build dynamic SQL
    SET @sql = '
    SELECT contact_date AS [Contact Date], ' + @cols + '
    FROM (
        SELECT contact_date, BR_CD, COUNT(*) AS cnt
        FROM #ContactData
        GROUP BY contact_date, BR_CD
    ) AS src
    PIVOT (
        SUM(cnt) FOR BR_CD IN (' + @cols + ')
    ) AS pvt
    ORDER BY contact_date;
    ';

    EXEC sp_executesql @sql;
    DROP TABLE #ContactData;
END

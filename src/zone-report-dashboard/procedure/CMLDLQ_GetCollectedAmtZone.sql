USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetCollectedAmtZone]    Script Date: 23-Jun-25 4:50:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER  PROCEDURE [dbo].[CMLDLQ_GetCollectedAmtZone]
    @filterType VARCHAR(50) = NULL, -- branch, all lro
    @brIds VARCHAR(50) = NULL, -- format must be '1,2,3'
    @zone_name VARCHAR(10) = NULL,       -- 'pnp', 'srp', 'btb'
    @filter_iuser_id INT = NULL -- user id selected from @filterValue
AS
BEGIN
    SET NOCOUNT ON;

    CREATE TABLE #branchIds (br_id INT);

    -- Fill #branchIds based on zone or input
    IF LOWER(@filterType) = 'zone'
    BEGIN
        INSERT INTO #branchIds (br_id)
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
        INSERT INTO #branchIds (br_id)
        SELECT TRY_CAST(value AS INT)
        FROM STRING_SPLIT(@brIds, ',')
        WHERE ISNUMERIC(value) = 1;
    END

    SELECT
        B.BR_CD,

        -- Pending groupings
        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS p0days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(1, 29, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS p1_29days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(30, 59, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS p30_59days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(60, 0, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS p60_plus_days,

        -- Current groupings
        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS c0days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(1, 29, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS c1_29days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(30, 59, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS c30_59days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(60, 0, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS c60_plusdays

    FROM CMLDLQ_loan_overdue L
    JOIN USER_PROFILE_MST U ON L.iuser_id = U.IUSER_ID
	JOIN BRANCH_MST B ON B.IBR_ID = L.branchID
    WHERE (
		(
			--filter by RO name
			LOWER(@filterType) LIKE '%recovery team%'
            AND U.ROLE_ID = 32 AND (
                L.iuser_id = @filter_iuser_id OR
                @filter_iuser_id = 0
            )
		)
        OR (
			--filter by 'branch', 'zone'
			LOWER(@filterType) IN ('branch', 'zone') AND
            L.branchID IN (SELECT br_id FROM #branchIds) 
		)
	)
    AND dbo.fn_CMLDLQ_MonthStatus(L.contact_date) IN ('p', 'c')

    GROUP BY B.BR_CD
    ORDER BY B.BR_CD

    DROP TABLE #branchIds
END

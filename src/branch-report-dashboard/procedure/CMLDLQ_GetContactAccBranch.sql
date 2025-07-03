USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetContactAccBranch]    Script Date: 25-Jun-25 11:08:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER  PROCEDURE [dbo].[CMLDLQ_GetContactAccBranch]
    @filterType VARCHAR(20) = 'all staffs',
    @filterData VARCHAR(20) = NULL,
    @ibr_id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Temporary result set with filtered data
    SELECT 
        FORMAT(L.contact_date, 'yyyy-MM-dd') AS contact_date,
        U.NAME AS staff_name
    INTO #ContactData
    FROM CMLDLQ_loan_overdue L
    JOIN USER_PROFILE_MST U ON L.iuser_id = U.IUSER_ID
    WHERE L.branchID = @ibr_id
		AND (
			(LOWER(@filterType) LIKE '%lo name%' AND L.iuser_id = @filterData AND U.ROLE_ID = 20) OR
			(LOWER(@filterType) LIKE '%all lo%' AND U.ROLE_ID = 20) OR
			(LOWER(@filterType) LIKE '%lro name%' AND L.iuser_id = @filterData AND U.ROLE_ID = 32) OR
			(LOWER(@filterType) LIKE '%all lro%' AND U.ROLE_ID = 32) OR
			(LOWER(@filterType) LIKE '%all staffs%' AND U.IBR_ID = L.branchID)
		)
      AND dbo.fn_CMLDLQ_MonthStatus(L.contact_date) IN ('p', 'c')
    ORDER BY L.contact_date, U.NAME;

    -- Dynamic pivot: generate column list
    DECLARE @cols NVARCHAR(MAX), @sql NVARCHAR(MAX);
    SELECT @cols = STRING_AGG(QUOTENAME(staff_name), ',') 
                   FROM (SELECT DISTINCT staff_name FROM #ContactData) AS names;

    -- Build dynamic SQL
    SET @sql = '
    SELECT contact_date AS [Contact Date], ' + @cols + '
    FROM (
        SELECT contact_date, staff_name, COUNT(*) AS cnt
        FROM #ContactData
        GROUP BY contact_date, staff_name
    ) AS src
    PIVOT (
        SUM(cnt) FOR staff_name IN (' + @cols + ')
    ) AS pvt
    ORDER BY contact_date;
    ';

    EXEC sp_executesql @sql;
    DROP TABLE #ContactData;
END

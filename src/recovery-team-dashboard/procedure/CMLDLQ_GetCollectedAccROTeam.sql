USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetCollectedAccROTeam]    Script Date: 23-Jun-25 4:50:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[CMLDLQ_GetCollectedAccROTeam]
    @filterType VARCHAR(50) = NULL, -- branch, all lro
    @brIds VARCHAR(50) = NULL, -- format must be '1,2,3'
    @filter_iuser_id INT = NULL -- user id selected from @filterValue
AS
BEGIN
    SET NOCOUNT ON;

    CREATE TABLE #branchIds (br_id INT);

    INSERT INTO #branchIds (br_id)
    SELECT CAST(value AS INT)
    FROM STRING_SPLIT(@brIds, ',');

    SELECT
        U.IUSER_ID,
        U.NAME,

        -- Pending groupings
        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(60, 89, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS p60_89days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(90, 180, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS p90_180days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(180, 360, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS p180_360days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(360, 0, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS p360_plus_days,

        -- Collected groupings
        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS c0days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(0, 60, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS c_less_60days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(60, 89, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS c60_89days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(90, 180, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS c90_180days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(180, 360, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS c180_360days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(360, 0, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS c360_plus_days

    FROM CMLDLQ_loan_overdue L
    JOIN USER_PROFILE_MST U ON L.iuser_id = U.IUSER_ID
    WHERE (
        (LOWER(@filterType) = 'name' AND L.iuser_id = @filter_iuser_id)
        OR
        (LOWER(@filterType) = 'branch' AND L.branchID IN (SELECT br_id FROM #branchIds))
    )
    AND U.ROLE_ID = 32
    GROUP BY U.IUSER_ID, U.NAME
    ORDER BY U.NAME

    DROP TABLE #branchIds
END

CREATE OR ALTER PROCEDURE [dbo].[CMLDLQ_GetCollectedAmtROTeam]
    @filterType VARCHAR(50) = NULL,
    @brIds VARCHAR(50) = NULL,
    @zone_name VARCHAR(10) = NULL,       -- 'pnp', 'srp', 'btb'
    @filter_iuser_id INT = NULL
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
        U.IUSER_ID,
        U.NAME,

        -- Previous month groupings
        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(60, 89, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS p60_89days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(90, 180, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS p90_180days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(180, 360, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS p180_360days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(360, 0, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS p360_plus_days,

        -- Current month groupings
        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS c0days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(0, 60, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS c_less_60days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(60, 89, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS c60_89days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(90, 180, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS c90_180days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(180, 360, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS c180_360days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(360, 0, L.Par_Category) = 1
            THEN L.Balance_Amt ELSE 0 END) AS c360_plus_days

    FROM CMLDLQ_loan_overdue L
    JOIN USER_PROFILE_MST U ON L.iuser_id = U.IUSER_ID
    WHERE (
        (
            LOWER(@filterType) LIKE '%recovery team%' AND (
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
    AND U.ROLE_ID = 32
    GROUP BY U.IUSER_ID, U.NAME
    ORDER BY U.NAME

    DROP TABLE #branchIds
END

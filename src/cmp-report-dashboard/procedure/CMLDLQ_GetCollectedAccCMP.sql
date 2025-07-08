USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetCollectedAccCMP]    Script Date: 08-Jul-25 11:00:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER   PROCEDURE [dbo].[CMLDLQ_GetCollectedAccCMP]
    @filterType VARCHAR(200) = NULL, -- 'branch', 'zone', 'recovery team'
    @brIds VARCHAR(200) = NULL, -- format: '1,2,3'
    @zone_name VARCHAR(10) = NULL, -- 'pnp', 'srp', 'btb'
    @filter_iuser_id INT = NULL -- user ID for recovery team filter
AS
BEGIN
    SET NOCOUNT ON;

    -- Temp tables for zones
    CREATE TABLE #zonePNP (br_id INT);
    INSERT INTO #zonePNP SELECT PERMISSION FROM PERM_DTL WHERE PERM_TYPE = 1004 AND IUSERID = 1747;

    CREATE TABLE #zoneSRP (br_id INT);
    INSERT INTO #zoneSRP SELECT PERMISSION FROM PERM_DTL WHERE PERM_TYPE = 1004 AND IUSERID = 1052;

    CREATE TABLE #zoneBTB (br_id INT);
    INSERT INTO #zoneBTB SELECT PERMISSION FROM PERM_DTL WHERE PERM_TYPE = 1004 AND IUSERID = 1522;

    -- Temp table for selected branches
    CREATE TABLE #branchIds (br_id INT);
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

    ;WITH ZoneLabeled AS (
        SELECT
            B.BR_CD,
            B.IBR_ID,
            L.Balance_Amt,
            L.Par_Category,
            L.created_at,
            L.contact_date,
            U.ROLE_ID,
            U.IUSER_ID,
            L.branchID,
            ZoneName =
                CASE
                    WHEN B.IBR_ID IN (SELECT br_id FROM #zoneBTB) THEN 'BTB Zone'
                    WHEN B.IBR_ID IN (SELECT br_id FROM #zonePNP) THEN 'PNP Zone'
                    WHEN B.IBR_ID IN (SELECT br_id FROM #zoneSRP) THEN 'SRP Zone'
                    ELSE ''
                END
        FROM CMLDLQ_loan_overdue L
        JOIN USER_PROFILE_MST U ON L.iuser_id = U.IUSER_ID
        JOIN BRANCH_MST B ON B.IBR_ID = L.branchID
		WHERE (
			(
				LOWER(@filterType) LIKE '%recovery team%' AND ROLE_ID = 32 AND
				(@filter_iuser_id = 0 OR L.iuser_id = @filter_iuser_id)
			)  OR
            (
                --filter by staff
                LOWER(@filterType) LIKE '%staff%'
                    AND (
                        L.iuser_id = @filter_iuser_id
                    )
            )
			OR (
				LOWER(@filterType) IN ('branch', 'zone') AND
				branchID IN (SELECT br_id FROM #branchIds)
			)
		)
		AND dbo.fn_CMLDLQ_MonthStatus(L.contact_date) IN ('p', 'c')
    )

    SELECT
        BR_CD,
        ZoneName,

        -- Previous
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(contact_date) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(0, 0, Par_Category) = 1 THEN 1 ELSE 0 END) AS p0days,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(contact_date) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(1, 29, Par_Category) = 1 THEN 1 ELSE 0 END) AS p1_29days,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(contact_date) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(30, 59, Par_Category) = 1 THEN 1 ELSE 0 END) AS p30_59days,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(contact_date) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(60, 0, Par_Category) = 1 THEN 1 ELSE 0 END) AS p60_plus_days,

        -- Current
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(contact_date) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(0, 0, Par_Category) = 1 THEN 1 ELSE 0 END) AS c0days,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(contact_date) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(1, 29, Par_Category) = 1 THEN 1 ELSE 0 END) AS c1_29days,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(contact_date) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(30, 59, Par_Category) = 1 THEN 1 ELSE 0 END) AS c30_59days,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(contact_date) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(60, 0, Par_Category) = 1 THEN 1 ELSE 0 END) AS c60_plusdays

    FROM ZoneLabeled
    
    GROUP BY BR_CD, ZoneName
    ORDER BY ZoneName;

    DROP TABLE #branchIds, #zoneBTB, #zonePNP, #zoneSRP;
END

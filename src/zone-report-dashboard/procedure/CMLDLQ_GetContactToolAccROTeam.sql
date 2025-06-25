ALTER PROCEDURE [dbo].[CMLDLQ_GetContactToolAccROTeam]
    @filterType VARCHAR(50) = NULL,      -- 'zone', 'branch', 'name'
    @brIds VARCHAR(50) = NULL,           -- '1,2,3'
    @zone_name VARCHAR(10) = NULL,       -- 'pnp', 'srp', 'btb'
    @filter_iuser_id INT = NULL          -- user id
AS
BEGIN
    SET NOCOUNT ON;

    -- Create temp table to hold branch IDs
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

    -- Main query logic
    ;WITH StepTakens AS (
        SELECT 
            B.BR_CD,
            SUM(CASE WHEN LOWER(L.contact_tool) LIKE '%phone call%' THEN 1 ELSE 0 END) AS total_phone_call,
            SUM(CASE WHEN LOWER(L.contact_tool) LIKE '%visit partner%' THEN 1 ELSE 0 END) AS total_visit_partner
        FROM CMLDLQ_loan_overdue L
        JOIN USER_PROFILE_MST U ON L.iuser_id = U.IUSER_ID
        JOIN BRANCH_MST B ON B.IBR_ID = L.branchID
        WHERE (
            LOWER(@filterType) LIKE '%name%' AND L.iuser_id = @filter_iuser_id
        ) OR (
            LOWER(@filterType) IN ('branch', 'zone') AND 
            L.branchID IN (SELECT br_id FROM #branchIds) AND 
            U.ROLE_ID = 32
        ) OR (
			LOWER(@filterType) LIKE '%recovery%' AND L.iuser_id = @filter_iuser_id AND U.ROLE_ID = 32
		)
        GROUP BY B.BR_CD
    )

    SELECT *,
        total_phone_call + total_visit_partner AS grand_total
    FROM StepTakens;

    DROP TABLE #branchIds;
END

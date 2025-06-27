CREATE OR ALTER PROCEDURE [dbo].[CMLDLQ_GetStepTakenAccZone]
    @filterType VARCHAR(50) = NULL,      -- 'zone', 'branch', 'name'
    @brIds VARCHAR(50) = NULL,           -- '1,2,3' format
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
            SUM(
				CASE WHEN LOWER(L.communication_step_taken) LIKE '%verbal communication%' THEN 1 ELSE 0 END
			) as total_communication_step_taken,
			SUM(
				CASE WHEN LOWER(L.communication_step_taken) LIKE '%remind letter%' THEN 1 ELSE 0 END
			) as total_remind_letter,
			SUM(
				CASE WHEN LOWER(L.communication_step_taken) LIKE '%follow up promise%' THEN 1 ELSE 0 END
			) as total_follow_up_promise,
			SUM(
				CASE WHEN LOWER(L.communication_step_taken) LIKE '%invitation letter%' THEN 1 ELSE 0 END
			) as total_invitation_letter

        FROM CMLDLQ_loan_overdue L
        JOIN USER_PROFILE_MST U ON L.iuser_id = U.IUSER_ID
        JOIN BRANCH_MST B ON B.IBR_ID = L.branchID
        WHERE (
            (
                --filter by RO name
                LOWER(@filterType) LIKE '%recovery team%'
                AND U.ROLE_ID = 32
            )
            OR (
                --filter by 'branch', 'zone'
                LOWER(@filterType) IN ('branch', 'zone') AND
                L.branchID IN (SELECT br_id FROM #branchIds) 
            )
        )
        AND dbo.fn_CMLDLQ_MonthStatus(L.contact_date) IN ('p', 'c')
        
        GROUP BY B.BR_CD
    )

    SELECT *,
        total_communication_step_taken + total_remind_letter + total_follow_up_promise + total_invitation_letter AS grand_total
    FROM StepTakens;

    DROP TABLE #branchIds;
END

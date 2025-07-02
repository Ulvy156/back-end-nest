CREATE OR ALTER PROCEDURE [dbo].[CMLDLQ_GetStaffRecommendAccZone]
    @filterType VARCHAR(200) = NULL,      -- 'zone', 'branch', 'name'
    @brIds VARCHAR(200) = NULL,           -- '1,2,3' format
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
				CASE WHEN LOWER(L.staff_recommend) LIKE '%co-borrower%' THEN 1 ELSE 0 END
			) as total_contact_co_borrower,
			SUM(
				CASE WHEN LOWER(L.staff_recommend) LIKE '%guarantor%' THEN 1 ELSE 0 END
			) as total_contact_guarantor,
			SUM(
				CASE WHEN LOWER(L.staff_recommend) LIKE '%letter-ro%' THEN 1 ELSE 0 END
			) as total_invitation_letter_ro,
			SUM(
				CASE WHEN LOWER(L.staff_recommend) LIKE '%weekly follow up%' THEN 1 ELSE 0 END
			) as total_weekly_follow_up,
			SUM(
				CASE WHEN LOWER(L.staff_recommend) LIKE '%loan restructure%' THEN 1 ELSE 0 END
			) as total_loan_restructure,
			SUM(
				CASE WHEN LOWER(L.staff_recommend) LIKE '%refinancing%' THEN 1 ELSE 0 END
			) as total_refinancing,
			SUM(
				CASE WHEN LOWER(L.staff_recommend) LIKE '%remind letter-lo%' THEN 1 ELSE 0 END
			) as total_remind_letter,
			SUM(
				CASE WHEN LOWER(L.staff_recommend) LIKE '%bm/hlo support%' THEN 1 ELSE 0 END
			) as total_request_bm_hlo_support

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
    )

    SELECT *,
        total_contact_co_borrower + total_contact_guarantor + total_invitation_letter_ro + total_weekly_follow_up
		+ total_loan_restructure + total_refinancing + total_remind_letter + total_request_bm_hlo_support AS grand_total
    FROM StepTakens;

    DROP TABLE #branchIds;
END

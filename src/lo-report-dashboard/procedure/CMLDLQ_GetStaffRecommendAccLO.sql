SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE CMLDLQ_GetStaffRecommendAccLO
	@iuser_id INT = NULL
AS
BEGIN
	SET NOCOUNT ON;

		-- Individual counts
		WITH StepCounts AS (
		SELECT
			SUM(CASE WHEN LOWER(L.communication_step_taken) LIKE '%contact co-borrwer%' THEN 1 ELSE 0 END) AS total_contact_co_borrower,
			SUM(CASE WHEN LOWER(L.communication_step_taken) LIKE '%contact guarantor%' THEN 1 ELSE 0 END) AS total_contact_guarantor,
			SUM(CASE WHEN LOWER(L.communication_step_taken) LIKE '%invitation letter-ro%' THEN 1 ELSE 0 END) AS total_invitation_letter_ro,
			SUM(CASE WHEN LOWER(L.communication_step_taken) LIKE '%follow up%' THEN 1 ELSE 0 END) AS total_weekly_follow_up,
			SUM(CASE WHEN LOWER(L.communication_step_taken) LIKE '%provide loan restructure%' THEN 1 ELSE 0 END) AS total_loan_restructure,
			SUM(CASE WHEN LOWER(L.communication_step_taken) LIKE '%provide refinancing%' THEN 1 ELSE 0 END) AS total_refinancing,
			SUM(CASE WHEN LOWER(L.communication_step_taken) LIKE '%remind letter-lo%' THEN 1 ELSE 0 END) AS total_remind_letter,
			SUM(CASE WHEN LOWER(L.communication_step_taken) LIKE '%request bm/hlo support%' THEN 1 ELSE 0 END) AS total_request_bm_hlo_support
		FROM CMLDLQ_loan_overdue L
		WHERE L.iuser_id = @iuser_id
	)

	--Select from CTE with a grand total
	SELECT *,
		(
			total_contact_co_borrower +
			total_contact_guarantor +
			total_invitation_letter_ro +
			total_weekly_follow_up +
			total_loan_restructure +
			total_refinancing +
			total_remind_letter +
			total_request_bm_hlo_support
		) AS grand_total
	FROM StepCounts;
END
GO

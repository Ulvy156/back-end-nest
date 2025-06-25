USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetStaffRecommendAccLO]    Script Date: 13-Jun-25 8:30:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER  PROCEDURE [dbo].[CMLDLQ_GetStaffRecommendAccBM]
    @filterType VARCHAR(20) = 'ALL STAFFS',
    @filterData VARCHAR(20) = NULL,
    @ibr_id INT = NULL
AS
BEGIN
	SET NOCOUNT ON;

	WITH StepCounts AS (
		SELECT
			SUM(CASE WHEN LOWER(L.staff_recommend) LIKE '%contact co-borrwer%' THEN 1 ELSE 0 END) AS total_contact_co_borrower,
			SUM(CASE WHEN LOWER(L.staff_recommend) LIKE '%contact guarantor%' THEN 1 ELSE 0 END) AS total_contact_guarantor,
			SUM(CASE WHEN LOWER(L.staff_recommend) LIKE '%invitation letter-ro%' THEN 1 ELSE 0 END) AS total_invitation_letter_ro,
			SUM(CASE WHEN LOWER(L.staff_recommend) LIKE '%follow up%' THEN 1 ELSE 0 END) AS total_weekly_follow_up,
			SUM(CASE WHEN LOWER(L.staff_recommend) LIKE '%provide loan restructure%' THEN 1 ELSE 0 END) AS total_loan_restructure,
			SUM(CASE WHEN LOWER(L.staff_recommend) LIKE '%provide refinancing%' THEN 1 ELSE 0 END) AS total_refinancing,
			SUM(CASE WHEN LOWER(L.staff_recommend) LIKE '%remind letter-lo%' THEN 1 ELSE 0 END) AS total_remind_letter,
			SUM(CASE WHEN LOWER(L.staff_recommend) LIKE '%request bm/hlo support%' THEN 1 ELSE 0 END) AS total_request_bm_hlo_support
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
	)

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

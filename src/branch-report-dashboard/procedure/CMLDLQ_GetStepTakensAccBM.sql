USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetStepTakensAccBM]    Script Date: 25-Jun-25 3:17:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER    PROCEDURE [dbo].[CMLDLQ_GetStepTakensAccBM]
    @filterType VARCHAR(20) = 'ALL STAFFS',
    @filterData VARCHAR(20) = NULL,
    @ibr_id INT = NULL,
	@offset INT = 0,
    @pageSize INT = 10
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	WITH StepTakens AS (
		SELECT 
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
		WHERE L.branchID = @ibr_id
		AND (
			(LOWER(@filterType) LIKE '%lo name%' AND L.iuser_id = @filterData AND U.ROLE_ID = 20) OR
			(LOWER(@filterType) LIKE '%all lo%' AND U.ROLE_ID = 20) OR
			(LOWER(@filterType) LIKE '%lro name%' AND L.iuser_id = @filterData AND U.ROLE_ID = 32) OR
			(LOWER(@filterType) LIKE '%all lro%' AND U.ROLE_ID = 32) OR
			(LOWER(@filterType) LIKE '%all staffs%' AND U.IBR_ID = L.branchID)
		)
		AND dbo.fn_CMLDLQ_MonthStatus(L.contact_date) IN ('p', 'c')
	)
		
	SELECT *, (
		total_communication_step_taken + total_remind_letter + total_follow_up_promise + total_invitation_letter 
	) AS grand_total
	FROM StepTakens;

END

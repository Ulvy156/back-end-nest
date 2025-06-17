USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetStepTakensAccBM]    Script Date: 17-Jun-25 9:29:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER  PROCEDURE [dbo].[CMLDLQ_GetStepTakensAccROTeam]
    @iuser_id INT = NULL, -- user who search
	@filterType VARCHAR(50) = NULL, -- branch, all lro
	@brIds VARCHAR(50) = NULL, -- format must be '1,2,3'
	@filter_iuser_id INT = NULL -- user id selected from @filterValue
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	--tem store convert br id
	CREATE TABLE #branchIds (
		br_id INT
	)
	INSERT INTO #branchIds (br_id)
	SELECT CAST(value AS INT) FROM STRING_SPLIT(@brIds, ',');

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
		WHERE (
			--filter by RO name
			LOWER(@filterType) LIKE '%name%' 
			AND L.iuser_id = @filter_iuser_id
		) 
		AND L.branchID IN (SELECT br_id FROM #branchIds) AND U.ROLE_ID = 32
	)
		
	SELECT *, (
		total_communication_step_taken + total_remind_letter + total_follow_up_promise + total_invitation_letter 
	) AS grand_total
	FROM StepTakens;

END

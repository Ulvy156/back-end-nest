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
CREATE OR ALTER  PROCEDURE [dbo].[CMLDLQ_GetStaffRecomsAccROTeam]
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

	WITH StaffRecommend AS (
		SELECT 
			SUM(
				CASE WHEN LOWER(L.staff_recommend) LIKE '%co-borrower%' THEN 1 ELSE 0 END
			) as total_co_borrower,
			SUM(
				CASE WHEN LOWER(L.staff_recommend) LIKE '%guarantor%' THEN 1 ELSE 0 END
			) as total_guarantor,
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
			) as total_support

		FROM CMLDLQ_loan_overdue L
		JOIN USER_PROFILE_MST U ON L.iuser_id = U.IUSER_ID
		WHERE (
			--filter by RO name
			LOWER(@filterType) LIKE '%name%' 
			AND L.iuser_id = @filter_iuser_id
		) 
		OR (
			--filter by RO name
			LOWER(@filterType) LIKE '%branch%' 
		) AND L.branchID IN (SELECT br_id FROM #branchIds) AND U.ROLE_ID = 32

	)
		
	SELECT *, (
		total_co_borrower + total_guarantor + total_weekly_follow_up + total_loan_restructure + total_refinancing + total_remind_letter + total_support
	) AS grand_total
	FROM StaffRecommend;

END

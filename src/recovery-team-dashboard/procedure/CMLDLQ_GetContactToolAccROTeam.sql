USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetContactToolAccROTeam]    Script Date: 20-Jun-25 2:10:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER    PROCEDURE [dbo].[CMLDLQ_GetContactToolAccROTeam]
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
				CASE WHEN LOWER(L.contact_tool) LIKE '%phone call%' THEN 1 ELSE 0 END
			) as total_phone_call,
			SUM(
				CASE WHEN LOWER(L.contact_tool) LIKE '%visit partner%' THEN 1 ELSE 0 END
			) as total_visit_partner

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
		total_phone_call + total_visit_partner 
	) AS grand_total
	FROM StepTakens;

END

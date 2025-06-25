USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetContactToolsAccLO]    Script Date: 25-Jun-25 9:28:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER   PROCEDURE [dbo].[CMLDLQ_GetContactToolsAccLO]
	-- Add the parameters for the stored procedure here
	@iuser_id INT = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	WITH ContactToolsAcc AS (
		SELECT 
			SUM(
				CASE WHEN LOWER(L.contact_tool) LIKE '%call%' THEN 1 ELSE 0 END
			) as total_phone_call,
			SUM(
				CASE WHEN LOWER(L.contact_tool) LIKE '%remind letter%' THEN 1 ELSE 0 END
			) as total_visit_partner
			

		FROM CMLDLQ_loan_overdue L
		WHERE L.iuser_id = @iuser_id
	)

	SELECT *, (
		total_phone_call + total_visit_partner
	) AS grand_total
	FROM ContactToolsAcc;

END

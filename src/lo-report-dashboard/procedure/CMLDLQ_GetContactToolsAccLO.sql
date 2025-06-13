-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE CMLDLQ_GetContactToolsAccLO
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
				CASE WHEN LOWER(L.communication_step_taken) LIKE '%call%' THEN 1 ELSE 0 END
			) as totalPhoneCall,
			SUM(
				CASE WHEN LOWER(L.communication_step_taken) LIKE '%remind letter%' THEN 1 ELSE 0 END
			) as totalVisitparnter
			

		FROM CMLDLQ_loan_overdue L
		WHERE L.iuser_id = @iuser_id
	)

	SELECT *, (
		totalPhoneCall + totalVisitparnter
	) AS grand_total
	FROM ContactToolsAcc;

END
GO

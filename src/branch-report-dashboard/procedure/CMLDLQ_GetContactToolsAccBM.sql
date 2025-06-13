USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetContactToolsAccLO]    Script Date: 13-Jun-25 8:26:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER  PROCEDURE [dbo].[CMLDLQ_GetContactToolsAccBM]
	-- Add the parameters for the stored procedure here
	@ibr_id INT = NULL,
	@filterType VARCHAR(20) = 'all staffs',
	@filterData VARCHAR(20) = ''
AS
BEGIN

	SET NOCOUNT ON;

	WITH ContactToolsAcc AS (
		SELECT 
			SUM(
				CASE WHEN LOWER(L.contact_tool) LIKE '%call%' THEN 1 ELSE 0 END
			) as totalPhoneCall,
			SUM(
				CASE WHEN LOWER(L.contact_tool) LIKE '%visit%' THEN 1 ELSE 0 END
			) as totalVisitparnter
			

		FROM CMLDLQ_loan_overdue L
		JOIN USER_PROFILE_MST U ON L.iuser_id = U.IUSER_ID
		WHERE L.branchID = @ibr_id
		AND (
			(LOWER(@filterType) LIKE '%lo name%' AND LOWER(U.NAME) LIKE('%' + LOWER(@filterData) + '%') AND U.ROLE_ID = 20) OR
			(LOWER(@filterType) LIKE '%all lo%' AND U.ROLE_ID = 20) OR
			(LOWER(@filterType) LIKE '%lro name%' AND LOWER(U.NAME) LIKE('%' + LOWER(@filterData) + '%') AND U.ROLE_ID = 32) OR
			(LOWER(@filterType) LIKE '%all lro%' AND U.ROLE_ID = 32) OR
			(LOWER(@filterType) LIKE '%all staffs%' AND U.IBR_ID = L.branchID)
		)
	)

	SELECT *, (
		totalPhoneCall + totalVisitparnter
	) AS grand_total
	FROM ContactToolsAcc;

END

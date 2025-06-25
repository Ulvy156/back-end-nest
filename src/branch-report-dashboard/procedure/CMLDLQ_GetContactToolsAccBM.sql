USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetContactToolsAccBM]    Script Date: 25-Jun-25 10:42:45 AM ******/
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
    @filterType VARCHAR(20) = 'ALL STAFFS',
    @filterData VARCHAR(20) = NULL,
    @ibr_id INT = NULL
AS
BEGIN

	SET NOCOUNT ON;

	WITH ContactToolsAcc AS (
		SELECT 
			SUM(
				CASE WHEN LOWER(L.contact_tool) LIKE '%call%' THEN 1 ELSE 0 END
			) as total_phone_call,
			SUM(
				CASE WHEN LOWER(L.contact_tool) LIKE '%visit%' THEN 1 ELSE 0 END
			) as total_visit_partner
			

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

	SELECT *, (
		total_phone_call + total_visit_partner
	) AS grand_total
	FROM ContactToolsAcc;

END

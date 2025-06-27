USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetContactToolAccROTeam]    Script Date: 26-Jun-25 9:15:29 AM ******/
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
	@zone_name VARCHAR(10) = NULL,       -- 'pnp', 'srp', 'btb'
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
	-- Fill #branchIds based on zone or input
    IF LOWER(@filterType) = 'zone'
    BEGIN
        INSERT INTO #branchIds (br_id)
        SELECT B.IBR_ID
        FROM PERM_DTL P
        JOIN BRANCH_MST B ON B.IBR_ID = P.PERMISSION
        WHERE P.PERM_TYPE = 1004
          AND (
              (LOWER(@zone_name) = 'pnp' AND P.IUSERID = 1747) OR
              (LOWER(@zone_name) = 'srp' AND P.IUSERID = 1052) OR
              (LOWER(@zone_name) = 'btb' AND P.IUSERID = 1522)
          );
    END
    ELSE IF LOWER(@filterType) = 'branch'
    BEGIN
        INSERT INTO #branchIds (br_id)
        SELECT TRY_CAST(value AS INT)
        FROM STRING_SPLIT(@brIds, ',')
        WHERE ISNUMERIC(value) = 1;
    END

	;WITH StepTakens AS (
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
			(
				--filter by RO name
				LOWER(@filterType) LIKE '%recovery team%'
				AND (
					L.iuser_id = @filter_iuser_id OR
					@filter_iuser_id = 0
				)
			) 
			OR (
				--filter by 'branch', 'zone'
				LOWER(@filterType) IN ('branch', 'zone') AND 
				L.branchID IN (SELECT br_id FROM #branchIds) 
			)
		) AND U.ROLE_ID = 32
		AND dbo.fn_CMLDLQ_MonthStatus(L.contact_date) IN ('p', 'c')
	)
		
	SELECT *, (
		total_phone_call + total_visit_partner 
	) AS grand_total
	FROM StepTakens;

END

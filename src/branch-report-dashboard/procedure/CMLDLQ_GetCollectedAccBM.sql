USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetCollectedAccBM]    Script Date: 25-Jun-25 10:07:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER   PROCEDURE [dbo].[CMLDLQ_GetCollectedAccBM]
    @filterType VARCHAR(20) = 'ALL STAFFS',
    @filterData VARCHAR(20) = NULL,
    @ibr_id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        U.IUSER_ID,
        U.NAME,

        -- Pending groupings
        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS p0days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(1, 29, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS p1_29days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(30, 59, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS p30_59days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'p' AND dbo.fn_CMLDLQ_IsInRangePAR(60, 0, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS p60_plus_days,

        -- Current month groupings
        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS c0days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(1, 29, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS c1_29days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(30, 59, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS c30_59days,

        SUM(CASE 
            WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'c' AND dbo.fn_CMLDLQ_IsInRangePAR(60, 0, L.Par_Category) = 1
            THEN 1 ELSE 0 END) AS c60_plusdays

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
    GROUP BY U.IUSER_ID, U.NAME

END


SELECT * FROM CMLDLQ_loan_overdue WHERE id = 27574
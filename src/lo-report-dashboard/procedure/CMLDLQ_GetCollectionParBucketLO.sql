USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetCollectionParBucketLO]    Script Date: 25-Jun-25 9:27:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER   PROCEDURE [dbo].[CMLDLQ_GetCollectionParBucketLO]
    @iuser_id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        CASE 
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1 THEN '0 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(1, 29, L.Par_Category) = 1 THEN '1-29 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(30, 59, L.Par_Category) = 1 THEN '30-59 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(60, 89, L.Par_Category) = 1 THEN '60-89 days'
		
        END AS PARCategory,

        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'p' THEN 1 ELSE 0 END) AS PAccount,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'p' THEN l.Total_Overdue_Amt ELSE 0 END) AS P_PIM_Amt,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'p' THEN l.Overdue_Principal ELSE 0 END) AS PAmount,
		
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(NULL) = 'a' THEN 1 ELSE 0 END) AS ColAccount,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(NULL) = 'a' THEN l.Total_Overdue_Amt ELSE 0 END) AS Col_PIM_Amt,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(NULL) = 'a' THEN l.Overdue_Principal ELSE 0 END) AS ColAmount,

        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'c' THEN 1 ELSE 0 END) AS CuAccount,
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.contact_date) = 'c' THEN l.Overdue_Principal ELSE 0 END) AS CuAmount

    FROM CMLDLQ_loan_overdue L
    WHERE L.iuser_id = @iuser_id
	AND (
            dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1 OR
            dbo.fn_CMLDLQ_IsInRangePAR(1, 29, L.Par_Category) = 1 OR
            dbo.fn_CMLDLQ_IsInRangePAR(30, 59, L.Par_Category) = 1 OR
            dbo.fn_CMLDLQ_IsInRangePAR(60, 89, L.Par_Category) = 1
          )
    AND dbo.fn_CMLDLQ_MonthStatus(L.contact_date) IN ('p', 'c')
    GROUP BY 
        CASE 
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1 THEN '0 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(1, 29, L.Par_Category) = 1 THEN '1-29 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(30, 59, L.Par_Category) = 1 THEN '30-59 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(60, 89, L.Par_Category) = 1 THEN '60-89 days'
 
        END
    WITH ROLLUP
END

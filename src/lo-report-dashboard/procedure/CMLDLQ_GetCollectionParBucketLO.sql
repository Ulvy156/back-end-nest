SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE CMLDLQ_GetCollectionParBucketLO
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
            ELSE 'Grand Total'
        END AS [PAR Category],

        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' THEN 1 ELSE 0 END) AS [PAccount],
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' THEN l.Total_Overdue_Amt ELSE 0 END) AS [POverdue Amount (P+M)],
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' THEN l.Overdue_Principal ELSE 0 END) AS [PAmount],
		
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(NULL) = 'a' THEN 1 ELSE 0 END) AS [CoAccount],
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(NULL) = 'a' THEN l.Total_Overdue_Amt ELSE 0 END) AS [CoOverdue Amount (P+M)],
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(NULL) = 'a' THEN l.Overdue_Principal ELSE 0 END) AS [CoAmount],

        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' THEN 1 ELSE 0 END) AS [CuAccount],
        SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' THEN l.Overdue_Principal ELSE 0 END) AS [CuAmount]

    FROM CMLDLQ_loan_overdue L
    WHERE L.iuser_id = @iuser_id
    GROUP BY 
        CASE 
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1 THEN '0 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(1, 29, L.Par_Category) = 1 THEN '1-29 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(30, 59, L.Par_Category) = 1 THEN '30-59 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(60, 89, L.Par_Category) = 1 THEN '60-89 days'
            ELSE 'Grand Total'
        END
    WITH ROLLUP
END
GO
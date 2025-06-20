SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE CMLDLQ_GetCollectionParBucketROTeam
    @filterType VARCHAR(50) = NULL,
    -- branch, all lro
    @brIds VARCHAR(50) = NULL,
    -- format must be '1,2,3'
    @filter_iuser_id INT = NULL
-- user id selected from @filterValue
AS
BEGIN
    SET NOCOUNT ON;
    --store view permission branch
    CREATE TABLE #branchPermission
    (
        br_id INT
    )
    INSERT INTO #branchPermission
        (br_id)
    SELECT PERMISSION
    FROM PERM_DTL
    WHERE PERM_TYPE = 1004
        AND IUSERID = @iuser_id;

    --store view permission zone
    CREATE TABLE #zonePermission
    (
        zone_id INT
    )
    INSERT INTO #branchPermission
        (br_id)
    SELECT PERMISSION
    FROM PERM_DTL
    WHERE PERM_TYPE = 1004
        AND IUSERID = @iuser_id;

    WITH
        collBar
        AS

        (
            SELECT
                CASE 
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1 THEN '0 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(1, 29, L.Par_Category) = 1 THEN '1-29 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(30, 59, L.Par_Category) = 1 THEN '30-59 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(60, 89, L.Par_Category) = 1 THEN '60-89 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(90, 180, L.Par_Category) = 1 THEN '90-180 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(180, 360, L.Par_Category) = 1 THEN '180-360 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(360, 0, L.Par_Category) = 1 THEN '360+ days'

        END AS PAR_Category,

                SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' THEN 1 ELSE 0 END) AS [PAccount],
                SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' THEN l.Total_Overdue_Amt ELSE 0 END) AS [POverdue Amount (P+M)],
                SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'p' THEN l.Overdue_Principal ELSE 0 END) AS [PAmount],

                SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(NULL) = 'a' THEN 1 ELSE 0 END) AS [CoAccount],
                SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(NULL) = 'a' THEN l.Total_Overdue_Amt ELSE 0 END) AS [CoOverdue Amount (P+M)],
                SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(NULL) = 'a' THEN l.Overdue_Principal ELSE 0 END) AS [CoAmount],

                SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' THEN 1 ELSE 0 END) AS [CuAccount],
                SUM(CASE WHEN dbo.fn_CMLDLQ_MonthStatus(L.created_at) = 'c' THEN l.Overdue_Principal ELSE 0 END) AS [CuAmount]

            FROM CMLDLQ_loan_overdue L
                JOIN USER_PROFILE_MST U ON U.IUSER_ID = L.iuser_id
            WHERE (
			--filter by RO name
			LOWER(@filterType) LIKE '%name%'
                AND L.iuser_id = @filter_iuser_id
		)
                OR (
			--filter by RO name
			LOWER(@filterType) LIKE '%branch%' 
		) AND L.branchID IN (SELECT br_id
                FROM #branchIds) AND U.ROLE_ID = 32
            GROUP BY 
        CASE 
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(0, 0, L.Par_Category) = 1 THEN '0 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(1, 29, L.Par_Category) = 1 THEN '1-29 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(30, 59, L.Par_Category) = 1 THEN '30-59 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(60, 89, L.Par_Category) = 1 THEN '60-89 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(90, 180, L.Par_Category) = 1 THEN '90-180 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(180, 360, L.Par_Category) = 1 THEN '180-360 days'
            WHEN dbo.fn_CMLDLQ_IsInRangePAR(360, 0, L.Par_Category) = 1 THEN '360+ days'

        END
		WITH ROLLUP
        )
    SELECT *
    FROM collBar
    WHERE PAR_Category IS NOT NULL
END
GO
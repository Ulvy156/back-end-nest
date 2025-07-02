USE [CML_Pilot]
GO
/****** Object:  StoredProcedure [dbo].[CMLDLQ_GetCollectionParBucketROTeam]    Script Date: 23-Jun-25 1:54:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER   PROCEDURE [dbo].[CMLDLQ_GetCollectionParBucketROTeam]
    @filterType VARCHAR(200) = NULL, -- branch, all lro
    @brIds VARCHAR(200) = NULL, -- format must be '1,2,3'
    @zone_name VARCHAR(10) = NULL,       -- 'pnp', 'srp', 'btb'
    @filter_iuser_id INT = NULL -- user id selected from @filterValue
AS
BEGIN
    SET NOCOUNT ON;
    --store view permission branch
    CREATE TABLE #branchPermission
    (
        br_id INT
    )
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

    ;WITH
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
            )
            AND dbo.fn_CMLDLQ_MonthStatus(L.contact_date) IN ('p', 'c')  AND  U.ROLE_ID = 32
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

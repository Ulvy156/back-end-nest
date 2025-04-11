CREATE OR ALTER PROCEDURE GetVillageDetails
    @br_id INT = NULL,
    @iuser_id INT = NULL,
    @is_export INT = 0,
    @page INT = 1
AS
BEGIN
    -- Declare variables
    DECLARE @query NVARCHAR(MAX);
    DECLARE @conditions NVARCHAR(MAX) = '';
    DECLARE @offset INT;

    -- Add optional filters to the query
    IF @br_id IS NOT NULL
        SET @conditions += ' AND B.IBR_ID = @br_id';

    IF @iuser_id IS NOT NULL
        SET @conditions += ' AND R.iuser_id = @iuser_id';

    -- Base SELECT query
    SET @query = '
        SELECT 
            (SELECT TOP 1 PL.DESCRIPTION FROM PICK_LIST_DTL PL 
             WHERE PL.REC_TYP = 7013 AND LEFT(R.village_code, 2) = LEFT(PL.REF_CODE, 2)) AS province_name,

            (SELECT TOP 1 PL.DESCRIPTION FROM PICK_LIST_DTL PL 
             WHERE PL.REC_TYP = 7014 AND LEFT(R.village_code, 4) = LEFT(PL.REF_CODE, 4)) AS district_name,

            (SELECT TOP 1 PL.DESCRIPTION FROM PICK_LIST_DTL PL 
             WHERE PL.REC_TYP = 7015 AND LEFT(R.village_code, 6) = LEFT(PL.REF_CODE, 6)) AS commune_name,

            P.DESCRIPTION AS village_name,
            U.NAME,
            U.IBR_ID,
            B.BR_NM AS branch_name,
            B.BR_CD AS branch_cd,
            R.village_code

        FROM CMLDLQ_RO_village_management R
        LEFT JOIN USER_PROFILE_MST U ON R.iuser_id = U.IUSER_ID
        JOIN PICK_LIST_DTL P ON R.village_code = P.REF_CODE
        JOIN BRANCH_MST B ON B.IBR_ID = U.IBR_ID
        WHERE 1 = 1';

    -- Add conditions
    SET @query += @conditions;

    -- Order by user ID
    SET @query += ' ORDER BY U.IUSER_ID DESC';

    -- Add pagination if not exporting
    IF @is_export != 1
    BEGIN
        SET @offset = (@page - 1) * 100;
        SET @query += ' OFFSET ' + CAST(@offset AS NVARCHAR(10)) + ' ROWS FETCH NEXT 100 ROWS ONLY';
    END

    -- Execute final query with parameters
    EXEC sp_executesql 
        @query, 
        N'@br_id INT, @iuser_id INT', 
        @br_id, @iuser_id;
END;

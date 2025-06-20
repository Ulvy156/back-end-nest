CREATE OR ALTER FUNCTION dbo.fn_CMLDLQ_ExtractDayPAR
(
    @rangeString NVARCHAR(50)  -- e.g., '1-29 days' or '4 days'
)
RETURNS @Result TABLE
(
    FromDay INT,
    ToDay INT
)
AS
BEGIN
    DECLARE @clean NVARCHAR(50) = TRIM(REPLACE(@rangeString, 'days', ''))

    IF CHARINDEX('-', @clean) > 0
    BEGIN
        INSERT INTO @Result
        SELECT
            TRY_CAST(LEFT(@clean, CHARINDEX('-', @clean) - 1) AS INT),
            TRY_CAST(SUBSTRING(@clean, CHARINDEX('-', @clean) + 1, LEN(@clean)) AS INT)
    END
    ELSE
    BEGIN
        DECLARE @day INT = TRY_CAST(@clean AS INT)
        INSERT INTO @Result
        VALUES (@day, @day)
    END

    RETURN
END

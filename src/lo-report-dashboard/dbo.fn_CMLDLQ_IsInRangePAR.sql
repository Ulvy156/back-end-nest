CREATE OR ALTER FUNCTION dbo.fn_CMLDLQ_IsInRangePAR
(
    @startRange INT, 
	@endRange INT,
	@parCategory NVARCHAR(50)
)
--if day is in range will return 1 else 0
RETURNS @Result TABLE
(
    isInRange INT
)
AS
BEGIN
    DECLARE @fromDay INT, @toDay INT;

	SELECT @fromDay = FromDay, @toDay = ToDay FROM dbo.fn_CMLDLQ_ExtractDayPAR(@parCategory);
	IF (@fromDay <= @endRange AND @toDay >= @startRange)
        INSERT INTO @Result VALUES (1);
    ELSE
        INSERT INTO @Result VALUES (0);
    
    RETURN
END

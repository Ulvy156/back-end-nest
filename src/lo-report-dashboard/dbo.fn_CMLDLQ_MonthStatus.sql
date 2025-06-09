CREATE OR ALTER FUNCTION dbo.fn_CMLDLQ_MonthStatus
(
    @inputDate DATETIME
)
RETURNS NVARCHAR(10)
-- p = previous month, c = current month, f = next month
AS
BEGIN
    DECLARE @status NVARCHAR(10);
    DECLARE @inputMonth INT = MONTH(@inputDate);
    DECLARE @inputYear INT = YEAR(@inputDate);
    DECLARE @currentMonth INT = MONTH(GETDATE());
    DECLARE @currentYear INT = YEAR(GETDATE());

    -- Build month-year int values for easier comparison (e.g., 202506)
    DECLARE @inputMonthYear INT = @inputYear * 100 + @inputMonth;
    DECLARE @currentMonthYear INT = @currentYear * 100 + @currentMonth;
    DECLARE @prevMonthYear INT = YEAR(DATEADD(MONTH, -1, GETDATE())) * 100 + MONTH(DATEADD(MONTH, -1, GETDATE()));
    DECLARE @nextMonthYear INT = YEAR(DATEADD(MONTH, 1, GETDATE())) * 100 + MONTH(DATEADD(MONTH, 1, GETDATE()));

    IF @inputMonthYear = @prevMonthYear
        SET @status = 'p';
    ELSE IF @inputMonthYear = @currentMonthYear
        SET @status = 'c';
    ELSE IF @inputMonthYear = @nextMonthYear
        SET @status = 'f';
    ELSE
        SET @status = NULL;

    RETURN @status;
END;
GO

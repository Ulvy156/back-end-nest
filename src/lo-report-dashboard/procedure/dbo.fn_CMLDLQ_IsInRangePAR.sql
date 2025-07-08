USE [CML_Pilot]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_CMLDLQ_IsInRangePAR]    Script Date: 11-Jun-25 10:54:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER   FUNCTION [dbo].[fn_CMLDLQ_IsInRangePAR]
(
    @startRange INT,
    @endRange INT,
    @parCategory NVARCHAR(50)
)
RETURNS BIT
AS
BEGIN
    DECLARE @fromDay INT, @toDay INT;
    DECLARE @result BIT = 0;

    SELECT @fromDay = FromDay, @toDay = ToDay 
    FROM dbo.fn_CMLDLQ_ExtractDayPAR(@parCategory);

    -- Exact match for '0 days' only
    IF (@startRange = 0 AND @endRange = 0 AND @fromDay = 0 AND @toDay = 0)
        SET @result = 1;

    -- All other ranges (excluding the exact 0-day case)
    ELSE IF NOT (@fromDay = 0 AND @toDay = 0) 
         AND @fromDay >= @startRange AND @toDay <= @endRange
        SET @result = 1;

    RETURN @result;
END

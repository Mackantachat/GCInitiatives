/****** Object:  UserDefinedFunction [dbo].[fn_CalculateDepreciationCost]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_CalculateDepreciationCost]
(
    -- Add the parameters for the function here
    @FinishingDate DATE,
    @CostEstCapex Decimal(18,3),
    @UsefulYear DECIMAL(18,2),
    @UsefulMonth DECIMAL(18,2)
)
RETURNS Decimal(18,6)
AS
BEGIN
    -- Declare the return variable here
   
   DECLARE @Year AS NVARCHAR(4) = (SELECT CAST(YEAR(@FinishingDate) AS NVARCHAR(4)));
   DECLARE @TotalDayInThisYear DECIMAL(18,6) = ( (SELECT ABS(DATEDIFF(day ,CAST(@Year +'-12-31' AS DATE) , CAST(@Year + '-01-01' AS DATE))) + 1)   * 1.0000)
   DECLARE @TotalDayLeftInthisYear DECIMAL(18,6) = (SELECT ABS((DATEDIFF(day ,CAST(@Year +'-12-31' AS DATE) , @FinishingDate))) * 1.0000)
   DECLARE @UsefulLifeYear Decimal(18,6) = (SELECT  CAST((ISNULL(@UsefulYear , 0) + CAST(ISNULL(@UsefulMonth, 0) / 12 AS DECIMAL(18,2))) AS DECIMAL(18,2)) ) 
    -- Return the result of the function
    RETURN (
        SELECT 
        CASE WHEN @UsefulLifeYear = 0 THEN 0 ELSE 
            (@CostEstCapex / @UsefulLifeYear)
            *
            (@TotalDayLeftInthisYear / @TotalDayInThisYear)

            END
    )
END
GO

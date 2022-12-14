/****** Object:  UserDefinedFunction [dbo].[fn_GetSubTypeFromCapexInformations]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_GetSubTypeFromCapexInformations]
(
    -- Add the parameters for the function here
    @CapexInformationsId INT
)
RETURNS VARCHAR(100)
AS
BEGIN
    -- Declare the return variable here
    DECLARE @subType VARCHAR(100) = '';

    SET @subType = (SELECT TOP 1 CASE WHEN ISNULL(BetweenYear, '') = '' OR ISNULL(BudgetPeriod, '') <> 'Current year' THEN LOWER(BudgetPeriod) ELSE LOWER(BetweenYear) END AS SubType FROM CapexInformations WHERE CapexInformationId = @CapexInformationsId  ORDER BY Sequent DESC)
    
    -- Return the result of the function
    RETURN @subType;
END
GO

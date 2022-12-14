/****** Object:  UserDefinedFunction [dbo].[fn_FloatFX]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 
CREATE FUNCTION [dbo].[fn_FloatFX]
(
   @FirstRunRateMonth DateTime,
   @MonthNum INT,
   @Currency nvarchar(255),
   @InitiativeId INT
)
RETURNS Decimal(18,6)
AS
BEGIN



  
DECLARE @returnValue decimal(18,4)
DECLARE @FixedFX decimal(18,2) =  (Select FixedFX From ImpactTypeOfBenefits where InitiativeId =   @InitiativeId and VersionPrice = N'FixedFX' and ImpactTypeOfBenefitTable = 'TypeBenefit' )

select @returnValue = Attribute04 
from   CommonData
where DataType = 'TOFinanceFX' 
AND Attribute01 = @Currency 
AND CONVERT(INT,Attribute02) = YEAR(DATEADD(MONTH, @MonthNum-1, @FirstRunRateMonth)) 
AND CONVERT(INT,Attribute03) = MONTH(DATEADD(MONTH, @MonthNum-1, @FirstRunRateMonth))
  
IF (@returnValue IS NULL OR @returnValue = 0 )
BEGIN
SET @returnValue = ISNULL(@FixedFX,1)
END 

return @returnValue
    
END
GO

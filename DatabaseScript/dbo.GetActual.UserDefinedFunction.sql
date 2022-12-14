/****** Object:  UserDefinedFunction [dbo].[GetActual]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 
 
CREATE FUNCTION [dbo].[GetActual]
(
	@InitiativeId int,
	@Month int ,
	@WorkStreamTitle VARCHAR(255),
	@SubWorkstream VARCHAR(255),
	@ImpactTypeOfBenefitTable VARCHAR(255),
	@TypeOfBenefitGroup VARCHAR(255)
)
RETURNS Decimal(18,4)
AS
BEGIN
 
--DECLARE @InitiativeId int = 644
--DECLARE @Month int = 1 


DECLARE @Actual decimal(18,4)  
DECLARE @Revise decimal(18,4)   


IF   @Month = 1  
BEGIN 
 SET  @Actual = (SELECT Month1 FROM _View_CashIn WHERE  InitiativeID = @InitiativeId AND   versionPrice  = 'Actual' AND ImpactTypeOfBenefitTable = @ImpactTypeOfBenefitTable AND TypeOfBenefitGroup = @TypeOfBenefitGroup)
 SET  @Revise = (SELECT Month1 FROM _View_CashIn WHERE  InitiativeID = @InitiativeId AND   versionPrice  = 'Revise' AND ImpactTypeOfBenefitTable = @ImpactTypeOfBenefitTable AND TypeOfBenefitGroup = @TypeOfBenefitGroup)
END 



IF   @Month = 2  
BEGIN 
 SET  @Actual = (SELECT SUM(Month2) FROM _View_CashIn WHERE  InitiativeID = @InitiativeId AND   versionPrice  = 'Actual' AND ImpactTypeOfBenefitTable = @ImpactTypeOfBenefitTable AND TypeOfBenefitGroup = @TypeOfBenefitGroup)
 SET  @Revise = (SELECT SUM(Month2) FROM _View_CashIn WHERE  InitiativeID = @InitiativeId AND   versionPrice  = 'Revise' AND ImpactTypeOfBenefitTable = @ImpactTypeOfBenefitTable AND TypeOfBenefitGroup = @TypeOfBenefitGroup)
END 


IF   @Month = 3
BEGIN 
 SET  @Actual = (SELECT SUM(Month3) FROM _View_CashIn WHERE  InitiativeID = @InitiativeId AND   versionPrice  = 'Actual' AND ImpactTypeOfBenefitTable = @ImpactTypeOfBenefitTable AND TypeOfBenefitGroup = @TypeOfBenefitGroup)
 SET  @Revise = (SELECT SUM(Month3) FROM _View_CashIn WHERE  InitiativeID = @InitiativeId AND   versionPrice  = 'Revise' AND ImpactTypeOfBenefitTable = @ImpactTypeOfBenefitTable AND TypeOfBenefitGroup = @TypeOfBenefitGroup)
END  

 IF @Actual > 0 
 BEGIN 
	RETURN @Actual 
 END  

 RETURN @Revise 
END
GO

/****** Object:  StoredProcedure [dbo].[sp_MoveCAPEXInformation]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 




CREATE PROCEDURE [dbo].[sp_MoveCAPEXInformation]
(
     @OldId INT
	,@NewId INT
)
AS
BEGIN


UPDATE CapexInformations
SET InitiativeId = @NewId
WHERE   InitiativeId  = @OldId;

UPDATE AnnualInvestmentPlans
SET InitiativeId = @NewId
WHERE   InitiativeId  = @OldId;


UPDATE MonthlyInvestmentPlans
SET InitiativeId = @NewId
WHERE   InitiativeId  = @OldId;

 
END
GO

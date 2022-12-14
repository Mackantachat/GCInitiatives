/****** Object:  StoredProcedure [dbo].[sp_MoveSanwich]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 




CREATE PROCEDURE [dbo].[sp_MoveSanwich]
(
     @OldId INT
	,@NewId INT
)
AS
BEGIN

UPDATE  Initiatives
SET NAME = (SELECT TOP 1 NAME FROM Initiatives WHERE ID = @OldId)
WHERE ID = @NewId
;


UPDATE CapexInformations
SET InitiativeId = @NewId
WHERE   InitiativeId  = @OldId;
;

UPDATE AnnualInvestmentPlans
SET InitiativeId = @NewId
WHERE   InitiativeId  = @OldId;
;

UPDATE MonthlyInvestmentPlans
SET InitiativeId = @NewId
WHERE   InitiativeId  = @OldId;
;
 
 UPDATE ProgressHeader
SET InitiativeId = @NewId
WHERE   InitiativeId  = @OldId;
;

 UPDATE ProgressPlan
SET InitiativeId = @NewId
WHERE   InitiativeId  = @OldId;
;

 UPDATE ProgressPlanDate
SET InitiativeId = @NewId
WHERE   InitiativeId  = @OldId;
;


 UPDATE InvestmentCost
SET InitiativeId = @NewId
WHERE   InitiativeId  = @OldId;
;


 
 UPDATE Initiatives
 SET Initiatives.Stage  =  'Cancelled' 
 ,Initiatives.Status  = 'cancelled'
WHERE   Id  = @OldId;
 

  UPDATE Initiatives
 SET CapexTabStatus = 1
WHERE   Id  = @NewId;

END
GO

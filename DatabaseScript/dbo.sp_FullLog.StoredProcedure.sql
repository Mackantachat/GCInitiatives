/****** Object:  StoredProcedure [dbo].[sp_FullLog]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO













-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FullLog]
(
    -- Add the parameters for the stored procedure here
    @initiativeId int
)
AS
BEGIN
    
    --SELECT 1;

    DECLARE @HistoryFlag INT = 1
    DECLARE @histInitiativeId INT;

    -- *** LEVEL1  
	--Table v_Initiatives
	--INSERT INTO [Initiatives] ([InitiativeCode],[Name],[Year],[OwnerName],[Plant],[Location],[SpecifyLocation],[RegisteringDate],[FinishingDate],[ScopeOfWork],[ResultObjective],[Remark],[InitiativeType],[RequestCapex],[CostEstCapex],[CostEstCapexType],[TypeOfInvestment],[BudgetType],[Ram],[JFactor],[TypeBenefit],[BenefitAmount],[BenefitAmountType],[PayBackPeriod],[Irr],[FxExchange],[Cim],[Pim],[Dim],[Max],[DirectCapex],[Cpi],[Strategy],[RandD],[Other],[ApprovedDate],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[LastActivity],[DeletedFlag],[Status],[StartingDate],[Wacc],[Stage],[Background],[BudgetSource],[Company],[CostEstOpex],[Integration],[InvolveItDigital],[Organization],[RequestOpex],[RequestProjectEngineer],[SpecifyCompany],[SpecifyPlant],[TrackMax],[CostEstOpexType],[CommentCancelled],[LastSubmittedDate],[LagacyInitiativeCode],[LagacyInitiativeId],[Divestment],[GoToStage],[SecretProject],[PoolType],[ITDigital],[CapexStage],[CapexStatus],[IsRequestCapex],[SSPIM],[DMPlantOwner],[VPPlantOwner],[LookbackOwner],[SortStage],[InitiativeSubType],[isSetInitiativeSubType],[AlignWithCorpStrategy],[StrategicObjective],[StrategicYear],[StrategyType],[HistoryFlag],[IsPassPimGate1])
	--SELECT  [InitiativeCode],[Name],[Year],[OwnerName],[Plant],[Location],[SpecifyLocation],[RegisteringDate],[FinishingDate],[ScopeOfWork],[ResultObjective],[Remark],[InitiativeType],[RequestCapex],[CostEstCapex],[CostEstCapexType],[TypeOfInvestment],[BudgetType],[Ram],[JFactor],[TypeBenefit],[BenefitAmount],[BenefitAmountType],[PayBackPeriod],[Irr],[FxExchange],[Cim],[Pim],[Dim],[Max],[DirectCapex],[Cpi],[Strategy],[RandD],[Other],[ApprovedDate],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[LastActivity],[DeletedFlag],[Status],[StartingDate],[Wacc],[Stage],[Background],[BudgetSource],[Company],[CostEstOpex],[Integration],[InvolveItDigital],[Organization],[RequestOpex],[RequestProjectEngineer],[SpecifyCompany],[SpecifyPlant],[TrackMax],[CostEstOpexType],[CommentCancelled],[LastSubmittedDate],[LagacyInitiativeCode],[LagacyInitiativeId],[Divestment],[GoToStage],[SecretProject],[PoolType],[ITDigital],[CapexStage],[CapexStatus],[IsRequestCapex],[SSPIM],[DMPlantOwner],[VPPlantOwner],[LookbackOwner],[SortStage],[InitiativeSubType],[isSetInitiativeSubType],[AlignWithCorpStrategy],[StrategicObjective],[StrategicYear],[StrategyType],@HistoryFlag,[IsPassPimGate1]
	--FROM    [Initiatives]
	--WHERE	[Initiatives].Id =  @initiativeId 

	--Table v_Initiatives
	INSERT INTO [Initiatives] ([InitiativeCode],[Name],[Year],[OwnerName],[Plant],[Location],[SpecifyLocation],[RegisteringDate],[FinishingDate],[ScopeOfWork],[ResultObjective],[Remark],[InitiativeType],[RequestCapex],[CostEstCapex],[CostEstCapexType],[TypeOfInvestment],[BudgetType],[Ram],[JFactor],[TypeBenefit],[BenefitAmount],[BenefitAmountType],[PayBackPeriod],[Irr],[FxExchange],[Cim],[Pim],[Dim],[Max],[DirectCapex],[Cpi],[Strategy],[RandD],[Other],[ApprovedDate],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[LastActivity],[DeletedFlag],[Status],[StartingDate],[Wacc],[Stage],[Background],[BudgetSource],[Company],[CostEstOpex],[Integration],[InvolveItDigital],[Organization],[RequestOpex],[RequestProjectEngineer],[SpecifyCompany],[SpecifyPlant],[TrackMax],[CostEstOpexType],[CommentCancelled],[LastSubmittedDate],[LagacyInitiativeCode],[LagacyInitiativeId],[Divestment],[GoToStage],[SecretProject],[PoolType],[ITDigital],[CapexStage],[CapexStatus],[IsRequestCapex],[SSPIM],[DMPlantOwner],[VPPlantOwner],[LookbackOwner],[SortStage],[InitiativeSubType],[isSetInitiativeSubType],[AlignWithCorpStrategy],[StrategicObjective],[StrategicYear],[StrategyType],[HistoryFlag],[IsPassPimGate1]
	,[CreateType],[IsCreatedApp],[IsCreatedWbs],[BestPracticeTabStatus],[CapexTabStatus],[GeneralTabStatus],[ImpactTabStatus],[LessonLearnTabStatus],[LookbackTabStatus],[ProgressTabStatus],[ResourceTabStatus],[RiskTabStatus],[StatusTabStatus],[StrategyTabStatus],[CatalystChemicalsCost]
	,[LabourCost],[MaintenanceCost],[ResidualValue],[UtilitiesCost],[UseIrrCalculate],[AnnualLikelihood],[AnnualLikelihoodRatio],[BaseRisk],[Consequence],[EconomicBenefits],[EconomicPenalties],[Effectiveness],[EffectivenessRatio],[ExposureFactor],[ExposureFactorRatio],[JustifiableCost],[Likelihood],[OpexPenaltiesCost],[PotentialConCost],[Probability]
	,[ProductionLoss],[RiskOfAlt],[RiskReduction],[DetailCimStrategyTabStatus],[DetailCpiTabStatus],[DetailMaxDimCapexTabStatus],[DetailPimTabStatus],[IsNextButtonClicked],[IsReviseFlow],[AppropriationNo],[WBSNo])
	SELECT  [InitiativeCode],[Name],[Year],[OwnerName],[Plant],[Location],[SpecifyLocation],[RegisteringDate],[FinishingDate],[ScopeOfWork],[ResultObjective],[Remark],[InitiativeType],[RequestCapex],[CostEstCapex],[CostEstCapexType],[TypeOfInvestment],[BudgetType],[Ram],[JFactor],[TypeBenefit],[BenefitAmount],[BenefitAmountType],[PayBackPeriod],[Irr],[FxExchange],[Cim],[Pim],[Dim],[Max],[DirectCapex],[Cpi],[Strategy],[RandD],[Other],[ApprovedDate],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[LastActivity],[DeletedFlag],[Status],[StartingDate],[Wacc],[Stage],[Background],[BudgetSource],[Company],[CostEstOpex],[Integration],[InvolveItDigital],[Organization],[RequestOpex],[RequestProjectEngineer],[SpecifyCompany],[SpecifyPlant],[TrackMax],[CostEstOpexType],[CommentCancelled],[LastSubmittedDate],[LagacyInitiativeCode],[LagacyInitiativeId],[Divestment],[GoToStage],[SecretProject],[PoolType],[ITDigital],[CapexStage],[CapexStatus],[IsRequestCapex],[SSPIM],[DMPlantOwner],[VPPlantOwner],[LookbackOwner],[SortStage],[InitiativeSubType],[isSetInitiativeSubType],[AlignWithCorpStrategy],[StrategicObjective],[StrategicYear],[StrategyType],@HistoryFlag,[IsPassPimGate1]
	,[CreateType],[IsCreatedApp],[IsCreatedWbs],[BestPracticeTabStatus],[CapexTabStatus],[GeneralTabStatus],[ImpactTabStatus],[LessonLearnTabStatus],[LookbackTabStatus],[ProgressTabStatus],[ResourceTabStatus],[RiskTabStatus],[StatusTabStatus],[StrategyTabStatus],[CatalystChemicalsCost]
	,[LabourCost],[MaintenanceCost],[ResidualValue],[UtilitiesCost],[UseIrrCalculate],[AnnualLikelihood],[AnnualLikelihoodRatio],[BaseRisk],[Consequence],[EconomicBenefits],[EconomicPenalties],[Effectiveness],[EffectivenessRatio],[ExposureFactor],[ExposureFactorRatio],[JustifiableCost],[Likelihood],[OpexPenaltiesCost],[PotentialConCost],[Probability]
	,[ProductionLoss],[RiskOfAlt],[RiskReduction],[DetailCimStrategyTabStatus],[DetailCpiTabStatus],[DetailMaxDimCapexTabStatus],[DetailPimTabStatus],[IsNextButtonClicked],[IsReviseFlow],[AppropriationNo],[WBSNo]
	FROM    [Initiatives]
	WHERE	[Initiatives].Id =  @initiativeId 

    SET @histInitiativeId = @@IDENTITY;
	print(@initiativeId)
	print(@histInitiativeId)
	--SELECT 1
   EXEC sp_CloneInitiative @initiativeId, @HistoryFlag, @histInitiativeId 

   -- check clone initiatives 
   EXEC [sp_checkCloneInitiative] @initiativeId, @HistoryFlag, @histInitiativeId
 
   DECLARE @InitiativeCode nvarchar(255) 
   SELECT @InitiativeCode =  [InitiativeCode] FROM [Initiatives] WHERE ID = @initiativeId

   -- table 1 to 1 get inform structure from P'Aon  
   -- 08/03/2021
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'Initiatives','Id' 
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'InitiativeDetails','InitiativeId' 
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'ProgressHeader','InitiativeId' 
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'CapexInformations','InitiativeId' 
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'NewDetailInformations','InitiativeId' 
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'DetailInformations','InitiativeId' 
   --exec [sp_Auditlog] @initiativeId,@histInitiativeId,'ImpactTrackings','InitiativeId' 
   --exec [sp_Auditlog] @initiativeId,@histInitiativeId,'PimGate','InitiativeId' 
   -- 08/03/2021
   -- table 1 to 1 get inform structure from P'Aon
   

--  INSERT INTO [dbo].[InitiativeHistoryIndex]
--           ([InitiativeCode]
--           ,[Stage]
--           ,[Status]
--           ,[SubmittedBy]
--           ,[SubmittedDate]
--           ,[Comment]
--           ,[InitiativeIdHistory]
--           ,[InitiativeIdMain])
-- SELECT    top 1 [InitiativeCode]
--           ,[Stage]
--           ,[Status]
--           ,CASE WHEN NOT UpdatedBy IS NULL THEN UpdatedBy  ELSE CreatedBy  END
--		   ,CASE WHEN NOT UpdatedDate IS NULL THEN UpdatedDate  ELSE CreatedDate  END 
--		   ,''
--           ,ID
--           ,@initiativeId
--FROM		[dbo].[Initiatives]
--WHERE		ID = @histInitiativeId
--			AND HistoryFlag = @HistoryFlag
--ORDER BY ID DESC 
RETURN @histInitiativeId
END
GO

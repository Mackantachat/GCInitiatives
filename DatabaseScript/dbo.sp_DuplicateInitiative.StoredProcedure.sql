/****** Object:  StoredProcedure [dbo].[sp_DuplicateInitiative]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

















-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_DuplicateInitiative]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT,
	@initiativeCodeNew NVARCHAR(255)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    --SELECT * FROM v_Initiatives WHERE Id = @initiativeId
	DECLARE @HistoryFlag INT = null
    DECLARE @histInitiativeId INT;

    -- *** LEVEL1  
	--Table v_Initiatives
	-- set null in [RegisteringDate], [CommentCancelled],[LastSubmittedDate],[LagacyInitiativeCode],[LagacyInitiativeId] ,[LookbackOwner],[InitiativeSubType],[isSetInitiativeSubType]  by Krit on 05 Apr 2021
	INSERT INTO [Initiatives] ([InitiativeCode],[Name],[Year],[OwnerName],[Plant],[Location],[SpecifyLocation],[RegisteringDate],[FinishingDate],[ScopeOfWork],[ResultObjective],[Remark],[InitiativeType],[RequestCapex],[CostEstCapex],[CostEstCapexType],[TypeOfInvestment],[BudgetType],[Ram],[JFactor],[TypeBenefit],[BenefitAmount],[BenefitAmountType],[PayBackPeriod],[Irr],[FxExchange],[Cim],[Pim],[Dim],[Max],[DirectCapex],[Cpi],[Strategy],[RandD],[Other],[ApprovedDate],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[LastActivity],[DeletedFlag],[Status],[StartingDate],[Wacc],[Stage],[Background],[BudgetSource],[Company],[CostEstOpex],[Integration],[InvolveItDigital],[Organization],[RequestOpex],[RequestProjectEngineer],[SpecifyCompany],[SpecifyPlant],[TrackMax],[CostEstOpexType],[CommentCancelled],[LastSubmittedDate],[LagacyInitiativeCode],[LagacyInitiativeId],[Divestment],[GoToStage],[SecretProject],[PoolType],[ITDigital],[CapexStage],[CapexStatus],[IsRequestCapex],[SSPIM],[DMPlantOwner],[VPPlantOwner],[LookbackOwner],[SortStage],[InitiativeSubType],[isSetInitiativeSubType],[AlignWithCorpStrategy],[StrategicObjective],[StrategicYear],[StrategyType],[HistoryFlag],[IsPassPimGate1])
	SELECT  @initiativeCodeNew,[Name],[Year],[OwnerName],[Plant],[Location],[SpecifyLocation],null,[FinishingDate],[ScopeOfWork],[ResultObjective],[Remark],Case When [InitiativeType] in ('Digital','IT') then 'dim' else [InitiativeType] end as [InitiativeType],[RequestCapex],[CostEstCapex],[CostEstCapexType],[TypeOfInvestment],[BudgetType],[Ram],[JFactor],[TypeBenefit],[BenefitAmount],[BenefitAmountType],[PayBackPeriod],[Irr],[FxExchange],[Cim],[Pim],Case When [InitiativeType] in ('Digital','IT') then 1 else [Dim] end as [Dim],[Max],[DirectCapex],[Cpi],[Strategy],[RandD],[Other],null,[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[LastActivity],[DeletedFlag],'draft',[StartingDate],[Wacc],null,[Background],[BudgetSource],null,[CostEstOpex],[Integration],[InvolveItDigital],[Organization],[RequestOpex],[RequestProjectEngineer],[SpecifyCompany],[SpecifyPlant],[TrackMax],[CostEstOpexType],null,null,[InitiativeCode],null,[Divestment],[GoToStage],[SecretProject],[PoolType],[ITDigital],[CapexStage],[CapexStatus],null,[SSPIM],[DMPlantOwner],[VPPlantOwner],null,[SortStage],null,0,[AlignWithCorpStrategy],[StrategicObjective],[StrategicYear],[StrategyType],@HistoryFlag,[IsPassPimGate1]
	FROM    [Initiatives]
	WHERE	[Initiatives].Id =  @initiativeId 

    SET @histInitiativeId = @@IDENTITY;
	--SELECT 1
   --EXEC sp_CloneInitiative @initiativeId, @HistoryFlag, @histInitiativeId 

   
    -- *** LEVEL1  
	--Table v_Initiatives
	--INSERT INTO [Initiatives] ([InitiativeCode],[Name],[Year],[OwnerName],[Plant],[Location],[SpecifyLocation],[RegisteringDate],[FinishingDate],[ScopeOfWork],[ResultObjective],[Remark],[InitiativeType],[RequestCapex],[CostEstCapex],[CostEstCapexType],[TypeOfInvestment],[BudgetType],[Ram],[JFactor],[TypeBenefit],[BenefitAmount],[BenefitAmountType],[PayBackPeriod],[Irr],[FxExchange],[Cim],[Pim],[Dim],[Max],[DirectCapex],[Cpi],[Strategy],[RandD],[Other],[ApprovedDate],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[LastActivity],[DeletedFlag],[Status],[StartingDate],[Wacc],[Stage],[Background],[BudgetSource],[Company],[CostEstOpex],[Integration],[InvolveItDigital],[Organization],[RequestOpex],[RequestProjectEngineer],[SpecifyCompany],[SpecifyPlant],[TrackMax],[CostEstOpexType],[CommentCancelled],[LastSubmittedDate],[LagacyInitiativeCode],[LagacyInitiativeId],[Divestment],[GoToStage],[SecretProject],[PoolType],[ITDigital],[CapexStage],[CapexStatus],[IsRequestCapex],[SSPIM],[DMPlantOwner],[VPPlantOwner],[LookbackOwner],[SortStage],[InitiativeSubType],[isSetInitiativeSubType],[AlignWithCorpStrategy],[StrategicObjective],[StrategicYear],[StrategyType],[HistoryFlag],[IsPassPimGate1])
	--SELECT  [InitiativeCode],[Name],[Year],[OwnerName],[Plant],[Location],[SpecifyLocation],[RegisteringDate],[FinishingDate],[ScopeOfWork],[ResultObjective],[Remark],[InitiativeType],[RequestCapex],[CostEstCapex],[CostEstCapexType],[TypeOfInvestment],[BudgetType],[Ram],[JFactor],[TypeBenefit],[BenefitAmount],[BenefitAmountType],[PayBackPeriod],[Irr],[FxExchange],[Cim],[Pim],[Dim],[Max],[DirectCapex],[Cpi],[Strategy],[RandD],[Other],[ApprovedDate],[CreatedDate],[CreatedBy],[UpdatedDate],[UpdatedBy],[LastActivity],[DeletedFlag],[Status],[StartingDate],[Wacc],[Stage],[Background],[BudgetSource],[Company],[CostEstOpex],[Integration],[InvolveItDigital],[Organization],[RequestOpex],[RequestProjectEngineer],[SpecifyCompany],[SpecifyPlant],[TrackMax],[CostEstOpexType],[CommentCancelled],[LastSubmittedDate],[LagacyInitiativeCode],[LagacyInitiativeId],[Divestment],[GoToStage],[SecretProject],[PoolType],[ITDigital],[CapexStage],[CapexStatus],[IsRequestCapex],[SSPIM],[DMPlantOwner],[VPPlantOwner],[LookbackOwner],[SortStage],[InitiativeSubType],[isSetInitiativeSubType],[AlignWithCorpStrategy],[StrategicObjective],[StrategicYear],[StrategyType],@HistoryFlag,[IsPassPimGate1]
	--FROM    [Initiatives]
	--WHERE	[Initiatives].Id =  @initiativeId 

    --table initiative move to full log

	DECLARE @newInitiativeId INT
	SET @newInitiativeId =   @histInitiativeId;
	;
	-- *** End of LEVEL1 
	 

	-- *** LEVEL2   
	--Table	AnnualInvestmentPlans
	--INSERT INTO [dbo].[AnnualInvestmentPlans] ([CapexInformationId] ,[Year1] ,[Year2] ,[Year3] ,[Year4] ,[Year5] ,[Year6] ,[Year7] ,[Year8] ,[Year9] ,[Year10] ,[YearOverall] ,[InitiativeId] ,[CurrencyFx] ,[Currency] ,[PlanType])
	--SELECT [CapexInformationId] ,[Year1] ,[Year2] ,[Year3] ,[Year4] ,[Year5] ,[Year6] ,[Year7] ,[Year8] ,[Year9] ,[Year10] ,[YearOverall] ,@newInitiativeId ,[CurrencyFx] ,[Currency] ,[PlanType]  
	--FROM [dbo].[AnnualInvestmentPlans]
	--WHERE InitiativeId =  @initiativeId 
	--;
  
	--Table	BestPracticeKnowledgeContributors
	--INSERT INTO [dbo].[BestPracticeKnowledgeContributors] ([InitiativeId] ,[KnowledgeContributor])
	--SELECT @newInitiativeId ,[KnowledgeContributor] 
	--FROM [dbo].[BestPracticeKnowledgeContributors]
	--WHERE InitiativeId =  @initiativeId 
	--; 

	--Table	BestPracticeOrganizations
	--INSERT INTO [dbo].[BestPracticeOrganizations]([InitiativeId],[Organization])  
	--SELECT @newInitiativeId ,[Organization]   FROM [dbo].[BestPracticeOrganizations]   
	--WHERE InitiativeId =  @initiativeId  
	--;
	  
	--Table	BestPracticePlants
	--INSERT INTO [dbo].[BestPracticePlants]([InitiativeId],[Plant])  	     
	--SELECT @newInitiativeId ,[Plant]   FROM [dbo].[BestPracticePlants]   
	--WHERE InitiativeId =  @initiativeId  
	--;
  
	--Table	BestPractices
	--INSERT INTO [dbo].[BestPractices] ([InitiativeId] ,[IsBestPracticeRequired] ,[KnowledgeType] ,[SharedTo] ,[SharedPracticeType] ,[Title] ,[KnowledgeOwner] ,[Company] 
	--,[IsDigitalization] ,[StartDate] ,[EndDate] ,[YearOfBestPractice] ,[LifeTimeOfProject] ,[Investment] ,[ProjectCost] ,[AbstractSummary] ,[Objective] ,[BenefitDescription] 
	--,[KnowledgeTheme] ,[EnterpriseKeyword] ,[CaptureMethod] ,[CaptureMethodNote] ,[TargetGroupNote] ,[ApplyFrom] ,[ApplyFromOpEx] ,[BusinessLine] ,[ProjectType] ,[OemsElement] 
	--,[Application] ,[OperationFunction] ,[OperationUnit] ,[EquipmentType] ,[ProductGroup] ,[AbstractDetails] ,[IsPublishToOpex] ,[Organization] ,[Plant])     
	--SELECT   @newInitiativeId ,[IsBestPracticeRequired] ,[KnowledgeType] ,[SharedTo] ,[SharedPracticeType] ,[Title] ,[KnowledgeOwner] ,[Company] 
	--,[IsDigitalization] ,[StartDate] ,[EndDate] ,[YearOfBestPractice] ,[LifeTimeOfProject] ,[Investment] ,[ProjectCost] ,[AbstractSummary] ,[Objective] ,[BenefitDescription] 
	--,[KnowledgeTheme] ,[EnterpriseKeyword] ,[CaptureMethod] ,[CaptureMethodNote] ,[TargetGroupNote] ,[ApplyFrom] ,[ApplyFromOpEx] ,[BusinessLine] ,[ProjectType] ,[OemsElement] 
	--,[Application] ,[OperationFunction] ,[OperationUnit] ,[EquipmentType] ,[ProductGroup] ,[AbstractDetails] ,[IsPublishToOpex] ,[Organization] ,[Plant]
	--FROM [dbo].[BestPractices]    	
	--WHERE InitiativeId =  @initiativeId  
	--;
	 
	--Table	CapexBudgetSurveys
	-- INSERT INTO [dbo].[CapexBudgetSurveys]([InitiativeId],[TopicId],[ChoiceValue],[Effective],[Impact],[Law],[Status])  
	-- SELECT @newInitiativeId,[TopicId],[ChoiceValue],[Effective],[Impact],[Law],[Status] 
	-- FROM [dbo].[CapexBudgetSurveys] 
	-- WHERE InitiativeId =  @initiativeId  
	--;
	 
	--Table	CapexInformations
	--INSERT INTO [dbo].[CapexInformations] ([InitiativeId] ,[StartingDate] ,[ProjecctComRun] ,[RequestIniNoDate] ,[ProjectExePeriodYear] ,[ProjectExePeriodMonth] 
	--,[CostCenterOfVP] ,[ProjectCost] ,[ReasonOfChanging] ,[BetweenYear] ,[TransferForm] ,[PoolBudgetForm] ,[SubmitTo] ,[RequestPoolMAX] ,[CostCenter] ,[BudgetPeriod] 
	--,[CodeCostCenterOfVP] ,[AdditionalCost] ,[ActionYear] ,[CapexStatus] ,[CapexType] ,[IsMaxApprovedRev] ,[Revistion] ,[Sequent] ,[SpendingActual] ,[ExistingBudget] 
	--,[BudgetYear] ,[ReturnCost] ,[CarriedCost] ,[SpendingActualAllPrevious] ,[SpendingActualCurrentYear] ,[AvailableBudget] ,[PoolId])
	--SELECT @newInitiativeId,[StartingDate] ,[ProjecctComRun] ,[RequestIniNoDate] ,[ProjectExePeriodYear] ,[ProjectExePeriodMonth] 
	--,[CostCenterOfVP] ,[ProjectCost] ,[ReasonOfChanging] ,[BetweenYear] ,[TransferForm] ,[PoolBudgetForm] ,[SubmitTo] ,[RequestPoolMAX] ,[CostCenter] ,[BudgetPeriod] 
	--,[CodeCostCenterOfVP] ,[AdditionalCost] ,[ActionYear] ,[CapexStatus] ,[CapexType] ,[IsMaxApprovedRev] ,[Revistion] ,[Sequent] ,[SpendingActual] ,[ExistingBudget] 
	--,[BudgetYear] ,[ReturnCost] ,[CarriedCost] ,[SpendingActualAllPrevious] ,[SpendingActualCurrentYear] ,[AvailableBudget] ,[PoolId]
	--FROM [dbo].[CapexInformations] 
	--WHERE InitiativeId =  @initiativeId  
	--;
	
	--Table	Contact
	 --INSERT INTO [dbo].[Contact] ([InitiativeId] ,[ContactNo] ,[Name] ,[Phone] ,[Email])
	 --SELECT @newInitiativeId,[ContactNo],[Name],[Phone],[Email]  
	 --FROM [dbo].[Contact] 
	 --WHERE InitiativeId =  @initiativeId  
	 --;
	 
	--Table	CpiKpiMonitor
	 INSERT INTO [dbo].[CpiKpiMonitor] ([InitiativeId] ,[kpiNo] ,[kpiTitle] ,[result] ,[target] ,[status])
	 SELECT @newInitiativeId,[kpiNo] ,[kpiTitle] ,[result] ,[target] ,[status]  
	 FROM [dbo].[CpiKpiMonitor]
	 WHERE InitiativeId =  @initiativeId  
	 ;
	 
	--Table	CpiKpis
	 INSERT INTO [dbo].[CpiKpis]([InitiativeId],[Baseline],[Target],[Unit],[Remark],[KpiTitle]) 
	 SELECT @newInitiativeId,[Baseline],[Target],[Unit],[Remark],[KpiTitle]  
	 FROM [dbo].[CpiKpis] 
	 WHERE InitiativeId =  @initiativeId  
	 ;
	 	 
	--Table	CpiStepExplaination
	 INSERT INTO [dbo].[CpiStepExplaination]([InitiativeId],[StepTitle],[Start],[Finish],[ResponsibleBy]) 
	 SELECT @newInitiativeId,[StepTitle],[Start],[Finish],[ResponsibleBy] 
	 FROM [dbo].[CpiStepExplaination]
	 WHERE InitiativeId =  @initiativeId  
	 ;
	 
	--Table	DetailCapexs
	 INSERT INTO [dbo].[DetailCapexs]([InitiativeId],[VicePresidentOfOwner],[DivisionManagerOfOwner],[ProductionProcess],[ComparisonWithOther],[OtherInvestment],[KeySuccessFactor],[SynergyBenefit],[OtherStrategic],[MarketOverview],[PotentialCustomer],[SalesPlan],[SourceOfFeedstock],[OtherBusiness],[SafetyIndex],[CorporateImageIndex],[OtherQuality],[BaseCase],[ProjectIrrBaseCase],[NpvBaseCase],[PaybackBaseCase],[EbitdaBaseCase],[OptimisticCase],[ProjectIrrOptimisticCase],[NpvOptimisticCase],[PaybackOptimisticCase],[EbitdaOptimisticCase],[PessimisticCase],[ProjectIrrPessimisticCase],[NpvPessimisticCase],[PaybackPessimisticCase],[EbitdaPessimisticCase],[UsefulLife],[DepreciationCost],[KpisRemark],[ConsistenWithCompanyStrategy],[ExpectedTargetAndResult],[KpisCapexId],[MileStoneAndSchedule],[OtherResourcesNeeded])
	 SELECT @newInitiativeId,[VicePresidentOfOwner],[DivisionManagerOfOwner],[ProductionProcess],[ComparisonWithOther],[OtherInvestment],[KeySuccessFactor],[SynergyBenefit],[OtherStrategic],[MarketOverview],[PotentialCustomer],[SalesPlan],[SourceOfFeedstock],[OtherBusiness],[SafetyIndex],[CorporateImageIndex],[OtherQuality],[BaseCase],[ProjectIrrBaseCase],[NpvBaseCase],[PaybackBaseCase],[EbitdaBaseCase],[OptimisticCase],[ProjectIrrOptimisticCase],[NpvOptimisticCase],[PaybackOptimisticCase],[EbitdaOptimisticCase],[PessimisticCase],[ProjectIrrPessimisticCase],[NpvPessimisticCase],[PaybackPessimisticCase],[EbitdaPessimisticCase],[UsefulLife],[DepreciationCost],[KpisRemark],[ConsistenWithCompanyStrategy],[ExpectedTargetAndResult],[KpisCapexId],[MileStoneAndSchedule],[OtherResourcesNeeded]
	 FROM [dbo].[DetailCapexs]
	 WHERE InitiativeId =  @initiativeId  
	 ;

	--Table	DetailInformations
	 INSERT INTO [dbo].[DetailInformations]([InitiativeId],[InitiativeYear],[StrategicObjective],[Strategy],[InitiativeTypeMax],[Workstream],[IL3Date],[IL4Date],[IL5Date],[ProductionProcess],[ComparisonWithOther],[OtherInvestment],[KeySuccessFactor],[SynergyBenefit],[OtherStrategic],[MarketOverview],[PotentialCustomer],[SalesPlan],[OtherBusiness],[CorporateImageIndex],[OtherQuality],[BaseCase],[ProjectIrrBaseCase],[NpvBaseCase],[PaybackBaseCase],[EbitdaBaseCase],[OptimisticCase],[ProjectIrrOptimisticCase],[NpvOptimisticCase],[PaybackOptimisticCase],[EbitdaOptimisticCase],[PessimisticCase],[ProjectIrrPessimisticCase],[NpvPessimisticCase],[PaybackPessimisticCase],[EbitdaPessimisticCase],[DepreciationCost],[Remark],[SafetyIndex],[ProCategory],[ProLever],[ProSubCategory],[SubWorkstream1],[SubWorkstream2],[Baseline],[BaselineHistorical],[BaselineNonHistorical],[Saving],[SavingHistorical],[SavingNonHistorical],[Boi],[BoiNo],[Capital],[Catalyst],[Coordinate],[CutFeedDate],[EquipmentName],[EquipmentOrAsset],[ExpectedTarget],[ForEnvironment],[ForTurnaround],[Manager],[MilestoneSchedule],[OldAssetCondition],[OldAssetNo],[Parties],[President],[ProjectManager],[ReplaceEquipment],[ReplacementDate],[RightOfUse],[Software],[SourceOfFeedback],[StartUpDate],[otherResources],[Consistent],[CycleMonth],[CycleYear],[HaveAdditional],[OtherKpis],[UsefulMonth],[UsefulYear],[InitiativeCode],[ActualFinishDate],[ActualStartDate],[BaselineFinishDate],[BaselineStartDate],[CostDetail],[IsDeliverAsPerCommittedCost],[IsDeliverAsPerCommittedDate],[IsDeliverAsPerCommittedScope],[ProjectCategory],[ReviseForecastFinishDate],[ReviseForecastStartDate],[ScopeDetail],[UserFeedback],[ValueChain],[BOD1],[BOD2],[Comparison],[EntryMode],[EntryModeSpecify],[FX],[FirstBudgetYear],[Geography],[GeographySpecify],[Irr],[ListOfEquipment],[MgrOfProcessEngineer],[Note],[Npv],[OthersStrategic],[ProcessEngineer],[ProgressUpdate],[ProjectDirector],[ProjectDmManager],[ProjectEngineer],[RequireBOD1],[RequireProject],[StatusProgress],[directBenefit],[indirectBenefit],[requireDirectBenefit],[requireIndirectBenefit],[AssumptionOfGoal],[Cfo],[Cto],[DivMgrOfProcessEngineer],[Gate1Date],[Gate2Date],[Gate3Date],[GoalAchievement],[InititativeType],[IsImpactProduction],[IsMainPlant],[KickoffMeeting],[ProjectControl],[ProjectPriority],[ReasonForChange],[SimProjectSkipGate2],[Smes],[SponsorEvp],[SubWorkstream],[ToFinance],[WorkstreamLeadVp],[IsAlignWithCorporateStrategy],[IsSimProjectSkipGate2],[ActualBenefitCalculationDetails],[ActualBudgetOpex],[ActualBudgetSavings],[AnalysisTool],[EstimatedBenefitCalculationDetails],[EstimatedBenefitSavings],[EstimatedBudgetOpex],[RootCause],[SourceOfImprovement],[StepExplanation],[TypeOfCpi],[ProjectDocumentDatabase],[DigitalStrategy],[FixedAsset],[RequestSubPic],[InternalOrderNo],[JFactor],[Ram],[AttachBenefit],[AttachPlotPlanSite],[AttachProcess],[AttachReference],[ExternalEmoc],[UseExternalEmoc])
	 SELECT @newInitiativeId,[InitiativeYear],[StrategicObjective],[Strategy],[InitiativeTypeMax],[Workstream],[IL3Date],[IL4Date],[IL5Date],[ProductionProcess],[ComparisonWithOther],[OtherInvestment],[KeySuccessFactor],[SynergyBenefit],[OtherStrategic],[MarketOverview],[PotentialCustomer],[SalesPlan],[OtherBusiness],[CorporateImageIndex],[OtherQuality],[BaseCase],[ProjectIrrBaseCase],[NpvBaseCase],[PaybackBaseCase],[EbitdaBaseCase],[OptimisticCase],[ProjectIrrOptimisticCase],[NpvOptimisticCase],[PaybackOptimisticCase],[EbitdaOptimisticCase],[PessimisticCase],[ProjectIrrPessimisticCase],[NpvPessimisticCase],[PaybackPessimisticCase],[EbitdaPessimisticCase],[DepreciationCost],[Remark],[SafetyIndex],[ProCategory],[ProLever],[ProSubCategory],[SubWorkstream1],[SubWorkstream2],[Baseline],[BaselineHistorical],[BaselineNonHistorical],[Saving],[SavingHistorical],[SavingNonHistorical],[Boi],[BoiNo],[Capital],[Catalyst],[Coordinate],[CutFeedDate],[EquipmentName],[EquipmentOrAsset],[ExpectedTarget],[ForEnvironment],[ForTurnaround],[Manager],[MilestoneSchedule],[OldAssetCondition],[OldAssetNo],[Parties],[President],[ProjectManager],[ReplaceEquipment],[ReplacementDate],[RightOfUse],[Software],[SourceOfFeedback],[StartUpDate],[otherResources],[Consistent],[CycleMonth],[CycleYear],[HaveAdditional],[OtherKpis],[UsefulMonth],[UsefulYear],[InitiativeCode],[ActualFinishDate],[ActualStartDate],[BaselineFinishDate],[BaselineStartDate],[CostDetail],[IsDeliverAsPerCommittedCost],[IsDeliverAsPerCommittedDate],[IsDeliverAsPerCommittedScope],[ProjectCategory],[ReviseForecastFinishDate],[ReviseForecastStartDate],[ScopeDetail],[UserFeedback],[ValueChain],[BOD1],[BOD2],[Comparison],[EntryMode],[EntryModeSpecify],[FX],[FirstBudgetYear],[Geography],[GeographySpecify],[Irr],[ListOfEquipment],[MgrOfProcessEngineer],[Note],[Npv],[OthersStrategic],[ProcessEngineer],[ProgressUpdate],[ProjectDirector],[ProjectDmManager],[ProjectEngineer],[RequireBOD1],[RequireProject],[StatusProgress],[directBenefit],[indirectBenefit],[requireDirectBenefit],[requireIndirectBenefit],[AssumptionOfGoal],[Cfo],[Cto],[DivMgrOfProcessEngineer],[Gate1Date],[Gate2Date],[Gate3Date],[GoalAchievement],[InititativeType],[IsImpactProduction],[IsMainPlant],[KickoffMeeting],[ProjectControl],[ProjectPriority],[ReasonForChange],[SimProjectSkipGate2],[Smes],[SponsorEvp],[SubWorkstream],[ToFinance],[WorkstreamLeadVp],[IsAlignWithCorporateStrategy],[IsSimProjectSkipGate2],[ActualBenefitCalculationDetails],[ActualBudgetOpex],[ActualBudgetSavings],[AnalysisTool],[EstimatedBenefitCalculationDetails],[EstimatedBenefitSavings],[EstimatedBudgetOpex],[RootCause],[SourceOfImprovement],[StepExplanation],[TypeOfCpi],[ProjectDocumentDatabase],[DigitalStrategy],[FixedAsset],[RequestSubPic],[InternalOrderNo],[JFactor],[Ram],[AttachBenefit],[AttachPlotPlanSite],[AttachProcess],[AttachReference],[ExternalEmoc],[UseExternalEmoc]
	 FROM [dbo].[DetailInformations]
	 WHERE InitiativeId =  @initiativeId  
	 ;
	 
	--Table	DimMaxHandsover
	 INSERT INTO [dbo].[DimMaxHandsover]([InitiativeId],[IsDeliverables],[IsCommunicationOrTraining],[IsAllIssueClosed],[IsOperationSupport],[IsOther],[CommentDeliverables],[CommentCommunicationOrTraining],[CommentAllIssueClosed],[CommentOperationSupport],[CommentOther],[LicenseOrSubscriptionFee],[SupportFee],[StartDate],[FinishDate],[IsAcceptHandover],[AcceptDate],[EngineerEmail],[HandoverforIT],[IsRequestITHandover])
	 SELECT @newInitiativeId,[IsDeliverables],[IsCommunicationOrTraining],[IsAllIssueClosed],[IsOperationSupport],[IsOther],[CommentDeliverables],[CommentCommunicationOrTraining],[CommentAllIssueClosed],[CommentOperationSupport],[CommentOther],[LicenseOrSubscriptionFee],[SupportFee],[StartDate],[FinishDate],[IsAcceptHandover],[AcceptDate],[EngineerEmail],[HandoverforIT],[IsRequestITHandover]
	 FROM [dbo].[DimMaxHandsover]
	 WHERE InitiativeId =  @initiativeId  
	 ;
	  
	--Table	DimMembers
	 INSERT INTO [dbo].[DimMembers]([MemberType],[MemberName],[MemberEmployeeId],[InitiativeId])
	 SELECT [MemberType],[MemberName],[MemberEmployeeId],@newInitiativeId
	 FROM [dbo].[DimMembers]
	 WHERE InitiativeId =  @initiativeId  
	 ;
	   
	--Table	FinancialIndicators
	 INSERT INTO [dbo].[FinancialIndicators]([Year],[Revenue],[Ebitda],[Capex],[Opex],[Valuation],[InitiativeId])
	 SELECT [Year],[Revenue],[Ebitda],[Capex],[Opex],[Valuation],@newInitiativeId
	 FROM [dbo].[FinancialIndicators]
	 WHERE InitiativeId =  @initiativeId  
	 ;
	   
	--Table	Financials
	 INSERT INTO [dbo].[Financials]([AvgRevenue],[AvgEbitda],[TotalCapex],[TotalOpex],[TotalValuation],[InitiativeId])
	 SELECT [AvgRevenue],[AvgEbitda],[TotalCapex],[TotalOpex],[TotalValuation],@newInitiativeId
	 FROM [dbo].[Financials]
	 WHERE InitiativeId =  @initiativeId  
	 ;

	--Table	ImpactTrackings  ///// start task 2
	--INSERT INTO [dbo].[ImpactTrackings] ([FinancialImpactArea] ,[HaveShareBenefit] ,[IL5FloatFxRecurring] ,[IL5RunRateRecurring] ,[IL5FloatFxOnetime] 
	--,[IL5RunRateOnetime] ,[FirstRunRateMonth] ,[AutoCalculate] ,[ImpiemantCost] ,[Remark1] ,[Remark2] ,[Remark3] ,[Remark4] ,[Remark5] ,[InitiativeId] 
	--,[Explanation] ,[ToComment] ,[IL4RunRateOnetime] ,[IL4RunRateRecurring] ,[IL5FixedFxOnetime] ,[IL5FixedFxRecurring] ,[TotalOnetime] ,[TotalRecurring] 
	--,[TotalCostOPEX] ,[InitiativeCode] ,[SIL4Achievement] ,[SIL5Achievement] ,[IndirectBenefit] ,[ContactIO] ,[ContactIOBy] ,[LastApprovedIL4Date] 
	--,[LastApprovedIL5Date] ,[FirstApprovedIL4Date] ,[LastSubmittedSIL4Date] ,[LastSubmittedSIL5Date])

	--SELECT  [FinancialImpactArea] ,[HaveShareBenefit] ,[IL5FloatFxRecurring] ,[IL5RunRateRecurring] ,[IL5FloatFxOnetime] 
	--,[IL5RunRateOnetime] ,[FirstRunRateMonth] ,[AutoCalculate] ,[ImpiemantCost] ,[Remark1] ,[Remark2] ,[Remark3] ,[Remark4] ,[Remark5] ,@newInitiativeId 
	--,[Explanation] ,[ToComment] ,[IL4RunRateOnetime] ,[IL4RunRateRecurring] ,[IL5FixedFxOnetime] ,[IL5FixedFxRecurring] ,[TotalOnetime] ,[TotalRecurring] 
	--,[TotalCostOPEX] ,[InitiativeCode] ,[SIL4Achievement] ,[SIL5Achievement] ,[IndirectBenefit] ,[ContactIO] ,[ContactIOBy] ,[LastApprovedIL4Date] 
	--,[LastApprovedIL5Date] ,[FirstApprovedIL4Date] ,[LastSubmittedSIL4Date] ,[LastSubmittedSIL5Date]
	-- FROM [dbo].[ImpactTrackings]
	-- WHERE InitiativeId =  @initiativeId
	-- ;

	--Table	ImpactTypeOfBenefits  
	--INSERT INTO [dbo].[ImpactTypeOfBenefits]([ImpactTypeOfBenefitTable],[TypeOfBenefit],[VersionPrice],[RunRate],[Month1],[Month2],[Month3],[Month4],[Month5],[Month6],[Month7],[Month8],[Month9],[Month10],[Month11],[Month12],[Month13],[Month14],[Month15],[Month16],[Month17],[Month18],[Month19],[Month20],[Month21],[Month22],[Month23],[Month24],[Month25],[Month26],[Month27],[Month28],[Month29],[Month30],[Month31],[Month32],[Month33],[Month34],[Month35],[Month36],[InitiativeId],[FixedFX],[InitiativeCode])
	--SELECT [ImpactTypeOfBenefitTable],[TypeOfBenefit],[VersionPrice],[RunRate],[Month1],[Month2],[Month3],[Month4],[Month5],[Month6],[Month7],[Month8],[Month9],[Month10],[Month11],[Month12],[Month13],[Month14],[Month15],[Month16],[Month17],[Month18],[Month19],[Month20],[Month21],[Month22],[Month23],[Month24],[Month25],[Month26],[Month27],[Month28],[Month29],[Month30],[Month31],[Month32],[Month33],[Month34],[Month35],[Month36],@newInitiativeId,[FixedFX],[InitiativeCode]
	--FROM [dbo].[ImpactTypeOfBenefits]
	--WHERE InitiativeId =  @initiativeId
	--;

	--Table	InitiativeActions   No use for duplicate Initiatives
	--INSERT INTO [dbo].[InitiativeActions] ([ActionBy] ,[Action] ,[Position] ,[Status] ,[Stage] 
	--,[InitiativeId] ,[ActionByName] ,[ConditionType] ,[Counter] ,[Indicator] ,[ActionResult] 
	--,[FlowType] ,[InitiativeStageDetailId] ,[IsInactive] ,[ActionDate])
	--SELECT [ActionBy] ,[Action] ,[Position] ,[Status] ,[Stage] 
	--,@newInitiativeId ,[ActionByName] ,[ConditionType] ,[Counter] ,[Indicator] ,[ActionResult] 
	--,[FlowType] ,[InitiativeStageDetailId] ,[IsInactive] ,[ActionDate]
	--FROM [dbo].[InitiativeActions]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	InitiativeCoDevelopers
	INSERT INTO [dbo].[InitiativeCoDevelopers]([CoDeveloperName],[InitiativeId])
	SELECT [CoDeveloperName],@newInitiativeId
	FROM [dbo].[InitiativeCoDevelopers]
	WHERE InitiativeId = @initiativeId
	;
	--Table	InitiativeDetails
	INSERT INTO [dbo].[InitiativeDetails]([StrategicObjective]
	,[StrategyDetail],[EntryMode],[HaveProduct],[FX]
	,[FxChoice],[ShareOfInvestment],[FirstBudgetYear],[Note],[InitiativeId],[BOD1],[BOD2],[Irr],[Npv]
	,[RequireBOD1],[Specify],[Manager],[President],[BaseCase],[BusinessModel],[Comparison],[CorporateImageIndex]
	,[EbitdaBaseCase],[EbitdaOptimisticCase],[EbitdaPessimisticCase],[Entity],[EntitySpecify],[Geography]
	,[GeographySpecify],[KeySuccessFactor],[ListOfEquipment],[MarketOverview],[MgrOfProcessEngineer],[NpvBaseCase]
	,[NpvOptimisticCase],[NpvPessimisticCase],[OptimisticCase],[OtherBusiness],[OtherInvestment],[OtherQuality],[OthersStrategic]
	,[PaybackBaseCase],[PaybackOptimisticCase],[PaybackPessimisticCase],[PessimisticCase],[PotentialCustomer],[ProcessEngineer]
	,[ProductionProcess],[ProjectDirector],[ProjectEngineer],[ProjectIrrBaseCase],[ProjectIrrOptimisticCase],[ProjectIrrPessimisticCase]
	,[ProjectManager],[RequireProject],[SafetyIndex],[SalesPlan],[SourceOfFeedback],[SynergyBenefit],[ProgressStatus],[ProgressUpdate])
	SELECT [StrategicObjective],[StrategyDetail],[EntryMode],[HaveProduct],[FX]
	,[FxChoice],[ShareOfInvestment],[FirstBudgetYear],[Note],@newInitiativeId,[BOD1],[BOD2],[Irr],[Npv]
	,[RequireBOD1],[Specify],[Manager],[President],[BaseCase],[BusinessModel],[Comparison],[CorporateImageIndex]
	,[EbitdaBaseCase],[EbitdaOptimisticCase],[EbitdaPessimisticCase],[Entity],[EntitySpecify],[Geography]
	,[GeographySpecify],[KeySuccessFactor],[ListOfEquipment],[MarketOverview],[MgrOfProcessEngineer],[NpvBaseCase]
	,[NpvOptimisticCase],[NpvPessimisticCase],[OptimisticCase],[OtherBusiness],[OtherInvestment],[OtherQuality],[OthersStrategic]
	,[PaybackBaseCase],[PaybackOptimisticCase],[PaybackPessimisticCase],[PessimisticCase],[PotentialCustomer],[ProcessEngineer]
	,[ProductionProcess],[ProjectDirector],[ProjectEngineer],[ProjectIrrBaseCase],[ProjectIrrOptimisticCase],[ProjectIrrPessimisticCase]
	,[ProjectManager],[RequireProject],[SafetyIndex],[SalesPlan],[SourceOfFeedback],[SynergyBenefit],[ProgressStatus],[ProgressUpdate]
	FROM [dbo].[InitiativeDetails]
	WHERE InitiativeId = @initiativeId
	;
	--Table	InitiativeStatusHistory  No use for duplicate Initiatives
	--INSERT INTO [dbo].[InitiativeStatusHistory]([InitiativeId],[Stage],[Status],[Comment],[ActionBy],[ActionDate]
	--,[LastSubmittedDate],[SubType])
	--SELECT @newInitiativeId,[Stage],[Status],[Comment],[ActionBy],[ActionDate]
	--,[LastSubmittedDate],[SubType]
	--FROM [dbo].[InitiativeStatusHistory]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	InitiativeStatusTrackings  No use for duplicate Initiatives
	--INSERT INTO [dbo].[InitiativeStatusTrackings] ([Status] ,[Stage] ,[ApprovedBy] ,[ApprovedDate] ,[Sequence] 
	--,[ProcessType] ,[HistoryId] ,[InitiativeId] ,[RunningSequence] ,[SubType] ,[FlowType])
	--SELECT [Status] ,[Stage] ,[ApprovedBy] ,[ApprovedDate] ,[Sequence] 
	--,[ProcessType] ,[HistoryId] ,@newInitiativeId ,[RunningSequence] ,[SubType] ,[FlowType]
	--FROM [dbo].[InitiativeStatusTrackings]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	InvestmentCost
	--INSERT INTO [dbo].[InvestmentCost]([InvestmentCostType],[JanCost],[FebCost],[MarCost],[AprCost],[MayCost]
	--,[JunCost],[JulCost],[AugCost],[SepCost],[OctCost],[NovCost],[DecCost],[OverallCost],[InitiativeId],[YearCost])
	--SELECT [InvestmentCostType],[JanCost],[FebCost],[MarCost],[AprCost],[MayCost]
	--,[JunCost],[JulCost],[AugCost],[SepCost],[OctCost],[NovCost],[DecCost],[OverallCost],@newInitiativeId,[YearCost]
	--FROM [dbo].[InvestmentCost]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	ITBudgetSurveys
	--INSERT INTO [dbo].[ITBudgetSurveys] ([InitiativeId] ,[CapexSummary] ,[OpexSummary] ,[CapexNo] ,[OpexNo] ,[AdvancedCapexChoice])
	--SELECT @newInitiativeId ,[CapexSummary] ,[OpexSummary] ,[CapexNo] ,[OpexNo] ,[AdvancedCapexChoice]
	--FROM [dbo].[ITBudgetSurveys]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	KpiDetailInformations
	INSERT INTO [dbo].[KpiDetailInformations] ([Target] ,[Frequency] ,[InitiativeId] ,[Kpis])
	SELECT [Target] ,[Frequency] ,@newInitiativeId ,[Kpis]
	FROM [dbo].[KpiDetailInformations]
	WHERE InitiativeId = @initiativeId
	;
	--Table	Kri
	INSERT INTO [dbo].[Kri] ([InitiativeId] ,[Year] ,[Status] ,[UpdateDate] ,[Owner] ,[IsDeleted])
	SELECT @newInitiativeId ,[Year] ,[Status] ,[UpdateDate] ,[Owner] ,[IsDeleted]
	FROM [dbo].[Kri]
	WHERE InitiativeId = @initiativeId
	;
	--Table	KriData
	INSERT INTO [dbo].[KriData] ([InitiativeId] ,[Year] ,[KriSequence] ,[KriName] ,[No] ,[KriText] 
	,[Target1] ,[Target2] ,[Target3] ,[KriScoreMonth1] ,[KriScoreMonth2] ,[KriScoreMonth3] ,[KriScoreMonth4] 
	,[KriScoreMonth5] ,[KriScoreMonth6] ,[KriScoreMonth7] ,[KriScoreMonth8] ,[KriScoreMonth9] ,[KriScoreMonth10] 
	,[KriScoreMonth11] ,[KriScoreMonth12])
	SELECT @newInitiativeId ,[Year] ,[KriSequence] ,[KriName] ,[No] ,[KriText] 
	,[Target1] ,[Target2] ,[Target3] ,[KriScoreMonth1] ,[KriScoreMonth2] ,[KriScoreMonth3] ,[KriScoreMonth4] 
	,[KriScoreMonth5] ,[KriScoreMonth6] ,[KriScoreMonth7] ,[KriScoreMonth8] ,[KriScoreMonth9] ,[KriScoreMonth10] 
	,[KriScoreMonth11] ,[KriScoreMonth12]
	FROM [dbo].[KriData]
	WHERE InitiativeId = @initiativeId
	;
	--Table	KriMitigations
	INSERT INTO [dbo].[KriMitigations] ([InitiativeId] ,[Year] ,[MitigationMonth1] ,[MitigationMonth2] ,[MitigationMonth3] 
	,[MitigationMonth4] ,[MitigationMonth5] ,[MitigationMonth6] ,[MitigationMonth7] ,[MitigationMonth8] ,[MitigationMonth9] 
	,[MitigationMonth10] ,[MitigationMonth11] ,[MitigationMonth12])
	SELECT @newInitiativeId ,[Year] ,[MitigationMonth1] ,[MitigationMonth2] ,[MitigationMonth3] 
	,[MitigationMonth4] ,[MitigationMonth5] ,[MitigationMonth6] ,[MitigationMonth7] ,[MitigationMonth8] ,[MitigationMonth9] 
	,[MitigationMonth10] ,[MitigationMonth11] ,[MitigationMonth12]
	FROM [dbo].[KriMitigations]
	WHERE InitiativeId = @initiativeId
	;
	--Table	KriProgressDetails
	INSERT INTO [dbo].[KriProgressDetails]([InitiativeId],[Year],[ProgressDetailMonth1],[ProgressDetailMonth2],[ProgressDetailMonth3]
	,[ProgressDetailMonth4],[ProgressDetailMonth5],[ProgressDetailMonth6],[ProgressDetailMonth7],[ProgressDetailMonth8]
	,[ProgressDetailMonth9],[ProgressDetailMonth10],[ProgressDetailMonth11],[ProgressDetailMonth12])
	SELECT @newInitiativeId,[Year],[ProgressDetailMonth1],[ProgressDetailMonth2],[ProgressDetailMonth3]
	,[ProgressDetailMonth4],[ProgressDetailMonth5],[ProgressDetailMonth6],[ProgressDetailMonth7],[ProgressDetailMonth8]
	,[ProgressDetailMonth9],[ProgressDetailMonth10],[ProgressDetailMonth11],[ProgressDetailMonth12]
	FROM [dbo].[KriProgressDetails]
	WHERE InitiativeId = @initiativeId
	;
	--Table	LessonsLearned
	--INSERT INTO [dbo].[LessonsLearned] ([IsDeleted] ,[InitiativeId] ,[MilestoneNo] ,[AreaOfLearning] ,[Issues] ,[Background] 
	--,[LessonLearned] ,[Remark] ,[Rating] ,[ProjectPhaseNo] ,[LessonLearnTitle])
	--SELECT [IsDeleted] ,@newInitiativeId ,[MilestoneNo] ,[AreaOfLearning] ,[Issues] ,[Background] 
	--,[LessonLearned] ,[Remark] ,[Rating] ,[ProjectPhaseNo] ,[LessonLearnTitle]
	--FROM [dbo].[LessonsLearned]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	MaxApprovers
	INSERT INTO [dbo].[MaxApprovers] ([InitiativeId] ,[ApproverType] ,[ApproverEmail] ,[Order] ,[BenefitMax] ,[BenefitMin])
	SELECT @newInitiativeId ,[ApproverType] ,[ApproverEmail] ,[Order] ,[BenefitMax] ,[BenefitMin]
	FROM [dbo].[MaxApprovers]
	WHERE  InitiativeId = @initiativeId
	;
	--Table	Milestones
	INSERT INTO [dbo].[Milestones] ([Name] ,[Detail] ,[KeyDeliverable] ,[ActionBy] ,[FromDate] ,[ToDate] ,[MilestoneStatus] 
	,[InitiativeId] ,[IsCpiDetail])
	SELECT [Name] ,[Detail] ,[KeyDeliverable] ,[ActionBy] ,[FromDate] ,[ToDate] ,[MilestoneStatus] 
	,@newInitiativeId ,[IsCpiDetail]
	FROM [dbo].[Milestones]
	WHERE InitiativeId = @initiativeId
	;
	--Table	MonthlyInvestmentPlans
	--INSERT INTO [dbo].[MonthlyInvestmentPlans] ([AnnualInvestmentPlanId] ,[InvestmentCost] ,[InvestmentCostFx] 
	--,[Jan] ,[Feb] ,[Mar] ,[Apr] ,[May] ,[Jun] ,[Jul] ,[Aug] ,[Sep] ,[Oct] ,[Nov] ,[Dec] ,[MonthlyOverall] ,[InitiativeId] 
	--,[YearOfMonth] ,[CapexInformationId] ,[SumMonthlyType])
	--SELECT [AnnualInvestmentPlanId] ,[InvestmentCost] ,[InvestmentCostFx] 
	--,[Jan] ,[Feb] ,[Mar] ,[Apr] ,[May] ,[Jun] ,[Jul] ,[Aug] ,[Sep] ,[Oct] ,[Nov] ,[Dec] ,[MonthlyOverall] ,@newInitiativeId 
	--,[YearOfMonth] ,[CapexInformationId] ,[SumMonthlyType]
	--FROM [dbo].[MonthlyInvestmentPlans]
	--WHERE  InitiativeId = @initiativeId
	--;
	--Table	NewDetailInformations
	INSERT INTO [dbo].[NewDetailInformations] ([InitiativeYear] ,[StrategicObjective] ,[Strategy] ,[InitiativeTypeMax] 
	,[Workstream] ,[SubWorkstream1] ,[SubWorkstream2] ,[ProCategory] ,[ProSubCategory] ,[ProLever] ,[Baseline] ,[BaselineHistorical] 
	,[BaselineNonHistorical] ,[Saving] ,[SavingHistorical] ,[SavingNonHistorical] ,[IL3Date] ,[IL4Date] ,[IL5Date] ,[EntryMode] 
	,[EntryModeSpecify] ,[Geography] ,[GeographySpecify] ,[RequireBOD1] ,[BOD1] ,[BOD2] ,[RequireProject] ,[ProjectDirector] 
	,[ProjectDmManager] ,[ProjectEngineer] ,[ProcessEngineer] ,[MgrOfProcessEngineer] ,[Irr] ,[Npv] ,[FX] ,[FirstBudgetYear] 
	,[Note] ,[StatusProgress] ,[ProgressUpdate] ,[President] ,[Manager] ,[ProjectManager] ,[ProductionProcess] ,[MilestoneSchedule] 
	,[ExpectedTarget] ,[ListOfEquipment] ,[Comparison] ,[ComparisonWithOther] ,[otherResources] ,[OtherInvestment] ,[OthersStrategic] 
	,[Consistent] ,[KeySuccessFactor] ,[SynergyBenefit] ,[OtherStrategic] ,[MarketOverview] ,[PotentialCustomer] ,[SalesPlan] 
	,[SourceOfFeedback] ,[OtherBusiness] ,[SafetyIndex] ,[CorporateImageIndex] ,[OtherQuality] ,[BaseCase] ,[ProjectIrrBaseCase] 
	,[NpvBaseCase] ,[PaybackBaseCase] ,[EbitdaBaseCase] ,[OptimisticCase] ,[ProjectIrrOptimisticCase] ,[NpvOptimisticCase] 
	,[PaybackOptimisticCase] ,[EbitdaOptimisticCase] ,[PessimisticCase] ,[ProjectIrrPessimisticCase] ,[NpvPessimisticCase] 
	,[PaybackPessimisticCase] ,[EbitdaPessimisticCase] ,[DepreciationCost] ,[Remark] ,[ForEnvironment] ,[ForTurnaround] ,[CutFeedDate] 
	,[StartUpDate] ,[ReplaceEquipment] ,[EquipmentName] ,[ReplacementDate] ,[OldAssetCondition] ,[OldAssetNo] ,[EquipmentOrAsset] ,[Boi] 
	,[BoiNo] ,[Capital] ,[Catalyst] ,[Software] ,[RightOfUse] ,[Coordinate] ,[Parties] ,[UsefulYear] ,[UsefulMonth] ,[CycleYear] 
	,[CycleMonth] ,[OtherKpis] ,[HaveAdditional] ,[InitiativeId] ,[InitiativeCode] ,[ValueChain] ,[ProjectCategory] ,[BaselineStartDate] 
	,[BaselineFinishDate] ,[ReviseForecastStartDate] ,[ReviseForecastFinishDate] ,[ActualStartDate] ,[ActualFinishDate] 
	,[IsDeliverAsPerCommittedScope] ,[ScopeDetail] ,[IsDeliverAsPerCommittedDate] ,[IsDeliverAsPerCommittedCost] ,[CostDetail] 
	,[UserFeedback] ,[ActualBenefitCalculationDetails] ,[ActualBudgetOpex] ,[ActualBudgetSavings] ,[AnalysisTool] 
	,[EstimatedBenefitCalculationDetails] ,[EstimatedBenefitSavings] ,[EstimatedBudgetOpex] ,[RootCause] ,[SourceOfImprovement] 
	,[TypeOfCpi] ,[LookbackText] ,[OtherTool] ,[PhnBuPillar] ,[SpecifyPhnBuPillar] ,[SpecifyTypeOfPhn] ,[TypeOfPhn] ,[CpiApprover])
	SELECT [InitiativeYear] ,[StrategicObjective] ,[Strategy] ,[InitiativeTypeMax] 
	,[Workstream] ,[SubWorkstream1] ,[SubWorkstream2] ,[ProCategory] ,[ProSubCategory] ,[ProLever] ,[Baseline] ,[BaselineHistorical] 
	,[BaselineNonHistorical] ,[Saving] ,[SavingHistorical] ,[SavingNonHistorical] ,[IL3Date] ,[IL4Date] ,[IL5Date] ,[EntryMode] 
	,[EntryModeSpecify] ,[Geography] ,[GeographySpecify] ,[RequireBOD1] ,[BOD1] ,[BOD2] ,[RequireProject] ,[ProjectDirector] 
	,[ProjectDmManager] ,[ProjectEngineer] ,[ProcessEngineer] ,[MgrOfProcessEngineer] ,[Irr] ,[Npv] ,[FX] ,[FirstBudgetYear] 
	,[Note] ,[StatusProgress] ,[ProgressUpdate] ,[President] ,[Manager] ,[ProjectManager] ,[ProductionProcess] ,[MilestoneSchedule] 
	,[ExpectedTarget] ,[ListOfEquipment] ,[Comparison] ,[ComparisonWithOther] ,[otherResources] ,[OtherInvestment] ,[OthersStrategic] 
	,[Consistent] ,[KeySuccessFactor] ,[SynergyBenefit] ,[OtherStrategic] ,[MarketOverview] ,[PotentialCustomer] ,[SalesPlan] 
	,[SourceOfFeedback] ,[OtherBusiness] ,[SafetyIndex] ,[CorporateImageIndex] ,[OtherQuality] ,[BaseCase] ,[ProjectIrrBaseCase] 
	,[NpvBaseCase] ,[PaybackBaseCase] ,[EbitdaBaseCase] ,[OptimisticCase] ,[ProjectIrrOptimisticCase] ,[NpvOptimisticCase] 
	,[PaybackOptimisticCase] ,[EbitdaOptimisticCase] ,[PessimisticCase] ,[ProjectIrrPessimisticCase] ,[NpvPessimisticCase] 
	,[PaybackPessimisticCase] ,[EbitdaPessimisticCase] ,[DepreciationCost] ,[Remark] ,[ForEnvironment] ,[ForTurnaround] ,[CutFeedDate] 
	,[StartUpDate] ,[ReplaceEquipment] ,[EquipmentName] ,[ReplacementDate] ,[OldAssetCondition] ,[OldAssetNo] ,[EquipmentOrAsset] ,[Boi] 
	,[BoiNo] ,[Capital] ,[Catalyst] ,[Software] ,[RightOfUse] ,[Coordinate] ,[Parties] ,[UsefulYear] ,[UsefulMonth] ,[CycleYear] 
	,[CycleMonth] ,[OtherKpis] ,[HaveAdditional] ,@newInitiativeId ,[InitiativeCode] ,[ValueChain] ,[ProjectCategory] ,[BaselineStartDate] 
	,[BaselineFinishDate] ,[ReviseForecastStartDate] ,[ReviseForecastFinishDate] ,[ActualStartDate] ,[ActualFinishDate] 
	,[IsDeliverAsPerCommittedScope] ,[ScopeDetail] ,[IsDeliverAsPerCommittedDate] ,[IsDeliverAsPerCommittedCost] ,[CostDetail] 
	,[UserFeedback] ,[ActualBenefitCalculationDetails] ,[ActualBudgetOpex] ,[ActualBudgetSavings] ,[AnalysisTool] 
	,[EstimatedBenefitCalculationDetails] ,[EstimatedBenefitSavings] ,[EstimatedBudgetOpex] ,[RootCause] ,[SourceOfImprovement] 
	,[TypeOfCpi] ,[LookbackText] ,[OtherTool] ,[PhnBuPillar] ,[SpecifyPhnBuPillar] ,[SpecifyTypeOfPhn] ,[TypeOfPhn] ,[CpiApprover]
	FROM [dbo].[NewDetailInformations]
	WHERE  InitiativeId = @initiativeId
	;
	--Table	OutstandingData  No use for duplicate Initiatives
	--INSERT INTO [dbo].[OutstandingData] ([InitiativeId] ,[Year] ,[Month] ,[OutstandingId] ,[ItemDescription] ,[ItemListValueBaht] 
	--,[RpcDescription] ,[RpcValueBaht] ,[Outstanding] ,[IsDeleted])
	--SELECT @newInitiativeId ,[Year] ,[Month] ,[OutstandingId] ,[ItemDescription] ,[ItemListValueBaht] 
	--,[RpcDescription] ,[RpcValueBaht] ,[Outstanding] ,[IsDeleted]
	--FROM [dbo].[OutstandingData]
	--WHERE  InitiativeId = @initiativeId
	--;
	--Table	Outstandings
	--INSERT INTO [dbo].[Outstandings] ([InitiativeId] ,[IsDeleted] ,[Year] ,[Month] ,[BudgetBaht] ,[ActualBaht] ,[PrItemBaht] 
	--,[PoItemBaht] ,[CommitmentBaht] ,[Contingency] ,[EstimateAtCompletion])
	--SELECT @newInitiativeId ,[IsDeleted] ,[Year] ,[Month] ,[BudgetBaht] ,[ActualBaht] ,[PrItemBaht] 
	--,[PoItemBaht] ,[CommitmentBaht] ,[Contingency] ,[EstimateAtCompletion]
	--FROM [dbo].[Outstandings]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	PimGate
	INSERT INTO [dbo].[PimGate] ([InitiativeId] ,[PimGateStatus] ,[ReviseBudgetRevision] ,[CostEstimate] ,[OverallCapex] 
	,[RequestOpex] ,[Benefit] ,[Irr] ,[SimplePayback] ,[Ram] ,[JFactor] ,[RequestPool] ,[Note] ,[SimplefiedProject] ,[ReceivedOpexBudget] 
	,[ReceivedCapexGate2] ,[RequestCapexGate3] ,[AdditionalOpexBudget] ,[TieInLongLeadItemsBudget] ,[EmocStatus] ,[ExecutionLookbackStatus] 
	,[SapStatus] ,[VacDate] ,[VacStatus] ,[GateDate] ,[GateStatus] ,[Gate])
	SELECT @newInitiativeId ,[PimGateStatus] ,[ReviseBudgetRevision] ,[CostEstimate] ,[OverallCapex] 
	,[RequestOpex] ,[Benefit] ,[Irr] ,[SimplePayback] ,[Ram] ,[JFactor] ,[RequestPool] ,[Note] ,[SimplefiedProject] ,[ReceivedOpexBudget] 
	,[ReceivedCapexGate2] ,[RequestCapexGate3] ,[AdditionalOpexBudget] ,[TieInLongLeadItemsBudget] ,[EmocStatus] ,[ExecutionLookbackStatus] 
	,[SapStatus] ,[VacDate] ,[VacStatus] ,[GateDate] ,[GateStatus] ,[Gate]
	FROM [dbo].[PimGate]
	WHERE InitiativeId = @initiativeId
	;
	--Table	Products
	INSERT INTO [dbo].[Products]  ([Name]  ,[Capacity]  ,[Type]  ,[Other]  ,[ProductUnit]  ,[InitiativeId])
	SELECT [Name]  ,[Capacity]  ,[Type]  ,[Other]  ,[ProductUnit]  ,@newInitiativeId
	FROM [dbo].[Products]
	WHERE InitiativeId = @initiativeId
	;
	--Table	ProgressDetails
	INSERT INTO [dbo].[ProgressDetails] ([Milestone] ,[KeyDeliverable] ,[Start] ,[PlanFinish] ,[ActualFinish] 
	,[Activity] ,[InitiativeId] ,[InitiativeCode])
	SELECT [Milestone] ,[KeyDeliverable] ,[Start] ,[PlanFinish] ,[ActualFinish] 
	,[Activity] ,@newInitiativeId ,[InitiativeCode]
	FROM [dbo].[ProgressDetails]
	WHERE InitiativeId = @initiativeId
	;
	--Table	ProgressHeader  No use for duplicate Initiatives
	--INSERT INTO [dbo].[ProgressHeader]  ([InitiativeId]  ,[AppropriationNo]  ,[WbsNo]  ,[StandardProjectDef]  ,[Responsible]  
	--,[SolomonCategory]  ,[AreaPlant]  ,[PhysicalBu]  ,[PhysicalUnit]  ,[CommissioningStartup]  ,[Construction]  ,[Engineering]  
	--,[EnvironmentKpi]  ,[ExecutiveSummary]  ,[MitigationPlan]  ,[Procurement]  ,[ProjectManagement]  ,[RiskAndConcern]  
	--,[WorkForNextMonth]  ,[IsSendAppRequest]  ,[IsSendWBS])
	--SELECT @newInitiativeId  ,[AppropriationNo]  ,[WbsNo]  ,[StandardProjectDef]  ,[Responsible]  
	--,[SolomonCategory]  ,[AreaPlant]  ,[PhysicalBu]  ,[PhysicalUnit]  ,[CommissioningStartup]  ,[Construction]  ,[Engineering]  
	--,[EnvironmentKpi]  ,[ExecutiveSummary]  ,[MitigationPlan]  ,[Procurement]  ,[ProjectManagement]  ,[RiskAndConcern]  
	--,[WorkForNextMonth]  ,[IsSendAppRequest]  ,[IsSendWBS]
	--FROM [dbo].[ProgressHeader]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	ProgressPlan  No use for duplicate Initiatives
	--INSERT INTO [dbo].[ProgressPlan]  ([InitiativeId]  ,[Apr]  ,[Aug]  ,[Dec]  ,[Feb]  ,[Jan]  ,[Jul]  ,[Jun]  ,[Mar]  ,[May]  
	--,[Nov]  ,[Oct]  ,[PlanActual]  ,[ProgressPlanType]  ,[Sep]  ,[Year])
	--SELECT @newInitiativeId  ,[Apr]  ,[Aug]  ,[Dec]  ,[Feb]  ,[Jan]  ,[Jul]  ,[Jun]  ,[Mar]  ,[May]  
	--,[Nov]  ,[Oct]  ,[PlanActual]  ,[ProgressPlanType]  ,[Sep]  ,[Year]
	--FROM [dbo].[ProgressPlan]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	ProgressPlanDate  No use for duplicate Initiatives
	--INSERT INTO [dbo].[ProgressPlanDate]  ([ProgressPlanDateType]  ,[BasicStartDate]  ,[BasicFinishDate]  ,[ActualStartDate]  
	--,[ActualFinishDate]  ,[PocWeightPercent]  ,[InitiativeId])
	--SELECT [ProgressPlanDateType]  ,[BasicStartDate]  ,[BasicFinishDate]  ,[ActualStartDate]  
	--,[ActualFinishDate]  ,[PocWeightPercent]  ,@newInitiativeId
	--FROM [dbo].[ProgressPlanDate]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	ProgressPlanMontly  No use for duplicate Initiatives
	--INSERT INTO [dbo].[ProgressPlanMontly]  ([ProgressPlanId]  ,[InitiativeId]  ,[ProgressPlanYear]  ,[WorkProgress]  
	--,[PlanActual]  ,[Month1]  ,[Month2]  ,[Month3]  ,[Month4]  ,[Month5]  ,[Month6]  ,[Month7]  ,[Month8]  ,[Month9]  
	--,[Month10]  ,[Month11]  ,[Month12])
	--SELECT [ProgressPlanId]  ,@newInitiativeId  ,[ProgressPlanYear]  ,[WorkProgress]  
	--,[PlanActual]  ,[Month1]  ,[Month2]  ,[Month3]  ,[Month4]  ,[Month5]  ,[Month6]  ,[Month7]  ,[Month8]  ,[Month9]  
	--,[Month10]  ,[Month11]  ,[Month12]
	--FROM [dbo].[ProgressPlanMontly]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	ProjectReference
	INSERT INTO [dbo].[ProjectReference]  ([InitiativeId]  ,[No]  ,[ProjectReference]  ,[IsDeleted])
	SELECT @newInitiativeId ,[No]  ,[ProjectReference]  ,[IsDeleted]
	FROM [dbo].[ProjectReference]
	WHERE InitiativeId = @initiativeId
	;
	--Table	RequestEmoc
	INSERT INTO [dbo].[RequestEmoc]  ([InitiativeId]  ,[Plant]  ,[EmocNo]  ,[EmocName]  ,[EmocRequestStatus]  ,[EmocStatus])
	SELECT @newInitiativeId  ,[Plant]  ,[EmocNo]  ,[EmocName]  ,[EmocRequestStatus]  ,[EmocStatus]
	FROM [dbo].[RequestEmoc]
	WHERE InitiativeId = @initiativeId
	;
	--Table	RequestEmocQuestion
	INSERT INTO [dbo].[RequestEmocQuestion]  ([InitiativeId]  ,[Plant]  ,[EmocQuestionId]  ,[EmocAnswer])
	SELECT @newInitiativeId  ,[Plant]  ,[EmocQuestionId]  ,[EmocAnswer]
	FROM [dbo].[RequestEmocQuestion]
	WHERE InitiativeId = @initiativeId
	;
	--Table	ResourceNeededs
	--INSERT INTO [dbo].[ResourceNeededs]  ([IsManpowerRequire]  ,[IsImportRequire]  ,[RemarkImport]  ,[IsLandRequire]  
	--,[IsAirPollutionRequire]  ,[IsWasteRequire]  ,[InitiativeId]  ,[IsOtherRequired]  ,[IsUtilityTable]  ,[IsUtilityRequire])
	--SELECT [IsManpowerRequire]  ,[IsImportRequire]  ,[RemarkImport]  ,[IsLandRequire]  
	--,[IsAirPollutionRequire]  ,[IsWasteRequire]  ,@newInitiativeId  ,[IsOtherRequired]  ,[IsUtilityTable]  ,[IsUtilityRequire]
	--FROM [dbo].[ResourceNeededs]
	--WHERE InitiativeId = @initiativeId
	--;
	--Table	Risk
	--INSERT INTO [dbo].[Risk] ([InitiativeId] ,[RegisterDate] ,[ApprovePeriod] ,[Description] ,[RiskFactor] ,[Phase] ,[ExitingControl] 
	--,[ImpactExitingControl] ,[LikelihoodExitingControl] ,[RiskLevelExitingControl] ,[MitigationPlan] ,[ImpactMitigationPlan] 
	--,[LikelihoodMitigationPlan] ,[RiskLevelMitigationPlan] ,[MitigationProgress] ,[MitigationProgressImpact] ,[MitigationProgressLikelihood]
	--,[RiskLevelMitigationProgress])
	--SELECT @newInitiativeId ,[RegisterDate] ,[ApprovePeriod] ,[Description] ,[RiskFactor] ,[Phase] ,[ExitingControl] 
	--,[ImpactExitingControl] ,[LikelihoodExitingControl] ,[RiskLevelExitingControl] ,[MitigationPlan] ,[ImpactMitigationPlan] 
	--,[LikelihoodMitigationPlan] ,[RiskLevelMitigationPlan] ,[MitigationProgress] ,[MitigationProgressImpact] ,[MitigationProgressLikelihood]
	--,[RiskLevelMitigationProgress]
	--FROM [dbo].[Risk]
	--Where InitiativeId = @initiativeId
	--;
	--Table	ShareBenefitWorkstreams
	--INSERT INTO [dbo].[ShareBenefitWorkstreams] ([Workstream] ,[Percent] ,[InitiativeId])
	--SELECT [Workstream] ,[Percent] ,@newInitiativeId
	--FROM [dbo].[ShareBenefitWorkstreams]
	--WHERE InitiativeId = @initiativeId
	--;
	-- *** End of LEVEL2 

	-- Level3
	--Level3.1 CAPEX Information

   -- check clone initiatives 
   EXEC [sp_checkCloneInitiative] @initiativeId, @HistoryFlag, @histInitiativeId
 
   DECLARE @InitiativeCode nvarchar(255) 
   SELECT @InitiativeCode =  [InitiativeCode] FROM [Initiatives] WHERE ID = @initiativeId

   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'Initiatives','Id' 
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'InitiativeDetails','InitiativeId' 
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'ProgressHeader','InitiativeId' 
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'CapexInformations','InitiativeId' 
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'NewDetailInformations','InitiativeId' 
    
   --exec [sp_AuditLog] @initiativeId,@histInitiativeId,'DetailInformations','InitiativeId' 
 

  INSERT INTO [dbo].[InitiativeHistoryIndex]
           ([InitiativeCode]
           ,[Stage]
           ,[Status]
           ,[SubmittedBy]
           ,[SubmittedDate]
           ,[Comment]
           ,[InitiativeIdHistory]
           ,[InitiativeIdMain])
 SELECT    top 1 [InitiativeCode]
           ,[Stage]
           ,[Status]
           ,CASE WHEN NOT UpdatedBy IS NULL THEN UpdatedBy  ELSE CreatedBy  END
		   ,CASE WHEN NOT UpdatedDate IS NULL THEN UpdatedDate  ELSE CreatedDate  END 
		   ,''
           ,ID
           ,@initiativeId
FROM		[dbo].[Initiatives]
WHERE		ID = @histInitiativeId
			AND HistoryFlag = @HistoryFlag
ORDER BY ID DESC 
RETURN @histInitiativeId
END
GO

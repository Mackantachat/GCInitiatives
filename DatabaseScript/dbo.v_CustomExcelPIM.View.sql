/****** Object:  View [dbo].[v_CustomExcelPIM]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE view [dbo].[v_CustomExcelPIM]
AS


	SELECT TOP 1000  
       I.[Id]
	,I.[InitiativeCode]
	,I.[Name]
	,I.[Year]
	,I.[OwnerName]
	,I.[Plant]
	,I.[Location]
	,I.[SpecifyLocation]
	,I.[RegisteringDate]
	,I.[FinishingDate]
	,I.[ScopeOfWork]
	,I.[ResultObjective]
	,I.[Remark]
	,I.[InitiativeType]
	,I.[RequestCapex]
	,I.[CostEstCapex]
	,I.[CostEstCapexType]
	,I.[TypeOfInvestment]
	,I.[BudgetType]
	,I.[Ram]
	,I.[JFactor]
	,I.[TypeBenefit]
	,I.[BenefitAmount]
	,I.[BenefitAmountType]
	,I.[PayBackPeriod]
	,I.[Irr]
	,I.[FxExchange]
	,I.[Cim]
	,I.[Pim]
	,I.[Dim]
	,I.[Max]
	,I.[DirectCapex]
	,I.[Cpi]
	,I.[Strategy]
	,I.[RandD]
	,I.[Other]
	,I.[ApprovedDate]
	,I.[CreatedDate]
	,I.[CreatedBy]
	,I.[UpdatedDate]
	,I.[UpdatedBy]
	,I.[LastActivity]
	,I.[DeletedFlag]
	,I.[Status]
	,I.[StartingDate]
	,I.[Wacc]
	,I.[Stage]
	,I.[Background]
	,I.[BudgetSource]
	,I.[Company]
	,I.[CostEstOpex]
	,I.[Integration]
	,I.[InvolveItDigital]
	,I.[Organization]
	,I.[RequestOpex]
	,I.[RequestProjectEngineer]
	,I.[SpecifyCompany]
	,I.[SpecifyPlant]
	,I.[TrackMax]
	,I.[CostEstOpexType]
	,I.[CommentCancelled]
	,I.[LastSubmittedDate]
	,I.[LagacyInitiativeCode]
	,I.[LagacyInitiativeId]
	,I.[Divestment]
	,I.[GoToStage]
	,I.[SecretProject]
	,I.[PoolType]
	,I.[ITDigital]
	,I.[CapexStage]
	,I.[CapexStatus]
	,I.[IsRequestCapex]
	,I.[SSPIM]
	,I.[DMPlantOwner]
	,I.[VPPlantOwner]
	,I.[LookbackOwner]
	,I.[SortStage]
	,I.[InitiativeSubType]
	,I.[isSetInitiativeSubType]
	,I.[AlignWithCorpStrategy]
	,I.[StrategicObjective]
	,I.[StrategicYear]
	,I.[StrategyType]
	,I.[HistoryFlag]
	,I.[IsPassPimGate1]
	,I.[CreateType]
	,I.[IsCreatedApp]
	,I.[IsCreatedWbs]
	,I.[BestPracticeTabStatus]
	,I.[CapexTabStatus]
	,I.[DetailTabStatus]
	,I.[GeneralTabStatus]
	,I.[ImpactTabStatus]
	,I.[LessonLearnTabStatus]
	,I.[LookbackTabStatus]
	,I.[ProgressTabStatus]
	,I.[ResourceTabStatus]
	,I.[RiskTabStatus]
	,I.[StatusTabStatus]
	,I.[StrategyTabStatus] 

	,DT1.InitiativeId	AS	Detail_InitiativeId
	,DT1.InitiativeYear	AS	Detail_InitiativeYear
	,DT1.StrategicObjective	AS	Detail_StrategicObjective
	,DT1.Strategy	AS	Detail_Strategy
	,DT1.InitiativeTypeMax	AS	Detail_InitiativeTypeMax
	,DT1.Workstream	AS	Detail_Workstream
	,DT1.IL3Date	AS	Detail_IL3Date
	,DT1.IL4Date	AS	Detail_IL4Date
	,DT1.IL5Date	AS	Detail_IL5Date
	,DT1.ProductionProcess	AS	Detail_ProductionProcess
	,DT1.ComparisonWithOther	AS	Detail_ComparisonWithOther
	,DT1.OtherInvestment	AS	Detail_OtherInvestment
	,DT1.KeySuccessFactor	AS	Detail_KeySuccessFactor
	,DT1.SynergyBenefit	AS	Detail_SynergyBenefit
	,DT1.OtherStrategic	AS	Detail_OtherStrategic
	,DT1.MarketOverview	AS	Detail_MarketOverview
	,DT1.PotentialCustomer	AS	Detail_PotentialCustomer
	,DT1.SalesPlan	AS	Detail_SalesPlan
	,DT1.OtherBusiness	AS	Detail_OtherBusiness
	,DT1.CorporateImageIndex	AS	Detail_CorporateImageIndex
	,DT1.OtherQuality	AS	Detail_OtherQuality
	,DT1.BaseCase	AS	Detail_BaseCase
	,DT1.ProjectIrrBaseCase	AS	Detail_ProjectIrrBaseCase
	,DT1.NpvBaseCase	AS	Detail_NpvBaseCase
	,DT1.PaybackBaseCase	AS	Detail_PaybackBaseCase
	,DT1.EbitdaBaseCase	AS	Detail_EbitdaBaseCase
	,DT1.OptimisticCase	AS	Detail_OptimisticCase
	,DT1.ProjectIrrOptimisticCase	AS	Detail_ProjectIrrOptimisticCase
	,DT1.NpvOptimisticCase	AS	Detail_NpvOptimisticCase
	,DT1.PaybackOptimisticCase	AS	Detail_PaybackOptimisticCase
	,DT1.EbitdaOptimisticCase	AS	Detail_EbitdaOptimisticCase
	,DT1.PessimisticCase	AS	Detail_PessimisticCase
	,DT1.ProjectIrrPessimisticCase	AS	Detail_ProjectIrrPessimisticCase
	,DT1.NpvPessimisticCase	AS	Detail_NpvPessimisticCase
	,DT1.PaybackPessimisticCase	AS	Detail_PaybackPessimisticCase
	,DT1.EbitdaPessimisticCase	AS	Detail_EbitdaPessimisticCase
	,DT1.DepreciationCost	AS	Detail_DepreciationCost
	,DT1.Remark	AS	Detail_Remark
	,DT1.Id	AS	Detail_Id
	,DT1.SafetyIndex	AS	Detail_SafetyIndex
	,DT1.ProCategory	AS	Detail_ProCategory
	,DT1.ProLever	AS	Detail_ProLever
	,DT1.ProSubCategory	AS	Detail_ProSubCategory
	,DT1.SubWorkstream1	AS	Detail_SubWorkstream1
	,DT1.SubWorkstream2	AS	Detail_SubWorkstream2
	,DT1.Baseline	AS	Detail_Baseline
	,DT1.BaselineHistorical	AS	Detail_BaselineHistorical
	,DT1.BaselineNonHistorical	AS	Detail_BaselineNonHistorical
	,DT1.Saving	AS	Detail_Saving
	,DT1.SavingHistorical	AS	Detail_SavingHistorical
	,DT1.SavingNonHistorical	AS	Detail_SavingNonHistorical
	,DT1.Boi	AS	Detail_Boi
	,DT1.BoiNo	AS	Detail_BoiNo
	,DT1.Capital	AS	Detail_Capital
	,DT1.Catalyst	AS	Detail_Catalyst
	,DT1.Coordinate	AS	Detail_Coordinate
	,DT1.CutFeedDate	AS	Detail_CutFeedDate
	,DT1.EquipmentName	AS	Detail_EquipmentName
	,DT1.EquipmentOrAsset	AS	Detail_EquipmentOrAsset
	,DT1.ExpectedTarget	AS	Detail_ExpectedTarget
	,DT1.ForEnvironment	AS	Detail_ForEnvironment
	,DT1.ForTurnaround	AS	Detail_ForTurnaround
	,DT1.Manager	AS	Detail_Manager
	,DT1.MilestoneSchedule	AS	Detail_MilestoneSchedule
	,DT1.OldAssetCondition	AS	Detail_OldAssetCondition
	,DT1.OldAssetNo	AS	Detail_OldAssetNo
	,DT1.Parties	AS	Detail_Parties
	,DT1.President	AS	Detail_President
	,DT1.ProjectManager	AS	Detail_ProjectManager
	,DT1.ReplaceEquipment	AS	Detail_ReplaceEquipment
	,DT1.ReplacementDate	AS	Detail_ReplacementDate
	,DT1.RightOfUse	AS	Detail_RightOfUse
	,DT1.Software	AS	Detail_Software
	,DT1.SourceOfFeedback	AS	Detail_SourceOfFeedback
	,DT1.StartUpDate	AS	Detail_StartUpDate
	,DT1.otherResources	AS	Detail_otherResources
	,DT1.Consistent	AS	Detail_Consistent
	,DT1.CycleMonth	AS	Detail_CycleMonth
	,DT1.CycleYear	AS	Detail_CycleYear
	,DT1.HaveAdditional	AS	Detail_HaveAdditional
	,DT1.OtherKpis	AS	Detail_OtherKpis
	,DT1.UsefulMonth	AS	Detail_UsefulMonth
	,DT1.UsefulYear	AS	Detail_UsefulYear
	,DT1.InitiativeCode	AS	Detail_InitiativeCode
	,DT1.ActualFinishDate	AS	Detail_ActualFinishDate
	,DT1.ActualStartDate	AS	Detail_ActualStartDate
	,DT1.BaselineFinishDate	AS	Detail_BaselineFinishDate
	,DT1.BaselineStartDate	AS	Detail_BaselineStartDate
	,DT1.CostDetail	AS	Detail_CostDetail
	,DT1.IsDeliverAsPerCommittedCost	AS	Detail_IsDeliverAsPerCommittedCost
	,DT1.IsDeliverAsPerCommittedDate	AS	Detail_IsDeliverAsPerCommittedDate
	,DT1.IsDeliverAsPerCommittedScope	AS	Detail_IsDeliverAsPerCommittedScope
	,DT1.ProjectCategory	AS	Detail_ProjectCategory
	,DT1.ReviseForecastFinishDate	AS	Detail_ReviseForecastFinishDate
	,DT1.ReviseForecastStartDate	AS	Detail_ReviseForecastStartDate
	,DT1.ScopeDetail	AS	Detail_ScopeDetail
	,DT1.UserFeedback	AS	Detail_UserFeedback
	,DT1.ValueChain	AS	Detail_ValueChain
	,DT1.BOD1	AS	Detail_BOD1
	,DT1.BOD2	AS	Detail_BOD2
	,DT1.Comparison	AS	Detail_Comparison
	,DT1.EntryMode	AS	Detail_EntryMode
	,DT1.EntryModeSpecify	AS	Detail_EntryModeSpecify
	,DT1.FX	AS	Detail_FX
	,DT1.FirstBudgetYear	AS	Detail_FirstBudgetYear
	,DT1.Geography	AS	Detail_Geography
	,DT1.GeographySpecify	AS	Detail_GeographySpecify
	,DT1.Irr	AS	Detail_Irr
	,DT1.ListOfEquipment	AS	Detail_ListOfEquipment
	,DT1.MgrOfProcessEngineer	AS	Detail_MgrOfProcessEngineer
	,DT1.Note	AS	Detail_Note
	,DT1.Npv	AS	Detail_Npv
	,DT1.OthersStrategic	AS	Detail_OthersStrategic
	,DT1.ProcessEngineer	AS	Detail_ProcessEngineer
	,DT1.ProgressUpdate	AS	Detail_ProgressUpdate
	,DT1.ProjectDirector	AS	Detail_ProjectDirector
	,DT1.ProjectDmManager	AS	Detail_ProjectDmManager
	,DT1.ProjectEngineer	AS	Detail_ProjectEngineer
	,DT1.RequireBOD1	AS	Detail_RequireBOD1
	,DT1.RequireProject	AS	Detail_RequireProject
	,DT1.StatusProgress	AS	Detail_StatusProgress
	,DT1.directBenefit	AS	Detail_directBenefit
	,DT1.indirectBenefit	AS	Detail_indirectBenefit
	,DT1.requireDirectBenefit	AS	Detail_requireDirectBenefit
	,DT1.requireIndirectBenefit	AS	Detail_requireIndirectBenefit
	,DT1.AssumptionOfGoal	AS	Detail_AssumptionOfGoal
	,DT1.Cfo	AS	Detail_Cfo
	,DT1.Cto	AS	Detail_Cto
	,DT1.DivMgrOfProcessEngineer	AS	Detail_DivMgrOfProcessEngineer
	,DT1.Gate1Date	AS	Detail_Gate1Date
	,DT1.Gate2Date	AS	Detail_Gate2Date
	,DT1.Gate3Date	AS	Detail_Gate3Date
	,DT1.GoalAchievement	AS	Detail_GoalAchievement
	,DT1.InititativeType	AS	Detail_InititativeType
	,DT1.IsImpactProduction	AS	Detail_IsImpactProduction
	,DT1.IsMainPlant	AS	Detail_IsMainPlant
	,DT1.KickoffMeeting	AS	Detail_KickoffMeeting
	,DT1.ProjectControl	AS	Detail_ProjectControl
	,DT1.ProjectPriority	AS	Detail_ProjectPriority
	,DT1.ReasonForChange	AS	Detail_ReasonForChange
	,DT1.SimProjectSkipGate2	AS	Detail_SimProjectSkipGate2
	,DT1.Smes	AS	Detail_Smes
	,DT1.SponsorEvp	AS	Detail_SponsorEvp
	,DT1.SubWorkstream	AS	Detail_SubWorkstream
	,DT1.ToFinance	AS	Detail_ToFinance
	,DT1.WorkstreamLeadVp	AS	Detail_WorkstreamLeadVp
	,DT1.IsAlignWithCorporateStrategy	AS	Detail_IsAlignWithCorporateStrategy
	,DT1.IsSimProjectSkipGate2	AS	Detail_IsSimProjectSkipGate2
	,DT1.ActualBenefitCalculationDetails	AS	Detail_ActualBenefitCalculationDetails
	,DT1.ActualBudgetOpex	AS	Detail_ActualBudgetOpex
	,DT1.ActualBudgetSavings	AS	Detail_ActualBudgetSavings
	,DT1.AnalysisTool	AS	Detail_AnalysisTool
	,DT1.EstimatedBenefitCalculationDetails	AS	Detail_EstimatedBenefitCalculationDetails
	,DT1.EstimatedBenefitSavings	AS	Detail_EstimatedBenefitSavings
	,DT1.EstimatedBudgetOpex	AS	Detail_EstimatedBudgetOpex
	,DT1.RootCause	AS	Detail_RootCause
	,DT1.SourceOfImprovement	AS	Detail_SourceOfImprovement
	,DT1.StepExplanation	AS	Detail_StepExplanation
	,DT1.TypeOfCpi	AS	Detail_TypeOfCpi
	,DT1.ProjectDocumentDatabase	AS	Detail_ProjectDocumentDatabase
	,DT1.DigitalStrategy	AS	Detail_DigitalStrategy
	,DT1.FixedAsset	AS	Detail_FixedAsset
	,DT1.RequestSubPic	AS	Detail_RequestSubPic

	,DT2.StrategicObjective	AS	Detail2_StrategicObjective
	,DT2.StrategyDetail	AS	Detail2_StrategyDetail
	,DT2.EntryMode	AS	Detail2_EntryMode
	,DT2.HaveProduct	AS	Detail2_HaveProduct
	,DT2.FX	AS	Detail2_FX
	,DT2.FxChoice	AS	Detail2_FxChoice
	,DT2.ShareOfInvestment	AS	Detail2_ShareOfInvestment
	,DT2.FirstBudgetYear	AS	Detail2_FirstBudgetYear
	,DT2.Note	AS	Detail2_Note
	,DT2.InitiativeId	AS	Detail2_InitiativeId
	,DT2.BOD1	AS	Detail2_BOD1
	,DT2.BOD2	AS	Detail2_BOD2
	,DT2.Irr	AS	Detail2_Irr
	,DT2.Npv	AS	Detail2_Npv
	,DT2.RequireBOD1	AS	Detail2_RequireBOD1
	,DT2.Specify	AS	Detail2_Specify
	,DT2.Manager	AS	Detail2_Manager
	,DT2.President	AS	Detail2_President
	,DT2.BaseCase	AS	Detail2_BaseCase
	,DT2.BusinessModel	AS	Detail2_BusinessModel
	,DT2.Comparison	AS	Detail2_Comparison
	,DT2.CorporateImageIndex	AS	Detail2_CorporateImageIndex
	,DT2.EbitdaBaseCase	AS	Detail2_EbitdaBaseCase
	,DT2.EbitdaOptimisticCase	AS	Detail2_EbitdaOptimisticCase
	,DT2.EbitdaPessimisticCase	AS	Detail2_EbitdaPessimisticCase
	,DT2.Entity	AS	Detail2_Entity
	,DT2.EntitySpecify	AS	Detail2_EntitySpecify
	,DT2.Geography	AS	Detail2_Geography
	,DT2.GeographySpecify	AS	Detail2_GeographySpecify
	,DT2.KeySuccessFactor	AS	Detail2_KeySuccessFactor
	,DT2.ListOfEquipment	AS	Detail2_ListOfEquipment
	,DT2.MarketOverview	AS	Detail2_MarketOverview
	,DT2.MgrOfProcessEngineer	AS	Detail2_MgrOfProcessEngineer
	,DT2.NpvBaseCase	AS	Detail2_NpvBaseCase
	,DT2.NpvOptimisticCase	AS	Detail2_NpvOptimisticCase
	,DT2.NpvPessimisticCase	AS	Detail2_NpvPessimisticCase
	,DT2.OptimisticCase	AS	Detail2_OptimisticCase
	,DT2.OtherBusiness	AS	Detail2_OtherBusiness
	,DT2.OtherInvestment	AS	Detail2_OtherInvestment
	,DT2.OtherQuality	AS	Detail2_OtherQuality
	,DT2.OthersStrategic	AS	Detail2_OthersStrategic
	,DT2.PaybackBaseCase	AS	Detail2_PaybackBaseCase
	,DT2.PaybackOptimisticCase	AS	Detail2_PaybackOptimisticCase
	,DT2.PaybackPessimisticCase	AS	Detail2_PaybackPessimisticCase
	,DT2.PessimisticCase	AS	Detail2_PessimisticCase
	,DT2.PotentialCustomer	AS	Detail2_PotentialCustomer
	,DT2.ProcessEngineer	AS	Detail2_ProcessEngineer
	,DT2.ProductionProcess	AS	Detail2_ProductionProcess
	,DT2.ProjectDirector	AS	Detail2_ProjectDirector
	,DT2.ProjectEngineer	AS	Detail2_ProjectEngineer
	,DT2.ProjectIrrBaseCase	AS	Detail2_ProjectIrrBaseCase
	,DT2.ProjectIrrOptimisticCase	AS	Detail2_ProjectIrrOptimisticCase
	,DT2.ProjectIrrPessimisticCase	AS	Detail2_ProjectIrrPessimisticCase
	,DT2.ProjectManager	AS	Detail2_ProjectManager
	,DT2.RequireProject	AS	Detail2_RequireProject
	,DT2.SafetyIndex	AS	Detail2_SafetyIndex
	,DT2.SalesPlan	AS	Detail2_SalesPlan
	,DT2.SourceOfFeedback	AS	Detail2_SourceOfFeedback
	,DT2.SynergyBenefit	AS	Detail2_SynergyBenefit
	,DT2.ProgressStatus	AS	Detail2_ProgressStatus
	,DT2.ProgressUpdate	AS	Detail2_ProgressUpdate
  

	FROM 
	v_Initiatives I 
	LEFT JOIN DetailInformations DT1 ON DT1.InitiativeId = I.Id
	LEFT JOIN InitiativeDetails DT2 ON DT2.InitiativeId = I.Id
	WHERE InitiativeType like '%pim%' 
	ORDER BY I.RegisteringDate desc
GO

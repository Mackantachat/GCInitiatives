/****** Object:  View [dbo].[v_CustomExcelDIM]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE view [dbo].[v_CustomExcelDIM]
AS




SELECT TOP 1000  
I.[Id]
,I.[InitiativeCode] as [Initiative No]
,I.[Name]  as [Initiative Name]
,I.[Year] as [Year]
,I.[OwnerName] as [Owner Name]
,I.[Plant] as [Plant]
,I.[Location] as [Location]
,I.[SpecifyLocation] as [Specify Location]
,I.[RegisteringDate] as [Registering Date]
,I.[FinishingDate] as [Finishing Date]
,I.[ScopeOfWork] as [Scope Of Work]
,I.[ResultObjective] as [Result Objective]
,I.[Remark] as [Remark]
,I.[InitiativeType] as [Initiative Type]
,I.[RequestCapex] as [Request Capex]
,I.[CostEstCapex] as [CostEstCapex]
,I.[CostEstCapexType] as [Cost Est. Capex Type]
,I.[TypeOfInvestment] as [Type Of Investment]
,I.[BudgetType] as [Budget Type]
,I.[Ram]
,I.[JFactor]
,I.[TypeBenefit] as [Type of Benefit]
,I.[BenefitAmount] as [Benefit Amount]
,I.[BenefitAmountType] as [Benefit Amount Type]
,I.[PayBackPeriod] as [PayBack Period]
,I.[Irr] as [IRR]
,I.[FxExchange] as [Fx Exchange]
--,I.[Cim]
--,I.[Pim]
--,I.[Dim]
--,I.[Max]
--,I.[DirectCapex]
--,I.[Cpi]
--,I.[Strategy]
--,I.[RandD]
--,I.[Other]
,I.[ApprovedDate] as [Approved Date]
,I.[CreatedDate] as [Created Date]
,I.[CreatedBy] as [Created By]
,I.[UpdatedDate] as [Updated Date]
,I.[UpdatedBy] as [UpdatedBy]
,I.[LastActivity] as [Last Activity]
,I.[DeletedFlag] as [Deleted Flag] 
,I.[Status] as [status]
,I.[StartingDate] as [Starting Date]
,I.[Wacc]
,I.[Stage]
,I.[Background]
,I.[BudgetSource]
,I.[Company]
,I.[CostEstOpex] as [Cost Est. OPEX]
,I.[Integration]
,I.[InvolveItDigital] as [Involve It Digital]
,I.[Organization] as [Organization]
,I.[RequestOpex] as [Request OPEX]
,I.[RequestProjectEngineer] as [Request ProjectEngineer]
,I.[SpecifyCompany] as [Specify Company]
,I.[SpecifyPlant] as [Specify Plant]
,I.[TrackMax] as [Track MAX]
,I.[CostEstOpexType] AS [Cost Est. OPEX Type]
,I.[CommentCancelled] as [Comment Cancelled]
,I.[LastSubmittedDate] as [Last Submitted Date]
--,I.[LagacyInitiativeCode]
--,I.[LagacyInitiativeId]
,I.[Divestment]
,I.[GoToStage] as [Go To Stage]
,I.[SecretProject] as [Secret Project]
,I.[PoolType] as [Pool Type]
,I.[ITDigital] as [IT Digital]
--,I.[CapexStage] as [CAPEX Stage]
--,I.[CapexStatus]
--,I.[IsRequestCapex]
--,I.[SSPIM]
--,I.[DMPlantOwner] as 
--,I.[VPPlantOwner]
--,I.[LookbackOwner]
--,I.[SortStage]
--,I.[InitiativeSubType]
--,I.[isSetInitiativeSubType]
,I.[AlignWithCorpStrategy] as [Align With CorpStrategy]
,I.[StrategicObjective] as [Strategic Objective]
--,I.[StrategicYear]
--,I.[StrategyType]
--,I.[HistoryFlag]
--,I.[IsPassPimGate1]
--,I.[CreateType]
--,I.[IsCreatedApp]
--,I.[IsCreatedWbs]
--,I.[BestPracticeTabStatus]
--,I.[CapexTabStatus]
--,I.[DetailTabStatus]
--,I.[GeneralTabStatus]
--,I.[ImpactTabStatus]
--,I.[LessonLearnTabStatus]
--,I.[LookbackTabStatus]
--,I.[ProgressTabStatus]
--,I.[ResourceTabStatus]
--,I.[RiskTabStatus]
--,I.[StatusTabStatus]
--,I.[StrategyTabStatus] 

--,DT1.InitiativeId	AS	Detail_InitiativeId
--,DT1.InitiativeYear	AS	Detail_InitiativeYear
,DT1.StrategicObjective	AS	[Strategic Objective Detail]
,DT1.Strategy	AS	[Strategy Detail]
,DT1.InitiativeTypeMax	AS	[Initiative Type MAX]
,DT1.Workstream	AS	[Workstream]
,DT1.IL3Date	AS	[IL3Date]
,DT1.IL4Date	AS	[IL4Date]
,DT1.IL5Date	AS	[IL5Date]
,DT1.ProductionProcess	AS	[Production Process]
,DT1.ComparisonWithOther	AS	[Compariso nWith Other]
,DT1.OtherInvestment	AS	[Other Investment]
,DT1.KeySuccessFactor	AS	[Key Success Factor]
,DT1.SynergyBenefit	AS	[Synergy Benefit]
,DT1.OtherStrategic	AS	[Other Strategic]
,DT1.MarketOverview	AS	[Market Overview]
,DT1.PotentialCustomer	AS	[Potential Customer]
,DT1.SalesPlan	AS	[Sales Plan]
,DT1.OtherBusiness	AS	[Other Business]
,DT1.CorporateImageIndex	AS	[Corporate Image Index]
,DT1.OtherQuality	AS	[Other Quality]
,DT1.BaseCase	AS	[Base Case]
,DT1.ProjectIrrBaseCase	AS	[Project Irr Base Case]
,DT1.NpvBaseCase	AS	[Npv Base Case]
,DT1.PaybackBaseCase	AS	[Paybac kBase Case]
,DT1.EbitdaBaseCase	AS	[Ebitda Base Case]
,DT1.OptimisticCase	AS	[Optimistic Case]
,DT1.ProjectIrrOptimisticCase	AS	[Project Irr OptimisticCase]
,DT1.NpvOptimisticCase	AS	[Npv Optimistic Case]
,DT1.PaybackOptimisticCase	AS	[Payback Optimistic Case]
,DT1.EbitdaOptimisticCase	AS	[Ebitda Optimistic Case]
,DT1.PessimisticCase	AS	[Pessimistic Case]
,DT1.ProjectIrrPessimisticCase	AS	[Project Irr Pessimistic Case]
,DT1.NpvPessimisticCase	AS	[Npv Pessimistic Case]
,DT1.PaybackPessimisticCase	AS	[Payback Pessimistic Case]
,DT1.EbitdaPessimisticCase	AS	[Ebitda Pessimistic Case]
,DT1.DepreciationCost	AS	[Depreciation Cost]
,DT1.Remark	AS	[Remark Detail]
--,DT1.Id	AS	Detail_Id
,DT1.SafetyIndex	AS	[Safety Index]
,DT1.ProCategory	AS	[Pro Category]
,DT1.ProLever	AS	[Pro Lever]
,DT1.ProSubCategory	AS	[Pro Sub Category]
,DT1.SubWorkstream1	AS	[Sub Workstream 1]
,DT1.SubWorkstream2	AS	[Sub Workstream 2]
,DT1.Baseline	AS	[Baseline]
,DT1.BaselineHistorical	AS	[Baseline Historical]
,DT1.BaselineNonHistorical	AS	[Baseline Non Historical]
,DT1.Saving	AS	[Saving]
,DT1.SavingHistorical	AS	[Saving Historical]
,DT1.SavingNonHistorical	AS	[Saving Non Historical]
,DT1.Boi	AS	[Boi]
,DT1.BoiNo	AS	[Boi No]
,DT1.Capital	AS	[Capital]
,DT1.Catalyst	AS	[Catalyst]
,DT1.Coordinate	AS	[Coordinate]
,DT1.CutFeedDate	AS	[Cut FeedDate]
,DT1.EquipmentName	AS	[Equipment Name]
,DT1.EquipmentOrAsset	AS	[Equipment Or Asset]
,DT1.ExpectedTarget	AS	[Expected Target]
,DT1.ForEnvironment	AS	[For Environment]
,DT1.ForTurnaround	AS	[For Turnaround]
,DT1.Manager	AS	[Manager]
,DT1.MilestoneSchedule	AS	[Milestone Schedule]
,DT1.OldAssetCondition	AS	[Old Asset Condition]
,DT1.OldAssetNo	AS	[Old Asset No]
,DT1.Parties	AS	[Parties]
,DT1.President	AS	[President]
,DT1.ProjectManager	AS	[Project Manager]
,DT1.ReplaceEquipment	AS	[Replace Equipment]
,DT1.ReplacementDate	AS	[Replacement Date]
,DT1.RightOfUse	AS	[Right Of Use]
,DT1.Software	AS	[Software]
,DT1.SourceOfFeedback	AS	[Source Of Feedback]
,DT1.StartUpDate	AS	[Start Up Date]
,DT1.otherResources	AS	[other Resources]
,DT1.Consistent	AS	[Consistent]
,DT1.CycleMonth	AS	[Cycle Month]
,DT1.CycleYear	AS	[Cycle Year]
,DT1.HaveAdditional	AS	[Have Additional]
,DT1.OtherKpis	AS	[Other Kpis]
,DT1.UsefulMonth	AS	[Useful Month]
,DT1.UsefulYear	AS	[Useful Year]
--,DT1.InitiativeCode	AS	Detail_InitiativeCode
,DT1.ActualFinishDate	AS	[Actual Finish Date Detail]
,DT1.ActualStartDate	AS	[Actual Start Date Detail]
,DT1.BaselineFinishDate	AS	[Baseline Finish Date Detail]
,DT1.BaselineStartDate	AS	[Baseline Start Date Detail]
,DT1.CostDetail	AS	[Cost Detail]
,DT1.IsDeliverAsPerCommittedCost	AS	[Deliver As PerCommitted Cost]
,DT1.IsDeliverAsPerCommittedDate	AS	[Deliver As PerCommitted Date]
,DT1.IsDeliverAsPerCommittedScope	AS	[Deliver As PerCommitted Scope]
,DT1.ProjectCategory	AS	[Project Category]
,DT1.ReviseForecastFinishDate	AS	[Revise Forecast Finish Date]
,DT1.ReviseForecastStartDate	AS	[Revise Forecast Start Date]
,DT1.ScopeDetail	AS	[Scope Detail]
,DT1.UserFeedback	AS	[User Feedback]
,DT1.ValueChain	AS	[Value Chain]
,DT1.BOD1	AS	[BOD1]
,DT1.BOD2	AS	[BOD2]
,DT1.Comparison	AS	[Comparison]
,DT1.EntryMode	AS	[EntryMode]
,DT1.EntryModeSpecify	AS	[Entry Mode Specify]
,DT1.FX	 AS [FX Detail]
,DT1.FirstBudgetYear	AS	[First Budget Year]
,DT1.Geography	AS [Geography]
,DT1.GeographySpecify	AS	[Geography Specify]
,DT1.Irr	AS	[Irr Detail]
,DT1.ListOfEquipment	AS	[List Of Equipment]
,DT1.MgrOfProcessEngineer	AS	[Mgr Of ProcessEngineer]
,DT1.Note	AS	[Note Detail]
,DT1.Npv	AS	[Npv]
,DT1.OthersStrategic	AS	[Others Strategic]
,DT1.ProcessEngineer	AS	[Process Engineer]
,DT1.ProgressUpdate	AS	[Progress Update]
,DT1.ProjectDirector	AS	[Project Director]
,DT1.ProjectDmManager	AS	[Project Dm Manager]
,DT1.ProjectEngineer	AS	[Project Engineer]
,DT1.RequireBOD1	AS	[Require BOD1]
,DT1.RequireProject	AS	[Require Project]
,DT1.StatusProgress	AS	[Status Progress]
,DT1.directBenefit	AS	[Direct Benefit]
,DT1.indirectBenefit	AS	[Indirect Benefit]
,DT1.requireDirectBenefit	AS	[Require Direct Benefit]
,DT1.requireIndirectBenefit	AS	[Require Indirect Benefit]
	,DT1.AssumptionOfGoal	AS	[Assumption Of Goal]
	,DT1.Cfo	AS	[CFO]
	,DT1.Cto	AS	[CTO]
	,DT1.DivMgrOfProcessEngineer	AS	[Div. Mgr. Of ProcessEngineer]
	,DT1.Gate1Date	AS	[Gate1 Date]
	,DT1.Gate2Date	AS	[Gate2 Date]
	,DT1.Gate3Date	AS	[Gate3 Date]
	,DT1.GoalAchievement	AS	[Goal Achievement]
	,DT1.InititativeType	AS	[Inititative Type]
	,DT1.IsImpactProduction	AS  [Impact Production]
	,DT1.IsMainPlant	AS	[MainPlant]
	,DT1.KickoffMeeting	AS	[Kickoff Meeting]
	,DT1.ProjectControl	AS	[Project Control]
	,DT1.ProjectPriority	AS	[Project Priority]
	,DT1.ReasonForChange	AS	[Reason For Change]
	,DT1.SimProjectSkipGate2	AS	[Sim Project Skip Gate 2]
	,DT1.Smes	AS	[Smes]
	,DT1.SponsorEvp	AS	[Sponsor Evp]
	,DT1.SubWorkstream	AS	[Sub Workstream]
	,DT1.ToFinance	AS	[To Finance]
	,DT1.WorkstreamLeadVp	AS	[Workstream Lead Vp]
	,DT1.IsAlignWithCorporateStrategy	AS	[Align With Corporate Strategy]
	--,DT1.IsSimProjectSkipGate2	AS	[Sim Project Skip Gate 2]
	,DT1.ActualBenefitCalculationDetails	AS	[Actual Benefit Calculation]
	,DT1.ActualBudgetOpex	AS	[Actual Budget Opex]
	,DT1.ActualBudgetSavings	AS	[Actual Budget Savings]
	,DT1.AnalysisTool	AS	[Analysis Tool]
	,DT1.EstimatedBenefitCalculationDetails	AS	[Estimated Benefit Calculation Details]
	,DT1.EstimatedBenefitSavings	AS	[Estimated Benefit Savings]
	,DT1.EstimatedBudgetOpex	AS	[Estimated Budget Opex]
	,DT1.RootCause	AS	[RootCause]
	,DT1.SourceOfImprovement	AS	[Source Of Improvement]
	,DT1.StepExplanation	AS	[Step Explanation]
	,DT1.TypeOfCpi	AS	[Type Of CPI]
	,DT1.ProjectDocumentDatabase	AS	[Project Document Database]
	,DT1.DigitalStrategy	AS	[Digital Strategy]
	,DT1.FixedAsset	AS	[Fixed Asset]
	,DT1.RequestSubPic	AS	[Request Sub PIC]

	--,DT2.StrategicObjective	AS	Detail2_StrategicObjective
	--,DT2.StrategyDetail	AS	Detail2_StrategyDetail
	--,DT2.EntryMode	AS	Detail2_EntryMode
	--,DT2.HaveProduct	AS	Detail2_HaveProduct
	--,DT2.FX	AS	Detail2_FX
	--,DT2.FxChoice	AS	Detail2_FxChoice
	--,DT2.ShareOfInvestment	AS	Detail2_ShareOfInvestment
	--,DT2.FirstBudgetYear	AS	Detail2_FirstBudgetYear
	--,DT2.Note	AS	Detail2_Note
	--,DT2.InitiativeId	AS	Detail2_InitiativeId
	--,DT2.BOD1	AS	Detail2_BOD1
	--,DT2.BOD2	AS	Detail2_BOD2
	--,DT2.Irr	AS	Detail2_Irr
	--,DT2.Npv	AS	Detail2_Npv
	--,DT2.RequireBOD1	AS	Detail2_RequireBOD1
	--,DT2.Specify	AS	Detail2_Specify
	--,DT2.Manager	AS	Detail2_Manager
	--,DT2.President	AS	Detail2_President
	--,DT2.BaseCase	AS	Detail2_BaseCase
	--,DT2.BusinessModel	AS	Detail2_BusinessModel
	--,DT2.Comparison	AS	Detail2_Comparison
	--,DT2.CorporateImageIndex	AS	Detail2_CorporateImageIndex
	--,DT2.EbitdaBaseCase	AS	Detail2_EbitdaBaseCase
	--,DT2.EbitdaOptimisticCase	AS	Detail2_EbitdaOptimisticCase
	--,DT2.EbitdaPessimisticCase	AS	Detail2_EbitdaPessimisticCase
	--,DT2.Entity	AS	Detail2_Entity
	--,DT2.EntitySpecify	AS	Detail2_EntitySpecify
	--,DT2.Geography	AS	Detail2_Geography
	--,DT2.GeographySpecify	AS	Detail2_GeographySpecify
	--,DT2.KeySuccessFactor	AS	Detail2_KeySuccessFactor
	--,DT2.ListOfEquipment	AS	Detail2_ListOfEquipment
	--,DT2.MarketOverview	AS	Detail2_MarketOverview
	--,DT2.MgrOfProcessEngineer	AS	Detail2_MgrOfProcessEngineer
	--,DT2.NpvBaseCase	AS	Detail2_NpvBaseCase
	--,DT2.NpvOptimisticCase	AS	Detail2_NpvOptimisticCase
	--,DT2.NpvPessimisticCase	AS	Detail2_NpvPessimisticCase
	--,DT2.OptimisticCase	AS	Detail2_OptimisticCase
	--,DT2.OtherBusiness	AS	Detail2_OtherBusiness
	--,DT2.OtherInvestment	AS	Detail2_OtherInvestment
	--,DT2.OtherQuality	AS	Detail2_OtherQuality
	--,DT2.OthersStrategic	AS	Detail2_OthersStrategic
	--,DT2.PaybackBaseCase	AS	Detail2_PaybackBaseCase
	--,DT2.PaybackOptimisticCase	AS	Detail2_PaybackOptimisticCase
	--,DT2.PaybackPessimisticCase	AS	Detail2_PaybackPessimisticCase
	--,DT2.PessimisticCase	AS	Detail2_PessimisticCase
	--,DT2.PotentialCustomer	AS	Detail2_PotentialCustomer
	--,DT2.ProcessEngineer	AS	Detail2_ProcessEngineer
	--,DT2.ProductionProcess	AS	Detail2_ProductionProcess
	--,DT2.ProjectDirector	AS	Detail2_ProjectDirector
	--,DT2.ProjectEngineer	AS	Detail2_ProjectEngineer
	--,DT2.ProjectIrrBaseCase	AS	Detail2_ProjectIrrBaseCase
	--,DT2.ProjectIrrOptimisticCase	AS	Detail2_ProjectIrrOptimisticCase
	--,DT2.ProjectIrrPessimisticCase	AS	Detail2_ProjectIrrPessimisticCase
	--,DT2.ProjectManager	AS	Detail2_ProjectManager
	--,DT2.RequireProject	AS	Detail2_RequireProject
	--,DT2.SafetyIndex	AS	Detail2_SafetyIndex
	--,DT2.SalesPlan	AS	Detail2_SalesPlan
	--,DT2.SourceOfFeedback	AS	Detail2_SourceOfFeedback
	--,DT2.SynergyBenefit	AS	Detail2_SynergyBenefit
	--,DT2.ProgressStatus	AS	Detail2_ProgressStatus
	--,DT2.ProgressUpdate	AS	Detail2_ProgressUpdate

,CAP.StartingDate as [CAPEX Starting Date]
,CAP.ProjecctComRun as [Projecct ComRun]
,CAP.RequestIniNoDate as [Request Ini. No. Date]
,CAP.ProjectExePeriodYear as [Project Exe. PeriodYear]
,CAP.ProjectExePeriodMonth as [Project Exe. PeriodMonth]
,CAP.CostCenterOfVP as [Cost Center Of VP]
,CAP.ProjectCost as [Project Cost]
,CAP.ReasonOfChanging as [Reason Of Changing]
,CAP.BetweenYear as [Between Year]
,CAP.TransferForm as [Transfer Form]
,CAP.PoolBudgetForm as [Pool Budget Form]
,CAP.SubmitTo as [Submit To]
,CAP.RequestPoolMAX as [Request Pool MAX]
,CAP.CostCenter as [Cost Center]
,CAP.BudgetPeriod as [Budget Period]
,CAP.CodeCostCenterOfVP as [Code Cost Center Of VP]
,CAP.AdditionalCost as [Additional Cost]
,CAP.ActionYear as [Action Year]
,CAP.CapexStatus as [Capex Status]
,CAP.CapexType as [Capex Type]
--,CAP.IsMaxApprovedRev as CAPEX_IsMaxApprovedRev
,CAP.Revistion as [Revistion]
,CAP.Sequent as [Sequent]
,CAP.SpendingActual as [Spending Actual]
,CAP.ExistingBudget as [Existing Budget]
,CAP.BudgetYear as [Budget Year]
,CAP.ReturnCost as [Return Cost]
,CAP.CarriedCost as [Carried Cost]
,CAP.SpendingActualAllPrevious as [Spending Actual All Previous]
,CAP.SpendingActualCurrentYear as [Pending Actual Current Year]
,CAP.AvailableBudget as [Available Budget]
--,CAP.PoolId as [Pool Id]



,PRO.AppropriationNo as [Appropriation No.]
,PRO.WbsNo as [Wbs No.]
,PRO.StandardProjectDef as [Standard Project Def.]
,PRO.Responsible [Responsible Person]
,PRO.SolomonCategory as [Solomon Category]
,PRO.AreaPlant as [Area Plant]
,PRO.PhysicalBu as [Physical Bu]
,PRO.PhysicalUnit as [Physical Unit]



,IMP.FinancialImpactArea as [Financial Impact Area]
,IMP.HaveShareBenefit as [Have ShareBenefit]
,IMP.IL5FloatFxRecurring as [IL5 Float Fx Recurring]
,IMP.IL5RunRateRecurring as [IL5 RunRate Recurring]
,IMP.IL5FloatFxOnetime as [IL5 Float Fx Onetime]
,IMP.IL5RunRateOnetime as [IL5 RunRate Onetime]
,IMP.FirstRunRateMonth as [First Run Rate Month]
,IMP.AutoCalculate as [Auto Calculate]
,IMP.ImpiemantCost as [Impiement Cost]
,IMP.Remark1
,IMP.Remark2
,IMP.Remark3
,IMP.Remark4
,IMP.Remark5
,IMP.Explanation
,IMP.ToComment as [TO Comment]
,IMP.IL4RunRateOnetime as [IL4 RunRate Onetime]
,IMP.IL4RunRateRecurring as [IL4 RunRate Recurring]
,IMP.IL5FixedFxOnetime as [IL5 Fixed Fx Onetime]
,IMP.IL5FixedFxRecurring as [IL5 Fixed Fx Recurring]
,IMP.TotalOnetime as [Total Onetime]
,IMP.TotalRecurring as [Total Recurring]
,IMP.TotalCostOPEX as [Total Cost OPEX]
,IMP.SIL4Achievement as [SIL4 Achievement]
,IMP.SIL5Achievement as [SIL5 Achievement]
,IMP.IndirectBenefit as [Impact Indirect Benefit]
,IMP.ContactIO as [Contact IO]
,IMP.ContactIOBy as [Contact IO By]
,IMP.LastApprovedIL4Date as [Last Approved IL4 Date]
,IMP.LastApprovedIL5Date as [Last Approved IL5 Date]
,IMP.FirstApprovedIL4Date as [First Approved IL4 Date]
,IMP.LastSubmittedSIL4Date as [Last Submitted SIL4 Date]
,IMP.LastSubmittedSIL5Date as [Last Submitted SIL5 Date]


,ITB.ImpactTypeOfBenefitTable as [Impact Type Of Benefit Table]
,ITB.TypeOfBenefit as [Impact Type Of Benefit]
,ITB.VersionPrice as [Version Price]
,ITB.RunRate as [Run Rate]
,ITB.Month1
,ITB.Month2
,ITB.Month3
,ITB.Month4
,ITB.Month5
,ITB.Month6
,ITB.Month7
,ITB.Month8
,ITB.Month9
,ITB.Month10
,ITB.Month11
,ITB.Month12
,ITB.Month13
,ITB.Month14
,ITB.Month15
,ITB.Month16
,ITB.Month17
,ITB.Month18
,ITB.Month19
,ITB.Month20
,ITB.Month21
,ITB.Month22
,ITB.Month23
,ITB.Month24
,ITB.Month25
,ITB.Month26
,ITB.Month27
,ITB.Month28
,ITB.Month29
,ITB.Month30
,ITB.Month31
,ITB.Month32
,ITB.Month33
,ITB.Month34
,ITB.Month35
,ITB.Month36
,ITB.FixedFX as [Fixed FX]
,ITB.currencyFloatFx as [Currency Float Fx]

,ANN.Year1
,ANN.Year2
,ANN.Year3
,ANN.Year4
,ANN.Year5
,ANN.Year6
,ANN.Year7
,ANN.Year8
,ANN.Year9
,ANN.Year10
,ANN.YearOverall as [Year Overall]
--,ANN.InitiativeId
,ANN.CurrencyFx as [Currency Fx]
,ANN.Currency
,ANN.PlanType as [Plan Type]

,MON.InvestmentCost as [Investment Cost]
,MON.InvestmentCostFx as [Investment Cost Fx]
,MON.Jan as [Investment Jan]
,MON.Feb as  [Investment Feb]
,MON.Mar as  [Investment Mar]
,MON.Apr as  [Investment Apr]
,MON.May as  [Investment May]
,MON.Jun as  [Investment Jun]
,MON.Jul as  [Investment Jul]
,MON.Aug as  [Investment Aug]
,MON.Sep as  [Investment Sep]
,MON.Oct as  [Investment Oct]
,MON.Nov as  [Investment Nov]
,MON.Dec as  [Investment Dec]
,MON.MonthlyOverall as [Monthly Overall]
,MON.YearOfMonth as [Year Of Month]
,MON.SumMonthlyType as [Sum Monthly Type]

,PDATE.ProgressPlanDateType as [Progress Plan Date Type]
,PDATE.BasicStartDate as [Basic Start Date]
,PDATE.BasicFinishDate as [Basic Finish Date]
,PDATE.ActualStartDate as [Actual Start Date]
,PDATE.ActualFinishDate as [Actual Finish Date]
,PDATE.PocWeightPercent as [Poc Weight Percent]

,PP.Jan as [Progress Plan Jan]
,PP.Feb as [Progress Plan Feb]
,PP.Mar as [Progress Plan Mar]
,PP.Apr as [Progress Plan Apr]
,PP.May as [Progress Plan May]
,PP.Jun as [Progress Plan Jun]
,PP.Jul as [Progress Plan Jul]
,PP.Aug as [Progress Plan Aug]
,PP.Sep as [Progress Plan Sep]
,PP.Oct as [Progress Plan Oct]
,PP.Nov as [Progress Plan Nov]
,PP.Dec as [Progress Plan Dec]
,PP.PlanActual  as [Plan Actual]
,PP.ProgressPlanType  as [Progress Plan Type]
,PP.Year  as [Progress Plan Year]

,INV.InvestmentCostType as [Investment Cost Type]
,INV.JanCost as [Investment Cost Jan]
,INV.FebCost as [Investment Cost Feb]
,INV.MarCost as [Investment Cost Mar]
,INV.AprCost as [Investment Cost Apr]
,INV.MayCost as [Investment Cost May]
,INV.JunCost as [Investment Cost Jun]
,INV.JulCost as [Investment Cost Jul]
,INV.AugCost as [Investment Cost Aug]
,INV.SepCost as [Investment Cost Sep]
,INV.OctCost as [Investment Cost Oct]
,INV.NovCost as [Investment Cost Nov]
,INV.DecCost as [Investment Cost Dec]
,INV.OverallCost as [Investment Cost Overall]
,INV.YearCost as [Investment Cost Year]

,BSC.Year as [BSC Narrative Year]
,BSC.Month as [BSC Narrative Month]
--,BSC.Engineering as [Engineering]
--,BSC.Construction as BSC_Construction
--,BSC.Procurement as BSC_Procurement
--,BSC.CommissioningStartup as BSC_CommissioningStartup
,BSC.ProjectManagement as [Project Management]
,BSC.RiskAndConcern as [Risk And Concern]
,BSC.MitigationPlan as [Mitigation Plan]
,BSC.ExecutiveSummary as [Executive Summary]
,BSC.WorkForNextMonth as [Work For Next Month]
,BSC.EnvironmentKpi as [Environment Kpi]
,BSC.HighlightWork as [Highlight Work]
,BSC.CatchupPlan as [Catchup Plan]
,BSC.NarrativeStatus as [Narrative Status]

,OUTS.Year as [Outstanding Year]
,OUTS.Month as [Outstanding Month]
,OUTS.BudgetBaht as [Budget Baht]
,OUTS.ActualBaht as [Actual Baht]
,OUTS.PrItemBaht as [PR Item Baht]
,OUTS.PoItemBaht as [PO Item Baht]
,OUTS.CommitmentBaht as [Commitment Baht]
,OUTS.Contingency as [Contingency]
,OUTS.EstimateAtCompletion as [Estimate At Completion]

,OUTSD.Year as [Oustanding Data Year]
,OUTSD.Month as [Oustanding Data Month]
,OUTSD.ItemDescription as [Item Description]
,OUTSD.ItemListValueBaht as [Item List Value Baht]
,OUTSD.RpcDescription as [Rpc Description]
,OUTSD.RpcValueBaht as [Rpc Value Baht]
,OUTSD.Outstanding as [Outstanding]



	FROM 
	v_Initiatives I 
	LEFT JOIN DetailInformations DT1 ON DT1.InitiativeId = I.Id
	LEFT JOIN InitiativeDetails DT2 ON DT2.InitiativeId = I.Id

	LEFT JOIN ImpactTrackings IMP ON IMP.InitiativeId = I.Id
	LEFT JOIN ImpactTypeOfBenefits ITB ON ITB.InitiativeId = I.Id

	LEFT JOIN CapexInformations CAP ON CAP.InitiativeId = I.Id
	LEFT JOIN AnnualInvestmentPlans ANN ON ANN.InitiativeId = I.Id
	LEFT JOIN MonthlyInvestmentPlans MON ON MON.InitiativeId = I.Id

	LEFT JOIN ProgressHeader PRO ON PRO.InitiativeId = I.Id
	LEFT JOIN ProgressPlanDate PDATE ON PDATE.InitiativeId = I.Id
	LEFT JOIN ProgressPlan PP ON PP.InitiativeId = I.Id
	LEFT JOIN InvestmentCost INV ON INV.InitiativeId = I.Id

	LEFT JOIN BscNarrative BSC On BSC.InitiativeId = I.Id
	LEFT JOIN Outstandings OUTS ON OUTS.InitiativeId = I.Id
	LEFT JOIN OutstandingData OUTSD ON OUTSD.InitiativeId = I.Id

	--LEFT JOIN DimMembers DimM ON DimM.InitiativeId = I.Id
	



	
	



	WHERE InitiativeType like '%dim%' 
	ORDER BY I.RegisteringDate desc
/*
select 
I.[Id],
max(i.InitiativeCode) AS [Initiative ID]
,isnull(max(p.WbsNo),'') AS [WBS No.]
,max(i.Name) As [Name]
,max(i.OwnerName) As OwnerName
,max(i.Company) as  Company
,max(i.Organization) as Organization
,max(det.DigitalStrategy) as DigitalStrategy
,max(det.ProjectCategory) as ProjectCategory
,max(det.valuechain) as projectgroup
,max(substring(i.stage,1,CHARINDEX(' ',i.stage))) As Phase
,max(i.stage) as Stage
,max(i.InitiativeType) as Process
,max(i.status) as Status
,max(i.initiativetype) as DIM
,max(i.typeofinvestment) as [Type of Investment]
,max(isnull(i.costestcapex,'0')) + max(isnull(i.CostEstOpex,'0')) as [Total investment]
,max(isnull(i.costestcapex,'0')) as [CAPEX]
,max(isnull(i.CostEstOpex,'0'))as OPEX
,max(i.TypeBenefit) as [Benefit Type]
,max(isnull(i.benefitamount,'0')) as [Benefit]
,max(isnull(det.directBenefit,'0')) As [Direct Benefit]
,max(isnull(det.indirectBenefit,'0')) As [Indirect Benefit]
,max(det.BaselineStartDate) As [Original Startdate]
,max(det.BaselineFinishDate)As [Original Finishdate]
,max(det.ReviseForecastStartDate) As [Revise Startdate]
,max(det.ReviseForecastFinishDate)As [Revise Finishdate]
,max(det.ActualStartDate) As [Actual Startdate]
,max(det.ActualFinishDate)As [Actual Finishdate]
,max(det.SponsorEvp) As Sponsor
,max(det.President) As VP
,max(det.Manager) as DM
,max(det.ProjectManager) As [Project Manager]
,string_agg(ImpactedParties.MemberName,',')As [Impacted Parties]
,string_agg(TeamMember.MemberName,',')As [Team Member]
,max(i.Background) as Background
,max(i.ResultObjective) as Objective
,max(i.ScopeOfWork) as [Scope of work]
,max(i.CreatedBy) as [Created by]
,max(i.CreatedDate) as [Created date]
,max(i.UpdatedBy)  as [Updated by]
,max(i.UpdatedDate) as [Updated date]
from 
v_Initiatives i 
left join ProgressHeader p on i.id = p.InitiativeId
left join DetailInformations det on i.id = det.InitiativeId
left join DimMembers ImpactedParties on i.id = ImpactedParties.InitiativeId  and ImpactedParties.MemberType = 'ImpactedParties'
left join DimMembers TeamMember on i.id = TeamMember.InitiativeId  and TeamMember.MemberType = 'TeamMember'
--where i.initiativetype = 'dim'
group by i.Id

*/


GO

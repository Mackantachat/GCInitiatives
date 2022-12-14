/****** Object:  Table [dbo].[NewDetailInformations]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewDetailInformations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeYear] [nvarchar](4) NULL,
	[StrategicObjective] [nvarchar](100) NULL,
	[Strategy] [nvarchar](100) NULL,
	[InitiativeTypeMax] [nvarchar](100) NULL,
	[Workstream] [nvarchar](100) NULL,
	[SubWorkstream1] [nvarchar](100) NULL,
	[SubWorkstream2] [nvarchar](100) NULL,
	[ProCategory] [nvarchar](max) NULL,
	[ProSubCategory] [nvarchar](100) NULL,
	[ProLever] [nvarchar](100) NULL,
	[Baseline] [decimal](18, 2) NULL,
	[BaselineHistorical] [decimal](18, 2) NULL,
	[BaselineNonHistorical] [decimal](18, 2) NULL,
	[Saving] [decimal](18, 2) NULL,
	[SavingHistorical] [decimal](18, 2) NULL,
	[SavingNonHistorical] [decimal](18, 2) NULL,
	[IL3Date] [datetime2](7) NULL,
	[IL4Date] [datetime2](7) NULL,
	[IL5Date] [datetime2](7) NULL,
	[EntryMode] [nvarchar](max) NULL,
	[EntryModeSpecify] [nvarchar](max) NULL,
	[Geography] [nvarchar](max) NULL,
	[GeographySpecify] [nvarchar](max) NULL,
	[RequireBOD1] [bit] NULL,
	[BOD1] [datetime2](7) NULL,
	[BOD2] [datetime2](7) NULL,
	[RequireProject] [bit] NULL,
	[ProjectDirector] [nvarchar](100) NULL,
	[ProjectDmManager] [nvarchar](100) NULL,
	[ProjectEngineer] [nvarchar](100) NULL,
	[ProcessEngineer] [nvarchar](100) NULL,
	[MgrOfProcessEngineer] [nvarchar](100) NULL,
	[Irr] [decimal](18, 2) NULL,
	[Npv] [decimal](18, 2) NULL,
	[FX] [nvarchar](500) NULL,
	[FirstBudgetYear] [nvarchar](100) NULL,
	[Note] [nvarchar](max) NULL,
	[StatusProgress] [nvarchar](max) NULL,
	[ProgressUpdate] [nvarchar](max) NULL,
	[President] [nvarchar](100) NULL,
	[Manager] [nvarchar](100) NULL,
	[ProjectManager] [nvarchar](100) NULL,
	[ProductionProcess] [nvarchar](max) NULL,
	[MilestoneSchedule] [nvarchar](max) NULL,
	[ExpectedTarget] [nvarchar](max) NULL,
	[ListOfEquipment] [nvarchar](max) NULL,
	[Comparison] [nvarchar](max) NULL,
	[ComparisonWithOther] [nvarchar](max) NULL,
	[otherResources] [nvarchar](max) NULL,
	[OtherInvestment] [nvarchar](max) NULL,
	[OthersStrategic] [nvarchar](max) NULL,
	[Consistent] [nvarchar](max) NULL,
	[KeySuccessFactor] [nvarchar](max) NULL,
	[SynergyBenefit] [nvarchar](max) NULL,
	[OtherStrategic] [nvarchar](max) NULL,
	[MarketOverview] [nvarchar](max) NULL,
	[PotentialCustomer] [nvarchar](max) NULL,
	[SalesPlan] [nvarchar](max) NULL,
	[SourceOfFeedback] [nvarchar](max) NULL,
	[OtherBusiness] [nvarchar](max) NULL,
	[SafetyIndex] [nvarchar](max) NULL,
	[CorporateImageIndex] [nvarchar](max) NULL,
	[OtherQuality] [nvarchar](max) NULL,
	[BaseCase] [nvarchar](max) NULL,
	[ProjectIrrBaseCase] [decimal](18, 2) NULL,
	[NpvBaseCase] [decimal](18, 2) NULL,
	[PaybackBaseCase] [decimal](18, 2) NULL,
	[EbitdaBaseCase] [decimal](18, 2) NULL,
	[OptimisticCase] [nvarchar](max) NULL,
	[ProjectIrrOptimisticCase] [decimal](18, 2) NULL,
	[NpvOptimisticCase] [decimal](18, 2) NULL,
	[PaybackOptimisticCase] [decimal](18, 2) NULL,
	[EbitdaOptimisticCase] [decimal](18, 2) NULL,
	[PessimisticCase] [nvarchar](max) NULL,
	[ProjectIrrPessimisticCase] [decimal](18, 2) NULL,
	[NpvPessimisticCase] [decimal](18, 2) NULL,
	[PaybackPessimisticCase] [decimal](18, 2) NULL,
	[EbitdaPessimisticCase] [decimal](18, 2) NULL,
	[DepreciationCost] [nvarchar](max) NULL,
	[Remark] [nvarchar](max) NULL,
	[ForEnvironment] [nvarchar](max) NULL,
	[ForTurnaround] [nvarchar](max) NULL,
	[CutFeedDate] [datetime2](7) NULL,
	[StartUpDate] [datetime2](7) NULL,
	[ReplaceEquipment] [nvarchar](max) NULL,
	[EquipmentName] [nvarchar](max) NULL,
	[ReplacementDate] [datetime2](7) NULL,
	[OldAssetCondition] [nvarchar](max) NULL,
	[OldAssetNo] [nvarchar](100) NULL,
	[EquipmentOrAsset] [nvarchar](max) NULL,
	[Boi] [nvarchar](max) NULL,
	[BoiNo] [nvarchar](max) NULL,
	[Capital] [bit] NULL,
	[Catalyst] [bit] NULL,
	[Software] [bit] NULL,
	[RightOfUse] [bit] NULL,
	[Coordinate] [nvarchar](max) NULL,
	[Parties] [nvarchar](max) NULL,
	[UsefulYear] [decimal](18, 2) NULL,
	[UsefulMonth] [decimal](18, 2) NULL,
	[CycleYear] [decimal](18, 2) NULL,
	[CycleMonth] [decimal](18, 2) NULL,
	[OtherKpis] [nvarchar](max) NULL,
	[HaveAdditional] [nvarchar](max) NULL,
	[InitiativeId] [int] NOT NULL,
	[InitiativeCode] [nvarchar](100) NULL,
	[ValueChain] [nvarchar](max) NULL,
	[ProjectCategory] [nvarchar](max) NULL,
	[BaselineStartDate] [datetime2](7) NULL,
	[BaselineFinishDate] [datetime2](7) NULL,
	[ReviseForecastStartDate] [datetime2](7) NULL,
	[ReviseForecastFinishDate] [datetime2](7) NULL,
	[ActualStartDate] [datetime2](7) NULL,
	[ActualFinishDate] [datetime2](7) NULL,
	[IsDeliverAsPerCommittedScope] [bit] NULL,
	[ScopeDetail] [nvarchar](max) NULL,
	[IsDeliverAsPerCommittedDate] [bit] NULL,
	[IsDeliverAsPerCommittedCost] [bit] NULL,
	[CostDetail] [nvarchar](max) NULL,
	[UserFeedback] [nvarchar](max) NULL,
	[ActualBenefitCalculationDetails] [nvarchar](max) NULL,
	[ActualBudgetOpex] [decimal](18, 2) NULL,
	[ActualBudgetSavings] [decimal](18, 2) NULL,
	[AnalysisTool] [nvarchar](max) NULL,
	[EstimatedBenefitCalculationDetails] [nvarchar](max) NULL,
	[EstimatedBenefitSavings] [decimal](18, 2) NULL,
	[EstimatedBudgetOpex] [decimal](18, 2) NULL,
	[RootCause] [nvarchar](max) NULL,
	[SourceOfImprovement] [nvarchar](max) NULL,
	[TypeOfCpi] [nvarchar](max) NULL,
	[LookbackText] [nvarchar](max) NULL,
	[OtherTool] [nvarchar](max) NULL,
	[PhnBuPillar] [nvarchar](100) NULL,
	[SpecifyPhnBuPillar] [nvarchar](max) NULL,
	[SpecifyTypeOfPhn] [nvarchar](max) NULL,
	[TypeOfPhn] [nvarchar](100) NULL,
	[CpiApprover] [nvarchar](100) NULL,
 CONSTRAINT [PK_NewDetailInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_NewDetailInformations_5414B58B4841C2ADAAF6EC538F54C1DE]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_NewDetailInformations_5414B58B4841C2ADAAF6EC538F54C1DE] ON [dbo].[NewDetailInformations]
(
	[InitiativeId] ASC
)
INCLUDE([ActualBenefitCalculationDetails],[ActualBudgetOpex],[ActualBudgetSavings],[ActualFinishDate],[ActualStartDate],[AnalysisTool],[BaseCase],[Baseline],[BaselineFinishDate],[BaselineHistorical],[BaselineNonHistorical],[BaselineStartDate],[BOD1],[BOD2],[Boi],[BoiNo],[Capital],[Catalyst],[Comparison],[ComparisonWithOther],[Consistent],[Coordinate],[CorporateImageIndex],[CostDetail],[CpiApprover],[CutFeedDate],[CycleMonth],[CycleYear],[DepreciationCost],[EbitdaBaseCase],[EbitdaOptimisticCase],[EbitdaPessimisticCase],[EntryMode],[EntryModeSpecify],[EquipmentName],[EquipmentOrAsset],[EstimatedBenefitCalculationDetails],[EstimatedBenefitSavings],[EstimatedBudgetOpex],[ExpectedTarget],[FirstBudgetYear],[ForEnvironment],[ForTurnaround],[FX],[Geography],[GeographySpecify],[HaveAdditional],[IL3Date],[IL4Date],[IL5Date],[InitiativeCode],[InitiativeTypeMax],[InitiativeYear],[Irr],[IsDeliverAsPerCommittedCost],[IsDeliverAsPerCommittedDate],[IsDeliverAsPerCommittedScope],[KeySuccessFactor],[ListOfEquipment],[LookbackText],[Manager],[MarketOverview],[MgrOfProcessEngineer],[MilestoneSchedule],[Note],[Npv],[NpvBaseCase],[NpvOptimisticCase],[NpvPessimisticCase],[OldAssetCondition],[OldAssetNo],[OptimisticCase],[OtherBusiness],[OtherInvestment],[OtherKpis],[OtherQuality],[otherResources],[OthersStrategic],[OtherStrategic],[OtherTool],[Parties],[PaybackBaseCase],[PaybackOptimisticCase],[PaybackPessimisticCase],[PessimisticCase],[PhnBuPillar],[PotentialCustomer],[President],[ProCategory],[ProcessEngineer],[ProductionProcess],[ProgressUpdate],[ProjectCategory],[ProjectDirector],[ProjectDmManager],[ProjectEngineer],[ProjectIrrBaseCase],[ProjectIrrOptimisticCase],[ProjectIrrPessimisticCase],[ProjectManager],[ProLever],[ProSubCategory],[Remark],[ReplaceEquipment],[ReplacementDate],[RequireBOD1],[RequireProject],[ReviseForecastFinishDate],[ReviseForecastStartDate],[RightOfUse],[RootCause],[SafetyIndex],[SalesPlan],[Saving],[SavingHistorical],[SavingNonHistorical],[ScopeDetail],[Software],[SourceOfFeedback],[SourceOfImprovement],[SpecifyPhnBuPillar],[SpecifyTypeOfPhn],[StartUpDate],[StatusProgress],[StrategicObjective],[Strategy],[SubWorkstream1],[SubWorkstream2],[SynergyBenefit],[TypeOfCpi],[TypeOfPhn],[UsefulMonth],[UsefulYear],[UserFeedback],[ValueChain],[Workstream]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

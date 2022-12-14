/****** Object:  Table [dbo].[DetailInformations]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetailInformations](
	[InitiativeId] [int] NOT NULL,
	[InitiativeYear] [nvarchar](4) NULL,
	[StrategicObjective] [nvarchar](100) NULL,
	[Strategy] [nvarchar](100) NULL,
	[InitiativeTypeMax] [nvarchar](100) NULL,
	[Workstream] [nvarchar](100) NULL,
	[IL3Date] [datetime2](7) NULL,
	[IL4Date] [datetime2](7) NULL,
	[IL5Date] [datetime2](7) NULL,
	[ProductionProcess] [nvarchar](max) NULL,
	[ComparisonWithOther] [nvarchar](max) NULL,
	[OtherInvestment] [nvarchar](max) NULL,
	[KeySuccessFactor] [nvarchar](max) NULL,
	[SynergyBenefit] [nvarchar](max) NULL,
	[OtherStrategic] [nvarchar](max) NULL,
	[MarketOverview] [nvarchar](max) NULL,
	[PotentialCustomer] [nvarchar](max) NULL,
	[SalesPlan] [nvarchar](max) NULL,
	[OtherBusiness] [nvarchar](max) NULL,
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
	[DepreciationCost] [nvarchar](500) NULL,
	[Remark] [nvarchar](max) NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SafetyIndex] [nvarchar](max) NULL,
	[ProCategory] [nvarchar](100) NULL,
	[ProLever] [nvarchar](100) NULL,
	[ProSubCategory] [nvarchar](100) NULL,
	[SubWorkstream1] [nvarchar](100) NULL,
	[SubWorkstream2] [nvarchar](100) NULL,
	[Baseline] [decimal](18, 2) NULL,
	[BaselineHistorical] [decimal](18, 2) NULL,
	[BaselineNonHistorical] [decimal](18, 2) NULL,
	[Saving] [decimal](18, 2) NULL,
	[SavingHistorical] [decimal](18, 2) NULL,
	[SavingNonHistorical] [decimal](18, 2) NULL,
	[Boi] [nvarchar](500) NULL,
	[BoiNo] [nvarchar](500) NULL,
	[Capital] [bit] NULL,
	[Catalyst] [bit] NULL,
	[Coordinate] [nvarchar](500) NULL,
	[CutFeedDate] [datetime2](7) NULL,
	[EquipmentName] [nvarchar](max) NULL,
	[EquipmentOrAsset] [nvarchar](max) NULL,
	[ExpectedTarget] [nvarchar](max) NULL,
	[ForEnvironment] [nvarchar](100) NULL,
	[ForTurnaround] [nvarchar](100) NULL,
	[Manager] [nvarchar](100) NULL,
	[MilestoneSchedule] [nvarchar](max) NULL,
	[OldAssetCondition] [nvarchar](500) NULL,
	[OldAssetNo] [nvarchar](500) NULL,
	[Parties] [nvarchar](500) NULL,
	[President] [nvarchar](100) NULL,
	[ProjectManager] [nvarchar](100) NULL,
	[ReplaceEquipment] [nvarchar](100) NULL,
	[ReplacementDate] [datetime2](7) NULL,
	[RightOfUse] [bit] NULL,
	[Software] [bit] NULL,
	[SourceOfFeedback] [nvarchar](max) NULL,
	[StartUpDate] [datetime2](7) NULL,
	[otherResources] [nvarchar](max) NULL,
	[Consistent] [nvarchar](max) NULL,
	[CycleMonth] [decimal](18, 2) NULL,
	[CycleYear] [decimal](18, 2) NULL,
	[HaveAdditional] [nvarchar](500) NULL,
	[OtherKpis] [nvarchar](max) NULL,
	[UsefulMonth] [decimal](18, 2) NULL,
	[UsefulYear] [decimal](18, 2) NULL,
	[InitiativeCode] [nvarchar](50) NULL,
	[ActualFinishDate] [datetime2](7) NULL,
	[ActualStartDate] [datetime2](7) NULL,
	[BaselineFinishDate] [datetime2](7) NULL,
	[BaselineStartDate] [datetime2](7) NULL,
	[CostDetail] [nvarchar](max) NULL,
	[IsDeliverAsPerCommittedCost] [bit] NULL,
	[IsDeliverAsPerCommittedDate] [bit] NULL,
	[IsDeliverAsPerCommittedScope] [bit] NULL,
	[ProjectCategory] [nvarchar](500) NULL,
	[ReviseForecastFinishDate] [datetime2](7) NULL,
	[ReviseForecastStartDate] [datetime2](7) NULL,
	[ScopeDetail] [nvarchar](max) NULL,
	[UserFeedback] [nvarchar](max) NULL,
	[ValueChain] [nvarchar](500) NULL,
	[BOD1] [datetime2](7) NULL,
	[BOD2] [datetime2](7) NULL,
	[Comparison] [nvarchar](max) NULL,
	[EntryMode] [nvarchar](max) NULL,
	[EntryModeSpecify] [nvarchar](max) NULL,
	[FX] [nvarchar](500) NULL,
	[FirstBudgetYear] [nvarchar](10) NULL,
	[Geography] [nvarchar](max) NULL,
	[GeographySpecify] [nvarchar](max) NULL,
	[Irr] [decimal](18, 2) NULL,
	[ListOfEquipment] [nvarchar](max) NULL,
	[MgrOfProcessEngineer] [nvarchar](max) NULL,
	[Note] [nvarchar](max) NULL,
	[Npv] [decimal](18, 2) NULL,
	[OthersStrategic] [nvarchar](max) NULL,
	[ProcessEngineer] [nvarchar](100) NULL,
	[ProgressUpdate] [nvarchar](max) NULL,
	[ProjectDirector] [nvarchar](100) NULL,
	[ProjectDmManager] [nvarchar](max) NULL,
	[ProjectEngineer] [nvarchar](100) NULL,
	[RequireBOD1] [bit] NULL,
	[RequireProject] [bit] NULL,
	[StatusProgress] [nvarchar](max) NULL,
	[directBenefit] [decimal](18, 2) NULL,
	[indirectBenefit] [decimal](18, 2) NULL,
	[requireDirectBenefit] [bit] NULL,
	[requireIndirectBenefit] [bit] NULL,
	[AssumptionOfGoal] [nvarchar](max) NULL,
	[Cfo] [nvarchar](500) NULL,
	[Cto] [nvarchar](500) NULL,
	[DivMgrOfProcessEngineer] [nvarchar](100) NULL,
	[Gate1Date] [datetime2](7) NULL,
	[Gate2Date] [datetime2](7) NULL,
	[Gate3Date] [datetime2](7) NULL,
	[GoalAchievement] [nvarchar](max) NULL,
	[InititativeType] [nvarchar](500) NULL,
	[IsImpactProduction] [bit] NOT NULL,
	[IsMainPlant] [bit] NOT NULL,
	[KickoffMeeting] [datetime2](7) NULL,
	[ProjectControl] [nvarchar](500) NULL,
	[ProjectPriority] [nvarchar](500) NULL,
	[ReasonForChange] [nvarchar](max) NULL,
	[SimProjectSkipGate2] [bit] NOT NULL,
	[Smes] [nvarchar](500) NULL,
	[SponsorEvp] [nvarchar](500) NULL,
	[SubWorkstream] [nvarchar](200) NULL,
	[ToFinance] [nvarchar](500) NULL,
	[WorkstreamLeadVp] [nvarchar](500) NULL,
	[IsAlignWithCorporateStrategy] [bit] NOT NULL,
	[IsSimProjectSkipGate2] [bit] NOT NULL,
	[ActualBenefitCalculationDetails] [nvarchar](max) NULL,
	[ActualBudgetOpex] [decimal](18, 2) NULL,
	[ActualBudgetSavings] [decimal](18, 2) NULL,
	[AnalysisTool] [nvarchar](1000) NULL,
	[EstimatedBenefitCalculationDetails] [nvarchar](max) NULL,
	[EstimatedBenefitSavings] [decimal](18, 2) NULL,
	[EstimatedBudgetOpex] [decimal](18, 2) NULL,
	[RootCause] [nvarchar](max) NULL,
	[SourceOfImprovement] [nvarchar](1000) NULL,
	[StepExplanation] [nvarchar](max) NULL,
	[TypeOfCpi] [nvarchar](1000) NULL,
	[ProjectDocumentDatabase] [nvarchar](500) NULL,
	[DigitalStrategy] [nvarchar](500) NULL,
	[FixedAsset] [bit] NULL,
	[RequestSubPic] [bit] NULL,
	[InternalOrderNo] [nvarchar](100) NULL,
	[JFactor] [decimal](18, 2) NULL,
	[Ram] [nvarchar](100) NULL,
	[AttachBenefit] [bit] NULL,
	[AttachPlotPlanSite] [bit] NULL,
	[AttachProcess] [bit] NULL,
	[AttachReference] [bit] NULL,
	[ExternalEmoc] [nvarchar](500) NULL,
	[UseExternalEmoc] [bit] NULL,
	[ProjectNonFinancialBenefit] [nvarchar](max) NULL,
	[HighlightWorkConCern] [nvarchar](max) NULL,
	[HighlightWorkStatus] [nvarchar](100) NULL,
	[NextActivities] [nvarchar](500) NULL,
	[DivMgrOfPlantProcessEngineer] [nvarchar](100) NULL,
	[DmOfPlantOwner] [nvarchar](100) NULL,
	[PlantEngineer] [nvarchar](100) NULL,
	[PlantProcessEngineer] [nvarchar](100) NULL,
	[RequestHandoverExecution] [bit] NULL,
	[RequestHandoverPlantOwner] [bit] NULL,
	[RequestTeamSupport] [bit] NULL,
	[VpOfPlantOwner] [nvarchar](100) NULL,
	[IL0date] [datetime2](7) NULL,
	[ProjectSponsor] [nvarchar](100) NULL,
 CONSTRAINT [PK_DetailInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_DetailInformations_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_DetailInformations_InitiativeId] ON [dbo].[DetailInformations]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_DetailInformations_WS_PJEN_PC_EN]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_DetailInformations_WS_PJEN_PC_EN] ON [dbo].[DetailInformations]
(
	[Workstream] ASC,
	[ProjectEngineer] ASC,
	[ProcessEngineer] ASC,
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_DetailInformations_CEB83ED52BEAD7CFE22332152CF93193]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_DetailInformations_CEB83ED52BEAD7CFE22332152CF93193] ON [dbo].[DetailInformations]
(
	[Workstream] ASC,
	[ProjectEngineer] ASC,
	[ProcessEngineer] ASC
)
INCLUDE([IL4Date],[IL5Date],[InitiativeId],[InitiativeTypeMax],[SubWorkstream1],[SubWorkstream2]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DetailInformations] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsImpactProduction]
GO
ALTER TABLE [dbo].[DetailInformations] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsMainPlant]
GO
ALTER TABLE [dbo].[DetailInformations] ADD  DEFAULT (CONVERT([bit],(0))) FOR [SimProjectSkipGate2]
GO
ALTER TABLE [dbo].[DetailInformations] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsAlignWithCorporateStrategy]
GO
ALTER TABLE [dbo].[DetailInformations] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsSimProjectSkipGate2]
GO
ALTER TABLE [dbo].[DetailInformations]  WITH CHECK ADD  CONSTRAINT [FK_DetailInformations_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DetailInformations] CHECK CONSTRAINT [FK_DetailInformations_Initiatives_InitiativeId]
GO

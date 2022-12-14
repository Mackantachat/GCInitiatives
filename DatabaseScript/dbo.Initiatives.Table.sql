/****** Object:  Table [dbo].[Initiatives]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Initiatives](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeCode] [nvarchar](50) NULL,
	[Name] [nvarchar](255) NULL,
	[Year] [nvarchar](4) NULL,
	[OwnerName] [nvarchar](255) NULL,
	[Plant] [nvarchar](50) NULL,
	[Location] [nvarchar](100) NULL,
	[SpecifyLocation] [nvarchar](1000) NULL,
	[RegisteringDate] [datetime2](7) NULL,
	[FinishingDate] [datetime2](7) NULL,
	[ScopeOfWork] [nvarchar](max) NULL,
	[ResultObjective] [nvarchar](max) NULL,
	[Remark] [nvarchar](max) NULL,
	[InitiativeType] [nvarchar](100) NULL,
	[RequestCapex] [nvarchar](100) NULL,
	[CostEstCapex] [decimal](18, 2) NULL,
	[CostEstCapexType] [nvarchar](100) NULL,
	[TypeOfInvestment] [nvarchar](200) NULL,
	[BudgetType] [nvarchar](100) NULL,
	[Ram] [nvarchar](100) NULL,
	[JFactor] [decimal](18, 2) NULL,
	[TypeBenefit] [nvarchar](100) NULL,
	[BenefitAmount] [decimal](18, 3) NULL,
	[BenefitAmountType] [nvarchar](max) NULL,
	[PayBackPeriod] [decimal](18, 2) NULL,
	[Irr] [decimal](18, 2) NULL,
	[FxExchange] [decimal](18, 2) NULL,
	[Cim] [bit] NULL,
	[Pim] [bit] NULL,
	[Dim] [bit] NULL,
	[Max] [bit] NULL,
	[DirectCapex] [bit] NULL,
	[Cpi] [bit] NULL,
	[Strategy] [bit] NULL,
	[RandD] [bit] NULL,
	[Other] [bit] NULL,
	[ApprovedDate] [datetime2](7) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[CreatedBy] [nvarchar](100) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[UpdatedBy] [nvarchar](100) NULL,
	[LastActivity] [nvarchar](100) NULL,
	[DeletedFlag] [bit] NULL,
	[Status] [nvarchar](100) NULL,
	[StartingDate] [datetime2](7) NULL,
	[Wacc] [decimal](18, 2) NULL,
	[Stage] [nvarchar](100) NULL,
	[Background] [nvarchar](max) NULL,
	[BudgetSource] [nvarchar](100) NULL,
	[Company] [nvarchar](50) NULL,
	[CostEstOpex] [decimal](18, 2) NULL,
	[Integration] [bit] NULL,
	[InvolveItDigital] [bit] NULL,
	[Organization] [nvarchar](50) NULL,
	[RequestOpex] [nvarchar](100) NULL,
	[RequestProjectEngineer] [bit] NULL,
	[SpecifyCompany] [nvarchar](50) NULL,
	[SpecifyPlant] [nvarchar](100) NULL,
	[TrackMax] [bit] NULL,
	[CostEstOpexType] [nvarchar](100) NULL,
	[CommentCancelled] [nvarchar](max) NULL,
	[LastSubmittedDate] [datetime2](7) NULL,
	[LagacyInitiativeCode] [nvarchar](100) NULL,
	[LagacyInitiativeId] [int] NULL,
	[Divestment] [bit] NULL,
	[GoToStage] [nvarchar](100) NULL,
	[SecretProject] [nvarchar](100) NULL,
	[PoolType] [nvarchar](20) NULL,
	[ITDigital] [nvarchar](100) NULL,
	[CapexStage] [nvarchar](100) NULL,
	[CapexStatus] [nvarchar](100) NULL,
	[IsRequestCapex] [bit] NULL,
	[SSPIM] [nvarchar](100) NULL,
	[DMPlantOwner] [nvarchar](200) NULL,
	[VPPlantOwner] [nvarchar](200) NULL,
	[LookbackOwner] [nvarchar](200) NULL,
	[SortStage] [decimal](18, 2) NULL,
	[InitiativeSubType] [nvarchar](100) NULL,
	[isSetInitiativeSubType] [int] NOT NULL,
	[AlignWithCorpStrategy] [bit] NULL,
	[StrategicObjective] [nvarchar](100) NULL,
	[StrategicYear] [nvarchar](50) NULL,
	[StrategyType] [nvarchar](100) NULL,
	[HistoryFlag] [int] NULL,
	[IsPassPimGate1] [int] NULL,
	[CreateType] [int] NULL,
	[IsCreatedApp] [bit] NULL,
	[IsCreatedWbs] [bit] NULL,
	[BestPracticeTabStatus] [int] NULL,
	[CapexTabStatus] [int] NULL,
	[GeneralTabStatus] [int] NULL,
	[ImpactTabStatus] [int] NULL,
	[LessonLearnTabStatus] [int] NULL,
	[LookbackTabStatus] [int] NULL,
	[ProgressTabStatus] [int] NULL,
	[ResourceTabStatus] [int] NULL,
	[RiskTabStatus] [int] NULL,
	[StatusTabStatus] [int] NULL,
	[StrategyTabStatus] [int] NULL,
	[CatalystChemicalsCost] [decimal](18, 5) NULL,
	[LabourCost] [decimal](18, 5) NULL,
	[MaintenanceCost] [decimal](18, 5) NULL,
	[ResidualValue] [decimal](18, 5) NULL,
	[UtilitiesCost] [decimal](18, 5) NULL,
	[UseIrrCalculate] [bit] NULL,
	[AnnualLikelihood] [nvarchar](max) NULL,
	[AnnualLikelihoodRatio] [decimal](18, 5) NULL,
	[BaseRisk] [decimal](18, 5) NULL,
	[Consequence] [nvarchar](100) NULL,
	[EconomicBenefits] [decimal](18, 5) NULL,
	[EconomicPenalties] [decimal](18, 5) NULL,
	[Effectiveness] [nvarchar](max) NULL,
	[EffectivenessRatio] [decimal](18, 5) NULL,
	[ExposureFactor] [nvarchar](max) NULL,
	[ExposureFactorRatio] [decimal](18, 5) NULL,
	[JustifiableCost] [decimal](18, 5) NULL,
	[Likelihood] [nvarchar](100) NULL,
	[OpexPenaltiesCost] [decimal](18, 5) NULL,
	[PotentialConCost] [decimal](18, 5) NULL,
	[Probability] [decimal](18, 5) NULL,
	[ProductionLoss] [decimal](18, 5) NULL,
	[RiskOfAlt] [decimal](18, 5) NULL,
	[RiskReduction] [decimal](18, 5) NULL,
	[DetailCimStrategyTabStatus] [int] NULL,
	[DetailCpiTabStatus] [int] NULL,
	[DetailMaxDimCapexTabStatus] [int] NULL,
	[DetailPimTabStatus] [int] NULL,
	[IsNextButtonClicked] [bit] NULL,
	[IsReviseFlow] [bit] NULL,
	[AppropriationNo] [nvarchar](100) NULL,
	[WBSNo] [nvarchar](100) NULL,
	[SurveyVersions] [int] NOT NULL,
 CONSTRAINT [PK_Initiatives] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Initiatives_Code_Name_Plant]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_Initiatives_Code_Name_Plant] ON [dbo].[Initiatives]
(
	[InitiativeCode] ASC,
	[Name] ASC,
	[Plant] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_Initiatives_13FEBAE560927B78EB099DA4211636BF]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_Initiatives_13FEBAE560927B78EB099DA4211636BF] ON [dbo].[Initiatives]
(
	[InitiativeType] ASC,
	[Status] ASC,
	[Company] ASC,
	[PoolType] ASC,
	[HistoryFlag] ASC
)
INCLUDE([InitiativeCode],[Name],[Stage]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_Initiatives_3AEED26CE2777EA5977E7B7F7862EE2D]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_Initiatives_3AEED26CE2777EA5977E7B7F7862EE2D] ON [dbo].[Initiatives]
(
	[HistoryFlag] ASC
)
INCLUDE([BudgetSource],[Company],[Cpi],[CreatedBy],[DirectCapex],[InitiativeCode],[InitiativeType],[Max],[Name],[Organization],[OwnerName],[RegisteringDate],[RequestCapex],[RequestProjectEngineer],[Stage],[Status],[Strategy],[UpdatedDate]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_Initiatives_8444BEA5FC8D9A4916E9BFDB68748EED]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_Initiatives_8444BEA5FC8D9A4916E9BFDB68748EED] ON [dbo].[Initiatives]
(
	[Status] ASC,
	[HistoryFlag] ASC
)
INCLUDE([Company],[CreatedBy],[InitiativeCode],[InitiativeType],[Name],[Organization],[OwnerName],[RegisteringDate],[Stage],[UpdatedDate]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_Initiatives_AEA2D0AA8C679AFC68FAFB7A2539D21D]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_Initiatives_AEA2D0AA8C679AFC68FAFB7A2539D21D] ON [dbo].[Initiatives]
(
	[Stage] ASC,
	[HistoryFlag] ASC
)
INCLUDE([BenefitAmount],[Company],[CreatedBy],[InitiativeCode],[InitiativeType],[Name],[Organization],[OwnerName],[RegisteringDate],[Status],[UpdatedDate]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_Initiatives_D57902C956E883F72DE8BB504074E5BD]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_Initiatives_D57902C956E883F72DE8BB504074E5BD] ON [dbo].[Initiatives]
(
	[InitiativeType] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Initiatives] ADD  DEFAULT ((0)) FOR [isSetInitiativeSubType]
GO
ALTER TABLE [dbo].[Initiatives] ADD  DEFAULT ((0)) FOR [SurveyVersions]
GO

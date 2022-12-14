/****** Object:  Table [dbo].[InitiativeDetails]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StrategicObjective] [nvarchar](500) NULL,
	[StrategyDetail] [nvarchar](500) NULL,
	[EntryMode] [nvarchar](500) NULL,
	[HaveProduct] [nvarchar](max) NULL,
	[FX] [nvarchar](500) NULL,
	[FxChoice] [nvarchar](10) NULL,
	[ShareOfInvestment] [decimal](18, 2) NULL,
	[FirstBudgetYear] [nvarchar](10) NULL,
	[Note] [nvarchar](max) NULL,
	[InitiativeId] [int] NOT NULL,
	[BOD1] [datetime2](7) NULL,
	[BOD2] [datetime2](7) NULL,
	[Irr] [decimal](18, 2) NULL,
	[Npv] [decimal](18, 2) NULL,
	[RequireBOD1] [bit] NOT NULL,
	[Specify] [nvarchar](max) NULL,
	[Manager] [nvarchar](max) NULL,
	[President] [nvarchar](100) NULL,
	[BaseCase] [nvarchar](max) NULL,
	[BusinessModel] [nvarchar](max) NULL,
	[Comparison] [nvarchar](max) NULL,
	[CorporateImageIndex] [nvarchar](max) NULL,
	[EbitdaBaseCase] [decimal](18, 2) NULL,
	[EbitdaOptimisticCase] [decimal](18, 2) NULL,
	[EbitdaPessimisticCase] [decimal](18, 2) NULL,
	[Entity] [nvarchar](max) NULL,
	[EntitySpecify] [nvarchar](max) NULL,
	[Geography] [nvarchar](max) NULL,
	[GeographySpecify] [nvarchar](max) NULL,
	[KeySuccessFactor] [nvarchar](max) NULL,
	[ListOfEquipment] [nvarchar](max) NULL,
	[MarketOverview] [nvarchar](max) NULL,
	[MgrOfProcessEngineer] [nvarchar](100) NULL,
	[NpvBaseCase] [decimal](18, 2) NULL,
	[NpvOptimisticCase] [decimal](18, 2) NULL,
	[NpvPessimisticCase] [decimal](18, 2) NULL,
	[OptimisticCase] [nvarchar](max) NULL,
	[OtherBusiness] [nvarchar](max) NULL,
	[OtherInvestment] [nvarchar](max) NULL,
	[OtherQuality] [nvarchar](max) NULL,
	[OthersStrategic] [nvarchar](max) NULL,
	[PaybackBaseCase] [decimal](18, 2) NULL,
	[PaybackOptimisticCase] [decimal](18, 2) NULL,
	[PaybackPessimisticCase] [decimal](18, 2) NULL,
	[PessimisticCase] [nvarchar](max) NULL,
	[PotentialCustomer] [nvarchar](max) NULL,
	[ProcessEngineer] [nvarchar](100) NULL,
	[ProductionProcess] [nvarchar](100) NULL,
	[ProjectDirector] [nvarchar](100) NULL,
	[ProjectEngineer] [nvarchar](100) NULL,
	[ProjectIrrBaseCase] [decimal](18, 2) NULL,
	[ProjectIrrOptimisticCase] [decimal](18, 2) NULL,
	[ProjectIrrPessimisticCase] [decimal](18, 2) NULL,
	[ProjectManager] [nvarchar](100) NULL,
	[RequireProject] [bit] NULL,
	[SafetyIndex] [nvarchar](max) NULL,
	[SalesPlan] [nvarchar](max) NULL,
	[SourceOfFeedback] [nvarchar](max) NULL,
	[SynergyBenefit] [nvarchar](max) NULL,
	[ProgressStatus] [nvarchar](max) NULL,
	[ProgressUpdate] [nvarchar](max) NULL,
 CONSTRAINT [PK_InitiativeDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_InitiativeDetails_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_InitiativeDetails_InitiativeId] ON [dbo].[InitiativeDetails]
(
	[InitiativeId] ASC,
	[President] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[InitiativeDetails] ADD  DEFAULT (CONVERT([bit],(0))) FOR [RequireBOD1]
GO
ALTER TABLE [dbo].[InitiativeDetails]  WITH CHECK ADD  CONSTRAINT [FK_InitiativeDetails_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[InitiativeDetails] CHECK CONSTRAINT [FK_InitiativeDetails_Initiatives_InitiativeId]
GO

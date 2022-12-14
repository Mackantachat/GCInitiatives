/****** Object:  Table [dbo].[ProgressHeader]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgressHeader](
	[ProgressHeaderId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[AppropriationNo] [nvarchar](100) NULL,
	[WbsNo] [nvarchar](100) NULL,
	[StandardProjectDef] [nvarchar](100) NULL,
	[Responsible] [nvarchar](100) NULL,
	[SolomonCategory] [nvarchar](100) NULL,
	[AreaPlant] [nvarchar](100) NULL,
	[PhysicalBu] [nvarchar](100) NULL,
	[PhysicalUnit] [nvarchar](100) NULL,
	[CommissioningStartup] [nvarchar](100) NULL,
	[Construction] [nvarchar](100) NULL,
	[Engineering] [nvarchar](100) NULL,
	[EnvironmentKpi] [nvarchar](100) NULL,
	[ExecutiveSummary] [nvarchar](100) NULL,
	[MitigationPlan] [nvarchar](100) NULL,
	[Procurement] [nvarchar](100) NULL,
	[ProjectManagement] [nvarchar](100) NULL,
	[RiskAndConcern] [nvarchar](100) NULL,
	[WorkForNextMonth] [nvarchar](100) NULL,
	[IsSendAppRequest] [bit] NULL,
	[IsSendWBS] [bit] NULL,
 CONSTRAINT [PK_ProgressHeader] PRIMARY KEY CLUSTERED 
(
	[ProgressHeaderId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_ProgressHeader_WbsNoAppNo]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_ProgressHeader_WbsNoAppNo] ON [dbo].[ProgressHeader]
(
	[WbsNo] ASC,
	[AppropriationNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_ProgressHeader_D573A4ED8B39FFC4CF1166F0DB7B2630]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_ProgressHeader_D573A4ED8B39FFC4CF1166F0DB7B2630] ON [dbo].[ProgressHeader]
(
	[InitiativeId] ASC
)
INCLUDE([AppropriationNo],[AreaPlant],[CommissioningStartup],[Construction],[Engineering],[EnvironmentKpi],[ExecutiveSummary],[IsSendAppRequest],[IsSendWBS],[MitigationPlan],[PhysicalBu],[PhysicalUnit],[Procurement],[ProjectManagement],[Responsible],[RiskAndConcern],[SolomonCategory],[StandardProjectDef],[WbsNo],[WorkForNextMonth]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

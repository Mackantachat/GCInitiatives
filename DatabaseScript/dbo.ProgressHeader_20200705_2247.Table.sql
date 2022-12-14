/****** Object:  Table [dbo].[ProgressHeader_20200705_2247]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgressHeader_20200705_2247](
	[ProgressHeaderId] [int] NOT NULL,
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
 CONSTRAINT [PK_ProgressHeader_20200705_2247] PRIMARY KEY CLUSTERED 
(
	[ProgressHeaderId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

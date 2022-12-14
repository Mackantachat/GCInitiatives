/****** Object:  Table [dbo].[ProgressHeader_2021_05_25]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgressHeader_2021_05_25](
	[ProgressHeaderId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[AppropriationNo] [nvarchar](max) NULL,
	[WbsNo] [nvarchar](max) NULL,
	[StandardProjectDef] [nvarchar](max) NULL,
	[Responsible] [nvarchar](max) NULL,
	[SolomonCategory] [nvarchar](max) NULL,
	[AreaPlant] [nvarchar](max) NULL,
	[PhysicalBu] [nvarchar](max) NULL,
	[PhysicalUnit] [nvarchar](max) NULL,
	[CommissioningStartup] [nvarchar](max) NULL,
	[Construction] [nvarchar](max) NULL,
	[Engineering] [nvarchar](max) NULL,
	[EnvironmentKpi] [nvarchar](max) NULL,
	[ExecutiveSummary] [nvarchar](max) NULL,
	[MitigationPlan] [nvarchar](max) NULL,
	[Procurement] [nvarchar](max) NULL,
	[ProjectManagement] [nvarchar](max) NULL,
	[RiskAndConcern] [nvarchar](max) NULL,
	[WorkForNextMonth] [nvarchar](max) NULL,
	[IsSendAppRequest] [bit] NULL,
	[IsSendWBS] [bit] NULL,
 CONSTRAINT [PK_ProgressHeader_2021_05_25] PRIMARY KEY CLUSTERED 
(
	[ProgressHeaderId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

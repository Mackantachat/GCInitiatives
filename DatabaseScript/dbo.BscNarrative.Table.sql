/****** Object:  Table [dbo].[BscNarrative]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BscNarrative](
	[BscNarrativeId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[Year] [int] NULL,
	[Month] [int] NULL,
	[Engineering] [nvarchar](max) NULL,
	[Construction] [nvarchar](max) NULL,
	[Procurement] [nvarchar](max) NULL,
	[CommissioningStartup] [nvarchar](max) NULL,
	[ProjectManagement] [nvarchar](max) NULL,
	[RiskAndConcern] [nvarchar](max) NULL,
	[MitigationPlan] [nvarchar](max) NULL,
	[ExecutiveSummary] [nvarchar](max) NULL,
	[WorkForNextMonth] [nvarchar](max) NULL,
	[EnvironmentKpi] [nvarchar](max) NULL,
	[HighlightWork] [nvarchar](max) NULL,
	[CatchupPlan] [nvarchar](max) NULL,
	[NarrativeStatus] [nvarchar](max) NULL,
 CONSTRAINT [PK_BscNarrative] PRIMARY KEY CLUSTERED 
(
	[BscNarrativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

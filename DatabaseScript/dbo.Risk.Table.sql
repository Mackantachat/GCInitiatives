/****** Object:  Table [dbo].[Risk]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Risk](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[RegisterDate] [datetime2](7) NULL,
	[ApprovePeriod] [datetime2](7) NULL,
	[Description] [nvarchar](max) NULL,
	[RiskFactor] [nvarchar](max) NULL,
	[Phase] [nvarchar](max) NULL,
	[ExitingControl] [nvarchar](max) NULL,
	[ImpactExitingControl] [nvarchar](max) NULL,
	[LikelihoodExitingControl] [nvarchar](max) NULL,
	[RiskLevelExitingControl] [nvarchar](max) NULL,
	[MitigationPlan] [nvarchar](max) NULL,
	[ImpactMitigationPlan] [nvarchar](max) NULL,
	[LikelihoodMitigationPlan] [nvarchar](max) NULL,
	[RiskLevelMitigationPlan] [nvarchar](max) NULL,
	[MitigationProgress] [nvarchar](max) NULL,
	[MitigationProgressImpact] [nvarchar](max) NULL,
	[MitigationProgressLikelihood] [nvarchar](max) NULL,
	[RiskLevelMitigationProgress] [nvarchar](max) NULL,
 CONSTRAINT [PK_Risk] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

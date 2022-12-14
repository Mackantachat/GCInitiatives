/****** Object:  Table [dbo].[ProjectLookback]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectLookback](
	[FinishingDate] [datetime2](7) NULL,
	[PlanLookbackDate] [datetime2](7) NULL,
	[PlanEnviLookBackDate] [datetime2](7) NULL,
	[PlanPerformanceLookbackDate] [datetime2](7) NULL,
	[ProjectBackground] [nvarchar](max) NULL,
	[ScopeOfInitiative] [nvarchar](max) NULL,
	[ProjectObjective] [nvarchar](max) NULL,
	[ExecutionLookback] [bit] NULL,
	[PerformanceLookback] [bit] NULL,
	[EnvironmentLookback] [bit] NULL,
	[CimLookback] [bit] NULL,
	[PerformancePlanLookbackDate] [datetime2](7) NULL,
	[CoreUpliftResultDescription] [nvarchar](max) NULL,
	[CoreUpliftResultUnit] [nvarchar](max) NULL,
	[CoreUpliftResultBefore] [nvarchar](max) NULL,
	[CoreUpliftResultAfter] [nvarchar](max) NULL,
	[CoreUpliftResultBenefit] [nvarchar](max) NULL,
	[CoreUpliftResultRating] [nvarchar](max) NULL,
	[EnviPlanLookbackDate] [datetime2](7) NULL,
	[PollutionPrevention] [nvarchar](max) NULL,
	[PollutionPreventionSpecify] [nvarchar](max) NULL,
	[GlobalEnvirCons] [nvarchar](max) NULL,
	[GlobalEnvirConsSpecify] [nvarchar](max) NULL,
	[ResourceCirculation] [nvarchar](max) NULL,
	[ResourceCirculationSpecify] [nvarchar](max) NULL,
	[EnvironmentResultCategory] [nvarchar](max) NULL,
	[EnvironmentResultUnit] [nvarchar](max) NULL,
	[EnvironmentResultBefore] [nvarchar](max) NULL,
	[EnvironmentResultAfter] [nvarchar](max) NULL,
	[EnvironmentResultBenefitYear] [nvarchar](max) NULL,
	[EnvironmentResultBenefitYearThb] [nvarchar](max) NULL,
	[EnvironmentResultRemark] [nvarchar](max) NULL,
	[McEndorseDate] [datetime2](7) NULL,
	[BusinessPlanAsOfDate] [datetime2](7) NULL,
	[BusinessPlanAsOfDate2] [datetime2](7) NULL,
	[InitiativeId] [int] NOT NULL,
	[ProjectLookbackId] [int] IDENTITY(1,1) NOT NULL,
	[ShowEnvironmentLookback] [bit] NOT NULL,
	[ShowPerformanceLookback] [bit] NOT NULL,
	[ResponsibleEnvirEngineer] [nvarchar](max) NULL,
	[LocalEnvironmentEngineer] [nvarchar](max) NULL,
	[LookbackFocalPointPerson] [nvarchar](max) NULL,
	[PerformanceLookbackPerson] [nvarchar](max) NULL,
 CONSTRAINT [PK_ProjectLookback] PRIMARY KEY CLUSTERED 
(
	[ProjectLookbackId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ProjectLookback] ADD  DEFAULT ((0)) FOR [InitiativeId]
GO
ALTER TABLE [dbo].[ProjectLookback] ADD  DEFAULT (CONVERT([bit],(0))) FOR [ShowEnvironmentLookback]
GO
ALTER TABLE [dbo].[ProjectLookback] ADD  DEFAULT (CONVERT([bit],(0))) FOR [ShowPerformanceLookback]
GO

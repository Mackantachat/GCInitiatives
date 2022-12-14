/****** Object:  Table [dbo].[ZZ_TbTxnNarative]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnNarative](
	[ProjectID] [int] NOT NULL,
	[Period] [nvarchar](50) NULL,
	[HighlightWork] [nvarchar](max) NULL,
	[HWProjectManagement] [nvarchar](max) NULL,
	[HWEngineering] [nvarchar](max) NULL,
	[HWProcurement] [nvarchar](max) NULL,
	[HWConstruction] [nvarchar](max) NULL,
	[HWCommissioning] [nvarchar](max) NULL,
	[Summary] [nvarchar](max) NULL,
	[RiskConcern] [nvarchar](max) NULL,
	[Achievement] [nvarchar](max) NULL,
	[MitigationPlan] [nvarchar](max) NULL,
	[PlanNextMonth] [nvarchar](max) NULL,
	[WorkForNextMonth] [nvarchar](max) NULL,
	[AreaOfConcern] [nvarchar](max) NULL,
	[HighlightWorkPlain] [nvarchar](max) NULL,
	[HWProjectManagementPlain] [nvarchar](max) NULL,
	[HWEngineeringPlain] [nvarchar](max) NULL,
	[HWProcurementPlain] [nvarchar](max) NULL,
	[HWConstructionPlain] [nvarchar](max) NULL,
	[HWCommissioningPlain] [nvarchar](max) NULL,
	[SummaryPlain] [nvarchar](max) NULL,
	[RiskConcernPlain] [nvarchar](max) NULL,
	[AchievementPlain] [nvarchar](max) NULL,
	[MitigationPlanPlain] [nvarchar](max) NULL,
	[PlanNextMonthPlain] [nvarchar](max) NULL,
	[WorkForNextMonthPlain] [nvarchar](max) NULL,
	[AreaOfConcernPlain] [nvarchar](max) NULL,
	[ModifiedDate] [smalldatetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

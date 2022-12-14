/****** Object:  Table [dbo].[Z_temp_migrate_PIM]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Z_temp_migrate_PIM](
	[No] [nvarchar](100) NULL,
	[BudgetType] [nvarchar](max) NULL,
	[IdeaMANINo] [nvarchar](max) NULL,
	[ProjectId] [nvarchar](max) NULL,
	[ProjectName] [nvarchar](max) NULL,
	[eMOCNo] [nvarchar](max) NULL,
	[ProjectStatus] [nvarchar](max) NULL,
	[GateStatus] [nvarchar](max) NULL,
	[Phase] [nvarchar](max) NULL,
	[Process] [nvarchar](max) NULL,
	[ProjectMax] [nvarchar](max) NULL,
	[ScopeOfProject] [nvarchar](max) NULL,
	[Objective] [nvarchar](max) NULL,
	[ProjectEngineer] [nvarchar](max) NULL,
	[Indicator] [nvarchar](max) NULL,
	[ProjectManager] [nvarchar](max) NULL,
	[InvestmentTypeName] [nvarchar](max) NULL,
	[ProjectTypeName] [nvarchar](max) NULL,
	[PriorityName] [nvarchar](max) NULL,
	[CompanyName] [nvarchar](max) NULL,
	[BusinessUnitName] [nvarchar](max) NULL,
	[Plant] [nvarchar](max) NULL,
	[UnitNo] [nvarchar](max) NULL,
	[RegisteredDate] [nvarchar](max) NULL,
	[KickoffDate] [nvarchar](max) NULL,
	[Initiator] [nvarchar](max) NULL,
	[Approver] [nvarchar](max) NULL,
	[JFactor] [nvarchar](max) NULL,
	[SimpPaybackYear] [nvarchar](max) NULL,
	[IRR] [nvarchar](max) NULL,
	[EstimateCost] [nvarchar](max) NULL,
	[PlanDateToComplete] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

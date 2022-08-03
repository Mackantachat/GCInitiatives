/****** Object:  Table [dbo].[ZZ_TbTxnProjectInfoHistory]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectInfoHistory](
	[ProjectID] [int] NOT NULL,
	[ProfileID] [int] NULL,
	[ProjectNo] [nvarchar](255) NULL,
	[ProjectName] [nvarchar](255) NULL,
	[BudgetOwner] [nvarchar](255) NULL,
	[BudgetOwnerDisp] [nvarchar](255) NULL,
	[BudgetOwnerDept] [nvarchar](255) NULL,
	[ProjectOwner] [nvarchar](255) NULL,
	[ProjectOwnerDisp] [nvarchar](255) NULL,
	[ProjectOwnerDept] [nvarchar](255) NULL,
	[ProjectManager] [nvarchar](255) NULL,
	[ProjectManagerDisp] [nvarchar](255) NULL,
	[ProjectManagerDept] [nvarchar](255) NULL,
	[ProjectEngineer] [nvarchar](255) NULL,
	[ProjectEngineerDisp] [nvarchar](255) NULL,
	[ProjectEngineerDept] [nvarchar](255) NULL,
	[Indicator] [nvarchar](255) NULL,
	[ProcessEng] [nvarchar](255) NULL,
	[ProcessEngDisp] [nvarchar](255) NULL,
	[ProcessEngDept] [nvarchar](255) NULL,
	[ProjectEngDivManager] [nvarchar](255) NULL,
	[ProjectEngDivManagerDisp] [nvarchar](255) NULL,
	[ProjectEngDivManagerDept] [nvarchar](255) NULL,
	[ProjectCtrl] [nvarchar](255) NULL,
	[ProjectCtrlDisp] [nvarchar](255) NULL,
	[ProjectCtrlDept] [nvarchar](255) NULL,
	[CompanyID] [int] NULL,
	[EVPID] [int] NULL,
	[PlantID] [int] NULL,
	[CountryCode] [nvarchar](50) NULL,
	[CurrencyID] [int] NULL,
	[ProjectTypeID] [int] NULL,
	[PSRProjectTypeID] [int] NULL,
	[EROwnerID] [int] NULL,
	[PlanDateToComplete] [datetime] NULL,
	[ForecastDateToComplete] [datetime] NULL,
	[ActualDateToComplete] [datetime] NULL,
	[ScopeOfProject] [nvarchar](4000) NULL,
	[Background] [nvarchar](4000) NULL,
	[Objective] [nvarchar](4000) NULL,
	[EstimateCost] [decimal](18, 2) NULL,
	[ApprovalBudget] [decimal](18, 2) NULL,
	[ProjectStatusID] [int] NULL,
	[IsShowInDashboard] [bit] NULL,
	[PSRForm] [nvarchar](1000) NULL,
	[PDD] [nvarchar](1000) NULL,
	[IsProjectMax] [bit] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_ProjectInfoHistory] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

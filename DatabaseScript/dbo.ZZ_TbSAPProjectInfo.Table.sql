/****** Object:  Table [dbo].[ZZ_TbSAPProjectInfo]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbSAPProjectInfo](
	[ProjectID] [int] NOT NULL,
	[ProjectDefiniton] [nvarchar](255) NULL,
	[ProjectName] [nvarchar](255) NULL,
	[BudgetOwner] [nvarchar](255) NULL,
	[BudgetOwnerDisp] [nvarchar](255) NULL,
	[BudgetOwnerDept] [nvarchar](255) NULL,
	[ProjectEngineer] [nvarchar](255) NULL,
	[ProjectEngineerDisp] [nvarchar](255) NULL,
	[ProjectEngineerDept] [nvarchar](255) NULL,
	[CompanyID] [int] NULL,
	[EVPID] [int] NULL,
	[PlantID] [int] NULL,
	[CountryCode] [nvarchar](50) NULL,
	[CurrencyID] [int] NULL,
	[ProjectTypeID] [int] NULL,
	[EMOCNo] [nvarchar](255) NULL,
	[ProjectNoAppr] [nvarchar](50) NULL,
	[PlanDateToStart] [datetime] NULL,
	[PlanDateToComplete] [datetime] NULL,
	[ForecastDateToStart] [datetime] NULL,
	[ForecastDateToComplete] [datetime] NULL,
	[ActualDateToStart] [datetime] NULL,
	[ActualDateToComplete] [datetime] NULL,
	[CommercialRunDate] [datetime] NULL,
	[ApprovalBudget] [decimal](18, 2) NULL,
	[TECODate] [datetime] NULL,
	[CAPDate] [datetime] NULL,
	[ReleaseDate] [datetime] NULL,
	[DeleteDate] [datetime] NULL,
	[FlagForDeletionDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_TbSAPProjectInfo] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

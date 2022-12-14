/****** Object:  Table [dbo].[A]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[A](
	[InitiativeId] [int] NOT NULL,
	[StartingDate] [datetime2](7) NULL,
	[ProjecctComRun] [datetime2](7) NULL,
	[RequestIniNoDate] [datetime2](7) NULL,
	[ProjectExePeriodYear] [nvarchar](max) NULL,
	[ProjectExePeriodMonth] [nvarchar](max) NULL,
	[CostCenterOfVP] [nvarchar](max) NULL,
	[ProjectCost] [decimal](18, 2) NULL,
	[ReasonOfChanging] [nvarchar](max) NULL,
	[BetweenYear] [nvarchar](max) NULL,
	[TransferForm] [nvarchar](max) NULL,
	[PoolBudgetForm] [nvarchar](max) NULL,
	[SubmitTo] [nvarchar](max) NULL,
	[RequestPoolMAX] [bit] NULL,
	[CostCenter] [int] NULL,
	[BudgetPeriod] [nvarchar](max) NULL,
	[CodeCostCenterOfVP] [nvarchar](max) NULL,
	[AdditionalCost] [decimal](18, 2) NULL,
	[ActionYear] [datetime2](7) NULL,
	[CapexStatus] [nvarchar](max) NULL,
	[CapexType] [nvarchar](max) NULL,
	[IsMaxApprovedRev] [bit] NULL,
	[Revistion] [int] NULL,
	[Sequent] [int] NULL,
	[SpendingActual] [decimal](18, 2) NULL,
	[ExistingBudget] [decimal](18, 2) NULL,
	[BudgetYear] [nvarchar](max) NULL,
	[ReturnCost] [decimal](18, 2) NULL,
	[CarriedCost] [decimal](18, 2) NULL,
	[SpendingActualAllPrevious] [decimal](18, 2) NULL,
	[SpendingActualCurrentYear] [decimal](18, 2) NULL,
	[AvailableBudget] [decimal](18, 2) NULL,
	[PoolId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

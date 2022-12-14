/****** Object:  Table [dbo].[CapexInformations]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CapexInformations](
	[CapexInformationId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[StartingDate] [datetime2](7) NULL,
	[ProjecctComRun] [datetime2](7) NULL,
	[RequestIniNoDate] [datetime2](7) NULL,
	[ProjectExePeriodYear] [nvarchar](100) NULL,
	[ProjectExePeriodMonth] [nvarchar](100) NULL,
	[CostCenterOfVP] [nvarchar](100) NULL,
	[ProjectCost] [decimal](18, 2) NULL,
	[ReasonOfChanging] [nvarchar](max) NULL,
	[BetweenYear] [nvarchar](100) NULL,
	[TransferForm] [nvarchar](100) NULL,
	[PoolBudgetForm] [nvarchar](100) NULL,
	[SubmitTo] [nvarchar](100) NULL,
	[RequestPoolMAX] [bit] NULL,
	[CostCenter] [int] NULL,
	[BudgetPeriod] [nvarchar](100) NULL,
	[CodeCostCenterOfVP] [nvarchar](100) NULL,
	[AdditionalCost] [decimal](18, 2) NULL,
	[ActionYear] [datetime2](7) NULL,
	[CapexStatus] [nvarchar](100) NULL,
	[CapexType] [nvarchar](100) NULL,
	[IsMaxApprovedRev] [bit] NULL,
	[Revistion] [int] NULL,
	[Sequent] [int] NULL,
	[SpendingActual] [decimal](18, 2) NULL,
	[ExistingBudget] [decimal](18, 2) NULL,
	[BudgetYear] [nvarchar](100) NULL,
	[ReturnCost] [decimal](18, 2) NULL,
	[CarriedCost] [decimal](18, 2) NULL,
	[SpendingActualAllPrevious] [decimal](18, 2) NULL,
	[SpendingActualCurrentYear] [decimal](18, 2) NULL,
	[AvailableBudget] [decimal](18, 2) NULL,
	[PoolId] [int] NULL,
	[SubmittedDate] [datetime2](7) NULL,
 CONSTRAINT [PK_CapexInformations] PRIMARY KEY CLUSTERED 
(
	[CapexInformationId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_CapexInformations_71603424E17AC0C6E9C633CA783DB6DB]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_CapexInformations_71603424E17AC0C6E9C633CA783DB6DB] ON [dbo].[CapexInformations]
(
	[InitiativeId] ASC,
	[CapexType] ASC
)
INCLUDE([ActionYear],[AdditionalCost],[AvailableBudget],[BetweenYear],[BudgetPeriod],[BudgetYear],[CapexStatus],[CarriedCost],[CodeCostCenterOfVP],[CostCenter],[CostCenterOfVP],[ExistingBudget],[IsMaxApprovedRev],[PoolBudgetForm],[PoolId],[ProjecctComRun],[ProjectCost],[ProjectExePeriodMonth],[ProjectExePeriodYear],[ReasonOfChanging],[RequestIniNoDate],[RequestPoolMAX],[ReturnCost],[Revistion],[Sequent],[SpendingActual],[SpendingActualAllPrevious],[SpendingActualCurrentYear],[StartingDate],[SubmitTo],[TransferForm]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

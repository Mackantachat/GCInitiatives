/****** Object:  Table [dbo].[MonthlyInvestmentPlans]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MonthlyInvestmentPlans](
	[MonthlyInvestmentPlanId] [int] IDENTITY(1,1) NOT NULL,
	[AnnualInvestmentPlanId] [int] NOT NULL,
	[InvestmentCost] [nvarchar](max) NULL,
	[InvestmentCostFx] [decimal](18, 2) NULL,
	[Jan] [decimal](18, 2) NULL,
	[Feb] [decimal](18, 2) NULL,
	[Mar] [decimal](18, 2) NULL,
	[Apr] [decimal](18, 2) NULL,
	[May] [decimal](18, 2) NULL,
	[Jun] [decimal](18, 2) NULL,
	[Jul] [decimal](18, 2) NULL,
	[Aug] [decimal](18, 2) NULL,
	[Sep] [decimal](18, 2) NULL,
	[Oct] [decimal](18, 2) NULL,
	[Nov] [decimal](18, 2) NULL,
	[Dec] [decimal](18, 2) NULL,
	[MonthlyOverall] [decimal](18, 2) NULL,
	[InitiativeId] [int] NOT NULL,
	[YearOfMonth] [nvarchar](max) NULL,
	[CapexInformationId] [int] NULL,
	[SumMonthlyType] [nvarchar](max) NULL,
 CONSTRAINT [PK_MonthlyInvestmentPlans] PRIMARY KEY CLUSTERED 
(
	[MonthlyInvestmentPlanId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_MonthlyInvestmentPlans_EBD4463295F35771A78DE0FB37CEDE4B]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_MonthlyInvestmentPlans_EBD4463295F35771A78DE0FB37CEDE4B] ON [dbo].[MonthlyInvestmentPlans]
(
	[InitiativeId] ASC,
	[CapexInformationId] ASC
)
INCLUDE([Apr],[Aug],[Dec],[Feb],[Jan],[Jul],[Jun],[Mar],[May],[Nov],[Oct],[Sep],[YearOfMonth]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MonthlyInvestmentPlans] ADD  DEFAULT ((0)) FOR [InitiativeId]
GO

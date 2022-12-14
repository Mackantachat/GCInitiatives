/****** Object:  Table [dbo].[AnnualInvestmentPlans]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnnualInvestmentPlans](
	[AnnualInvestmentPlanId] [int] IDENTITY(1,1) NOT NULL,
	[CapexInformationId] [int] NOT NULL,
	[Year1] [decimal](18, 2) NULL,
	[Year2] [decimal](18, 2) NULL,
	[Year3] [decimal](18, 2) NULL,
	[Year4] [decimal](18, 2) NULL,
	[Year5] [decimal](18, 2) NULL,
	[Year6] [decimal](18, 2) NULL,
	[Year7] [decimal](18, 2) NULL,
	[Year8] [decimal](18, 2) NULL,
	[Year9] [decimal](18, 2) NULL,
	[Year10] [decimal](18, 2) NULL,
	[YearOverall] [decimal](18, 2) NULL,
	[InitiativeId] [int] NOT NULL,
	[CurrencyFx] [decimal](18, 2) NULL,
	[Currency] [nvarchar](max) NULL,
	[PlanType] [nvarchar](max) NULL,
 CONSTRAINT [PK_AnnualInvestmentPlans] PRIMARY KEY CLUSTERED 
(
	[AnnualInvestmentPlanId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_AnnualInvestmentPlans]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_AnnualInvestmentPlans] ON [dbo].[AnnualInvestmentPlans]
(
	[CapexInformationId] ASC,
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AnnualInvestmentPlans] ADD  DEFAULT ((0)) FOR [InitiativeId]
GO

/****** Object:  Table [dbo].[AnnualInvestmentPlans_backup 12092020]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnnualInvestmentPlans_backup 12092020](
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
	[PlanType] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

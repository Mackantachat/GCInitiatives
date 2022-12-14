/****** Object:  Table [dbo].[ZZ_TbTxnPlanBODCarried]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnPlanBODCarried](
	[TransactionDate] [nvarchar](255) NULL,
	[Year] [nvarchar](50) NOT NULL,
	[Version] [nvarchar](50) NOT NULL,
	[AppropriationRequestNo] [nvarchar](255) NOT NULL,
	[ProjectNo] [nvarchar](255) NULL,
	[CAPEXRequestOnlineNo] [nvarchar](255) NULL,
	[TotalBudget] [nvarchar](255) NULL,
	[AccumulateActual] [nvarchar](255) NULL,
	[CarriedBudget] [nvarchar](255) NULL,
	[EstJan] [nvarchar](255) NULL,
	[EstFeb] [nvarchar](255) NULL,
	[EstMar] [nvarchar](255) NULL,
	[EstApr] [nvarchar](255) NULL,
	[EstMay] [nvarchar](255) NULL,
	[EstJun] [nvarchar](255) NULL,
	[EstJul] [nvarchar](255) NULL,
	[EstAug] [nvarchar](255) NULL,
	[EstSep] [nvarchar](255) NULL,
	[EstOct] [nvarchar](255) NULL,
	[EstNov] [nvarchar](255) NULL,
	[EstDec] [nvarchar](255) NULL,
	[EstTotal] [nvarchar](255) NULL,
	[CurrentY1] [nvarchar](255) NULL,
	[CurrentY2] [nvarchar](255) NULL,
	[CurrentY3] [nvarchar](255) NULL,
	[CurrentY4] [nvarchar](255) NULL,
	[CurrentY5] [nvarchar](255) NULL,
	[CurrentY6] [nvarchar](255) NULL,
	[CurrentY7] [nvarchar](255) NULL,
	[CurrentY8] [nvarchar](255) NULL,
	[CurrentY9] [nvarchar](255) NULL,
	[CurrentY10] [nvarchar](255) NULL,
	[FutureRemainYear] [nvarchar](255) NULL,
	[PlanBODJan] [nvarchar](255) NULL,
	[PlanBODFeb] [nvarchar](255) NULL,
	[PlanBODMar] [nvarchar](255) NULL,
	[PlanBODApr] [nvarchar](255) NULL,
	[PlanBODMay] [nvarchar](255) NULL,
	[PlanBODJun] [nvarchar](255) NULL,
	[PlanBODJul] [nvarchar](255) NULL,
	[PlanBODAug] [nvarchar](255) NULL,
	[PlanBODSep] [nvarchar](255) NULL,
	[PlanBODOct] [nvarchar](255) NULL,
	[PlanBODNov] [nvarchar](255) NULL,
	[PlanBODDec] [nvarchar](255) NULL,
	[Currency] [nvarchar](255) NULL,
	[CurrencyType] [nvarchar](255) NULL,
 CONSTRAINT [PK_TbTxnPlanBODCarried] PRIMARY KEY CLUSTERED 
(
	[Year] ASC,
	[Version] ASC,
	[AppropriationRequestNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

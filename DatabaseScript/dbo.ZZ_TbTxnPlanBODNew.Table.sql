/****** Object:  Table [dbo].[ZZ_TbTxnPlanBODNew]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnPlanBODNew](
	[TransactionDate] [nvarchar](255) NULL,
	[Year] [nvarchar](50) NOT NULL,
	[Version] [nvarchar](50) NOT NULL,
	[AppropriationRequestNo] [nvarchar](255) NOT NULL,
	[CAPEXRequestOnlineNo] [nvarchar](255) NULL,
	[OriginalBudget] [nvarchar](255) NULL,
	[CurrentY0] [nvarchar](255) NULL,
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
 CONSTRAINT [PK_TbTxnPlanBODNew] PRIMARY KEY CLUSTERED 
(
	[Year] ASC,
	[Version] ASC,
	[AppropriationRequestNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

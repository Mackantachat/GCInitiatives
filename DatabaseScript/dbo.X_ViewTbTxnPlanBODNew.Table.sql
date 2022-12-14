/****** Object:  Table [dbo].[X_ViewTbTxnPlanBODNew]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_ViewTbTxnPlanBODNew](
	[TransactionDate] [nvarchar](max) NULL,
	[Year] [nvarchar](max) NULL,
	[Version] [nvarchar](max) NULL,
	[AppropriationRequestNo] [nvarchar](max) NULL,
	[CAPEXRequestOnlineNo] [nvarchar](max) NULL,
	[OriginalBudget] [nvarchar](max) NULL,
	[CurrentY0] [nvarchar](max) NULL,
	[CurrentY1] [nvarchar](max) NULL,
	[CurrentY2] [nvarchar](max) NULL,
	[CurrentY3] [nvarchar](max) NULL,
	[CurrentY4] [nvarchar](max) NULL,
	[CurrentY5] [nvarchar](max) NULL,
	[CurrentY6] [nvarchar](max) NULL,
	[CurrentY7] [nvarchar](max) NULL,
	[CurrentY8] [nvarchar](max) NULL,
	[CurrentY10] [nvarchar](max) NULL,
	[CurrentY9] [nvarchar](max) NULL,
	[FutureRemainYear] [nvarchar](max) NULL,
	[PlanBODJan] [nvarchar](max) NULL,
	[PlanBODMar] [nvarchar](max) NULL,
	[PlanBODApr] [nvarchar](max) NULL,
	[PlanBODFeb] [nvarchar](max) NULL,
	[PlanBODMay] [nvarchar](max) NULL,
	[PlanBODJun] [nvarchar](max) NULL,
	[PlanBODJul] [nvarchar](max) NULL,
	[PlanBODAug] [nvarchar](max) NULL,
	[PlanBODSep] [nvarchar](max) NULL,
	[PlanBODNov] [nvarchar](max) NULL,
	[PlanBODOct] [nvarchar](max) NULL,
	[PlanBODDec] [nvarchar](max) NULL,
	[Currency] [nvarchar](max) NULL,
	[CurrencyType] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

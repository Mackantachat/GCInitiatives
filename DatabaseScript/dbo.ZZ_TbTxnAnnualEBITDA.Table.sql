/****** Object:  Table [dbo].[ZZ_TbTxnAnnualEBITDA]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnAnnualEBITDA](
	[ProjectId] [int] NOT NULL,
	[EbitdaYear] [int] NOT NULL,
	[ExpectedGain] [nvarchar](1000) NULL,
	[ExpectedStatus] [nvarchar](1000) NULL,
	[KPI] [bit] NOT NULL,
	[Annualized] [float] NULL,
	[TargetJan] [float] NULL,
	[TargetFeb] [float] NULL,
	[TargetMar] [float] NULL,
	[TargetApr] [float] NULL,
	[TargetMay] [float] NULL,
	[TargetJun] [float] NULL,
	[TargetJul] [float] NULL,
	[TargetAug] [float] NULL,
	[TargetSep] [float] NULL,
	[TargetOct] [float] NULL,
	[TargetNov] [float] NULL,
	[TargetDec] [float] NULL,
	[ActualJan] [float] NULL,
	[ActualFeb] [float] NULL,
	[ActualMar] [float] NULL,
	[ActualApr] [float] NULL,
	[ActualMay] [float] NULL,
	[ActualJun] [float] NULL,
	[ActualJul] [float] NULL,
	[ActualAug] [float] NULL,
	[ActualSep] [float] NULL,
	[ActualOct] [float] NULL,
	[ActualNov] [float] NULL,
	[ActualDec] [float] NULL
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ZZZZ_TempNPV]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZZZ_TempNPV](
	[InitiativeCode] [varchar](100) NULL,
	[BaseCase] [varchar](100) NULL,
	[NpvBaseCase] [decimal](18, 4) NULL,
	[PaybackBaseCase] [decimal](18, 4) NULL,
	[EbitdaBaseCase] [decimal](18, 4) NULL,
	[UsefulMonth] [decimal](18, 4) NULL,
	[UsefulYear] [decimal](18, 4) NULL
) ON [PRIMARY]
GO

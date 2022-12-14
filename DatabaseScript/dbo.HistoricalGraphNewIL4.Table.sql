/****** Object:  Table [dbo].[HistoricalGraphNewIL4]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoricalGraphNewIL4](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Year] [int] NULL,
	[Week] [int] NULL,
	[IL4] [decimal](18, 3) NULL,
	[SIL4] [decimal](18, 3) NULL,
	[IL3] [decimal](18, 3) NULL,
	[IL0_IL2] [decimal](18, 3) NULL,
	[CLevel] [nvarchar](150) NULL
) ON [PRIMARY]
GO

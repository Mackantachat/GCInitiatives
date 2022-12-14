/****** Object:  Table [dbo].[HistoricalGraphIL5Achievement]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoricalGraphIL5Achievement](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Year] [int] NULL,
	[Week] [int] NULL,
	[IL5] [decimal](18, 3) NULL,
	[SIL5] [decimal](18, 3) NULL,
	[UnconvertedIL4] [decimal](18, 3) NULL,
	[CLevel] [nvarchar](150) NULL
) ON [PRIMARY]
GO

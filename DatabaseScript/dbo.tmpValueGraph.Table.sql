/****** Object:  Table [dbo].[tmpValueGraph]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tmpValueGraph](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ValueType] [varchar](150) NULL,
	[Value] [decimal](18, 3) NULL,
	[Week] [int] NULL
) ON [PRIMARY]
GO

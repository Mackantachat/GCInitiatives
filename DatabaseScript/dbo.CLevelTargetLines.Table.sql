/****** Object:  Table [dbo].[CLevelTargetLines]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CLevelTargetLines](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CLevel] [nvarchar](200) NULL,
	[Year] [nvarchar](4) NULL,
	[Target] [decimal](18, 2) NULL,
	[StageType] [nvarchar](200) NULL,
 CONSTRAINT [PK_CLevelTargetLines] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[BlankablePlans]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BlankablePlans](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Week] [int] NOT NULL,
	[CLevel] [nvarchar](200) NULL,
	[Year] [nvarchar](4) NULL,
	[StageType] [nvarchar](200) NULL,
	[BlankableValue] [decimal](18, 2) NULL,
 CONSTRAINT [PK_BlankablePlans] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[KriDetailMonth]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KriDetailMonth](
	[KriDetailMonthId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[Year] [nvarchar](4) NULL,
	[KriType] [nvarchar](20) NULL,
	[KriDetail] [nvarchar](max) NULL,
	[JanScore] [int] NULL,
	[JanColor] [nvarchar](max) NULL,
	[FebScore] [int] NULL,
	[FebColor] [nvarchar](max) NULL,
	[MarScore] [int] NULL,
	[MarColor] [nvarchar](max) NULL,
	[AprScore] [int] NULL,
	[AprColor] [nvarchar](max) NULL,
	[MayScore] [int] NULL,
	[MayColor] [nvarchar](max) NULL,
	[JunScore] [int] NULL,
	[JunColor] [nvarchar](max) NULL,
	[JulScore] [int] NULL,
	[JulColor] [nvarchar](max) NULL,
	[AugScore] [int] NULL,
	[AugColor] [nvarchar](max) NULL,
	[SepScore] [int] NULL,
	[SepColor] [nvarchar](max) NULL,
	[OctScore] [int] NULL,
	[OctColor] [nvarchar](max) NULL,
	[NovScore] [int] NULL,
	[NovColor] [nvarchar](max) NULL,
	[DecScore] [int] NULL,
	[DecColor] [nvarchar](max) NULL,
	[KriOrder] [int] NULL,
	[ExecutionKri] [nvarchar](max) NULL,
	[IsAction] [bit] NULL,
	[Target1] [nvarchar](max) NULL,
	[Target2] [nvarchar](max) NULL,
	[Target3] [nvarchar](max) NULL,
	[KpiMaintainId] [int] NULL,
 CONSTRAINT [PK_KriDetailMonth] PRIMARY KEY CLUSTERED 
(
	[KriDetailMonthId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[MaintainKpi]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaintainKpi](
	[KpiMaintainId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[KpiName] [nvarchar](max) NULL,
	[ScoreText1] [nvarchar](max) NULL,
	[ScoreLevel1] [int] NULL,
	[ScoreText2] [nvarchar](max) NULL,
	[ScoreLevel2] [int] NULL,
	[ScoreText3] [nvarchar](max) NULL,
	[ScoreLevel3] [int] NULL,
	[ScoreText4] [nvarchar](max) NULL,
	[ScoreLevel4] [int] NULL,
	[ScoreText5] [nvarchar](max) NULL,
	[ScoreLevel5] [int] NULL,
	[Year] [nvarchar](4) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_MaintainKpi] PRIMARY KEY CLUSTERED 
(
	[KpiMaintainId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

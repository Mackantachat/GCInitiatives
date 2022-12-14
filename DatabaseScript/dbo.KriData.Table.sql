/****** Object:  Table [dbo].[KriData]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KriData](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[Year] [int] NOT NULL,
	[KriSequence] [int] NOT NULL,
	[KriName] [nvarchar](max) NULL,
	[No] [int] NOT NULL,
	[KriText] [nvarchar](max) NULL,
	[Target1] [nvarchar](max) NULL,
	[Target2] [nvarchar](max) NULL,
	[Target3] [nvarchar](max) NULL,
	[KriScoreMonth1] [int] NOT NULL,
	[KriScoreMonth2] [int] NOT NULL,
	[KriScoreMonth3] [int] NOT NULL,
	[KriScoreMonth4] [int] NOT NULL,
	[KriScoreMonth5] [int] NOT NULL,
	[KriScoreMonth6] [int] NOT NULL,
	[KriScoreMonth7] [int] NOT NULL,
	[KriScoreMonth8] [int] NOT NULL,
	[KriScoreMonth9] [int] NOT NULL,
	[KriScoreMonth10] [int] NOT NULL,
	[KriScoreMonth11] [int] NOT NULL,
	[KriScoreMonth12] [int] NOT NULL,
 CONSTRAINT [PK_KriData] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

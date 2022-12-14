/****** Object:  Table [dbo].[KriProgressDetails]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KriProgressDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[Year] [int] NOT NULL,
	[ProgressDetailMonth1] [nvarchar](max) NULL,
	[ProgressDetailMonth2] [nvarchar](max) NULL,
	[ProgressDetailMonth3] [nvarchar](max) NULL,
	[ProgressDetailMonth4] [nvarchar](max) NULL,
	[ProgressDetailMonth5] [nvarchar](max) NULL,
	[ProgressDetailMonth6] [nvarchar](max) NULL,
	[ProgressDetailMonth7] [nvarchar](max) NULL,
	[ProgressDetailMonth8] [nvarchar](max) NULL,
	[ProgressDetailMonth9] [nvarchar](max) NULL,
	[ProgressDetailMonth10] [nvarchar](max) NULL,
	[ProgressDetailMonth11] [nvarchar](max) NULL,
	[ProgressDetailMonth12] [nvarchar](max) NULL,
 CONSTRAINT [PK_KriProgressDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[CpiKpis]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CpiKpis](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[Baseline] [nvarchar](max) NULL,
	[Target] [nvarchar](max) NULL,
	[Unit] [nvarchar](max) NULL,
	[Remark] [nvarchar](500) NULL,
	[KpiTitle] [nvarchar](500) NULL,
 CONSTRAINT [PK_CpiKpis] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

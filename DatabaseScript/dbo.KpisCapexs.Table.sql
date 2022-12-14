/****** Object:  Table [dbo].[KpisCapexs]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KpisCapexs](
	[KpisCapexId] [int] IDENTITY(1,1) NOT NULL,
	[DetailCapexId] [int] NOT NULL,
	[Kpis] [nvarchar](max) NULL,
	[Target] [nvarchar](max) NULL,
	[Frequency] [nvarchar](max) NULL,
 CONSTRAINT [PK_KpisCapexs] PRIMARY KEY CLUSTERED 
(
	[KpisCapexId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ZZ_TbMstEnvironmentProjectType]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstEnvironmentProjectType](
	[Id] [int] NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[GroupType] [nvarchar](100) NOT NULL,
	[Other] [bit] NULL,
	[Active] [bit] NULL,
 CONSTRAINT [PK__TbMstEnv__3214EC07314D4EA8] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

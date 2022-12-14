/****** Object:  Table [dbo].[ZZ_TbMstPerfAreaOfLearning]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstPerfAreaOfLearning](
	[Id] [int] NOT NULL,
	[Description] [nvarchar](200) NULL,
	[Active] [bit] NULL,
	[Dashboard] [bit] NULL,
	[Order] [int] NULL,
	[KBS] [bit] NULL,
 CONSTRAINT [PK__TbMstPMO__3214EC07558AAF1E] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

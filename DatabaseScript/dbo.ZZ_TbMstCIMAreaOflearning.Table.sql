/****** Object:  Table [dbo].[ZZ_TbMstCIMAreaOflearning]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstCIMAreaOflearning](
	[Id] [int] NOT NULL,
	[Description] [nvarchar](200) NULL,
	[Required] [bit] NULL,
	[AreaOflearningOrder] [int] NULL,
 CONSTRAINT [PK__TbMstPro__3214EC0749E3F248] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

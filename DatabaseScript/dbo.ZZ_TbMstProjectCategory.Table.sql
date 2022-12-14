/****** Object:  Table [dbo].[ZZ_TbMstProjectCategory]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstProjectCategory](
	[CategoryId] [nvarchar](2) NOT NULL,
	[Category] [nvarchar](20) NOT NULL,
	[Order] [int] NOT NULL,
	[MarkDelete] [bit] NOT NULL,
 CONSTRAINT [PK__TbMstPro__4BB73C335E3FF0B0] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

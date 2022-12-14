/****** Object:  Table [dbo].[ZZ_TbMstPIMLookbackItem]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstPIMLookbackItem](
	[Section] [int] NOT NULL,
	[TopicId] [int] NOT NULL,
	[Topic] [nvarchar](200) NOT NULL,
	[Description] [nvarchar](1000) NOT NULL,
	[IndentLevel] [int] NOT NULL,
	[Required] [bit] NOT NULL,
	[Dashboard] [bit] NOT NULL,
	[TopicOrder] [int] NULL,
 CONSTRAINT [PK__TbMstPIM__B0C5E24F1960B67E] PRIMARY KEY CLUSTERED 
(
	[Section] ASC,
	[TopicId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

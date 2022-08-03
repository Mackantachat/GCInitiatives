/****** Object:  Table [dbo].[ZZ_TbMstPIMLookbackDBItem]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstPIMLookbackDBItem](
	[ID] [int] NULL,
	[Aspect] [nvarchar](200) NULL,
	[IndentLevel] [int] NULL,
	[RowType] [int] NULL,
	[Seq] [int] NULL,
	[Required] [bit] NULL,
	[MapItemNo] [int] NULL,
	[MapSection] [int] NULL,
	[MapTopicID] [int] NULL
) ON [PRIMARY]
GO

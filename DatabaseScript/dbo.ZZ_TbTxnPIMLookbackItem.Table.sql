/****** Object:  Table [dbo].[ZZ_TbTxnPIMLookbackItem]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnPIMLookbackItem](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[Section] [int] NOT NULL,
	[TopicId] [int] NOT NULL,
	[Description] [nvarchar](1000) NOT NULL,
	[Estimated] [nvarchar](1000) NULL,
	[Actual] [nvarchar](1000) NULL,
	[Note] [nvarchar](1000) NULL,
	[LessonLearn] [nvarchar](1000) NULL,
	[Dashboard] [bit] NOT NULL,
	[Required] [bit] NOT NULL,
	[TopicOrder] [int] NULL,
	[Topic] [nvarchar](1000) NULL,
	[IndentLevel] [int] NULL,
	[EstimatedRequired] [bit] NULL,
	[ActualRequired] [bit] NULL,
	[Remark] [nvarchar](1000) NULL,
	[NoteRequired] [bit] NULL,
	[LessonLearnRequired] [bit] NULL,
	[CanEditEstimated] [bit] NULL,
	[IsHeaderNotEdit] [bit] NULL,
	[CanEditActual] [bit] NULL,
	[GroupKnowled] [nvarchar](1) NULL,
	[RemarkKnowledgeArea] [nvarchar](20) NULL,
	[Comment] [nvarchar](1000) NULL,
 CONSTRAINT [PK__TbTxnPIM__7D3F49011E256B9B] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[ItemNo] ASC,
	[Section] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

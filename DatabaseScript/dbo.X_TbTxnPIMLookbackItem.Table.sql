/****** Object:  Table [dbo].[X_TbTxnPIMLookbackItem]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbTxnPIMLookbackItem](
	[ProjectId] [int] NULL,
	[ItemNo] [int] NULL,
	[Section] [int] NULL,
	[TopicId] [int] NULL,
	[Description] [nvarchar](max) NULL,
	[Estimated] [nvarchar](max) NULL,
	[Actual] [nvarchar](max) NULL,
	[Note] [nvarchar](max) NULL,
	[LessonLearn] [nvarchar](max) NULL,
	[Dashboard] [bit] NULL,
	[Required] [bit] NULL,
	[TopicOrder] [int] NULL,
	[Topic] [nvarchar](max) NULL,
	[IndentLevel] [int] NULL,
	[EstimatedRequired] [bit] NULL,
	[ActualRequired] [bit] NULL,
	[Remark] [nvarchar](max) NULL,
	[NoteRequired] [bit] NULL,
	[LessonLearnRequired] [bit] NULL,
	[CanEditEstimated] [bit] NULL,
	[IsHeaderNotEdit] [bit] NULL,
	[CanEditActual] [bit] NULL,
	[GroupKnowled] [nvarchar](max) NULL,
	[RemarkKnowledgeArea] [nvarchar](max) NULL,
	[Comment] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

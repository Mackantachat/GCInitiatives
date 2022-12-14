/****** Object:  Table [dbo].[X_ViewTbTxnPIMLookbackItem]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_ViewTbTxnPIMLookbackItem](
	[ProjectId] [int] NULL,
	[TopicOrder] [int] NULL,
	[Description] [nvarchar](max) NULL,
	[Estimated] [nvarchar](max) NULL,
	[Actual] [nvarchar](max) NULL,
	[Note] [nvarchar](max) NULL,
	[LessonLearn] [nvarchar](max) NULL,
	[Required] [bit] NULL,
	[Dashboard] [bit] NULL,
	[TopicID] [int] NULL,
	[RowType] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

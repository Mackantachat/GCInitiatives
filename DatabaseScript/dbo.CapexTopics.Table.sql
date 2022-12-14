/****** Object:  Table [dbo].[CapexTopics]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CapexTopics](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TopicId] [nvarchar](max) NULL,
	[TopicName] [nvarchar](max) NULL,
	[IsYesOrNo] [bit] NULL,
	[SurveyVersions] [int] NOT NULL,
	[TopicType] [nvarchar](max) NULL,
 CONSTRAINT [PK_CapexTopics] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[CapexTopics] ADD  DEFAULT ((0)) FOR [SurveyVersions]
GO

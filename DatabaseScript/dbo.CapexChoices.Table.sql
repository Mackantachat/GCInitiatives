/****** Object:  Table [dbo].[CapexChoices]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CapexChoices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TopicId] [nvarchar](max) NULL,
	[ChoiceType] [nvarchar](max) NULL,
	[ChoiceId] [nvarchar](max) NULL,
	[ChoiceName] [nvarchar](max) NULL,
	[CapexTopicId] [int] NOT NULL,
	[SurveyVersions] [int] NOT NULL,
 CONSTRAINT [PK_CapexChoices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_CapexChoices_CapexTopicId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_CapexChoices_CapexTopicId] ON [dbo].[CapexChoices]
(
	[CapexTopicId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CapexChoices] ADD  DEFAULT ((0)) FOR [CapexTopicId]
GO
ALTER TABLE [dbo].[CapexChoices] ADD  DEFAULT ((0)) FOR [SurveyVersions]
GO
ALTER TABLE [dbo].[CapexChoices]  WITH CHECK ADD  CONSTRAINT [FK_CapexChoices_CapexTopics_CapexTopicId] FOREIGN KEY([CapexTopicId])
REFERENCES [dbo].[CapexTopics] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CapexChoices] CHECK CONSTRAINT [FK_CapexChoices_CapexTopics_CapexTopicId]
GO

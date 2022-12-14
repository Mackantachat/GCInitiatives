/****** Object:  Table [dbo].[ZZ_TbTxnProjectLessonLearnedAttachment]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectLessonLearnedAttachment](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[SubItemNo] [int] NOT NULL,
	[Category] [nvarchar](100) NULL,
	[Description] [nvarchar](200) NULL,
	[FilePath] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK__TbTxnPro__0AB70C1263A3C44B] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[ItemNo] ASC,
	[SubItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnProjectLessonLearnedAttachment]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnProjectLess__5ECA0095] FOREIGN KEY([ProjectId], [ItemNo])
REFERENCES [dbo].[ZZ_TbTxnProjectLessonLearned] ([ProjectId], [ItemNo])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ZZ_TbTxnProjectLessonLearnedAttachment] CHECK CONSTRAINT [FK__TbTxnProjectLess__5ECA0095]
GO

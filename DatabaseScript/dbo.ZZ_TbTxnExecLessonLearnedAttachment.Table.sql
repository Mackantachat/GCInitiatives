/****** Object:  Table [dbo].[ZZ_TbTxnExecLessonLearnedAttachment]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnExecLessonLearnedAttachment](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[SubItemNo] [int] NOT NULL,
	[Category] [nvarchar](100) NULL,
	[Description] [nvarchar](200) NULL,
	[FilePath] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK__TbTxnExe__0AB70C126E0C4425] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[ItemNo] ASC,
	[SubItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnExecLessonLearnedAttachment]  WITH CHECK ADD  CONSTRAINT [IX_ProjectId] FOREIGN KEY([ProjectId], [ItemNo])
REFERENCES [dbo].[ZZ_TbTxnPIMExecLessonLearn] ([ProjectId], [ItemNo])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ZZ_TbTxnExecLessonLearnedAttachment] CHECK CONSTRAINT [IX_ProjectId]
GO

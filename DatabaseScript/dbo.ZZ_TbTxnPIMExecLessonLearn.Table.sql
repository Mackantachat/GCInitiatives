/****** Object:  Table [dbo].[ZZ_TbTxnPIMExecLessonLearn]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnPIMExecLessonLearn](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[KnowledgeArea] [nvarchar](200) NULL,
	[Phase] [int] NULL,
	[Issue] [nvarchar](1000) NULL,
	[Background] [nvarchar](1000) NULL,
	[LessonLearned] [nvarchar](1000) NULL,
	[Remark] [nvarchar](1000) NULL,
	[Rating] [int] NULL,
	[Dashboard] [bit] NULL,
	[Comment] [nvarchar](1000) NULL,
	[IssueRequired] [bit] NULL,
	[BackgroundRequired] [bit] NULL,
	[LessonLearnedRequired] [bit] NULL,
	[KBS] [bit] NULL,
	[RecordBy] [nvarchar](200) NULL,
	[RecordDispBy] [nvarchar](200) NULL,
	[RecordByIndicator] [nvarchar](100) NULL,
 CONSTRAINT [PK__TbTxnExe__9907DEA3075714DC] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[ItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnPIMExecLessonLearn]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnPIME__Phase__49CEE3AF] FOREIGN KEY([Phase])
REFERENCES [dbo].[ZZ_TbMstLessonLearnedPhase] ([Phase])
GO
ALTER TABLE [dbo].[ZZ_TbTxnPIMExecLessonLearn] CHECK CONSTRAINT [FK__TbTxnPIME__Phase__49CEE3AF]
GO

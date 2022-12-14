/****** Object:  Table [dbo].[ZZ_TbTxnProjectLessonLearned]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectLessonLearned](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[ProjectPhase] [int] NOT NULL,
	[KnowledgeArea] [nvarchar](100) NULL,
	[Issue] [nvarchar](1000) NULL,
	[Background] [nvarchar](1000) NULL,
	[LessonLearned] [nvarchar](1000) NULL,
	[Rating] [int] NOT NULL,
	[Remark] [nvarchar](1000) NULL,
	[AttachmentFile] [nvarchar](200) NULL,
	[KBS] [bit] NULL,
	[Dashboard] [bit] NULL,
	[RecordBy] [nvarchar](200) NULL,
	[RecordDispBy] [nvarchar](200) NULL,
	[RecordByIndicator] [nvarchar](200) NULL,
 CONSTRAINT [PK__TbTxnPro__D17921633C89F72A] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[ItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnProjectLessonLearned]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnProj__Proje__5DD5DC5C] FOREIGN KEY([ProjectPhase])
REFERENCES [dbo].[ZZ_TbMstLessonLearnedPhase] ([Phase])
GO
ALTER TABLE [dbo].[ZZ_TbTxnProjectLessonLearned] CHECK CONSTRAINT [FK__TbTxnProj__Proje__5DD5DC5C]
GO

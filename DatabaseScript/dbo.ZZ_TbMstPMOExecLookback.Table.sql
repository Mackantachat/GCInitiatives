/****** Object:  Table [dbo].[ZZ_TbMstPMOExecLookback]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstPMOExecLookback](
	[Id] [int] NOT NULL,
	[Topic] [nvarchar](1000) NULL,
	[KnowledgeArea] [nvarchar](1000) NOT NULL,
	[Issue] [nvarchar](1000) NULL,
	[IssueRequired] [bit] NULL,
	[Background] [nvarchar](1000) NULL,
	[BackgroundRequired] [bit] NULL,
	[IndentLevel] [int] NULL,
	[Order] [int] NULL,
	[Dashboard] [bit] NULL,
	[RemarkKnowledgeArea] [nvarchar](20) NULL,
	[LessonLearned] [nvarchar](1000) NULL,
	[LessonLearnedRequired] [bit] NULL,
 CONSTRAINT [PK__TbMstPMO__3214EC072FDA0782] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbMstPMOExecLookback] ADD  DEFAULT ((0)) FOR [Dashboard]
GO

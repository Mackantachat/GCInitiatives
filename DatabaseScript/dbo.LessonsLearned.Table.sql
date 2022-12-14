/****** Object:  Table [dbo].[LessonsLearned]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LessonsLearned](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsDeleted] [bit] NULL,
	[InitiativeId] [int] NULL,
	[MilestoneNo] [nvarchar](max) NULL,
	[AreaOfLearning] [nvarchar](max) NULL,
	[Issues] [nvarchar](max) NULL,
	[Background] [nvarchar](max) NULL,
	[LessonLearned] [nvarchar](max) NULL,
	[Remark] [nvarchar](max) NULL,
	[Rating] [int] NULL,
	[ProjectPhaseNo] [nvarchar](max) NULL,
	[LessonLearnTitle] [nvarchar](max) NULL,
 CONSTRAINT [PK_LessonsLearned] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

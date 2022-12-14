/****** Object:  Table [dbo].[ExecutionLookback]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExecutionLookback](
	[ExecutionLookbackId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectLookbackId] [int] NULL,
	[KnowledgeArea] [nvarchar](max) NULL,
	[Issue] [nvarchar](max) NULL,
	[Background] [nvarchar](max) NULL,
	[LessonLearned] [nvarchar](max) NULL,
	[Remark] [nvarchar](max) NULL,
	[Comment] [nvarchar](max) NULL,
	[Actual] [nvarchar](max) NULL,
	[Plan] [nvarchar](max) NULL,
 CONSTRAINT [PK_ExecutionLookback] PRIMARY KEY CLUSTERED 
(
	[ExecutionLookbackId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

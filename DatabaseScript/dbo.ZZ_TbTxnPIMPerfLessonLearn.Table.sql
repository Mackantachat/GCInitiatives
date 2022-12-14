/****** Object:  Table [dbo].[ZZ_TbTxnPIMPerfLessonLearn]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnPIMPerfLessonLearn](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[Rating] [int] NULL,
	[Dashboard] [bit] NULL,
	[Comment] [nvarchar](max) NULL,
	[AreaOfLearning] [nvarchar](200) NOT NULL,
	[WhatActuallyHappend] [nvarchar](1000) NULL,
	[WhatLeadsIssueHappening] [nvarchar](1000) NULL,
	[WhatWorkWell] [nvarchar](1000) NULL,
	[KBS] [bit] NULL,
	[RecordBy] [nvarchar](200) NULL,
	[Remark] [nvarchar](1000) NULL,
	[RecordDispBy] [nvarchar](200) NULL,
	[RecordByIndicator] [nvarchar](100) NULL,
 CONSTRAINT [PK__TbTxnPIM__0BF36DBF4BEC364B] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[ItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_AreaOfLearning] UNIQUE NONCLUSTERED 
(
	[AreaOfLearning] ASC,
	[ProjectId] ASC,
	[ItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

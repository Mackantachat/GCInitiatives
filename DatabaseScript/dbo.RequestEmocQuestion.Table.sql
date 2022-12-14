/****** Object:  Table [dbo].[RequestEmocQuestion]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequestEmocQuestion](
	[RequestEmocQuestionId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[Plant] [nvarchar](200) NULL,
	[EmocQuestionId] [nvarchar](500) NULL,
	[EmocAnswer] [bit] NULL,
 CONSTRAINT [PK_RequestEmocQuestion] PRIMARY KEY CLUSTERED 
(
	[RequestEmocQuestionId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

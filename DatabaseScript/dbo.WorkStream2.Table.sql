/****** Object:  Table [dbo].[WorkStream2]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkStream2](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkstreamID] [nvarchar](max) NULL,
	[WorkstreamTitle] [nvarchar](max) NULL,
 CONSTRAINT [PK_WorkStream2] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

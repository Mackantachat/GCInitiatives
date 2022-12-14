/****** Object:  Table [dbo].[SubWorkstreams]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubWorkstreams](
	[WorkStreamTitle] [nvarchar](200) NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SubWorkstream1] [nvarchar](200) NULL,
	[SubWorkstream2] [nvarchar](200) NULL,
	[CLevel] [nvarchar](200) NULL,
	[CLevelOrder] [int] NULL,
	[Subworkstream1Order] [int] NULL,
	[WorkstreamOrder] [int] NULL,
	[Subworkstream2Order] [int] NULL,
 CONSTRAINT [PK_SubWorkstreams] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

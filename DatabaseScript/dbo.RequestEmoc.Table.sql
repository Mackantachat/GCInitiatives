/****** Object:  Table [dbo].[RequestEmoc]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequestEmoc](
	[RequestEmocId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[Plant] [nvarchar](200) NULL,
	[EmocNo] [nvarchar](200) NULL,
	[EmocName] [nvarchar](200) NULL,
	[EmocRequestStatus] [nvarchar](200) NULL,
	[EmocStatus] [nvarchar](200) NULL,
 CONSTRAINT [PK_RequestEmoc] PRIMARY KEY CLUSTERED 
(
	[RequestEmocId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_RequestEmoc]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_RequestEmoc] ON [dbo].[RequestEmoc]
(
	[InitiativeId] ASC,
	[RequestEmocId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

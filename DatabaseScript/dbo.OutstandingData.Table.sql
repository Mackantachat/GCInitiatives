/****** Object:  Table [dbo].[OutstandingData]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OutstandingData](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[Year] [int] NULL,
	[Month] [int] NULL,
	[OutstandingId] [int] NULL,
	[ItemDescription] [nvarchar](max) NULL,
	[ItemListValueBaht] [decimal](18, 2) NULL,
	[RpcDescription] [nvarchar](max) NULL,
	[RpcValueBaht] [decimal](18, 2) NULL,
	[Outstanding] [decimal](18, 2) NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_OutstandingData] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

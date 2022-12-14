/****** Object:  Table [dbo].[CommonDataSetting]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommonDataSetting](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DataType] [nvarchar](255) NULL,
	[DisplayName] [nvarchar](255) NULL,
	[AttributeName01] [nvarchar](1024) NULL,
	[AttributeName02] [nvarchar](1024) NULL,
	[AttributeName03] [nvarchar](1024) NULL,
	[AttributeName04] [nvarchar](1024) NULL,
	[AttributeName05] [nvarchar](1024) NULL,
	[AttributeName06] [nvarchar](1024) NULL,
	[AttributeName07] [nvarchar](1024) NULL,
	[AttributeName08] [nvarchar](1024) NULL,
	[AttributeName09] [nvarchar](1024) NULL,
	[AttributeName10] [nvarchar](1024) NULL,
	[AttributeName11] [nvarchar](1024) NULL,
	[AttributeName12] [nvarchar](1024) NULL,
	[AttributeName13] [nvarchar](1024) NULL,
	[AttributeName14] [nvarchar](1024) NULL,
	[AttributeName15] [nvarchar](1024) NULL,
	[AttributeName16] [nvarchar](1024) NULL,
	[AttributeName17] [nvarchar](1024) NULL,
	[AttributeName18] [nvarchar](1024) NULL,
	[AttributeName19] [nvarchar](1024) NULL,
	[AttributeName20] [nvarchar](1024) NULL,
 CONSTRAINT [PK_CommonDataSetting] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

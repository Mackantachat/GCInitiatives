/****** Object:  Table [dbo].[CommonData_20210629_1615]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommonData_20210629_1615](
	[Id] [int] NOT NULL,
	[DataType] [nvarchar](255) NULL,
	[Attribute01] [nvarchar](1024) NULL,
	[Attribute02] [nvarchar](1024) NULL,
	[Attribute03] [nvarchar](1024) NULL,
	[Attribute04] [nvarchar](1024) NULL,
	[Attribute05] [nvarchar](1024) NULL,
	[Attribute06] [nvarchar](1024) NULL,
	[Attribute07] [nvarchar](1024) NULL,
	[Attribute08] [nvarchar](1024) NULL,
	[Attribute09] [nvarchar](1024) NULL,
	[Attribute10] [nvarchar](1024) NULL,
	[Attribute11] [nvarchar](1024) NULL,
	[Attribute12] [nvarchar](1024) NULL,
	[Attribute13] [nvarchar](1024) NULL,
	[Attribute14] [nvarchar](1024) NULL,
	[Attribute15] [nvarchar](1024) NULL,
	[Attribute16] [nvarchar](1024) NULL,
	[Attribute17] [nvarchar](1024) NULL,
	[Attribute18] [nvarchar](1024) NULL,
	[Attribute19] [nvarchar](1024) NULL,
	[Attribute20] [nvarchar](1024) NULL,
	[IsDelete] [bit] NULL,
	[IsDisable] [bit] NULL,
 CONSTRAINT [PK_CommonData_20210629_1615] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

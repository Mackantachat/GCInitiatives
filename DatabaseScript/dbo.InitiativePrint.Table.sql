/****** Object:  Table [dbo].[InitiativePrint]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativePrint](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Column1] [nvarchar](max) NULL,
	[Column2] [nvarchar](max) NULL,
	[Column3] [nvarchar](max) NULL,
	[Column4] [nvarchar](max) NULL,
	[Column5] [nvarchar](max) NULL,
	[Column6] [nvarchar](max) NULL,
	[Column7] [nvarchar](max) NULL,
	[Column8] [nvarchar](max) NULL,
	[Column9] [nvarchar](max) NULL,
	[Column10] [nvarchar](max) NULL,
	[Column11] [nvarchar](max) NULL,
	[Column12] [nvarchar](max) NULL,
	[Column13] [nvarchar](max) NULL,
	[Column14] [nvarchar](max) NULL,
	[Column15] [nvarchar](max) NULL,
	[Column16] [nvarchar](max) NULL,
	[Column17] [nvarchar](max) NULL,
	[Column18] [nvarchar](max) NULL,
	[Column19] [nvarchar](max) NULL,
	[Column20] [nvarchar](max) NULL,
	[Column21] [nvarchar](max) NULL,
	[Column22] [nvarchar](max) NULL,
	[Column23] [nvarchar](max) NULL,
	[Column24] [nvarchar](max) NULL,
	[Column25] [nvarchar](max) NULL,
	[Column26] [nvarchar](max) NULL,
	[Column27] [nvarchar](max) NULL,
	[Column28] [nvarchar](max) NULL,
	[Column29] [nvarchar](max) NULL,
	[Column30] [nvarchar](max) NULL,
 CONSTRAINT [PK_InitiativePrint] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

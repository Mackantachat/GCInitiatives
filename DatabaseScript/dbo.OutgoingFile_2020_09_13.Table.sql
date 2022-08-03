/****** Object:  Table [dbo].[OutgoingFile_2020_09_13]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OutgoingFile_2020_09_13](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DirectoryPath] [nvarchar](max) NULL,
	[FileName] [nvarchar](max) NULL,
	[Data] [varbinary](max) NULL,
	[Status] [nvarchar](max) NULL,
	[CreateUser] [nvarchar](max) NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateUser] [nvarchar](max) NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_OutgoingFile_2020_09_13] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

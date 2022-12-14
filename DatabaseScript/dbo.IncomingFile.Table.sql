/****** Object:  Table [dbo].[IncomingFile]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IncomingFile](
	[Id] [int] IDENTITY(999,1) NOT NULL,
	[DirectoryPath] [nvarchar](100) NULL,
	[FileName] [nvarchar](100) NULL,
	[Data] [varbinary](max) NULL,
	[Status] [nvarchar](100) NULL,
	[CreateUser] [nvarchar](100) NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateUser] [nvarchar](100) NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_IncomingFile_2] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

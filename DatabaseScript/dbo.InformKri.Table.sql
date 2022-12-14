/****** Object:  Table [dbo].[InformKri]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InformKri](
	[InformKriId] [int] IDENTITY(1,1) NOT NULL,
	[InformType] [nvarchar](max) NULL,
	[Year] [nvarchar](max) NULL,
	[InitiativeId] [int] NULL,
	[OwnerName] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
 CONSTRAINT [PK_InformKri] PRIMARY KEY CLUSTERED 
(
	[InformKriId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

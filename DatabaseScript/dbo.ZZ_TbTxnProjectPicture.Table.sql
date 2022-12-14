/****** Object:  Table [dbo].[ZZ_TbTxnProjectPicture]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectPicture](
	[ProjectID] [int] NOT NULL,
	[PictureNo] [int] IDENTITY(1,1) NOT NULL,
	[Caption] [nvarchar](50) NULL,
	[FilePath] [nvarchar](150) NULL,
	[Period] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TbTxnProjectPicture] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[PictureNo] ASC,
	[Period] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

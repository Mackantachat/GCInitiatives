/****** Object:  Table [dbo].[X_ViewTbTxnProjectPicture]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_ViewTbTxnProjectPicture](
	[ProjectID] [int] NULL,
	[PictureNo] [int] NULL,
	[Caption] [nvarchar](max) NULL,
	[URL] [nvarchar](max) NULL,
	[Period] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

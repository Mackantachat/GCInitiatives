/****** Object:  Table [dbo].[X_TbMstProjectStatus]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbMstProjectStatus](
	[ProjectStatusID] [int] NULL,
	[ProjectStatusCode] [nvarchar](max) NULL,
	[ProjectStatusName] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

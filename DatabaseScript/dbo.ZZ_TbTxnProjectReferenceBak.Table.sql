/****** Object:  Table [dbo].[ZZ_TbTxnProjectReferenceBak]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectReferenceBak](
	[ProjectID] [int] NOT NULL,
	[EMOCNo] [nvarchar](255) NULL,
	[CAPEXReqID] [nchar](10) NULL,
	[ProjectNoAppr] [nvarchar](255) NULL,
	[ProjectNoWBS] [nvarchar](255) NULL
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ZZ_TbTxnProjectReference]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectReference](
	[ProjectID] [int] NOT NULL,
	[EMOCNo] [nvarchar](255) NULL,
	[CAPEXReqID] [nchar](10) NULL,
	[ProjectNoAppr] [nvarchar](255) NULL,
	[ProjectNoWBS] [nvarchar](255) NULL,
 CONSTRAINT [PK_TbTxnProjectReference] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

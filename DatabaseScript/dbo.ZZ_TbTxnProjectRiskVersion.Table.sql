/****** Object:  Table [dbo].[ZZ_TbTxnProjectRiskVersion]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectRiskVersion](
	[ProjectId] [int] NOT NULL,
	[VersionNo] [int] NOT NULL,
	[VersionName] [nvarchar](50) NOT NULL,
	[Status] [nvarchar](1) NULL,
	[VersionType] [nvarchar](1) NULL,
	[SubmitBy] [nvarchar](100) NULL,
	[SubmitedDate] [datetime] NULL,
	[PublishBy] [nvarchar](100) NULL,
	[PublishedDate] [datetime] NULL,
	[RejectBy] [nvarchar](100) NULL,
	[RejectDate] [datetime] NULL,
 CONSTRAINT [PK__TbTxnPro__2776DC6F3CDEFCE5] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[VersionNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

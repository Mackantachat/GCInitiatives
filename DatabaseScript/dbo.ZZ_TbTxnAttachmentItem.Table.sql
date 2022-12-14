/****** Object:  Table [dbo].[ZZ_TbTxnAttachmentItem]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnAttachmentItem](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[TabView] [nvarchar](100) NULL,
	[Category] [nvarchar](100) NULL,
	[Description] [nvarchar](200) NULL,
	[FilePath] [nvarchar](200) NOT NULL,
	[CategoryId] [int] NULL,
	[TabSubView] [nvarchar](100) NOT NULL,
	[IsOldPath] [bit] NULL,
 CONSTRAINT [PK__TbTxnAtt__761ABEF025FB978D] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[ItemNo] ASC,
	[TabSubView] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

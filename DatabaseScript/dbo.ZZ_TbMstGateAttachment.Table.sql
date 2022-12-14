/****** Object:  Table [dbo].[ZZ_TbMstGateAttachment]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstGateAttachment](
	[Gate] [nvarchar](10) NOT NULL,
	[Category] [nvarchar](100) NOT NULL,
	[Icon] [nvarchar](100) NULL,
 CONSTRAINT [PK_TbMstGateAttachment] PRIMARY KEY CLUSTERED 
(
	[Gate] ASC,
	[Category] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

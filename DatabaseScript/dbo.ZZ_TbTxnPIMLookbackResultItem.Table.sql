/****** Object:  Table [dbo].[ZZ_TbTxnPIMLookbackResultItem]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnPIMLookbackResultItem](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[Description] [nvarchar](1000) NOT NULL,
	[Before] [nvarchar](1000) NULL,
	[After] [nvarchar](1000) NULL,
	[Unit] [nvarchar](30) NULL,
	[Benefits] [nvarchar](1000) NULL,
	[BenefitsTHB] [decimal](18, 2) NULL,
	[Remark] [nvarchar](1000) NULL,
	[TabSubView] [nvarchar](100) NULL
) ON [PRIMARY]
GO

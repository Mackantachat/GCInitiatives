/****** Object:  Table [dbo].[X_TbMstCompany]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbMstCompany](
	[CompanyID] [int] NULL,
	[CompanyCode] [nvarchar](50) NULL,
	[CompanyName] [nvarchar](50) NULL,
	[ATOMsCompanyCode] [nvarchar](255) NULL,
	[KBSCompany] [nvarchar](50) NULL
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[X_TbMstInvestmentType]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbMstInvestmentType](
	[InvestmentTypeID] [int] NULL,
	[InvestmentTypeName] [nvarchar](max) NULL,
	[PrefixDocument] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

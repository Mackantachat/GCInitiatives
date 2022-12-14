/****** Object:  Table [dbo].[ZZ_TbTxnCapitalizedAsset]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnCapitalizedAsset](
	[ProjectNo] [nvarchar](255) NOT NULL,
	[AssetItemNo] [nvarchar](50) NOT NULL,
	[CapitalizeDate] [nvarchar](50) NOT NULL,
	[AssetDescription] [nvarchar](255) NULL,
	[CapitalizationType] [nvarchar](255) NULL,
	[CapitalizedAmount] [nvarchar](255) NULL,
	[Currency] [nvarchar](255) NULL,
	[CurrencyType] [nvarchar](255) NULL,
 CONSTRAINT [PK_TbTxnCapitalizedAsset_1] PRIMARY KEY CLUSTERED 
(
	[ProjectNo] ASC,
	[AssetItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ITAssets]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ITAssets](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AssetId] [nvarchar](max) NULL,
	[AssetType] [nvarchar](max) NULL,
	[AssetName] [nvarchar](max) NULL,
	[CostPerUnit] [decimal](18, 2) NULL,
	[SurveyVersions] [int] NOT NULL,
 CONSTRAINT [PK_ITAssets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ITAssets] ADD  DEFAULT ((0)) FOR [SurveyVersions]
GO

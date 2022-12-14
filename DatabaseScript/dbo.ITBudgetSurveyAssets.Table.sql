/****** Object:  Table [dbo].[ITBudgetSurveyAssets]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ITBudgetSurveyAssets](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ITBudgetSurveyId] [int] NOT NULL,
	[AssetId] [nvarchar](max) NULL,
	[OtherName] [nvarchar](max) NULL,
	[NumberOfUnit] [int] NULL,
	[CostPerUnit] [decimal](18, 2) NULL,
	[TotalMTHB] [decimal](18, 2) NULL,
 CONSTRAINT [PK_ITBudgetSurveyAssets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[InvestmentCost_10_MAR]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InvestmentCost_10_MAR](
	[InvestmentCostId] [int] NOT NULL,
	[InvestmentCostType] [nvarchar](max) NULL,
	[JanCost] [decimal](18, 2) NULL,
	[FebCost] [decimal](18, 2) NULL,
	[MarCost] [decimal](18, 2) NULL,
	[AprCost] [decimal](18, 2) NULL,
	[MayCost] [decimal](18, 2) NULL,
	[JunCost] [decimal](18, 2) NULL,
	[JulCost] [decimal](18, 2) NULL,
	[AugCost] [decimal](18, 2) NULL,
	[SepCost] [decimal](18, 2) NULL,
	[OctCost] [decimal](18, 2) NULL,
	[NovCost] [decimal](18, 2) NULL,
	[DecCost] [decimal](18, 2) NULL,
	[OverallCost] [decimal](18, 2) NULL,
	[InitiativeId] [int] NULL,
	[YearCost] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

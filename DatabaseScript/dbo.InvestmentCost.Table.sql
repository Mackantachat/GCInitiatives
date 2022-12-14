/****** Object:  Table [dbo].[InvestmentCost]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InvestmentCost](
	[InvestmentCostId] [int] IDENTITY(1,1) NOT NULL,
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
	[YearCost] [nvarchar](max) NULL,
 CONSTRAINT [PK_InvestmentCost] PRIMARY KEY CLUSTERED 
(
	[InvestmentCostId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_InvestmentCost_476F6FEC82A32BC6A356CDBAEB0E00D0]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_InvestmentCost_476F6FEC82A32BC6A356CDBAEB0E00D0] ON [dbo].[InvestmentCost]
(
	[InitiativeId] ASC
)
INCLUDE([InvestmentCostType]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

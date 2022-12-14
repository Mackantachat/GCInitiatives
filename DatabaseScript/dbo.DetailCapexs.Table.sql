/****** Object:  Table [dbo].[DetailCapexs]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetailCapexs](
	[DetailCapexId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[VicePresidentOfOwner] [nvarchar](max) NULL,
	[DivisionManagerOfOwner] [nvarchar](max) NULL,
	[ProductionProcess] [nvarchar](max) NULL,
	[ComparisonWithOther] [nvarchar](max) NULL,
	[OtherInvestment] [nvarchar](max) NULL,
	[KeySuccessFactor] [nvarchar](max) NULL,
	[SynergyBenefit] [nvarchar](max) NULL,
	[OtherStrategic] [nvarchar](max) NULL,
	[MarketOverview] [nvarchar](max) NULL,
	[PotentialCustomer] [nvarchar](max) NULL,
	[SalesPlan] [nvarchar](max) NULL,
	[SourceOfFeedstock] [nvarchar](max) NULL,
	[OtherBusiness] [nvarchar](max) NULL,
	[SafetyIndex] [nvarchar](max) NULL,
	[CorporateImageIndex] [nvarchar](max) NULL,
	[OtherQuality] [nvarchar](max) NULL,
	[BaseCase] [nvarchar](max) NULL,
	[ProjectIrrBaseCase] [decimal](18, 2) NULL,
	[NpvBaseCase] [decimal](18, 2) NULL,
	[PaybackBaseCase] [decimal](18, 2) NULL,
	[EbitdaBaseCase] [decimal](18, 2) NULL,
	[OptimisticCase] [nvarchar](max) NULL,
	[ProjectIrrOptimisticCase] [decimal](18, 2) NULL,
	[NpvOptimisticCase] [decimal](18, 2) NULL,
	[PaybackOptimisticCase] [decimal](18, 2) NULL,
	[EbitdaOptimisticCase] [decimal](18, 2) NULL,
	[PessimisticCase] [nvarchar](max) NULL,
	[ProjectIrrPessimisticCase] [decimal](18, 2) NULL,
	[NpvPessimisticCase] [decimal](18, 2) NULL,
	[PaybackPessimisticCase] [decimal](18, 2) NULL,
	[EbitdaPessimisticCase] [decimal](18, 2) NULL,
	[UsefulLife] [nvarchar](max) NULL,
	[DepreciationCost] [decimal](18, 2) NULL,
	[KpisRemark] [nvarchar](max) NULL,
	[ConsistenWithCompanyStrategy] [nvarchar](max) NULL,
	[ExpectedTargetAndResult] [nvarchar](max) NULL,
	[KpisCapexId] [int] NOT NULL,
	[MileStoneAndSchedule] [nvarchar](max) NULL,
	[OtherResourcesNeeded] [nvarchar](max) NULL,
 CONSTRAINT [PK_DetailCapexs] PRIMARY KEY CLUSTERED 
(
	[DetailCapexId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[DetailCapexs] ADD  DEFAULT ((0)) FOR [KpisCapexId]
GO

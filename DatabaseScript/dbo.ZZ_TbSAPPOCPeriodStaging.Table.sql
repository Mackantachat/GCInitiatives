/****** Object:  Table [dbo].[ZZ_TbSAPPOCPeriodStaging]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbSAPPOCPeriodStaging](
	[ProjectNo] [nvarchar](50) NULL,
	[Period] [nvarchar](50) NULL,
	[EngineeringPlan] [nvarchar](50) NULL,
	[EngineeringActual] [nvarchar](50) NULL,
	[ProcurementPlan] [nvarchar](50) NULL,
	[ProcurementActual] [nvarchar](50) NULL,
	[ConstructionPlan] [nvarchar](50) NULL,
	[ConstructionActual] [nvarchar](50) NULL,
	[CommissioningPlan] [nvarchar](50) NULL,
	[CommissioningActual] [nvarchar](50) NULL,
	[OverallPlan] [nvarchar](50) NULL,
	[OverallActual] [nvarchar](50) NULL
) ON [PRIMARY]
GO

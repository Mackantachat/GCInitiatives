/****** Object:  Table [dbo].[ZZ_TbTxnPOCPeriod]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnPOCPeriod](
	[ProjectID] [int] NOT NULL,
	[Period] [nvarchar](50) NOT NULL,
	[EngineeringPlan] [decimal](18, 2) NULL,
	[EngineeringActual] [decimal](18, 2) NULL,
	[ProcurementPlan] [decimal](18, 2) NULL,
	[ProcurementActual] [decimal](18, 2) NULL,
	[ConstructionPlan] [decimal](18, 2) NULL,
	[ConstructionActual] [decimal](18, 2) NULL,
	[CommissioningPlan] [decimal](18, 2) NULL,
	[CommissioningActual] [decimal](18, 2) NULL,
 CONSTRAINT [PK_TbTxnPOCPeriod] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[Period] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ZZ_TbSAPCostsStaging]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbSAPCostsStaging](
	[ProjectNo] [nvarchar](50) NULL,
	[PlanCost] [nvarchar](50) NULL,
	[ActualCost] [nvarchar](50) NULL,
	[PR] [nvarchar](50) NULL,
	[PO] [nvarchar](50) NULL,
	[Budget] [nvarchar](50) NULL
) ON [PRIMARY]
GO

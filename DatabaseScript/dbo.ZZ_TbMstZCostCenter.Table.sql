/****** Object:  Table [dbo].[ZZ_TbMstZCostCenter]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstZCostCenter](
	[CostCenterID] [int] IDENTITY(1,1) NOT NULL,
	[CostCenterName] [nvarchar](255) NULL,
	[CostCenterAccount] [nvarchar](255) NULL,
 CONSTRAINT [PK_TbMstZCostCenter] PRIMARY KEY CLUSTERED 
(
	[CostCenterID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

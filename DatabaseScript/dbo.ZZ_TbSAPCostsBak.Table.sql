/****** Object:  Table [dbo].[ZZ_TbSAPCostsBak]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbSAPCostsBak](
	[ProjectID] [int] NOT NULL,
	[PlanCost] [decimal](18, 2) NULL,
	[ActualCost] [decimal](18, 2) NULL,
	[PR] [decimal](18, 2) NULL,
	[PO] [decimal](18, 2) NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[ModifiedDate] [datetime] NULL
) ON [PRIMARY]
GO

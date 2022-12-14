/****** Object:  Table [dbo].[ZZ_TbTxnCostsHistory]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnCostsHistory](
	[ProjectID] [int] NOT NULL,
	[Period] [nvarchar](50) NOT NULL,
	[PlanCost] [decimal](18, 2) NULL,
	[ActualCost] [decimal](18, 2) NULL,
	[PR] [decimal](18, 2) NULL,
	[PO] [decimal](18, 2) NULL,
 CONSTRAINT [PK_TbTxnCostsHistory] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[Period] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

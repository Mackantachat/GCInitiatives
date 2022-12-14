/****** Object:  Table [dbo].[ZZ_TbTxnCostSAPHistory]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnCostSAPHistory](
	[ProjectID] [int] NOT NULL,
	[PlanCostVersionID] [int] NULL,
	[Year] [int] NULL,
 CONSTRAINT [PK_TbTxnCostSAPHistory] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

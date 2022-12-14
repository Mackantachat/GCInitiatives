/****** Object:  Table [dbo].[ZZ_TbTxnGateStatus]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnGateStatus](
	[ProjectID] [int] NOT NULL,
	[GateStatus] [nvarchar](70) NULL,
	[GateStatusID] [varchar](2) NULL,
	[BudgetRequest] [decimal](18, 2) NULL,
 CONSTRAINT [PK_TbTxnGateStatus] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

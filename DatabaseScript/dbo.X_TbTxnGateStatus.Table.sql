/****** Object:  Table [dbo].[X_TbTxnGateStatus]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbTxnGateStatus](
	[ProjectID] [int] NULL,
	[GateStatus] [nvarchar](max) NULL,
	[GateStatusID] [nvarchar](max) NULL,
	[BudgetRequest] [float] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

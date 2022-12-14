/****** Object:  Table [dbo].[X_TbTxnProjectGate]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbTxnProjectGate](
	[ProjectID] [int] NULL,
	[PresentGate1Date] [datetime] NULL,
	[PresentGate2Date] [datetime] NULL,
	[PresentGate3Date] [datetime] NULL,
	[PresentGateReviseDate] [datetime] NULL,
	[PresentGateRevise2Date] [datetime] NULL,
	[PresentGate4Date] [datetime] NULL,
	[TargetGate1Date] [datetime] NULL,
	[TargetGate2Date] [datetime] NULL,
	[TargetGate3Date] [datetime] NULL,
	[TargetGateReviseDate] [datetime] NULL,
	[TargetGateRevise2Date] [datetime] NULL,
	[TargetGate4Date] [datetime] NULL,
	[CostGate1] [float] NULL,
	[CostGate2] [float] NULL,
	[CostGate3] [float] NULL,
	[CostGateRevise] [float] NULL,
	[CostGateRevise2] [float] NULL,
	[CostGate4] [float] NULL
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ZZ_TbTxnProjectGate]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectGate](
	[ProjectID] [int] NOT NULL,
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
	[CostGate1] [decimal](18, 2) NULL,
	[CostGate2] [decimal](18, 2) NULL,
	[CostGate3] [decimal](18, 2) NULL,
	[CostGateRevise] [decimal](18, 2) NULL,
	[CostGateRevise2] [decimal](18, 2) NULL,
	[CostGate4] [decimal](18, 2) NULL,
 CONSTRAINT [PK_TbTxnProjectGate] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

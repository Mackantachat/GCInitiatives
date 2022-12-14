/****** Object:  Table [dbo].[X_TbTxnPSRInfo]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbTxnPSRInfo](
	[ProjectID] [int] NULL,
	[RegisteredDate] [datetime] NULL,
	[Initiator] [nvarchar](max) NULL,
	[InitiatorByDisp] [nvarchar](max) NULL,
	[Approver] [nvarchar](max) NULL,
	[ApproverDisp] [nvarchar](max) NULL,
	[UnitNo] [nvarchar](max) NULL,
	[JFactor] [float] NULL,
	[SimpPaybackYear] [float] NULL,
	[IRR] [float] NULL,
	[PriorityID] [int] NULL,
	[KickoffDate] [datetime] NULL,
	[ProposeBudgetID] [int] NULL,
	[HazopLeader] [nvarchar](max) NULL,
	[HazopLeaderDisp] [nvarchar](max) NULL,
	[HazopDate] [datetime] NULL,
	[PSSRPlan] [datetime] NULL,
	[PSSRDate] [datetime] NULL,
	[LookbackDate] [datetime] NULL,
	[Note] [nvarchar](max) NULL,
	[BenefitVG] [float] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

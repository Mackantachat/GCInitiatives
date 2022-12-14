/****** Object:  Table [dbo].[ZZ_TbTxnPSRInfo]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnPSRInfo](
	[ProjectID] [int] NOT NULL,
	[RegisteredDate] [datetime] NULL,
	[Initiator] [nvarchar](255) NULL,
	[InitiatorByDisp] [nvarchar](255) NULL,
	[Approver] [nvarchar](255) NULL,
	[ApproverDisp] [nvarchar](255) NULL,
	[UnitNo] [nvarchar](2000) NULL,
	[JFactor] [decimal](18, 2) NULL,
	[SimpPaybackYear] [decimal](18, 2) NULL,
	[IRR] [decimal](18, 2) NULL,
	[PriorityID] [int] NULL,
	[KickoffDate] [datetime] NULL,
	[ProposeBudgetID] [int] NULL,
	[HazopLeader] [nvarchar](255) NULL,
	[HazopLeaderDisp] [nvarchar](255) NULL,
	[HazopDate] [datetime] NULL,
	[PSSRPlan] [datetime] NULL,
	[PSSRDate] [datetime] NULL,
	[LookbackDate] [datetime] NULL,
	[Note] [nvarchar](1000) NULL,
	[BenefitVG] [decimal](18, 2) NULL,
 CONSTRAINT [PK_TbTxnPSRInfo] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[PimGate]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PimGate](
	[PimGateId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[PimGateStatus] [nvarchar](max) NULL,
	[ReviseBudgetRevision] [int] NULL,
	[CostEstimate] [decimal](18, 2) NULL,
	[OverallCapex] [decimal](18, 2) NULL,
	[RequestOpex] [decimal](18, 2) NULL,
	[Benefit] [decimal](18, 2) NULL,
	[Irr] [decimal](18, 2) NULL,
	[SimplePayback] [decimal](18, 2) NULL,
	[Ram] [decimal](18, 2) NULL,
	[JFactor] [decimal](18, 2) NULL,
	[RequestPool] [bit] NULL,
	[Note] [nvarchar](max) NULL,
	[SimplefiedProject] [bit] NULL,
	[ReceivedOpexBudget] [decimal](18, 2) NULL,
	[ReceivedCapexGate2] [decimal](18, 2) NULL,
	[RequestCapexGate3] [decimal](18, 2) NULL,
	[AdditionalOpexBudget] [decimal](18, 2) NULL,
	[TieInLongLeadItemsBudget] [decimal](18, 2) NULL,
	[EmocStatus] [nvarchar](max) NULL,
	[ExecutionLookbackStatus] [nvarchar](max) NULL,
	[SapStatus] [nvarchar](max) NULL,
	[VacDate] [datetime2](7) NULL,
	[VacStatus] [nvarchar](max) NULL,
	[GateDate] [datetime2](7) NULL,
	[GateStatus] [nvarchar](max) NULL,
	[Gate] [int] NULL,
	[PicMomLink] [nvarchar](max) NULL,
	[PresentationLink] [nvarchar](max) NULL,
	[SubPicMomLink] [nvarchar](max) NULL,
	[VacCheckListLink] [nvarchar](max) NULL,
	[ProjectCharterLink] [nvarchar](max) NULL,
	[RequestPoolStatus] [nvarchar](max) NULL,
 CONSTRAINT [PK_PimGate] PRIMARY KEY CLUSTERED 
(
	[PimGateId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_PimGate_7920821754AB1ACD68A95BAD34760A02]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_PimGate_7920821754AB1ACD68A95BAD34760A02] ON [dbo].[PimGate]
(
	[InitiativeId] ASC
)
INCLUDE([AdditionalOpexBudget],[Benefit],[CostEstimate],[EmocStatus],[ExecutionLookbackStatus],[Gate],[GateDate],[GateStatus],[Irr],[JFactor],[Note],[OverallCapex],[PicMomLink],[PimGateStatus],[PresentationLink],[ProjectCharterLink],[Ram],[ReceivedCapexGate2],[ReceivedOpexBudget],[RequestCapexGate3],[RequestOpex],[RequestPool],[RequestPoolStatus],[ReviseBudgetRevision],[SapStatus],[SimplefiedProject],[SimplePayback],[SubPicMomLink],[TieInLongLeadItemsBudget],[VacCheckListLink],[VacDate],[VacStatus]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

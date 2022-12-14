/****** Object:  Table [dbo].[InitiativeStageDetail]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeStageDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeStageDetailId] [int] NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[Event] [nvarchar](max) NULL,
	[Process] [nvarchar](max) NULL,
	[FlowType] [nvarchar](max) NULL,
	[Subtype] [nvarchar](max) NULL,
	[CurrentStage] [nvarchar](max) NULL,
	[CurrentStatus] [nvarchar](max) NULL,
	[NextStage] [nvarchar](max) NULL,
	[NextStatus] [nvarchar](max) NULL,
	[ReviseStage] [nvarchar](max) NULL,
	[ReviseStatus] [nvarchar](max) NULL,
	[RejectStage] [nvarchar](max) NULL,
	[RejectStatus] [nvarchar](max) NULL,
	[BackwardStage] [nvarchar](max) NULL,
	[BackwardStatus] [nvarchar](max) NULL,
	[CancelStage] [nvarchar](max) NULL,
	[CancelStatus] [nvarchar](max) NULL,
	[Sequence] [decimal](18, 2) NOT NULL,
	[NextCondition] [nvarchar](max) NULL,
	[HistoryId] [int] NULL,
	[IsCreateType] [bit] NULL,
	[IsSwitchProcess] [bit] NULL,
	[PostStageStoredProcedure] [nvarchar](max) NULL,
	[PreStageStoredProcedure] [nvarchar](max) NULL,
	[CurrentActionInformation] [nvarchar](max) NULL,
	[CurrentStageDisplay] [nvarchar](max) NULL,
	[NextActionInformation] [nvarchar](max) NULL,
	[SwitchProcessStage] [nvarchar](max) NULL,
	[SwitchProcessStatus] [nvarchar](max) NULL,
 CONSTRAINT [PK_InitiativeStageDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_InitiativeStageDetail_DB86B9B60CB33ACF919E9BA38D622946]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_InitiativeStageDetail_DB86B9B60CB33ACF919E9BA38D622946] ON [dbo].[InitiativeStageDetail]
(
	[InitiativeId] ASC
)
INCLUDE([BackwardStage],[BackwardStatus],[CancelStage],[CancelStatus],[CurrentActionInformation],[CurrentStage],[CurrentStageDisplay],[CurrentStatus],[Event],[FlowType],[HistoryId],[InitiativeStageDetailId],[IsCreateType],[IsSwitchProcess],[NextActionInformation],[NextCondition],[NextStage],[NextStatus],[PostStageStoredProcedure],[PreStageStoredProcedure],[Process],[RejectStage],[RejectStatus],[ReviseStage],[ReviseStatus],[Sequence],[Subtype]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

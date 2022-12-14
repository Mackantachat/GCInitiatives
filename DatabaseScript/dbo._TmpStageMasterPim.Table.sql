/****** Object:  Table [dbo].[_TmpStageMasterPim]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_TmpStageMasterPim](
	[StageMasterId] [int] NOT NULL,
	[Event] [nvarchar](50) NOT NULL,
	[Process] [nvarchar](50) NOT NULL,
	[FlowType] [nvarchar](50) NOT NULL,
	[Subtype] [nvarchar](50) NOT NULL,
	[CurrentStage] [nvarchar](50) NULL,
	[CurrentStatus] [nvarchar](50) NOT NULL,
	[NextStage] [nvarchar](50) NULL,
	[NextStatus] [nvarchar](50) NULL,
	[ReviseStage] [nvarchar](50) NULL,
	[ReviseStatus] [nvarchar](50) NULL,
	[RejectStage] [nvarchar](50) NULL,
	[RejectStatus] [nvarchar](50) NULL,
	[BackwardStage] [nvarchar](1) NULL,
	[BackwardStatus] [nvarchar](1) NULL,
	[CancelStage] [nvarchar](1) NULL,
	[CancelStatus] [nvarchar](1) NULL,
	[Sequence] [nvarchar](50) NOT NULL,
	[NextCondition] [nvarchar](50) NOT NULL,
	[IsCreateType] [nvarchar](1) NULL,
	[IsSwitchProcess] [nvarchar](1) NULL,
	[PostStageStoredProcedure] [nvarchar](50) NULL,
	[PreStageStoredProcedure] [nvarchar](50) NULL,
	[CurrentActionInformation] [nvarchar](1) NULL,
	[CurrentStageDisplay] [nvarchar](1) NULL,
	[NextActionInformation] [nvarchar](50) NULL,
	[SwitchProcessStage] [nvarchar](1) NULL,
	[SwitchProcessStatus] [nvarchar](1) NULL,
	[Id] [int] NOT NULL,
	[StageMasterId2] [int] NOT NULL,
	[ActionType] [nvarchar](50) NOT NULL,
	[ActionBy] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO

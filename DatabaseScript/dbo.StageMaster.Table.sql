/****** Object:  Table [dbo].[StageMaster]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StageMaster](
	[StageMasterId] [int] IDENTITY(1,1) NOT NULL,
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
	[IsCreateType] [bit] NULL,
	[IsSwitchProcess] [bit] NULL,
	[PostStageStoredProcedure] [nvarchar](max) NULL,
	[PreStageStoredProcedure] [nvarchar](max) NULL,
	[CurrentActionInformation] [nvarchar](max) NULL,
	[CurrentStageDisplay] [nvarchar](max) NULL,
	[NextActionInformation] [nvarchar](max) NULL,
	[SwitchProcessStage] [nvarchar](max) NULL,
	[SwitchProcessStatus] [nvarchar](max) NULL,
 CONSTRAINT [PK_StageMaster] PRIMARY KEY CLUSTERED 
(
	[StageMasterId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

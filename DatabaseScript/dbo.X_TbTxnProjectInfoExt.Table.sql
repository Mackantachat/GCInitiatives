/****** Object:  Table [dbo].[X_TbTxnProjectInfoExt]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbTxnProjectInfoExt](
	[ProjectId] [int] NULL,
	[ProjectShortName] [nvarchar](max) NULL,
	[ProjectCategoryId] [nvarchar](max) NULL,
	[ProjectBackground] [nvarchar](max) NULL,
	[PlanUpliftStartDate] [datetime] NULL,
	[PlanLookbackDate] [datetime] NULL,
	[ActualLookbackDate] [datetime] NULL,
	[DiagramFilePath] [nvarchar](max) NULL,
	[PIRNo] [nvarchar](max) NULL,
	[PIRReviewer1] [nvarchar](max) NULL,
	[PIRReviewer1Disp] [nvarchar](max) NULL,
	[PIRReviewer2] [nvarchar](max) NULL,
	[PIRReviewer2Disp] [nvarchar](max) NULL,
	[PIRReviewer3] [nvarchar](max) NULL,
	[PIRReviewer3Disp] [nvarchar](max) NULL,
	[PIRReviewer4] [nvarchar](max) NULL,
	[PIRReviewer4Disp] [nvarchar](max) NULL,
	[PIRReviewer5] [nvarchar](max) NULL,
	[PIRReviewer5Disp] [nvarchar](max) NULL,
	[MCEndorseDate] [datetime] NULL,
	[LookbackStrategy] [int] NULL,
	[LookbackStatus] [nvarchar](max) NULL,
	[ProjectRiskOwner] [nvarchar](max) NULL,
	[ProjectRiskOwnerDisp] [nvarchar](max) NULL,
	[BPAsOfDate] [datetime] NULL,
	[SubmitBy] [nvarchar](max) NULL,
	[SubmitedDate] [datetime] NULL,
	[PublishBy] [nvarchar](max) NULL,
	[PublishedDate] [datetime] NULL,
	[RejectBy] [nvarchar](max) NULL,
	[RejectDate] [datetime] NULL,
	[ApproveBy] [nvarchar](max) NULL,
	[ApprovedDate] [datetime] NULL,
	[ReviseBy] [nvarchar](max) NULL,
	[ReviseDate] [datetime] NULL,
	[ScopeOfProject] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

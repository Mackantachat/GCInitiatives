/****** Object:  Table [dbo].[ZZ_TbTxnProjectInfoExt]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectInfoExt](
	[ProjectId] [int] NOT NULL,
	[ProjectShortName] [nvarchar](15) NULL,
	[ProjectCategoryId] [nvarchar](2) NULL,
	[ProjectBackground] [nvarchar](1000) NULL,
	[PlanUpliftStartDate] [datetime] NULL,
	[PlanLookbackDate] [datetime] NULL,
	[ActualLookbackDate] [datetime] NULL,
	[DiagramFilePath] [nvarchar](200) NULL,
	[PIRNo] [nvarchar](max) NULL,
	[PIRReviewer1] [nvarchar](30) NULL,
	[PIRReviewer1Disp] [nvarchar](100) NULL,
	[PIRReviewer2] [nvarchar](30) NULL,
	[PIRReviewer2Disp] [nvarchar](100) NULL,
	[PIRReviewer3] [nvarchar](30) NULL,
	[PIRReviewer3Disp] [nvarchar](100) NULL,
	[PIRReviewer4] [nvarchar](30) NULL,
	[PIRReviewer4Disp] [nvarchar](100) NULL,
	[PIRReviewer5] [nvarchar](30) NULL,
	[PIRReviewer5Disp] [nvarchar](100) NULL,
	[MCEndorseDate] [datetime] NULL,
	[LookbackStrategy] [int] NULL,
	[LookbackStatus] [nvarchar](1) NULL,
	[ProjectRiskOwner] [nvarchar](30) NULL,
	[ProjectRiskOwnerDisp] [nvarchar](100) NULL,
	[BPAsOfDate] [datetime] NULL,
	[SubmitBy] [nvarchar](100) NULL,
	[SubmitedDate] [datetime] NULL,
	[PublishBy] [nvarchar](100) NULL,
	[PublishedDate] [datetime] NULL,
	[RejectBy] [nvarchar](100) NULL,
	[RejectDate] [datetime] NULL,
	[ApproveBy] [nvarchar](100) NULL,
	[ApprovedDate] [datetime] NULL,
	[ReviseBy] [nvarchar](100) NULL,
	[ReviseDate] [datetime] NULL,
	[ScopeOfProject] [nvarchar](1000) NULL,
 CONSTRAINT [PK__TbTxnPro__761ABEF015702A09] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[IF_MOCTransaction]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IF_MOCTransaction](
	[ReqNo] [nvarchar](50) NULL,
	[MOCNo] [nvarchar](50) NULL,
	[MoCTypeID] [int] NULL,
	[ProjectName] [nvarchar](1000) NULL,
	[MOCChampion] [nvarchar](100) NULL,
	[Initiator] [nvarchar](100) NULL,
	[PlantID] [nvarchar](50) NULL,
	[CreateDate] [date] NULL,
	[StepID] [int] NULL,
	[ExpireDate] [date] NULL,
	[P1FinDate] [date] NULL,
	[P2FinDate] [date] NULL,
	[P3FinDate] [date] NULL,
	[P4FinDate] [date] NULL,
	[CompleteStartUpDate] [date] NULL,
	[UploadDate] [date] NULL,
	[MOCID] [nvarchar](100) NULL,
	[part] [nvarchar](9) NULL,
	[EasyTrackingID] [int] NULL,
	[MoCCategory] [int] NULL,
	[SHERepDM] [nvarchar](100) NULL,
	[SHERepDMDisp] [nvarchar](100) NULL,
	[SHERepReviewer] [nvarchar](100) NULL,
	[SHERepReviewerDisp] [nvarchar](100) NULL,
	[ProcessEngDM] [nvarchar](100) NULL,
	[ProcessEngDMDisp] [nvarchar](100) NULL,
	[ProcessEngReviewer] [nvarchar](100) NULL,
	[ProcessEngReviewerDisp] [nvarchar](100) NULL,
	[DeadlinePart2] [date] NULL,
	[DeadlinePart3] [date] NULL,
	[UnitName] [nvarchar](1000) NULL,
	[BasicDesignReviewDate] [date] NULL,
	[UpdateDate] [datetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[IF_MOCTransaction] ADD  DEFAULT (getdate()) FOR [UpdateDate]
GO

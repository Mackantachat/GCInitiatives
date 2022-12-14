/****** Object:  Table [dbo].[ZZ_TbTxnMilestoneHistory]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnMilestoneHistory](
	[ProjectID] [int] NOT NULL,
	[MilestoneID] [int] NOT NULL,
	[MilestoneName] [nvarchar](200) NULL,
	[PlanFinishDate] [datetime] NULL,
	[ActualFinishDate] [datetime] NULL,
	[ForecastDate] [datetime] NULL,
	[MilestoneGroup] [nvarchar](50) NULL,
	[IsActive] [bit] NULL
) ON [PRIMARY]
GO

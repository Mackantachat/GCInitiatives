/****** Object:  Table [dbo].[ZZ_TbTxnMilestone]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnMilestone](
	[ProjectID] [int] NOT NULL,
	[MilestoneID] [int] IDENTITY(1,1) NOT NULL,
	[MilestoneName] [nvarchar](200) NULL,
	[PlanFinishDate] [datetime] NULL,
	[ActualFinishDate] [datetime] NULL,
	[ForecastDate] [datetime] NULL,
	[MilestoneGroup] [nvarchar](50) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_TbTxnMilestone_1] PRIMARY KEY CLUSTERED 
(
	[MilestoneID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

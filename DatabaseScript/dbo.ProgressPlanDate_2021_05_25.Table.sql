/****** Object:  Table [dbo].[ProgressPlanDate_2021_05_25]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgressPlanDate_2021_05_25](
	[ProgressPlanDateId] [int] IDENTITY(1,1) NOT NULL,
	[ProgressPlanDateType] [nvarchar](max) NULL,
	[BasicStartDate] [datetime2](7) NULL,
	[BasicFinishDate] [datetime2](7) NULL,
	[ActualStartDate] [datetime2](7) NULL,
	[ActualFinishDate] [datetime2](7) NULL,
	[PocWeightPercent] [int] NULL,
	[InitiativeId] [int] NULL,
 CONSTRAINT [PK_ProgressPlanDate_2021_05_25] PRIMARY KEY CLUSTERED 
(
	[ProgressPlanDateId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

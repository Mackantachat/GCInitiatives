/****** Object:  Table [dbo].[ProgressPlanDate]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgressPlanDate](
	[ProgressPlanDateId] [int] IDENTITY(1,1) NOT NULL,
	[ProgressPlanDateType] [nvarchar](max) NULL,
	[BasicStartDate] [datetime2](7) NULL,
	[BasicFinishDate] [datetime2](7) NULL,
	[ActualStartDate] [datetime2](7) NULL,
	[ActualFinishDate] [datetime2](7) NULL,
	[PocWeightPercent] [int] NULL,
	[InitiativeId] [int] NULL,
 CONSTRAINT [PK_ProgressPlanDate] PRIMARY KEY CLUSTERED 
(
	[ProgressPlanDateId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_ProgressPlanDate_866D844FA4FC11028B6E2642AFF63476]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_ProgressPlanDate_866D844FA4FC11028B6E2642AFF63476] ON [dbo].[ProgressPlanDate]
(
	[InitiativeId] ASC,
	[PocWeightPercent] ASC
)
INCLUDE([ActualStartDate],[BasicFinishDate],[BasicStartDate],[ProgressPlanDateType]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

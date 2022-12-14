/****** Object:  Table [dbo].[ProgressPlanMontly]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgressPlanMontly](
	[ProgressPlanMontlyId] [int] IDENTITY(1,1) NOT NULL,
	[ProgressPlanId] [int] NULL,
	[InitiativeId] [int] NOT NULL,
	[ProgressPlanYear] [nvarchar](max) NULL,
	[WorkProgress] [nvarchar](max) NULL,
	[PlanActual] [nvarchar](max) NULL,
	[Month1] [decimal](18, 2) NULL,
	[Month2] [decimal](18, 2) NULL,
	[Month3] [decimal](18, 2) NULL,
	[Month4] [decimal](18, 2) NULL,
	[Month5] [decimal](18, 2) NULL,
	[Month6] [decimal](18, 2) NULL,
	[Month7] [decimal](18, 2) NULL,
	[Month8] [decimal](18, 2) NULL,
	[Month9] [decimal](18, 2) NULL,
	[Month10] [decimal](18, 2) NULL,
	[Month11] [decimal](18, 2) NULL,
	[Month12] [decimal](18, 2) NULL,
 CONSTRAINT [PK_ProgressPlanMontly] PRIMARY KEY CLUSTERED 
(
	[ProgressPlanMontlyId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

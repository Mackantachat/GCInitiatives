/****** Object:  Table [dbo].[ProgressPlan_2021_06_14]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgressPlan_2021_06_14](
	[ProgressPlanId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[Jan] [decimal](18, 2) NULL,
	[Feb] [decimal](18, 2) NULL,
	[Mar] [decimal](18, 2) NULL,
	[Apr] [decimal](18, 2) NULL,
	[May] [decimal](18, 2) NULL,
	[Jun] [decimal](18, 2) NULL,
	[Jul] [decimal](18, 2) NULL,
	[Aug] [decimal](18, 2) NULL,
	[Sep] [decimal](18, 2) NULL,
	[Oct] [decimal](18, 2) NULL,
	[Nov] [decimal](18, 2) NULL,
	[Dec] [decimal](18, 2) NULL,
	[PlanActual] [nvarchar](max) NULL,
	[ProgressPlanType] [nvarchar](max) NULL,
	[Year] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

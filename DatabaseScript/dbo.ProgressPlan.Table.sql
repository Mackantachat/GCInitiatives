/****** Object:  Table [dbo].[ProgressPlan]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgressPlan](
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
	[Year] [nvarchar](max) NULL,
 CONSTRAINT [PK_ProgressPlan] PRIMARY KEY CLUSTERED 
(
	[ProgressPlanId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_ProgressPlan_DA2A5754D476F7CEC63CFE1A84776EF8]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_ProgressPlan_DA2A5754D476F7CEC63CFE1A84776EF8] ON [dbo].[ProgressPlan]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ZZ_TbTxnProjectPlanHistory]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectPlanHistory](
	[ProjectID] [int] NOT NULL,
	[EngPlanStart] [datetime] NULL,
	[EngPlanEnd] [datetime] NULL,
	[EngActStart] [datetime] NULL,
	[EngActEnd] [datetime] NULL,
	[ProcPlanStart] [datetime] NULL,
	[ProcPlanEnd] [datetime] NULL,
	[ProcActStart] [datetime] NULL,
	[ProcActEnd] [datetime] NULL,
	[ConsPlanStart] [datetime] NULL,
	[ConsPlanEnd] [datetime] NULL,
	[ConsActStart] [datetime] NULL,
	[ConsActEnd] [datetime] NULL,
	[CommPlanStart] [datetime] NULL,
	[CommPlanEnd] [datetime] NULL,
	[CommActStart] [datetime] NULL,
	[CommActEnd] [datetime] NULL,
 CONSTRAINT [PK_TbTxnProjectPlanHistory] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

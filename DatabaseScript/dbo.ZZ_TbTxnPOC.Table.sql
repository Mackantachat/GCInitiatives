/****** Object:  Table [dbo].[ZZ_TbTxnPOC]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnPOC](
	[ProjectID] [int] NOT NULL,
	[PlanStartDate] [datetime] NULL,
	[PlanFinishDate] [datetime] NULL,
	[ActualStartDate] [datetime] NULL,
	[ActualFinishDate] [datetime] NULL,
	[WeightEngineering] [decimal](18, 2) NULL,
	[WeightProcurement] [decimal](18, 2) NULL,
	[WeightConstruction] [decimal](18, 2) NULL,
	[WeightCommissioning] [decimal](18, 2) NULL,
 CONSTRAINT [PK_TbTxnPOC] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

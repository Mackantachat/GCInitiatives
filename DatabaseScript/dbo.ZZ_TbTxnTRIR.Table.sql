/****** Object:  Table [dbo].[ZZ_TbTxnTRIR]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnTRIR](
	[ProjectID] [int] NOT NULL,
	[ActualManHour] [decimal](18, 2) NULL,
	[ActualCase] [decimal](18, 2) NULL,
	[PlanKPICase] [decimal](18, 2) NULL,
 CONSTRAINT [PK_TbTxnTRIR] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

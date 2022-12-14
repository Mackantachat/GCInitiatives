/****** Object:  Table [dbo].[ZZ_TbTxnActualRollingPlan]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnActualRollingPlan](
	[ProjectNo] [nvarchar](255) NOT NULL,
	[PlanYear] [nvarchar](50) NOT NULL,
	[PlanVersion] [nvarchar](50) NOT NULL,
	[PreviousYear] [nvarchar](255) NULL,
	[Jan] [nvarchar](255) NULL,
	[Feb] [nvarchar](255) NULL,
	[Mar] [nvarchar](255) NULL,
	[Apr] [nvarchar](255) NULL,
	[May] [nvarchar](255) NULL,
	[Jun] [nvarchar](255) NULL,
	[Jul] [nvarchar](255) NULL,
	[Aug] [nvarchar](255) NULL,
	[Sep] [nvarchar](255) NULL,
	[Oct] [nvarchar](255) NULL,
	[Nov] [nvarchar](255) NULL,
	[Dec] [nvarchar](255) NULL,
	[CurrentY1] [nvarchar](255) NULL,
	[CurrentY2] [nvarchar](255) NULL,
	[CurrentY3] [nvarchar](255) NULL,
	[CurrentY4] [nvarchar](255) NULL,
	[CurrentY5] [nvarchar](255) NULL,
	[FutureRemainingYear] [nvarchar](255) NULL,
	[Currency] [nvarchar](255) NULL,
	[CurrencyType] [nvarchar](255) NULL,
 CONSTRAINT [PK_TbTxnActualRollingPlan] PRIMARY KEY CLUSTERED 
(
	[ProjectNo] ASC,
	[PlanYear] ASC,
	[PlanVersion] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

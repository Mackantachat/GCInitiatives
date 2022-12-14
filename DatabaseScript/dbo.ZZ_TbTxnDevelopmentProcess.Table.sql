/****** Object:  Table [dbo].[ZZ_TbTxnDevelopmentProcess]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnDevelopmentProcess](
	[ProjectID] [int] NOT NULL,
	[Gate0Plan] [nvarchar](50) NULL,
	[Gate1Plan] [nvarchar](50) NULL,
	[Gate2Plan] [nvarchar](50) NULL,
	[Gate3Plan] [nvarchar](50) NULL,
	[Gate4Plan] [nvarchar](50) NULL,
	[Phase1StartPlan] [nvarchar](50) NULL,
	[Phase1EndPlan] [nvarchar](50) NULL,
	[Phase2StartPlan] [nvarchar](50) NULL,
	[Phase2EndPlan] [nvarchar](50) NULL,
	[Phase3StartPlan] [nvarchar](50) NULL,
	[Phase3EndPlan] [nvarchar](50) NULL,
	[Phase4StartPlan] [nvarchar](50) NULL,
	[Phase4EndPlan] [nvarchar](50) NULL,
	[Summary] [ntext] NULL,
	[NextStep] [ntext] NULL,
 CONSTRAINT [PK_TbTxnDevelopmentProcess] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

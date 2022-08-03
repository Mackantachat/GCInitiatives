/****** Object:  Table [dbo].[_Revised_BG_2021_07_01]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_Revised_BG_2021_07_01](
	[Runid] [nvarchar](50) NOT NULL,
	[InitiativeCode] [nvarchar](50) NOT NULL,
	[Revistion] [nvarchar](50) NOT NULL,
	[TransactionType] [nvarchar](50) NOT NULL,
	[Program] [nvarchar](50) NOT NULL,
	[Position_ID] [nvarchar](50) NOT NULL,
	[ApprovalYear] [int] NOT NULL,
	[WBS] [nvarchar](50) NULL,
	[BudgetAmount] [int] NOT NULL
) ON [PRIMARY]
GO

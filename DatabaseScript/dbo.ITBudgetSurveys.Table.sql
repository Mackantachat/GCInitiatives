/****** Object:  Table [dbo].[ITBudgetSurveys]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ITBudgetSurveys](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[CapexSummary] [decimal](18, 2) NULL,
	[OpexSummary] [decimal](18, 2) NULL,
	[CapexNo] [nvarchar](max) NULL,
	[OpexNo] [nvarchar](max) NULL,
	[AdvancedCapexChoice] [nvarchar](max) NULL,
 CONSTRAINT [PK_ITBudgetSurveys] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Outstandings_20210706_1606]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Outstandings_20210706_1606](
	[Id] [int] NOT NULL,
	[InitiativeId] [int] NULL,
	[IsDeleted] [bit] NULL,
	[Year] [int] NULL,
	[Month] [int] NULL,
	[BudgetBaht] [decimal](18, 2) NULL,
	[ActualBaht] [decimal](18, 2) NULL,
	[PrItemBaht] [decimal](18, 2) NULL,
	[PoItemBaht] [decimal](18, 2) NULL,
	[CommitmentBaht] [decimal](18, 2) NULL,
	[Contingency] [decimal](18, 2) NULL,
	[EstimateAtCompletion] [decimal](18, 2) NULL,
 CONSTRAINT [PK_Outstandings_20210706_1606] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

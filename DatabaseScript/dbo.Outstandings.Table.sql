/****** Object:  Table [dbo].[Outstandings]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Outstandings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
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
 CONSTRAINT [PK_Outstandings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_Outstandings_DA2A5754D476F7CEC63CFE1A84776EF8]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_Outstandings_DA2A5754D476F7CEC63CFE1A84776EF8] ON [dbo].[Outstandings]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

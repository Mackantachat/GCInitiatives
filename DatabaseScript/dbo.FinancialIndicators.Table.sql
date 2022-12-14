/****** Object:  Table [dbo].[FinancialIndicators]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FinancialIndicators](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Year] [nvarchar](max) NULL,
	[Revenue] [decimal](18, 2) NULL,
	[Ebitda] [decimal](18, 2) NULL,
	[Capex] [decimal](18, 2) NULL,
	[Opex] [decimal](18, 2) NULL,
	[Valuation] [decimal](18, 2) NULL,
	[InitiativeId] [int] NOT NULL,
 CONSTRAINT [PK_FinancialIndicators] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_FinancialIndicators_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_FinancialIndicators_InitiativeId] ON [dbo].[FinancialIndicators]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[FinancialIndicators]  WITH CHECK ADD  CONSTRAINT [FK_FinancialIndicators_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[FinancialIndicators] CHECK CONSTRAINT [FK_FinancialIndicators_Initiatives_InitiativeId]
GO

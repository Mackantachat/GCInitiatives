/****** Object:  Table [dbo].[Financials]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Financials](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AvgRevenue] [decimal](18, 2) NULL,
	[AvgEbitda] [decimal](18, 2) NULL,
	[TotalCapex] [decimal](18, 2) NULL,
	[TotalOpex] [decimal](18, 2) NULL,
	[TotalValuation] [decimal](18, 2) NULL,
	[InitiativeId] [int] NOT NULL,
 CONSTRAINT [PK_Financials] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_Financials_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_Financials_InitiativeId] ON [dbo].[Financials]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Financials]  WITH CHECK ADD  CONSTRAINT [FK_Financials_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Financials] CHECK CONSTRAINT [FK_Financials_Initiatives_InitiativeId]
GO

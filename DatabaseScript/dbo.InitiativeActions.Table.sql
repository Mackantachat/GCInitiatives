/****** Object:  Table [dbo].[InitiativeActions]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeActions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ActionBy] [nvarchar](255) NULL,
	[Action] [nvarchar](255) NULL,
	[Position] [nvarchar](255) NULL,
	[Status] [nvarchar](100) NULL,
	[Stage] [nvarchar](100) NULL,
	[InitiativeId] [int] NOT NULL,
	[ActionByName] [nvarchar](255) NULL,
	[ConditionType] [nvarchar](255) NULL,
	[Counter] [int] NOT NULL,
	[Indicator] [nvarchar](255) NULL,
	[ActionResult] [nvarchar](255) NULL,
	[FlowType] [nvarchar](255) NULL,
	[InitiativeStageDetailId] [int] NULL,
	[IsInactive] [bit] NULL,
	[ActionDate] [datetime2](7) NULL,
	[SwitchToProcess] [nvarchar](255) NULL,
 CONSTRAINT [PK_InitiativeActions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_InitiativeActions_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_InitiativeActions_InitiativeId] ON [dbo].[InitiativeActions]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_InitiativeActions_1DFA31148090933C3FB59CDCA6EC973D]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_InitiativeActions_1DFA31148090933C3FB59CDCA6EC973D] ON [dbo].[InitiativeActions]
(
	[ActionResult] ASC,
	[ConditionType] ASC,
	[IsInactive] ASC
)
INCLUDE([ActionBy],[ActionByName],[InitiativeId]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_InitiativeActions_8BA514A0076EF22BAFA24FF2A157B16E]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_InitiativeActions_8BA514A0076EF22BAFA24FF2A157B16E] ON [dbo].[InitiativeActions]
(
	[ActionBy] ASC
)
INCLUDE([InitiativeId]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[InitiativeActions] ADD  DEFAULT ((0)) FOR [Counter]
GO
ALTER TABLE [dbo].[InitiativeActions]  WITH CHECK ADD  CONSTRAINT [FK_InitiativeActions_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[InitiativeActions] CHECK CONSTRAINT [FK_InitiativeActions_Initiatives_InitiativeId]
GO

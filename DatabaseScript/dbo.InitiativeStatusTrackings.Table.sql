/****** Object:  Table [dbo].[InitiativeStatusTrackings]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeStatusTrackings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Status] [nvarchar](max) NULL,
	[Stage] [nvarchar](max) NULL,
	[ApprovedBy] [nvarchar](max) NULL,
	[ApprovedDate] [nvarchar](max) NULL,
	[Sequence] [decimal](18, 2) NULL,
	[ProcessType] [nvarchar](max) NULL,
	[HistoryId] [int] NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[RunningSequence] [decimal](18, 2) NULL,
	[SubType] [nvarchar](max) NULL,
	[FlowType] [nvarchar](max) NULL,
 CONSTRAINT [PK_InitiativeStatusTrackings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_InitiativeStatusTrackings_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_InitiativeStatusTrackings_InitiativeId] ON [dbo].[InitiativeStatusTrackings]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_InitiativeStatusTrackings_1328F7910BFA9AE3DC21C9FADD41E83A]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_InitiativeStatusTrackings_1328F7910BFA9AE3DC21C9FADD41E83A] ON [dbo].[InitiativeStatusTrackings]
(
	[InitiativeId] ASC
)
INCLUDE([ApprovedBy],[ApprovedDate],[FlowType],[HistoryId],[ProcessType],[RunningSequence],[Sequence],[Stage],[Status],[SubType]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[InitiativeStatusTrackings]  WITH CHECK ADD  CONSTRAINT [FK_InitiativeStatusTrackings_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[InitiativeStatusTrackings] CHECK CONSTRAINT [FK_InitiativeStatusTrackings_Initiatives_InitiativeId]
GO

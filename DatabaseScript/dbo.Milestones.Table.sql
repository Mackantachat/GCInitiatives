/****** Object:  Table [dbo].[Milestones]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Milestones](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Detail] [nvarchar](max) NULL,
	[KeyDeliverable] [nvarchar](max) NULL,
	[ActionBy] [nvarchar](max) NULL,
	[FromDate] [datetime2](7) NULL,
	[ToDate] [datetime2](7) NULL,
	[MilestoneStatus] [nvarchar](max) NULL,
	[InitiativeId] [int] NOT NULL,
	[IsCpiDetail] [bit] NOT NULL,
 CONSTRAINT [PK_Milestones] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_Milestones_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_Milestones_InitiativeId] ON [dbo].[Milestones]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Milestones] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsCpiDetail]
GO
ALTER TABLE [dbo].[Milestones]  WITH CHECK ADD  CONSTRAINT [FK_Milestones_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Milestones] CHECK CONSTRAINT [FK_Milestones_Initiatives_InitiativeId]
GO

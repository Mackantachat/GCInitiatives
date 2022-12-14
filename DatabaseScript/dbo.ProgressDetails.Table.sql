/****** Object:  Table [dbo].[ProgressDetails]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProgressDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Milestone] [nvarchar](max) NULL,
	[KeyDeliverable] [nvarchar](max) NULL,
	[Start] [datetime2](7) NULL,
	[PlanFinish] [datetime2](7) NULL,
	[ActualFinish] [datetime2](7) NULL,
	[Activity] [nvarchar](max) NULL,
	[InitiativeId] [int] NULL,
	[InitiativeCode] [nvarchar](max) NULL,
 CONSTRAINT [PK_ProgressDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_ProgressDetails_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_ProgressDetails_InitiativeId] ON [dbo].[ProgressDetails]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ProgressDetails]  WITH CHECK ADD  CONSTRAINT [FK_ProgressDetails_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ProgressDetails] CHECK CONSTRAINT [FK_ProgressDetails_Initiatives_InitiativeId]
GO

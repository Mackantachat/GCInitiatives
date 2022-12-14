/****** Object:  Table [dbo].[InitiativeCoDevelopers]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeCoDevelopers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CoDeveloperName] [nvarchar](255) NULL,
	[InitiativeId] [int] NOT NULL,
 CONSTRAINT [PK_InitiativeCoDevelopers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_InitiativeCoDevelopers_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_InitiativeCoDevelopers_InitiativeId] ON [dbo].[InitiativeCoDevelopers]
(
	[InitiativeId] ASC,
	[CoDeveloperName] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[InitiativeCoDevelopers]  WITH CHECK ADD  CONSTRAINT [FK_InitiativeCoDevelopers_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[InitiativeCoDevelopers] CHECK CONSTRAINT [FK_InitiativeCoDevelopers_Initiatives_InitiativeId]
GO

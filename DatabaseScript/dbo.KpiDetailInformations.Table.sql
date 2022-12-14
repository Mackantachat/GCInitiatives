/****** Object:  Table [dbo].[KpiDetailInformations]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KpiDetailInformations](
	[Target] [nvarchar](max) NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Frequency] [nvarchar](max) NULL,
	[InitiativeId] [int] NOT NULL,
	[Kpis] [nvarchar](max) NULL,
 CONSTRAINT [PK_KpiDetailInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_KpiDetailInformations_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_KpiDetailInformations_InitiativeId] ON [dbo].[KpiDetailInformations]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[KpiDetailInformations] ADD  DEFAULT ((0)) FOR [InitiativeId]
GO
ALTER TABLE [dbo].[KpiDetailInformations]  WITH CHECK ADD  CONSTRAINT [FK_KpiDetailInformations_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[KpiDetailInformations] CHECK CONSTRAINT [FK_KpiDetailInformations_Initiatives_InitiativeId]
GO

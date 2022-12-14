/****** Object:  Table [dbo].[ShareBenefitWorkstreams]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShareBenefitWorkstreams](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Workstream] [nvarchar](200) NULL,
	[Percent] [decimal](18, 2) NULL,
	[InitiativeId] [int] NOT NULL,
 CONSTRAINT [PK_ShareBenefitWorkstreams] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_ShareBenefitWorkstreams_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_ShareBenefitWorkstreams_InitiativeId] ON [dbo].[ShareBenefitWorkstreams]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ShareBenefitWorkstreams] ADD  DEFAULT ((0)) FOR [InitiativeId]
GO
ALTER TABLE [dbo].[ShareBenefitWorkstreams]  WITH CHECK ADD  CONSTRAINT [FK_ShareBenefitWorkstreams_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ShareBenefitWorkstreams] CHECK CONSTRAINT [FK_ShareBenefitWorkstreams_Initiatives_InitiativeId]
GO

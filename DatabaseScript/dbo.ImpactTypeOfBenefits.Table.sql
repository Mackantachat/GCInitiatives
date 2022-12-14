/****** Object:  Table [dbo].[ImpactTypeOfBenefits]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImpactTypeOfBenefits](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ImpactTypeOfBenefitTable] [nvarchar](100) NULL,
	[TypeOfBenefit] [nvarchar](100) NULL,
	[VersionPrice] [nvarchar](100) NULL,
	[RunRate] [decimal](18, 3) NULL,
	[Month1] [decimal](18, 3) NULL,
	[Month2] [decimal](18, 3) NULL,
	[Month3] [decimal](18, 3) NULL,
	[Month4] [decimal](18, 3) NULL,
	[Month5] [decimal](18, 3) NULL,
	[Month6] [decimal](18, 3) NULL,
	[Month7] [decimal](18, 3) NULL,
	[Month8] [decimal](18, 3) NULL,
	[Month9] [decimal](18, 3) NULL,
	[Month10] [decimal](18, 3) NULL,
	[Month11] [decimal](18, 3) NULL,
	[Month12] [decimal](18, 3) NULL,
	[Month13] [decimal](18, 3) NULL,
	[Month14] [decimal](18, 3) NULL,
	[Month15] [decimal](18, 3) NULL,
	[Month16] [decimal](18, 3) NULL,
	[Month17] [decimal](18, 3) NULL,
	[Month18] [decimal](18, 3) NULL,
	[Month19] [decimal](18, 3) NULL,
	[Month20] [decimal](18, 3) NULL,
	[Month21] [decimal](18, 3) NULL,
	[Month22] [decimal](18, 3) NULL,
	[Month23] [decimal](18, 3) NULL,
	[Month24] [decimal](18, 3) NULL,
	[Month25] [decimal](18, 3) NULL,
	[Month26] [decimal](18, 3) NULL,
	[Month27] [decimal](18, 3) NULL,
	[Month28] [decimal](18, 3) NULL,
	[Month29] [decimal](18, 3) NULL,
	[Month30] [decimal](18, 3) NULL,
	[Month31] [decimal](18, 3) NULL,
	[Month32] [decimal](18, 3) NULL,
	[Month33] [decimal](18, 3) NULL,
	[Month34] [decimal](18, 3) NULL,
	[Month35] [decimal](18, 3) NULL,
	[Month36] [decimal](18, 3) NULL,
	[InitiativeId] [int] NOT NULL,
	[FixedFX] [decimal](18, 3) NULL,
	[InitiativeCode] [nvarchar](50) NULL,
	[currencyFloatFx] [nvarchar](100) NULL,
 CONSTRAINT [PK_ImpactTypeOfBenefits] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_ImpactTypeOfBenefits_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_ImpactTypeOfBenefits_InitiativeId] ON [dbo].[ImpactTypeOfBenefits]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_ImpactTypeOfBenefits_89312FD72D062ADE100070D484B41EBF]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_ImpactTypeOfBenefits_89312FD72D062ADE100070D484B41EBF] ON [dbo].[ImpactTypeOfBenefits]
(
	[ImpactTypeOfBenefitTable] ASC,
	[VersionPrice] ASC
)
INCLUDE([currencyFloatFx],[FixedFX],[InitiativeCode],[InitiativeId],[Month1],[Month10],[Month11],[Month12],[Month13],[Month14],[Month15],[Month16],[Month17],[Month18],[Month19],[Month2],[Month20],[Month21],[Month22],[Month23],[Month24],[Month25],[Month26],[Month27],[Month28],[Month29],[Month3],[Month30],[Month31],[Month32],[Month33],[Month34],[Month35],[Month36],[Month4],[Month5],[Month6],[Month7],[Month8],[Month9],[RunRate],[TypeOfBenefit]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_ImpactTypeOfBenefits_9B9E036D95B50D9DEE6B735B0C21246F]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_ImpactTypeOfBenefits_9B9E036D95B50D9DEE6B735B0C21246F] ON [dbo].[ImpactTypeOfBenefits]
(
	[ImpactTypeOfBenefitTable] ASC,
	[RunRate] ASC
)
INCLUDE([InitiativeId]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ImpactTypeOfBenefits] ADD  CONSTRAINT [DF__ImpactTyp__Initi__05D8E0BE]  DEFAULT ((0)) FOR [InitiativeId]
GO

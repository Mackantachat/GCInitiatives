/****** Object:  Table [dbo].[ImpactTrackings]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImpactTrackings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FinancialImpactArea] [nvarchar](200) NULL,
	[HaveShareBenefit] [bit] NOT NULL,
	[IL5FloatFxRecurring] [decimal](18, 3) NULL,
	[IL5RunRateRecurring] [decimal](18, 3) NULL,
	[IL5FloatFxOnetime] [decimal](18, 3) NULL,
	[IL5RunRateOnetime] [decimal](18, 3) NULL,
	[FirstRunRateMonth] [datetime2](7) NULL,
	[AutoCalculate] [bit] NOT NULL,
	[ImpiemantCost] [bit] NOT NULL,
	[Remark1] [nvarchar](500) NULL,
	[Remark2] [nvarchar](500) NULL,
	[Remark3] [nvarchar](500) NULL,
	[Remark4] [nvarchar](500) NULL,
	[Remark5] [nvarchar](500) NULL,
	[InitiativeId] [int] NOT NULL,
	[Explanation] [nvarchar](max) NULL,
	[ToComment] [nvarchar](max) NULL,
	[IL4RunRateOnetime] [decimal](18, 3) NULL,
	[IL4RunRateRecurring] [decimal](18, 3) NULL,
	[IL5FixedFxOnetime] [decimal](18, 3) NULL,
	[IL5FixedFxRecurring] [decimal](18, 3) NULL,
	[TotalOnetime] [decimal](18, 3) NULL,
	[TotalRecurring] [decimal](18, 3) NULL,
	[TotalCostOPEX] [decimal](18, 3) NULL,
	[InitiativeCode] [nvarchar](50) NULL,
	[SIL4Achievement] [nvarchar](10) NULL,
	[SIL5Achievement] [nvarchar](10) NULL,
	[IndirectBenefit] [bit] NOT NULL,
	[ContactIO] [nvarchar](500) NULL,
	[ContactIOBy] [nvarchar](500) NULL,
	[LastApprovedIL4Date] [datetime2](7) NULL,
	[LastApprovedIL5Date] [datetime2](7) NULL,
	[FirstApprovedIL4Date] [datetime2](7) NULL,
	[LastSubmittedSIL4Date] [datetime2](7) NULL,
	[LastSubmittedSIL5Date] [datetime2](7) NULL,
 CONSTRAINT [PK_ImpactTrackings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_ImpactTrackings_InitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_ImpactTrackings_InitiativeId] ON [dbo].[ImpactTrackings]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_ImpactTrackings_7E5A1D589D51D7FBF1029A1D92E16D06]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_ImpactTrackings_7E5A1D589D51D7FBF1029A1D92E16D06] ON [dbo].[ImpactTrackings]
(
	[IL5FixedFxOnetime] ASC
)
INCLUDE([InitiativeId]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ImpactTrackings] ADD  CONSTRAINT [DF__ImpactTra__Indir__7B264821]  DEFAULT (CONVERT([bit],(0))) FOR [IndirectBenefit]
GO
ALTER TABLE [dbo].[ImpactTrackings]  WITH CHECK ADD  CONSTRAINT [FK_ImpactTrackings_Initiatives_InitiativeId] FOREIGN KEY([InitiativeId])
REFERENCES [dbo].[Initiatives] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ImpactTrackings] CHECK CONSTRAINT [FK_ImpactTrackings_Initiatives_InitiativeId]
GO

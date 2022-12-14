/****** Object:  Table [dbo].[ZZ_TbTxnProjectRiskFactor]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectRiskFactor](
	[ProjectId] [int] NOT NULL,
	[VersionNo] [int] NOT NULL,
	[RiskNo] [int] NOT NULL,
	[Phase] [nvarchar](20) NOT NULL,
	[RiskFactor] [nvarchar](1000) NOT NULL,
	[Objective] [nvarchar](1000) NULL,
	[Likelihood] [int] NULL,
	[LikelihoodPercent] [decimal](18, 1) NULL,
	[Impact] [int] NULL,
	[ImpactPercent] [decimal](18, 1) NULL,
 CONSTRAINT [PK__TbTxnPro__64358F543A02903A] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[VersionNo] ASC,
	[RiskNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnProjectRiskFactor]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnProj__Impac__638EB5B2] FOREIGN KEY([Impact])
REFERENCES [dbo].[ZZ_TbMstRiskImpact] ([Level])
GO
ALTER TABLE [dbo].[ZZ_TbTxnProjectRiskFactor] CHECK CONSTRAINT [FK__TbTxnProj__Impac__638EB5B2]
GO
ALTER TABLE [dbo].[ZZ_TbTxnProjectRiskFactor]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnProj__Likel__6482D9EB] FOREIGN KEY([Likelihood])
REFERENCES [dbo].[ZZ_TbMstRiskLikelihood] ([Level])
GO
ALTER TABLE [dbo].[ZZ_TbTxnProjectRiskFactor] CHECK CONSTRAINT [FK__TbTxnProj__Likel__6482D9EB]
GO
ALTER TABLE [dbo].[ZZ_TbTxnProjectRiskFactor]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnProjectRisk__629A9179] FOREIGN KEY([ProjectId], [VersionNo])
REFERENCES [dbo].[ZZ_TbTxnProjectRiskVersion] ([ProjectId], [VersionNo])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ZZ_TbTxnProjectRiskFactor] CHECK CONSTRAINT [FK__TbTxnProjectRisk__629A9179]
GO

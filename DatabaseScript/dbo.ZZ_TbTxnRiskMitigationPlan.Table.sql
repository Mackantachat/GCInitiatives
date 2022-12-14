/****** Object:  Table [dbo].[ZZ_TbTxnRiskMitigationPlan]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnRiskMitigationPlan](
	[ProjectId] [int] NOT NULL,
	[VersionNo] [int] NOT NULL,
	[RiskNo] [int] NOT NULL,
	[Year] [int] NOT NULL,
	[Month] [int] NOT NULL,
	[MitigationPlan] [nvarchar](1000) NOT NULL,
	[TargetCompleteDate] [datetime] NULL,
	[ActualCompleteDate] [datetime] NULL,
	[Remark] [nvarchar](1000) NULL,
	[Status] [nvarchar](60) NULL,
	[VersionPublish] [nvarchar](1) NULL,
	[RiskOrder] [int] NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](100) NULL,
	[LastModifiedDate] [datetime] NULL,
	[LastModifiedBy] [nvarchar](100) NULL,
 CONSTRAINT [PK__TbTxnRis__39D563EB3FBB6990] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[VersionNo] ASC,
	[RiskNo] ASC,
	[Year] ASC,
	[Month] ASC,
	[MitigationPlan] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnRiskMitigationPlan]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnRiskMitigat__69478F08] FOREIGN KEY([ProjectId], [VersionNo], [RiskNo])
REFERENCES [dbo].[ZZ_TbTxnProjectRiskFactor] ([ProjectId], [VersionNo], [RiskNo])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ZZ_TbTxnRiskMitigationPlan] CHECK CONSTRAINT [FK__TbTxnRiskMitigat__69478F08]
GO

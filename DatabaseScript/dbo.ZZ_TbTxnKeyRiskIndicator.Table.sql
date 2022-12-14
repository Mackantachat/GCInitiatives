/****** Object:  Table [dbo].[ZZ_TbTxnKeyRiskIndicator]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnKeyRiskIndicator](
	[ProjectId] [int] NOT NULL,
	[VersionNo] [int] NOT NULL,
	[RiskNo] [int] NOT NULL,
	[Year] [int] NOT NULL,
	[Month] [int] NOT NULL,
	[KRI] [nvarchar](1000) NOT NULL,
	[Target] [nvarchar](1000) NULL,
	[Tolerance] [nvarchar](1000) NULL,
	[Status] [nvarchar](60) NULL,
	[AlertLevel] [nvarchar](10) NULL,
	[VersionPublish] [nvarchar](1) NULL,
	[RiskOrder] [int] NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](100) NULL,
	[LastModifiedDate] [datetime] NULL,
	[LastModifiedBy] [nvarchar](100) NULL,
 CONSTRAINT [PK__TbTxnKey__481482572E90DD8E] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[VersionNo] ASC,
	[RiskNo] ASC,
	[Year] ASC,
	[Month] ASC,
	[KRI] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnKeyRiskIndicator]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnKeyRiskIndi__450A2E92] FOREIGN KEY([ProjectId], [VersionNo], [RiskNo])
REFERENCES [dbo].[ZZ_TbTxnProjectRiskFactor] ([ProjectId], [VersionNo], [RiskNo])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ZZ_TbTxnKeyRiskIndicator] CHECK CONSTRAINT [FK__TbTxnKeyRiskIndi__450A2E92]
GO

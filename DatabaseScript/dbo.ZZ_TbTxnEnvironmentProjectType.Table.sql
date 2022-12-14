/****** Object:  Table [dbo].[ZZ_TbTxnEnvironmentProjectType]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnEnvironmentProjectType](
	[ProjectId] [int] NOT NULL,
	[EnvProjectTypeId] [int] NOT NULL,
	[Other] [nvarchar](1000) NULL,
 CONSTRAINT [PK__TbTxnEnv__9923EA9F38EE7070] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[EnvProjectTypeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnEnvironmentProjectType]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnEnvi__EnvPr__44160A59] FOREIGN KEY([EnvProjectTypeId])
REFERENCES [dbo].[ZZ_TbMstEnvironmentProjectType] ([Id])
GO
ALTER TABLE [dbo].[ZZ_TbTxnEnvironmentProjectType] CHECK CONSTRAINT [FK__TbTxnEnvi__EnvPr__44160A59]
GO

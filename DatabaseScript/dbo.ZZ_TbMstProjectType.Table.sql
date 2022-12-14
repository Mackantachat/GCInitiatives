/****** Object:  Table [dbo].[ZZ_TbMstProjectType]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstProjectType](
	[ProjectTypeID] [int] NOT NULL,
	[ProjectTypeName] [nvarchar](50) NULL,
	[InvestmentTypeID] [int] NULL,
	[ProcessTypeID] [int] NULL,
 CONSTRAINT [PK_TbMstProjectType] PRIMARY KEY CLUSTERED 
(
	[ProjectTypeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbMstProjectType]  WITH CHECK ADD  CONSTRAINT [FK__TbMstProj__Inves__300F11AC] FOREIGN KEY([InvestmentTypeID])
REFERENCES [dbo].[ZZ_TbMstInvestmentType] ([InvestmentTypeID])
GO
ALTER TABLE [dbo].[ZZ_TbMstProjectType] CHECK CONSTRAINT [FK__TbMstProj__Inves__300F11AC]
GO
ALTER TABLE [dbo].[ZZ_TbMstProjectType]  WITH CHECK ADD  CONSTRAINT [FK__TbMstProj__Proce__310335E5] FOREIGN KEY([ProcessTypeID])
REFERENCES [dbo].[ZZ_TbMstProcessType] ([ProcessTypeID])
GO
ALTER TABLE [dbo].[ZZ_TbMstProjectType] CHECK CONSTRAINT [FK__TbMstProj__Proce__310335E5]
GO

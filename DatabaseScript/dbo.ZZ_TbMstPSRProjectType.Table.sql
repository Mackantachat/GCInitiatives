/****** Object:  Table [dbo].[ZZ_TbMstPSRProjectType]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstPSRProjectType](
	[PSRProjectTypeID] [int] NOT NULL,
	[PSRProjectTypeName] [nvarchar](50) NOT NULL,
	[InvestmentTypeID] [int] NULL,
	[ProjectTypeID] [int] NULL,
 CONSTRAINT [PK_TbMstPSRProjectType] PRIMARY KEY CLUSTERED 
(
	[PSRProjectTypeID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

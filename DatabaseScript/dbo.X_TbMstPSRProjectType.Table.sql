/****** Object:  Table [dbo].[X_TbMstPSRProjectType]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbMstPSRProjectType](
	[PSRProjectTypeID] [int] NULL,
	[PSRProjectTypeName] [nvarchar](max) NULL,
	[InvestmentTypeID] [int] NULL,
	[ProjectTypeID] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[X_TbMstProjectType]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbMstProjectType](
	[ProjectTypeID] [int] NULL,
	[ProjectTypeName] [nvarchar](max) NULL,
	[InvestmentTypeID] [int] NULL,
	[ProcessTypeID] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

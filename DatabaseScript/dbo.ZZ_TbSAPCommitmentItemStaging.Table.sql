/****** Object:  Table [dbo].[ZZ_TbSAPCommitmentItemStaging]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbSAPCommitmentItemStaging](
	[ProjectDefinition] [nvarchar](50) NULL,
	[WBS] [nvarchar](50) NULL,
	[DocumentNo] [nvarchar](50) NULL,
	[ItemNo] [nvarchar](50) NULL,
	[DocumentDate] [nvarchar](50) NULL
) ON [PRIMARY]
GO

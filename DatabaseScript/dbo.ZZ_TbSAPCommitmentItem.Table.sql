/****** Object:  Table [dbo].[ZZ_TbSAPCommitmentItem]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbSAPCommitmentItem](
	[ProjectDefinition] [nvarchar](50) NULL,
	[WBS] [nvarchar](50) NULL,
	[DocumentNo] [nvarchar](50) NULL,
	[ItemNo] [nvarchar](50) NULL,
	[DocumentDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
	[ModifiedDate] [datetime] NULL
) ON [PRIMARY]
GO

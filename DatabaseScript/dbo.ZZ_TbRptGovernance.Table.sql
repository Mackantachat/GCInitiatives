/****** Object:  Table [dbo].[ZZ_TbRptGovernance]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbRptGovernance](
	[ProjectID] [int] NOT NULL,
	[Period] [nvarchar](50) NOT NULL,
	[Round] [int] NOT NULL,
	[POCCheck] [bit] NULL,
	[HWCheck] [bit] NULL,
	[OICheck] [bit] NULL,
	[ModifiedDate] [datetime] NULL,
	[CAP] [bit] NULL
) ON [PRIMARY]
GO

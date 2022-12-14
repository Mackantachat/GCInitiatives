/****** Object:  Table [dbo].[_POC_Data_Migration _v2.0.3]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_POC_Data_Migration _v2.0.3](
	[WBS_Element] [nvarchar](50) NOT NULL,
	[POC_Weight] [int] NOT NULL,
	[Actual] [nvarchar](50) NOT NULL,
	[Year] [int] NOT NULL,
	[Jan] [nvarchar](50) NULL,
	[Feb] [nvarchar](50) NULL,
	[Mar] [nvarchar](50) NULL,
	[Apr] [nvarchar](50) NULL,
	[May] [nvarchar](50) NULL,
	[Jun] [nvarchar](50) NULL,
	[Jul] [nvarchar](50) NULL,
	[Aug] [nvarchar](50) NULL,
	[Sep] [float] NULL,
	[Oct] [float] NULL,
	[Nov] [float] NULL,
	[Dec] [float] NULL
) ON [PRIMARY]
GO

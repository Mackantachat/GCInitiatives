/****** Object:  Table [dbo].[ZZ_TbMstTimeDimension]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstTimeDimension](
	[DAY_KEY] [int] NOT NULL,
	[DAY_DATE] [datetime] NULL,
	[DAY_DESC] [nvarchar](10) NULL,
	[Day Of Week] [nvarchar](10) NULL,
	[NoOfWeek_Key] [nvarchar](10) NULL,
	[NoOfWeek_DESC] [nvarchar](10) NULL,
	[MONTH_KEY] [nvarchar](10) NULL,
	[MONTH_DESC] [nvarchar](10) NULL,
	[QUARTER_KEY] [nvarchar](10) NULL,
	[QUARTER_DESC] [nvarchar](10) NULL,
	[YEAR_KEY] [nvarchar](4) NULL,
	[YEAR_DESC] [nvarchar](4) NULL,
 CONSTRAINT [PK_TbMstTimeDimension] PRIMARY KEY CLUSTERED 
(
	[DAY_KEY] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

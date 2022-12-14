/****** Object:  Table [dbo].[ZZ_TbMstLookbackLessonLearn]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstLookbackLessonLearn](
	[FormType] [nvarchar](10) NOT NULL,
	[Group] [nvarchar](100) NOT NULL,
	[ConsiderationArea] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK__TbMstLoo__83BD67CA11F49EE0] PRIMARY KEY CLUSTERED 
(
	[FormType] ASC,
	[Group] ASC,
	[ConsiderationArea] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

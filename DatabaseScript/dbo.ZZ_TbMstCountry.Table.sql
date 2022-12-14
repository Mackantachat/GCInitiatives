/****** Object:  Table [dbo].[ZZ_TbMstCountry]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstCountry](
	[CountryCode] [nvarchar](50) NOT NULL,
	[CountryName] [nvarchar](50) NULL,
 CONSTRAINT [PK_TbMstCountry] PRIMARY KEY CLUSTERED 
(
	[CountryCode] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ZZ_TbMstBusinessUnit]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstBusinessUnit](
	[BusinessUnitID] [int] NOT NULL,
	[BusinessUnitName] [nvarchar](50) NULL,
	[ATOMsBUCode] [nvarchar](255) NULL,
 CONSTRAINT [PK_TbMstBusinessUnit] PRIMARY KEY CLUSTERED 
(
	[BusinessUnitID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

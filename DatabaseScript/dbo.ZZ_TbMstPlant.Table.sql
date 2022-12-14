/****** Object:  Table [dbo].[ZZ_TbMstPlant]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstPlant](
	[PlantID] [int] NOT NULL,
	[PlantName] [nvarchar](50) NULL,
	[BusinessUnitID] [int] NULL,
	[ATOMsPlantCode] [nvarchar](255) NULL,
	[PlantShortName] [nvarchar](50) NULL,
	[IsOperatingPlant] [bit] NULL,
	[OperatingPlantGroup] [nvarchar](10) NULL,
	[EMOCPlant] [nvarchar](50) NULL,
	[KBSPlant] [nvarchar](100) NULL
) ON [PRIMARY]
GO

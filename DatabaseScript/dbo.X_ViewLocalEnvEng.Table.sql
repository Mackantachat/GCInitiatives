/****** Object:  Table [dbo].[X_ViewLocalEnvEng]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_ViewLocalEnvEng](
	[ProjectID] [int] NULL,
	[OperatingPlantGroup] [nvarchar](max) NULL,
	[PlantShortName] [nvarchar](max) NULL,
	[LocalEnviEng] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

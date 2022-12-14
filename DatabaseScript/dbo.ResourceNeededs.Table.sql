/****** Object:  Table [dbo].[ResourceNeededs]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResourceNeededs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsManpowerRequire] [bit] NULL,
	[IsImportRequire] [bit] NULL,
	[RemarkImport] [nvarchar](max) NULL,
	[IsLandRequire] [bit] NULL,
	[IsAirPollutionRequire] [bit] NULL,
	[IsWasteRequire] [bit] NULL,
	[InitiativeId] [int] NULL,
	[IsOtherRequired] [bit] NULL,
	[IsUtilityTable] [bit] NULL,
	[IsUtilityRequire] [bit] NULL,
 CONSTRAINT [PK_ResourceNeededs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

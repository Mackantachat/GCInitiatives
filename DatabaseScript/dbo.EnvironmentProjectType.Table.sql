/****** Object:  Table [dbo].[EnvironmentProjectType]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EnvironmentProjectType](
	[EnviTypeId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectLookbackId] [int] NOT NULL,
	[EnviType] [nvarchar](max) NULL,
	[EnviTypeValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_EnvironmentProjectType] PRIMARY KEY CLUSTERED 
(
	[EnviTypeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

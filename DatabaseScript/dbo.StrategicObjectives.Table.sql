/****** Object:  Table [dbo].[StrategicObjectives]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StrategicObjectives](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StrategicObjectiveTitle] [nvarchar](max) NULL,
	[StrategicObjectiveCode] [nvarchar](max) NULL,
	[Year] [nvarchar](max) NULL,
 CONSTRAINT [PK_StrategicObjectives] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

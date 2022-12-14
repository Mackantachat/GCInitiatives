/****** Object:  Table [dbo].[Strategies]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Strategies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StrategyId] [nvarchar](max) NULL,
	[StrategyTitle] [nvarchar](max) NULL,
	[StrategicObjectiveId] [int] NOT NULL,
 CONSTRAINT [PK_Strategies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_Strategies_StrategicObjectiveId]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_Strategies_StrategicObjectiveId] ON [dbo].[Strategies]
(
	[StrategicObjectiveId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Strategies] ADD  DEFAULT ((0)) FOR [StrategicObjectiveId]
GO

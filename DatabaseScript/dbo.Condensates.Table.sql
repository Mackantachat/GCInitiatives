/****** Object:  Table [dbo].[Condensates]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Condensates](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ResourceNeededId] [int] NULL,
	[TopicId] [float] NULL,
	[CondensateType] [nvarchar](max) NULL,
	[PressureLevel] [nvarchar](max) NULL,
	[PressureNormal] [decimal](18, 2) NULL,
	[TempNormal] [decimal](18, 2) NULL,
	[FlowNormal] [decimal](18, 2) NULL,
	[PressureMax] [decimal](18, 2) NULL,
	[TempMax] [decimal](18, 2) NULL,
	[FlowMax] [decimal](18, 2) NULL,
	[COD] [datetime2](7) NULL,
	[FirstSupply] [datetime2](7) NULL,
	[SupplyPeriods] [real] NULL,
 CONSTRAINT [PK_Condensates] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

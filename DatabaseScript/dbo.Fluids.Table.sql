/****** Object:  Table [dbo].[Fluids]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Fluids](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ResourceNeededId] [int] NULL,
	[FlowMax] [int] NULL,
	[FlowNormal] [int] NULL,
	[FlowUnit] [nvarchar](max) NULL,
	[FluidType] [nvarchar](max) NULL,
	[PressureMax] [int] NULL,
	[PressureNormal] [int] NULL,
	[PressureUnit] [nvarchar](max) NULL,
	[TopicId] [float] NULL,
	[COD] [datetime2](7) NULL,
	[FirstSupply] [datetime2](7) NULL,
	[SupplyPeriods] [real] NULL,
 CONSTRAINT [PK_Fluids] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

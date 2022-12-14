/****** Object:  Table [dbo].[Others]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Others](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ResourceNeededId] [int] NULL,
	[Name] [nvarchar](max) NULL,
	[TopicId] [float] NULL,
	[FlowMaxAmount] [int] NULL,
	[FlowMaxUnit] [nvarchar](max) NULL,
	[FlowNormalAmount] [int] NULL,
	[FlowNormalUnit] [nvarchar](max) NULL,
	[PressureMaxAmount] [int] NULL,
	[PressureMaxUnit] [nvarchar](max) NULL,
	[PressureNormalAmount] [int] NULL,
	[PressureNormalUnit] [nvarchar](max) NULL,
	[COD] [datetime2](7) NULL,
	[FirstSupply] [datetime2](7) NULL,
	[SupplyPeriods] [real] NULL,
 CONSTRAINT [PK_Others] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

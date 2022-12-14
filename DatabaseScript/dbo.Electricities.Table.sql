/****** Object:  Table [dbo].[Electricities]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Electricities](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ResourceNeededId] [int] NULL,
	[TopicId] [float] NULL,
	[Voltage] [decimal](18, 2) NULL,
	[Normal] [decimal](18, 2) NULL,
	[Max] [decimal](18, 2) NULL,
	[COD] [datetime2](7) NULL,
	[FirstSupply] [datetime2](7) NULL,
	[SupplyPeriods] [real] NULL,
 CONSTRAINT [PK_Electricities] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[InitiativeListPoolPim]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeListPoolPim](
	[InitiativeListPoolPimId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[OwnerName] [nvarchar](max) NULL,
	[InvestmentType] [nvarchar](max) NULL,
	[BenefitType] [nvarchar](max) NULL,
	[BenefitValue] [decimal](18, 2) NULL,
	[ProjectCost] [decimal](18, 3) NULL,
	[StageGate] [nvarchar](max) NULL,
	[Reason] [nvarchar](max) NULL,
	[initiativeCode] [nvarchar](max) NULL,
	[PoolId] [int] NULL,
	[GateSelect] [nvarchar](max) NULL,
	[Reference] [bit] NULL,
 CONSTRAINT [PK_InitiativeListPoolPim] PRIMARY KEY CLUSTERED 
(
	[InitiativeListPoolPimId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

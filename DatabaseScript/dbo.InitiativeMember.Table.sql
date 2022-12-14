/****** Object:  Table [dbo].[InitiativeMember]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeMember](
	[InitiativeMemberId] [int] IDENTITY(1,1) NOT NULL,
	[VacPicId] [int] NOT NULL,
	[MemberType] [nvarchar](max) NULL,
	[InitiativeId] [int] NOT NULL,
	[InitiativeStatus] [nvarchar](max) NULL,
	[Process] [nvarchar](max) NULL,
	[Result] [nvarchar](max) NULL,
	[Stage] [nvarchar](max) NULL,
	[EmocNo] [nvarchar](max) NULL,
	[Gate] [nvarchar](max) NULL,
	[InitiativeCode] [nvarchar](max) NULL,
	[InitiativeType] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NULL,
	[OwnerName] [nvarchar](max) NULL,
	[Pdd] [nvarchar](max) NULL,
	[Presentation] [nvarchar](max) NULL,
	[CostEstCapexType] [decimal](18, 3) NULL,
	[CostEstOpexType] [nvarchar](max) NULL,
	[FxExchange] [decimal](18, 3) NULL,
	[OverallCostEst] [decimal](18, 3) NULL,
	[Plant] [nvarchar](max) NULL,
	[RequestCapex] [decimal](18, 3) NULL,
	[RequestOpex] [decimal](18, 3) NULL,
 CONSTRAINT [PK_InitiativeMember] PRIMARY KEY CLUSTERED 
(
	[InitiativeMemberId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[MaxApprovers]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaxApprovers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[ApproverType] [nvarchar](100) NULL,
	[ApproverEmail] [nvarchar](100) NULL,
	[Order] [int] NULL,
	[BenefitMax] [decimal](18, 3) NULL,
	[BenefitMin] [decimal](18, 3) NULL,
 CONSTRAINT [PK_MaxApprovers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_MaxApprovers]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_MaxApprovers] ON [dbo].[MaxApprovers]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

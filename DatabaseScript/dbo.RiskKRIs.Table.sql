/****** Object:  Table [dbo].[RiskKRIs]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RiskKRIs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RiskId] [int] NOT NULL,
	[KriTarget] [nvarchar](max) NULL,
	[KriTolerance] [nvarchar](max) NULL,
	[KriNo] [int] NOT NULL,
	[KriProgress] [nvarchar](max) NULL,
	[KriStatus] [nvarchar](max) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_RiskKRIs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[RiskKRIs] ADD  DEFAULT ((0)) FOR [KriNo]
GO
ALTER TABLE [dbo].[RiskKRIs] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsDeleted]
GO

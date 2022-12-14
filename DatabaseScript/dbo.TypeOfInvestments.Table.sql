/****** Object:  Table [dbo].[TypeOfInvestments]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeOfInvestments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeOfInvestmentId] [nvarchar](max) NULL,
	[TypeOfInvestmentTitle] [nvarchar](max) NULL,
	[Disabled] [bit] NOT NULL,
 CONSTRAINT [PK_TypeOfInvestments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[TypeOfInvestments] ADD  DEFAULT (CONVERT([bit],(0))) FOR [Disabled]
GO

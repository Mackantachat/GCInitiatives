/****** Object:  Table [dbo].[TypeOfBenefits]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeOfBenefits](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeOfBenefitGroup] [nvarchar](max) NULL,
	[TypeOfBenefitTitle] [nvarchar](max) NULL,
	[TypeOfBenefitCode] [nvarchar](max) NULL,
 CONSTRAINT [PK_TypeOfBenefits] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

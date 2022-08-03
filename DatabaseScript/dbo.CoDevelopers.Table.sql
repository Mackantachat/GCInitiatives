/****** Object:  Table [dbo].[CoDevelopers]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CoDevelopers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CoDeveloperName] [nvarchar](max) NULL,
	[EmployeeID] [nvarchar](max) NULL,
	[FirstName] [nvarchar](max) NULL,
	[Indicator] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[Telephone] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
 CONSTRAINT [PK_CoDevelopers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[TeamSupports]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TeamSupports](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[EmployeeID] [nvarchar](max) NULL,
	[TeamSupportName] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[SendEmailStatus] [int] NULL,
 CONSTRAINT [PK_TeamSupports] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

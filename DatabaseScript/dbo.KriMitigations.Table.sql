/****** Object:  Table [dbo].[KriMitigations]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KriMitigations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[Year] [int] NOT NULL,
	[MitigationMonth1] [nvarchar](max) NULL,
	[MitigationMonth2] [nvarchar](max) NULL,
	[MitigationMonth3] [nvarchar](max) NULL,
	[MitigationMonth4] [nvarchar](max) NULL,
	[MitigationMonth5] [nvarchar](max) NULL,
	[MitigationMonth6] [nvarchar](max) NULL,
	[MitigationMonth7] [nvarchar](max) NULL,
	[MitigationMonth8] [nvarchar](max) NULL,
	[MitigationMonth9] [nvarchar](max) NULL,
	[MitigationMonth10] [nvarchar](max) NULL,
	[MitigationMonth11] [nvarchar](max) NULL,
	[MitigationMonth12] [nvarchar](max) NULL,
 CONSTRAINT [PK_KriMitigations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

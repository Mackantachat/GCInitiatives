/****** Object:  Table [dbo].[KriProgressMitigation]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KriProgressMitigation](
	[KriProgressMitigationId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[Year] [nvarchar](max) NULL,
	[KriType] [nvarchar](max) NULL,
	[Jan] [nvarchar](max) NULL,
	[Feb] [nvarchar](max) NULL,
	[Mar] [nvarchar](max) NULL,
	[Apr] [nvarchar](max) NULL,
	[May] [nvarchar](max) NULL,
	[Jun] [nvarchar](max) NULL,
	[Jul] [nvarchar](max) NULL,
	[Aug] [nvarchar](max) NULL,
	[Sep] [nvarchar](max) NULL,
	[Oct] [nvarchar](max) NULL,
	[Nov] [nvarchar](max) NULL,
	[Dec] [nvarchar](max) NULL,
	[KpiMaintainId] [int] NULL,
 CONSTRAINT [PK_KriProgressMitigation] PRIMARY KEY CLUSTERED 
(
	[KriProgressMitigationId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

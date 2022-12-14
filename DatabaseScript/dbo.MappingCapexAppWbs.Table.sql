/****** Object:  Table [dbo].[MappingCapexAppWbs]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MappingCapexAppWbs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GeneratedDate] [datetime2](7) NULL,
	[InitiativeCAPEXNo] [nvarchar](max) NULL,
	[RevisionNo] [int] NULL,
	[AppRequestNumber] [nvarchar](max) NULL,
	[AppRequestCreatedOn] [datetime2](7) NULL,
	[WBSNo] [nvarchar](max) NULL,
	[WBSCreatedOn] [datetime2](7) NULL,
	[CompanyCode] [int] NULL,
	[IMPosition] [nvarchar](max) NULL,
	[ApprovedYear] [int] NOT NULL,
	[DistributedToWBS] [bit] NULL,
	[SentEmail] [bit] NULL,
	[ChangedOn] [datetime2](7) NULL,
	[ChangedBy] [nvarchar](max) NULL,
 CONSTRAINT [PK_MappingCapexAppWbs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

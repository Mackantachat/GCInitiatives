/****** Object:  Table [dbo].[RoleManagements]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleManagements](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](max) NULL,
	[PageId] [nvarchar](max) NULL,
	[SectionId] [nvarchar](max) NULL,
	[IsVisible] [bit] NULL,
	[IsEnable] [bit] NULL,
	[IsIndividual] [bit] NULL,
 CONSTRAINT [PK_RoleManagements] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

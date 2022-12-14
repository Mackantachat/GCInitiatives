/****** Object:  Table [dbo].[DimMembers]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DimMembers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MemberType] [nvarchar](max) NULL,
	[MemberName] [nvarchar](max) NULL,
	[MemberEmployeeId] [nvarchar](max) NULL,
	[InitiativeId] [int] NOT NULL,
 CONSTRAINT [PK_DimMembers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

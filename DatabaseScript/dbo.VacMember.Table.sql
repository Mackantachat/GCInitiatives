/****** Object:  Table [dbo].[VacMember]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VacMember](
	[VacMemberId] [int] IDENTITY(1,1) NOT NULL,
	[VacListId] [int] NULL,
	[MemberType] [nvarchar](max) NULL,
	[MemberName] [nvarchar](max) NULL,
 CONSTRAINT [PK_VacMember] PRIMARY KEY CLUSTERED 
(
	[VacMemberId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

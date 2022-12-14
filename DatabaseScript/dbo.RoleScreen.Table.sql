/****** Object:  Table [dbo].[RoleScreen]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleScreen](
	[RoleScreenId] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](max) NULL,
	[ScreenObjectId] [nvarchar](max) NULL,
	[ActionId] [nvarchar](max) NULL,
 CONSTRAINT [PK_RoleScreen] PRIMARY KEY CLUSTERED 
(
	[RoleScreenId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

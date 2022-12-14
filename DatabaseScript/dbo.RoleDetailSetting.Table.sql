/****** Object:  Table [dbo].[RoleDetailSetting]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleDetailSetting](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](500) NULL,
	[RoleName] [nvarchar](500) NULL,
	[IsActive] [bit] NULL,
	[Description] [nvarchar](500) NULL,
 CONSTRAINT [PK_RoleDetailSetting] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

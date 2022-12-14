/****** Object:  Table [dbo].[UserManagement2]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserManagement2](
	[UserManagementId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [nvarchar](max) NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[Position] [nvarchar](max) NULL,
	[BU] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[Workstream] [nvarchar](max) NULL,
	[Remark] [nvarchar](max) NULL,
 CONSTRAINT [PK_UserManagement2] PRIMARY KEY CLUSTERED 
(
	[UserManagementId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

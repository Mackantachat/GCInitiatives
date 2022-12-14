/****** Object:  Table [dbo].[RoleSettingDetail]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleSettingDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PageId] [nvarchar](1024) NULL,
	[SectionId] [nvarchar](1024) NULL,
	[FieldName] [nvarchar](1024) NULL,
	[IsVisible] [bit] NULL,
	[IsEnable] [bit] NULL,
	[IsIndividual] [bit] NULL,
	[Parameter01] [nvarchar](1024) NULL,
	[Parameter02] [nvarchar](1024) NULL,
	[Parameter03] [nvarchar](1024) NULL,
	[Parameter04] [nvarchar](1024) NULL,
	[Parameter05] [nvarchar](1024) NULL,
	[Parameter06] [nvarchar](1024) NULL,
	[Parameter07] [nvarchar](1024) NULL,
	[Parameter08] [nvarchar](1024) NULL,
	[Parameter09] [nvarchar](1024) NULL,
	[Parameter10] [nvarchar](1024) NULL,
	[Parameter11] [nvarchar](1024) NULL,
	[Parameter12] [nvarchar](1024) NULL,
	[Parameter13] [nvarchar](1024) NULL,
	[Parameter14] [nvarchar](1024) NULL,
	[Parameter15] [nvarchar](1024) NULL,
	[Parameter16] [nvarchar](1024) NULL,
	[Parameter17] [nvarchar](1024) NULL,
	[Parameter18] [nvarchar](1024) NULL,
	[Parameter19] [nvarchar](1024) NULL,
	[Parameter20] [nvarchar](1024) NULL,
	[RoleId] [nvarchar](500) NULL,
	[RoleName] [nvarchar](500) NULL,
	[InitiativeType] [nvarchar](500) NULL,
	[Priority] [int] NULL,
	[Stage] [nvarchar](500) NULL,
	[Status] [nvarchar](500) NULL,
	[TypeOfInvestment] [nvarchar](500) NULL,
	[PermissionMasterId] [int] NULL,
 CONSTRAINT [PK_RoleSettingDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

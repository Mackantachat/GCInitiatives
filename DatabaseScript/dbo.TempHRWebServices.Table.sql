/****** Object:  Table [dbo].[TempHRWebServices]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TempHRWebServices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[SystemName] [nvarchar](max) NULL,
	[FullName] [nvarchar](max) NULL,
	[ENTitle] [nvarchar](max) NULL,
	[ENFirstName] [nvarchar](max) NULL,
	[ENLastName] [nvarchar](max) NULL,
	[Indicator] [nvarchar](max) NULL,
	[EmailAddress] [nvarchar](max) NULL,
	[Extension] [nvarchar](max) NULL,
	[CompanyCode] [nvarchar](max) NULL,
	[CompanyName] [nvarchar](max) NULL,
	[CompanyShortTxt] [nvarchar](max) NULL,
	[OrgID] [nvarchar](max) NULL,
	[OrgTextEN] [nvarchar](max) NULL,
	[OrgShortTextEN] [nvarchar](max) NULL,
	[OrgLevel] [nvarchar](max) NULL,
	[PositionID] [nvarchar](max) NULL,
	[PositionTextEN] [nvarchar](max) NULL,
	[PositionShortTextEN] [nvarchar](max) NULL,
	[PositionLevel] [nvarchar](max) NULL,
	[ParentOrgID] [nvarchar](max) NULL,
	[UnitOrgID] [nvarchar](max) NULL,
	[UnitShortTextEN] [nvarchar](max) NULL,
	[UnitTextEN] [nvarchar](max) NULL,
	[SupOrgID] [nvarchar](max) NULL,
	[SupShortTextEN] [nvarchar](max) NULL,
	[SupTextEN] [nvarchar](max) NULL,
	[SupManagerPositionID] [nvarchar](max) NULL,
	[SupManagerEmpID] [nvarchar](max) NULL,
	[ShiftOrgID] [nvarchar](max) NULL,
	[ShiftShortTextEN] [nvarchar](max) NULL,
	[ShiftTextEN] [nvarchar](max) NULL,
	[ShiftManagerPositionID] [nvarchar](max) NULL,
	[ShiftManagerEmpID] [nvarchar](max) NULL,
	[DivOrgID] [nvarchar](max) NULL,
	[DivTextEN] [nvarchar](max) NULL,
	[DivManagerPositionID] [nvarchar](max) NULL,
	[DivManagerEmpID] [nvarchar](max) NULL,
	[DivShortTextEN] [nvarchar](max) NULL,
	[DepOrgID] [nvarchar](max) NULL,
	[DepTextEN] [nvarchar](max) NULL,
	[DepManagerPositionID] [nvarchar](max) NULL,
	[DepManagerEmpID] [nvarchar](max) NULL,
	[DepShortTextEN] [nvarchar](max) NULL,
	[MainPositionCostCenter] [int] NULL,
 CONSTRAINT [PK_TempHRWebServices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

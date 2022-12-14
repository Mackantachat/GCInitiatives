/****** Object:  Table [dbo].[Owners]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Owners](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OwnerName] [nvarchar](255) NULL,
	[EmployeeID] [nvarchar](255) NULL,
	[FirstName] [nvarchar](255) NULL,
	[Indicator] [nvarchar](255) NULL,
	[LastName] [nvarchar](255) NULL,
	[Telephone] [nvarchar](50) NULL,
	[Email] [nvarchar](255) NULL,
	[ActionText] [nvarchar](255) NULL,
	[ActionType] [nvarchar](255) NULL,
	[AdminGroup] [nvarchar](255) NULL,
	[AssignmentCostCenter] [int] NULL,
	[BloodGrp] [nvarchar](10) NULL,
	[CEOManagerEmpID] [int] NULL,
	[CEOManagerPositionID] [int] NULL,
	[CEOOrgID] [int] NULL,
	[CEOShortTextEN] [nvarchar](50) NULL,
	[CEOTextEN] [nvarchar](255) NULL,
	[CompanyCode] [int] NULL,
	[CompanyName] [nvarchar](255) NULL,
	[CompanyShortTxt] [nvarchar](50) NULL,
	[DepManagerEmpID] [int] NULL,
	[DepManagerPositionID] [int] NULL,
	[DepOrgID] [int] NULL,
	[DepShortTextEN] [nvarchar](255) NULL,
	[DepTextEN] [nvarchar](255) NULL,
	[DivManagerEmpID] [int] NULL,
	[DivManagerPositionID] [int] NULL,
	[DivOrgID] [int] NULL,
	[DivShortTextEN] [nvarchar](255) NULL,
	[DivTextEN] [nvarchar](255) NULL,
	[EmpGroup] [nvarchar](255) NULL,
	[EmpGroupTxt] [nvarchar](255) NULL,
	[EmpSubGroup] [int] NULL,
	[EmpSubGroupTxt] [nvarchar](255) NULL,
	[EmploymentStatus] [int] NULL,
	[EmploymentStatusTxt] [nvarchar](255) NULL,
	[Extension] [nvarchar](255) NULL,
	[FNGRPManagerEmpID] [int] NULL,
	[FNGRPManagerPositionID] [int] NULL,
	[FNGRPOrgID] [int] NULL,
	[FNGRPShortTextEN] [nvarchar](50) NULL,
	[FNGRPTextEN] [nvarchar](255) NULL,
	[FNManagerEmpID] [int] NULL,
	[FNManagerPositionID] [int] NULL,
	[FNOrgID] [int] NULL,
	[FNShortTextEN] [nvarchar](50) NULL,
	[FNTextEN] [nvarchar](255) NULL,
	[MainPositionCostCenter] [bigint] NULL,
	[MainPositionFlg] [bit] NULL,
	[ManagerialFlag] [bit] NULL,
	[OrgID] [int] NULL,
	[OrgLevel] [int] NULL,
	[OrgShortTextEN] [nvarchar](50) NULL,
	[OrgTextEN] [nvarchar](255) NULL,
	[PSDManagerEmpID] [int] NULL,
	[PSDManagerPositionID] [int] NULL,
	[PSDOrgID] [int] NULL,
	[PSDShortTextEN] [nvarchar](50) NULL,
	[PSDTextEN] [nvarchar](255) NULL,
	[ParentOrgID] [int] NULL,
	[PositionID] [int] NULL,
	[PositionLevel] [int] NULL,
	[PositionShortTextEN] [nvarchar](50) NULL,
	[PositionTextEN] [nvarchar](255) NULL,
	[ShiftManagerEmpID] [int] NULL,
	[ShiftManagerPositionID] [int] NULL,
	[ShiftOrgID] [int] NULL,
	[ShiftShortTextEN] [nvarchar](50) NULL,
	[ShiftTextEN] [nvarchar](255) NULL,
	[SupManagerEmpID] [int] NULL,
	[SupManagerPositionID] [int] NULL,
	[SupOrgID] [int] NULL,
	[SupShortTextEN] [nvarchar](255) NULL,
	[SupTextEN] [nvarchar](255) NULL,
	[Title] [nvarchar](255) NULL,
	[UnitManagerEmpID] [int] NULL,
	[UnitManagerPositionID] [int] NULL,
	[UnitOrgID] [int] NULL,
	[UnitShortTextEN] [nvarchar](50) NULL,
	[UnitTextEN] [nvarchar](255) NULL,
	[DataSource] [nvarchar](255) NULL,
	[Workstream] [nvarchar](255) NULL,
 CONSTRAINT [PK_Temp_Owners_2] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_Owners_1081A666A1975B400FB6ABD2B46C4185]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_Owners_1081A666A1975B400FB6ABD2B46C4185] ON [dbo].[Owners]
(
	[DepOrgID] ASC,
	[DivOrgID] ASC
)
INCLUDE([Email],[OwnerName]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_Owners_2C9FBF05CED986BC45791D8D7F65CA68]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_Owners_2C9FBF05CED986BC45791D8D7F65CA68] ON [dbo].[Owners]
(
	[OwnerName] ASC
)
INCLUDE([Email],[EmployeeID]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_Owners_313A5FCB690ABD2FB396C8561A471F83]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_Owners_313A5FCB690ABD2FB396C8561A471F83] ON [dbo].[Owners]
(
	[Email] ASC
)
INCLUDE([EmployeeID],[OwnerName]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

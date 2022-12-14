/****** Object:  Table [dbo].[ZZ_TbMstProject]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbMstProject](
	[ProjectID] [int] IDENTITY(1,1) NOT NULL,
	[ProjectName] [nvarchar](1000) NULL,
	[ProjectNo] [varchar](100) NULL,
	[SAPProjectNo] [nvarchar](100) NULL,
	[ProjectOwner] [varchar](100) NULL,
	[RevisionNo] [decimal](18, 4) NULL,
	[CompanyID] [varchar](50) NULL,
	[DepartmentID] [varchar](50) NULL,
	[ProjectTypeID] [int] NOT NULL,
	[ProjectTypeFillIn] [nvarchar](100) NULL,
	[BatchStatus] [int] NULL,
	[StartYear] [int] NULL,
	[RequestDate] [datetime] NULL,
	[VCID] [int] NULL,
	[PMVPStatus] [bit] NULL,
	[PMVPApproveDate] [datetime] NULL,
	[CompleteStatus] [bit] NULL,
	[WorkFlowStatus] [varchar](100) NULL,
	[IsDraft] [bit] NULL,
	[IsIDM] [bit] NULL,
	[IsIT] [bit] NULL,
	[ProjectCost] [decimal](18, 4) NULL,
	[DestinationUser] [nvarchar](100) NULL,
	[BudgetType] [int] NULL,
	[IsInform] [bit] NULL,
	[IsAuthorization] [bit] NULL,
	[IsCallWorkflow] [bit] NULL,
	[ProjectOwnerEmployeeID] [varchar](100) NULL,
	[VCThaiName] [nvarchar](100) NULL,
	[VCEngName] [varchar](100) NULL,
	[IsOverride] [bit] NULL,
	[IsApprove] [bit] NULL,
	[FinishDate] [datetime] NULL,
	[BudgetBetweenYearType] [int] NULL,
	[ProjectCoordinator] [nvarchar](200) NULL,
 CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbMstProject] ADD  CONSTRAINT [DF_Project_CompleteStatus]  DEFAULT ((0)) FOR [CompleteStatus]
GO
ALTER TABLE [dbo].[ZZ_TbMstProject] ADD  CONSTRAINT [DF_Project_IsInform]  DEFAULT ((0)) FOR [IsInform]
GO
ALTER TABLE [dbo].[ZZ_TbMstProject] ADD  CONSTRAINT [DF_Project_IsAuthorization]  DEFAULT ((0)) FOR [IsAuthorization]
GO
ALTER TABLE [dbo].[ZZ_TbMstProject] ADD  CONSTRAINT [DF_Project_IsCallWorkflow]  DEFAULT ((1)) FOR [IsCallWorkflow]
GO
ALTER TABLE [dbo].[ZZ_TbMstProject] ADD  CONSTRAINT [Project_IsOverride_Default]  DEFAULT ((0)) FOR [IsOverride]
GO

/****** Object:  Table [dbo].[_App_Request_2021_07_01]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[_App_Request_2021_07_01](
	[RID] [int] NOT NULL,
	[Investment_Position_IM_Position] [nvarchar](50) NOT NULL,
	[Investment_Type] [int] NOT NULL,
	[Initiative_CAPEX_No] [nvarchar](50) NOT NULL,
	[Appropriation_Request_type] [nvarchar](50) NOT NULL,
	[Budget_Request_Type] [nvarchar](50) NOT NULL,
	[Project_Name] [nvarchar](150) NOT NULL,
	[Commence_Year] [int] NOT NULL,
	[Company_Code] [int] NOT NULL,
	[Department] [int] NOT NULL,
	[GPC_BU] [nvarchar](50) NOT NULL,
	[VP_ID] [int] NOT NULL,
	[VP_Name] [nvarchar](50) NOT NULL,
	[VP_Department] [int] NOT NULL,
	[Coordinator_ID] [int] NOT NULL,
	[Coordinator_Name] [nvarchar](50) NOT NULL,
	[Coordinator_Department] [float] NOT NULL,
	[Budget_Analyst_ID] [int] NOT NULL,
	[Budget_Analyst_Name] [nvarchar](50) NOT NULL,
	[Currency_Budget_to_be_controlled] [nvarchar](50) NOT NULL,
	[Total_Amount_in_Control_Currency] [int] NOT NULL,
	[Plan_Start_Date] [nvarchar](50) NOT NULL,
	[Plan_Finish_Date] [nvarchar](50) NOT NULL,
	[Plan_Budget_Start_Date] [nvarchar](50) NOT NULL,
	[Plan_Budget_Finish_Date] [nvarchar](50) NOT NULL,
	[Version] [nvarchar](50) NULL,
	[Process] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO

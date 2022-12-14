/****** Object:  Table [dbo].[ZZZ_BackupFromFile]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZZ_BackupFromFile](
	[InitiativeNo] [nvarchar](1000) NULL,
	[WBSFileNumber] [nvarchar](1000) NULL,
	[Project_DefinitionCXPPPPYYNNN] [nvarchar](1000) NULL,
	[WBS] [nvarchar](1000) NULL,
	[PS_Short_description_1st_text_line40_digits] [nvarchar](1000) NULL,
	[Std_Proj_def] [nvarchar](1000) NULL,
	[No_of_Person_Resp_Not_final] [nvarchar](1000) NULL,
	[Company_code] [nvarchar](1000) NULL,
	[ProductionGeneral_Plant] [nvarchar](1000) NULL,
	[Profit_Center] [nvarchar](1000) NULL,
	[Start_Date] [nvarchar](1000) NULL,
	[Finished_Date] [nvarchar](1000) NULL,
	[Projtype] [nvarchar](1000) NULL,
	[Responsible_Cost_Center] [nvarchar](1000) NULL,
	[RequestCost_Center] [nvarchar](1000) NULL,
	[BOI__NSTDACheckbox] [nvarchar](1000) NULL,
	[Const_for_salesCheckbox] [nvarchar](1000) NULL,
	[BOI_NO] [nvarchar](1000) NULL,
	[Asset_GroupWBS_Level_1_ONLY10_digits] [nvarchar](1000) NULL,
	[Assigned_Date] [nvarchar](1000) NULL,
	[CAPDate] [nvarchar](1000) NULL,
	[Basic_Start_Date] [nvarchar](1000) NULL,
	[Basic_Finish_Date] [nvarchar](1000) NULL,
	[Actual_Start_Date_if_REL] [nvarchar](1000) NULL,
	[Project_Manager_ID_Name_] [nvarchar](1000) NULL,
	[Project_Coordinator_ID_Name] [nvarchar](1000) NULL,
	[Budget_Owner_ID_Name] [nvarchar](1000) NULL,
	[EVP_Project_Owner_ID_Name] [nvarchar](1000) NULL,
	[EXIO] [nvarchar](1000) NULL,
	[Solomon_Categoryfor_Refiney_only] [nvarchar](1000) NULL,
	[Physical_Business_Unit] [nvarchar](1000) NULL,
	[Physical_Plant_SAP_Plant] [nvarchar](1000) NULL,
	[AreaPanel_No] [nvarchar](1000) NULL,
	[Physical_Unit] [nvarchar](1000) NULL,
	[eMOC_Number_13_Digits] [nvarchar](1000) NULL,
	[Project_Material_Cost__Only_Closed] [nvarchar](1000) NULL,
	[Appropriation_request] [nvarchar](1000) NULL
) ON [PRIMARY]
GO

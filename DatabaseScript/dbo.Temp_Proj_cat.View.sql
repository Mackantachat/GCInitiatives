/****** Object:  View [dbo].[Temp_Proj_cat]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE view [dbo].[Temp_Proj_cat] as 
 

SELECT Initiatives.InitiativeCode AS [Initiative_No] 
      ,C.[Standard_Project] AS [Standard_Project]
      ,C.[Solomon_Category] AS [Solomon_Category]
      ,C.[Business_Unit] AS [Business_Unit]
      ,C.AreaPanel_No AS AreaPanel_No
      ,C.[Plant_Unit]   
      ,C.Physical_Unit   
      ,C.Responsible_Person AS Responsible_Person
      ,C.[Project_Manager] AS [Project Manager]
      ,C.[WBS]
     
  --FROM [dbo].ZZZ_99Proj_Cat C
  --LEFT JOIN ProgressHeader ON ProgressHeader.WbsNo = [WBS]
  --LEFT JOIN v_Initiatives Initiatives ON Initiatives.Id = ProgressHeader.InitiativeId


  FROM [dbo].ZZZ_999Proj_Cat C
  LEFT JOIN  ZZ_WebinputReport WRP ON WRP.ProjectNoSap = C.WBS
  LEFT JOIN Temp_WPMigration t ON T.[Project Id] = WRP.ProjectId
  LEFT JOIN v_Initiatives Initiatives ON Initiatives.InitiativeCode = T.[Tobe Idea MANI Initiative]





GO

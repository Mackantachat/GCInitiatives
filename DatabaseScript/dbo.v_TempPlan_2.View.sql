/****** Object:  View [dbo].[v_TempPlan_2]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 

Create VIEW [dbo].[v_TempPlan_2] AS
 select Temp_Project.InitiativeCode  from  Temp_POC  INNER JOIN Temp_Project ON Temp_Project.WBS = Temp_POC.WBS_Element
  
GO

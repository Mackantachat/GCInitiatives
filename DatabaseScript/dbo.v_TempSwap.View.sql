/****** Object:  View [dbo].[v_TempSwap]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE view [dbo].[v_TempSwap] AS




select 
distinct
Initiatives.InitiativeCode
,Initiatives.IsCreatedWBS
,ProgressHeader.WbsNo
from   
ProgressHeader
INNER JOIN ProgressPlan ON ProgressPlan.InitiativeId = ProgressHeader.InitiativeId
INNER JOIN v_Initiatives Initiatives ON Initiatives.ID = ProgressPlan.InitiativeId
INNER JOIN OutgoingFile ON  SUBSTRING([FileName],11,11) =Initiatives.InitiativeCode
WHERE ProgressHeader.WBSNO IS NOT NULL
AND  ProgressPlan.ProgressPlanType = 'Engineering' 

--ORDER BY Initiatives.InitiativeCode





  
GO

/****** Object:  View [dbo].[v_Initiative_Status]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 



CREATE view [dbo].[v_Initiative_Status]
AS
 

SELECT 
Initiatives.InitiativeCode
,ProgressHeader.WbsNo AS WBS
,Initiatives.Stage AS InitiativeStatus
,CASE WHEN Initiatives.Stage IN ('Lookback-6','Lookback-6','Lookback-6','Initiative-2','IL5','Completed','Budget Distribute','IL5','GATE4 : envi-5','GATE4 : Performance-6','Budget Pool','Initiative-2' )  THEN 'Y' ELSE 'N' END AS  [AbleToCloseProject]
FROM v_Initiatives Initiatives
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = Initiatives.ID
WHERE ProgressHeader.WbsNo IS NOT NULL




GO

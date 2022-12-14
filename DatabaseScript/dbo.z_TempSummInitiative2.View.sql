/****** Object:  View [dbo].[z_TempSummInitiative2]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[z_TempSummInitiative2]
AS
 
 

select 
UPPER(CreatedBy) AS CreatedBy 
,UPPER(Initiatives.InitiativeType) AS Process
,UPPER(Initiatives.Stage) AS  Stage
,count(*) as CNT
from v_Initiatives Initiatives
where Initiatives.InitiativeCode like '2020%'
group by UPPER(CreatedBy)
,UPPER(Initiatives.InitiativeType)
,UPPER(Initiatives.Stage)




GO

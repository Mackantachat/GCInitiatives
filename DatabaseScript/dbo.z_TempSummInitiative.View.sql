/****** Object:  View [dbo].[z_TempSummInitiative]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[z_TempSummInitiative]
AS
 


select 
UPPER(CreatedBy) AS CreatedBy , 
count(*) as CNT
from v_Initiatives Initiatives
where Initiatives.InitiativeCode like '2020%'
group by UPPER(CreatedBy)
 





GO

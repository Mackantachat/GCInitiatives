/****** Object:  View [dbo].[v_bi_TbTxnContingency]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE view [dbo].[v_bi_TbTxnContingency] AS

SELECT   Projectid,Period, MAX(ContingencyCost) AS ContingencyCost 
FROM
(
		select 
		i.id as ProjectID,
		cast (month(ci.StartingDate) as nvarchar) + '/' + cast (Year(ci.StartingDate) as nvarchar) as Period,
		ci.ProjectCost as ContingencyCost
		from v_Initiatives i 
		left join CapexInformations ci on ci.InitiativeId = i.Id  
		WHERE cast (month(ci.StartingDate) as nvarchar) + '/' + cast (Year(ci.StartingDate) as nvarchar) IS NOT NULL
) AS T 
GROUP BY  Projectid,Period
GO

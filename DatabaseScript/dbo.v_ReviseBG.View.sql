/****** Object:  View [dbo].[v_ReviseBG]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 

CREATE view [dbo].[v_ReviseBG] AS
 

SELECT
I.[InitiativeCode]
,CI.[Revistion] 
,ROW_NUMBER() OVER( PARTITION BY   I.[InitiativeCode] ORDER BY  CI.[Revistion]  desc  ) AS rowNumber  
,case
when ci.Revistion = 0 then 'Original'
when ci.CapexType = 'AddmoreCapex' then 'Supplement'
when ci.CapexType = 'ReturnCapex' then 'Return'
end as TransactionType    
FROM 
v_Initiatives I
INNER JOIN CapexInformations CI ON CI.InitiativeId = I.Id

 



GO

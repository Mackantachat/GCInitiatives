/****** Object:  View [dbo].[v_SAP_InvestmentPlan]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 

CREATE view [dbo].[v_SAP_InvestmentPlan]
AS



 SELECT 
 InvestmentCost.InitiativeId
  
,SUM(
ISNULL(JANCOST,0)+
ISNULL(FEBCOST,0)+
ISNULL(MARCOST,0)+
ISNULL(APRCOST,0)+
ISNULL(MAYCOST,0)+
ISNULL(JUNCOST,0)+
ISNULL(JULCOST,0)+
ISNULL(AUGCOST,0)+
ISNULL(SEPCOST,0)+
ISNULL(OCTCOST,0)+
ISNULL(NOVCOST,0)+
ISNULL(DECCOST,0)  
)  AS ALLSUMYEAR
 
 FROM  InvestmentCost
WHERE InvestmentCostType = 'planCost'
GROUP BY InvestmentCost.InitiativeId



GO

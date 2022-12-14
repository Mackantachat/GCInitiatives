/****** Object:  View [dbo].[v_if_POC]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO










 
CREATE view [dbo].[v_if_POC] AS
 
 

SELECT  
  0 AS [LineNo]
, NULL AS [InitiativesID]
, NULL AS [InitiativeCode]
, NULL AS [InitiativeName]
,'RCNEV-PSPEL'  AS [WBS Element]
,'RCNEV-EVGEW'  AS [POC Weight]
,''  AS [Plan/Actual]
,''  AS [Year]
,''  AS [Period1]
,''  AS [Period2]
,''  AS [Period3]
,''  AS [Period4]
,''  AS [Period5]
,''  AS [Period6]
,''  AS [Period7]
,''  AS [Period8]
,''  AS [Period9]
,''  AS [Period10]
,''  AS [Period11]
,''  AS [Period12]

UNION

SELECT  
   1 AS [LineNo]
, NULL AS [InitiativesID]
, NULL AS [InitiativeCode]
, NULL AS [InitiativeName]
,'WBS Element'AS [WBS Element]
,'POCWeight'AS [POC Weight]
,'Plan/Actual(P/A)'AS[Plan/Actual]
,'Year'  AS [Year]
,'Period1'AS[Period1]
,'Period2'AS[Period2]
,'Period3'AS[Period3]
,'Period4'AS[Period4]
,'Period5'AS[Period5]
,'Period6'AS[Period6]
,'Period7'AS[Period7]
,'Period8'AS[Period8]
,'Period9'AS[Period9]
,'Period10'AS[Period10]
,'Period11'AS[Period11]
,'Period12'AS[Period12]


UNION


SELECT  
  2 AS [LineNo]
, Initiatives.ID AS [InitiativesID]
, Initiatives.InitiativeCode AS [InitiativeCode]
, Initiatives.[Name] AS [InitiativeName] 
,

CASE  

WHEN ProgressHeader.WbsNo IS NOT NULL OR  ProgressHeader.WbsNo <> '' OR ProgressHeader.WbsNo <> '0'   THEN 

    CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(ProgressHeader.WbsNo, ''))
    WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(ProgressHeader.WbsNo, ''))
    ELSE ProgressHeader.WbsNo   + [dbo].[GetWBSElementSuffix](ProgressPlanDate.ProgressPlanDateType) 
    END



WHEN initiatives.InitiativeType in ('directCapex')--ProgressHeader.WbsNo IS NULL OR  ProgressHeader.WbsNo = '' OR  ProgressHeader.WbsNo = '0' 
THEN 
    --LEFT(ProgressHeader.StandardProjectDef,2) + '-' + LEFT(dbo.[fn_MAP_SAP_Plant](Initiatives.Plant),4) + '-'+  RIGHT(CONVERT(nvarchar(200),DATEPART(yy,CapexInformations.ActionYear)),2) + 'XXX'    
	CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(LEFT(ProgressHeader.StandardProjectDef,2), ''))
    WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(LEFT(ProgressHeader.StandardProjectDef,2), ''))
    ELSE
        LEFT(ProgressHeader.StandardProjectDef,2)
    END
    + '-' + LEFT(dbo.[fn_MAP_SAP_Plant](Initiatives.Plant),4) + '-'+  RIGHT(CONVERT(nvarchar(200),DATEPART(yy,CapexInformations.ActionYear)),2) + 'XXX'    + [dbo].[GetWBSElementSuffix](ProgressPlanDate.ProgressPlanDateType) 

ELSE   
/*ProgressHeader.WbsNo*/
--LEFT(ProgressHeader.StandardProjectDef,2)
    CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(LEFT(ProgressHeader.StandardProjectDef,2), ''))
    WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(LEFT(ProgressHeader.StandardProjectDef,2), ''))
    ELSE
        LEFT(ProgressHeader.StandardProjectDef,2)
    END
+ '-' + LEFT(dbo.[fn_MAP_SAP_Plant](Initiatives.Plant),4) + '-' +  RIGHT(CONVERT(nvarchar(200),DATEPART(yy,CapexInformations.ActionYear)),2) + 'XXX'      + [dbo].[GetWBSElementSuffix](ProgressPlanDate.ProgressPlanDateType) 
END
AS  [WBS Element]

,CASE WHEN NOT  ProgressPlanDate.PocWeightPercent IS NULL  THEN LTRIM(RTRIM(STR(ProgressPlanDate.PocWeightPercent))) ELSE '100' END  AS [POC Weight]
, 'P'  AS [Plan/Actual]
,LTRIM(RTRIM(STR(ProgressPlan.[Year]))) AS [Year]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Jan = 0 THEN NULL ELSE ProgressPlan.Jan END))) AS [Period1]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Feb = 0 THEN NULL ELSE ProgressPlan.Feb END))) AS [Period2]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Mar = 0 THEN NULL ELSE ProgressPlan.Mar END))) AS [Period3]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Apr = 0 THEN NULL ELSE ProgressPlan.Apr END))) AS [Period4]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.May = 0 THEN NULL ELSE ProgressPlan.May END))) AS [Period5]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Jun = 0 THEN NULL ELSE ProgressPlan.Jun END))) AS [Period6]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Jul = 0 THEN NULL ELSE ProgressPlan.Jul END))) AS [Period7]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Aug = 0 THEN NULL ELSE ProgressPlan.Aug END))) AS [Period8]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Sep = 0 THEN NULL ELSE ProgressPlan.Sep END))) AS [Period9]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Oct = 0 THEN NULL ELSE ProgressPlan.Oct END))) AS [Period10]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Nov = 0 THEN NULL ELSE ProgressPlan.Nov END))) AS [Period11]
,LTRIM(RTRIM(Convert(nvarchar(255),CASE WHEN ProgressPlan.Dec = 0 THEN NULL ELSE ProgressPlan.Dec END))) AS [Period12] 
FROM
v_Initiatives Initiatives 
LEFT JOIN CommonData invest ON invest.DataType = 'typeofinvestment' AND invest.Attribute02 = Initiatives.TypeOfInvestment
LEFT JOIN ProgressHeader ON ProgressHeader.InitiativeID = Initiatives.ID 
LEFT JOIN ProgressPlan ON ProgressPlan.InitiativeId = Initiatives.ID AND UPPER(ProgressPlan.ProgressPlanType) <> 'OVER ALL'AND UPPER(ProgressPlan.ProgressPlanType )<> 'OVERALL' AND ProgressPlan.PlanActual = 'Plan'
LEFT JOIN ProgressPlanDate ON ProgressPlanDate.InitiativeId = Initiatives.ID and ProgressPlanDate.ProgressPlanDateType = progressplan.ProgressPlanType   AND ProgressPlanDate.PocWeightPercent <> 0
LEFT JOIN CapexInformations ON CapexInformations.InitiativeID = Initiatives.ID
WHERE 
NOT 
(
ProgressPlan.Jan= 0 AND
ProgressPlan.Feb= 0 AND
ProgressPlan.Mar= 0 AND
ProgressPlan.Apr= 0 AND
ProgressPlan.May= 0 AND
ProgressPlan.Jun= 0 AND
ProgressPlan.Jul= 0 AND
ProgressPlan.Aug= 0 AND
ProgressPlan.Sep= 0 AND
ProgressPlan.Oct= 0 AND
ProgressPlan.Nov= 0 AND
ProgressPlan.Dec= 0   
)


GO

/****** Object:  View [dbo].[v_if_DAT]    Script Date: 9/23/2021 3:48:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO








   
 
CREATE view [dbo].[v_if_DAT] AS
 
 SELECT   
  0 AS [LineNo]
, NULL AS [InitiativesID]
, NULL AS [InitiativeCode]
, NULL AS [InitiativeName]
, '"Project Definition'  +'(CX-PPPP-YYNNN)"' AS [Project Definition] --A
, '"WBS"' AS [WBS]    --B  
, '"Basic Start Date"' AS [Basic Start Date] --T
, '"Basic Finish Date"' AS [Basic Finish Date] --U
, '"Actual Start Date (if REL)"' AS [Actual Start Date ] --V   
 
UNION 


SELECT   
  1 AS [LineNo] 
, NULL AS [InitiativesID]
, NULL AS [InitiativeCode]
, NULL AS [InitiativeName]
, 'R' AS [Project Definition] --A
, 'O (Phenol2 =R)' AS [WBS]    --B 
 
, 'R' AS [Basic Start Date] --T
, 'R' AS [Basic Finish Date] --U
, 'R' AS [Actual Start Date ] --V   
 

UNION 


SELECT   DISTINCT
  2 AS [LineNo]
, Initiatives.ID AS [InitiativesID]
, Initiatives.InitiativeCode AS [InitiativeCode]
, Initiatives.[Name] AS [InitiativeName]
--, CASE  WHEN ProgressHeader.WbsNo IS NULL OR  ProgressHeader.WbsNo = '' OR ProgressHeader.WbsNo = '0'   THEN LEFT(ProgressHeader.StandardProjectDef,2) + '-' + LEFT(dbo.[fn_MAP_SAP_Plant](Initiatives.Plant),4) + '-'+  RIGHT(CONVERT(nvarchar(200),DATEPART(yy,CapexInformations.ActionYear)),2) + 'XXX'    ELSE   ProgressHeader.WbsNo  END  AS [Project Definition] --A
,CASE  WHEN ProgressHeader.WbsNo IS NULL OR  ProgressHeader.WbsNo = '' OR ProgressHeader.WbsNo = '0'   THEN
CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(LEFT(ProgressHeader.StandardProjectDef,2), ''))
WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(LEFT(ProgressHeader.StandardProjectDef,2), ''))
ELSE
    LEFT(ProgressHeader.StandardProjectDef,2)
END
+ '-' + LEFT(dbo.[fn_MAP_SAP_Plant](Initiatives.Plant),4) + '-'+  RIGHT(CONVERT(nvarchar(200),DATEPART(yy,CapexInformations.ActionYear)),2) + 'XXX'    

ELSE
    CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(ProgressHeader.WbsNo, ''))
    WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(ProgressHeader.WbsNo, ''))
    ELSE
        ProgressHeader.WbsNo
    END
END  AS [Project Definition] --A


, 
CASE  WHEN ProgressHeader.WbsNo IS NULL OR  ProgressHeader.WbsNo = '' OR ProgressHeader.WbsNo = '0'   
THEN 
    CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(LEFT(ProgressHeader.StandardProjectDef,2), ''))
WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(LEFT(ProgressHeader.StandardProjectDef,2), ''))
ELSE
    LEFT(ProgressHeader.StandardProjectDef,2)
END + '-' + LEFT(dbo.[fn_MAP_SAP_Plant](Initiatives.Plant),4) + '-'+  RIGHT(CONVERT(nvarchar(200),DATEPART(yy,CapexInformations.ActionYear)),2) + 'XXX'  + [dbo].[GetWBSElementSuffix](ProgressPlanDate.ProgressPlanDateType)
ELSE
    CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(ProgressHeader.WbsNo, ''))
    WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(ProgressHeader.WbsNo, ''))
    ELSE
        ProgressHeader.WbsNo
    END   + [dbo].[GetWBSElementSuffix](ProgressPlanDate.ProgressPlanDateType)
END AS [WBS]    --B 
   --ProgressHeader.WbsNo AS [WBS]    --B 
 
,case when ProgressPlanDate.PocWeightPercent = 0 then Null else CONVERT(nvarchar(50), ISNULL(ProgressPlanDate.BasicStartDate, CapexInformations.[RequestIniNoDate]) , 104) end AS [Basic Start Date]  --- แม็กเพิ่ม 23-9-21
,case when ProgressPlanDate.PocWeightPercent = 0 then Null else CONVERT(nvarchar(50), ISNULL(ProgressPlanDate.BasicFinishDate, CapexInformations.[ProjecctComRun]) , 104) end AS [Basic Finish Date]  --- แม็กเพิ่ม 23-9-21

--,CONVERT(nvarchar(50), ISNULL(ProgressPlanDate.BasicStartDate, CapexInformations.[RequestIniNoDate]) , 104) AS [Basic Start Date] --T    --- แม็กเอาออก 23-9-21 
--,CONVERT(nvarchar(50), ISNULL(ProgressPlanDate.BasicFinishDate, CapexInformations.[ProjecctComRun]) , 104) AS [Basic Finish Date] --U    --- แม็กเอาออก 23-9-21

--- แม็กเอาออกครับเนื่องจาก SAP บอกไม่ต้องส่งแล้ว 27/4/2021
--,ISNULL(CONVERT(nvarchar(50),progressplandate.ActualStartDate),'') AS [Actual Start Date ] -- V
--- แม็กปรับแก้ไขครับ 27/4/2021
, Null  AS [Actual Start Date ] -- V
 
FROM v_Initiatives Initiatives   
LEFT JOIN CapexInformations ON CapexInformations.InitiativeID = Initiatives.ID AND CapexInformations.Revistion =0
LEFT JOIN CommonData invest ON invest.DataType = 'typeofinvestment' AND invest.Attribute02 = Initiatives.TypeOfInvestment 
LEFT JOIN ProgressHeader ON ProgressHeader.InitiativeID = Initiatives.ID  
LEFT JOIN ProgressPlanDate ON ProgressPlanDate.InitiativeId = Initiatives.ID    
 
GO



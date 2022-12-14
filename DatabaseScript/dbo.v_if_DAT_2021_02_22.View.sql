/****** Object:  View [dbo].[v_if_DAT_2021_02_22]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




 
CREATE view [dbo].[v_if_DAT_2021_02_22] AS
 
  
  
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
, REPLACE(Initiatives.[Name], ',', ' ' )AS [InitiativeName]
, 
CASE  WHEN ProgressHeader.WbsNo IS NULL OR  ProgressHeader.WbsNo = '' OR ProgressHeader.WbsNo = '0'   THEN
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


--, CASE  WHEN ProgressHeader.WbsNo IS NULL OR  ProgressHeader.WbsNo = '' OR ProgressHeader.WbsNo = '0'   THEN ''   ELSE  ProgressHeader.WbsNo END AS [WBS]    --B 
, CASE  WHEN ProgressHeader.WbsNo IS NULL OR  ProgressHeader.WbsNo = '' OR ProgressHeader.WbsNo = '0'   
THEN ''
ELSE
    CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(ProgressHeader.WbsNo, ''))
    WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef](ISNULL(ProgressHeader.WbsNo, ''))
    ELSE
        ProgressHeader.WbsNo
    END
END AS [WBS]    --B 
 
 
, CONVERT(nvarchar(50),CapexInformations.RequestIniNoDate , 104) AS [Basic Start Date] --T
--, CONVERT(nvarchar(50),CapexInformations.ProjecctComRun , 104) --, CONVERT(nvarchar(50),Initiatives.[FinishingDate] , 104) AS [Basic Finish Date] --U
, CONVERT(nvarchar(50),ProgressPlanDate.BasicFinishDate , 104) 
, CONVERT(nvarchar(50),ProgressPlanDate.ActualStartDate , 104) AS [Actual Start Date ] --V   
 
FROM v_Initiatives Initiatives
LEFT JOIN CapexInformations ON CapexInformations.InitiativeID = Initiatives.ID
LEFT JOIN CommonData invest ON invest.DataType = 'typeofinvestment' AND invest.Attribute02 = Initiatives.TypeOfInvestment

LEFT JOIN v_InvestmentType InvestmentType ON InvestmentType.[NAME] = CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN 'Engineering Request ER'
WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN 'Engineering Request ER'
ELSE Initiatives.TypeOfInvestment END


LEFT JOIN v_Operation_Warehouse_Plant_Mapping  WarehousePlant ON WarehousePlant.OperationPlant =dbo.[fn_MAP_SAP_Plant](Initiatives.Plant)
LEFT JOIN v_s_Company Company ON Company.[ShortName] = Initiatives.[Company]
LEFT JOIN DetailInformations ON DetailInformations.InitiativeID = Initiatives.ID 
LEFT JOIN ProgressHeader ON ProgressHeader.InitiativeID = Initiatives.ID 
LEFT JOIN ProgressPlanDate ON ProgressPlanDate.InitiativeID = Initiatives.ID AND    ProgressPlanDate.ProgressPlanDateType IN ( '-' ,'Over All','Overall')
LEFT JOIN OWNERS ProjectManagerInfo ON LOWER(ProjectManagerInfo.OwnerName) = LOWER(DetailInformations.ProjectManager)
LEFT JOIN OWNERS InitiativeOwnerInfo ON LOWER(InitiativeOwnerInfo.OwnerName) = LOWER(Initiatives.OwnerName)
--LEFT JOIN OWNERS VPInfo ON LOWER(VPInfo.OwnerName) = LOWER(DetailInformations.President)
LEFT JOIN OWNERS VPInfo ON LOWER(VPInfo.OwnerName) = LOWER(CapexInformations.CostCenterOfVP) 
LEFT JOIN InitiativeDetails ON InitiativeDetails.InitiativeID = Initiatives.ID  
LEFT JOIN OWNERS ProjectManagerInfo_Detail ON LOWER(ProjectManagerInfo_Detail.OwnerName) = LOWER(InitiativeDetails.ProjectManager)
LEFT JOIN OWNERS VPInfo_Detail ON LOWER(VPInfo_Detail.OwnerName) = LOWER(InitiativeDetails.President)






GO

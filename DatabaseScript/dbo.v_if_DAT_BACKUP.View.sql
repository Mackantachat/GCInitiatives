/****** Object:  View [dbo].[v_if_DAT_BACKUP]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

























 
CREATE view [dbo].[v_if_DAT_BACKUP] AS
 
 
SELECT   
  0 AS [LineNo]
, NULL AS [InitiativesID]
, NULL AS [InitiativeCode]
, NULL AS [InitiativeName]
, '"Project Definition'  +'(CX-PPPP-YYNNN)"' AS [Project Definition] --A
, '"WBS"' AS [WBS]    --B 
, '"PS: Short description (1st text line)'   +'(40 digits)"'AS [PS: Short description] --C
, '"Std. Proj. def"' AS [Std. Proj. def] --D
, '"No. of Person Resp. (Not final)"' AS [No. of Person Resp] --E
, '"Company code"' AS [Company code]   --F
, '"Production/General Plant"' AS[Production/General Plant] --G
, '"Profit Center"' AS [Profit Center] --H
, '"Start Date"' AS [Start Date] --I
, '"Finished Date"' AS [Finished Date] --J
, '"Proj.type"' AS [Proj.type]   -- K
, '"Responsible Cost Center"' AS [Responsible Cost Center] --L 
, '"Request'  +'Cost Center"' AS [Request Cost Center] --M 
, '"BOI / NSTDA'  +'(Checkbox)"' AS [BOI / NSTDA] --N 
, '"Const. for sales'  +'(Checkbox)"' AS  [Const. for sales] --O 
, '"BOI NO."' AS [BOI NO.] --P 
, '"Asset Group'  +'WBS Level 1 ONLY' +'10 digits"' AS [Asset Group] --Q 
, '"Assigned Date"' AS [Assigned Date] --R 
, '"CAP.Date"' AS [CAP.Date] --S  
, '"Basic Start Date"' AS [Basic Start Date] --T
, '"Basic Finish Date"' AS [Basic Finish Date] --U
, '"Actual Start Date (if REL)"' AS [Actual Start Date ] --V   
, '"Project Manager (ID Name) -"' AS [Project Manager] --W  
, '"Project Coordinator (ID Name)"' AS [Project Coordinator] --X  
, '"Budget Owner (ID Name)"' AS [Budget Owner] --Y  
, '"EVP Project Owner (ID Name)"' AS [EVP Project Owner] --Z 
, '"EX-IO"' AS [EX-IO] --AA
, '"Solomon Category'  +'for Refiney only"' AS [Solomon Category] --AB
, '"Physical Business Unit"' AS [Physical Business Unit] --AC
, '"Physical Plant (SAP Plant)."' AS [Physical Plant (SAP Plant)]  --AD
, '"Area/Panel No."' AS [Area/Panel No.] --AE
, '"Physical Unit"' AS [Physical Unit] --AF
, '"eMOC Number (13 Digits)"' AS [eMOC Number] -- TEMPX  --AG 
, '"Project Material Cost - Only Closed"' AS [Project Material Cost] --AH
, '"Appropriation request"' AS [Appropriation request] --AI
, '"Project  Definition System Status"' AS [Project  Definition System Status] --AJ
, '' AS [AK] --AK
, '' AS [AL] --AL
, '' AS [AM] --AM  

UNION 


SELECT   
  1 AS [LineNo] 
, NULL AS [InitiativesID]
, NULL AS [InitiativeCode]
, NULL AS [InitiativeName]
, 'R' AS [Project Definition] --A
, 'O (Phenol2 =R)' AS [WBS]    --B 
, 'R' AS [PS: Short description] --C
, 'R' AS [Std. Proj. def] --D
, 'R' AS [No. of Person Resp] --E
, 'R' AS [Company code]   --F
, 'R' AS[Production/General Plant] --G
, 'R' AS [Profit Center] --H
, 'R' AS [Start Date] --I
, 'R' AS [Finished Date] --J
, 'R' AS [Proj.type]   -- K
, 'O' AS [Responsible Cost Center] --L 
, 'R' AS [Request Cost Center] --M 
, 'O' AS [BOI / NSTDA] --N 
, 'O' AS [Const. for sales] --O 
, 'R - Lev 1' AS [BOI NO.] --P 
, 'O - Lev1' AS [Asset Group] --Q 
, 'O' AS [Assigned Date] --R 
, 'O' AS [CAP.Date] --S  
, 'R' AS [Basic Start Date] --T
, 'R' AS [Basic Finish Date] --U
, 'R' AS [Actual Start Date ] --V   
, 'R' AS [Project Manager] --W  
, 'R' AS [Project Coordinator] --X  
, 'R' AS [Budget Owner] --Y  
, 'R' AS [EVP Project Owner] --Z 
, 'R - only CEF / AT2' AS [EX-IO] --AA
, 'O' AS [Solomon Category] --AB
, 'R' AS [Physical Business Unit] --AC
, 'R' AS [Physical Plant (SAP Plant)]  --AD
, 'R' AS [Area/Panel No.] --AE
, 'R' AS [Physical Unit] --AF
, 'O' AS [eMOC Number] -- TEMPX  --AG 
, 'R - Lev 1 and CLSD' AS [Project Material Cost] --AH
, 'R - Level 1 only' AS [Appropriation request] --AI
, 'R' AS [Project  Definition System Status] --AJ
, '' AS [AK] --AK
, '' AS [AL] --AL
, '' AS [AM] --AM  

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
--, CASE  WHEN ProgressHeader.WbsNo IS NULL OR  ProgressHeader.WbsNo = '' OR ProgressHeader.WbsNo = '0'   THEN LEFT(ProgressHeader.StandardProjectDef,2) + '-' + LEFT(dbo.[fn_MAP_SAP_Plant](Initiatives.Plant),4) + '-'+  RIGHT(CONVERT(nvarchar(200),DATEPART(yy,CapexInformations.ActionYear)),2) + 'XXX'  + [dbo].[GetWBSElementSuffix](ProgressPlanDate.ProgressPlanDateType)   ELSE   ProgressHeader.WbsNo END AS [WBS]    --B 
, CASE  WHEN ProgressHeader.WbsNo IS NULL OR  ProgressHeader.WbsNo = '' OR ProgressHeader.WbsNo = '0'   
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
, LEFT(Initiatives.[Name], 40) AS [PS: Short description] --C
--, ProgressHeader.StandardProjectDef  AS [Std. Proj. def] --D
, 
CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN dbo.[fn_FixPrefixStandardProjectDef]([dbo].[fn_FixStandardProjectDef](ISNULL(ProgressHeader.StandardProjectDef, '')))
WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN dbo.[fn_FixPrefixStandardProjectDef]([dbo].[fn_FixStandardProjectDef](ISNULL(ProgressHeader.StandardProjectDef, '')))
ELSE ProgressHeader.StandardProjectDef END
  AS [Std. Proj. def] --D
, ProgressHeader.Responsible AS [No. of Person Resp] --E
, Company.ID AS [Company code]   --F
, WarehousePlant.WarehousePlant  AS [Production/General Plant] --G
, '' AS [Profit Center] --H
, CONVERT(nvarchar(50),CapexInformations.[RequestIniNoDate] , 104) AS [Start Date] --I
, CONVERT(nvarchar(50),CapexInformations.[ProjecctComRun] , 104) AS [Finished Date] --J
,  dbo.PadLeft(InvestmentType.[ID],'0',2) + ' '+InvestmentType.[NAME] AS [Proj.type]   -- K
, '' AS [Responsible Cost Center] --L 
, CapexInformations.[CodeCostCenterOfVP] AS [Request Cost Center] --M 
, '' AS [BOI / NSTDA] --N 
, '' AS [Const. for sales] --O 
, '' AS [BOI NO.] --P 
, '' AS [Asset Group] --Q 
, '' AS [Assigned Date] --R 
, '' AS [CAP.Date] --S  
, CASE WHEN (NOT  ProgressPlanDate.PocWeightPercent = 0)  OR Initiatives.InitiativeType  IN ('directCapex')  THEN CONVERT(nvarchar(50), ISNULL(ProgressPlanDate.BasicStartDate, CapexInformations.[RequestIniNoDate]) , 104) ELSE NULL END AS [Basic Start Date] --T    -- add case when check 0 by oat
, CASE WHEN (NOT  ProgressPlanDate.PocWeightPercent = 0)  OR Initiatives.InitiativeType  IN ('directCapex') THEN CONVERT(nvarchar(50), ISNULL(ProgressPlanDate.BasicFinishDate, CapexInformations.[ProjecctComRun]) , 104) ELSE NULL END AS [Basic Finish Date] --U    -- add case when check 0 by oat
, '' AS [Actual Start Date ] --V   
, ProjectManagerInfo.EmployeeID AS [Project Manager] --W  
, InitiativeOwnerInfo.EmployeeID AS [Project Coordinator] --X  
, VPInfo.EmployeeID AS [Budget Owner] --Y  
, Initiatives.Organization AS [EVP Project Owner] --Z 
, dbo.PadLeft(Initiatives.Initiativecode,'0',15) AS [EX-IO] --AA
, ProgressHeader.SolomonCategory  AS [Solomon Category] --AB
, ProgressHeader.PhysicalBu  AS [Physical Business Unit] --AC
,Initiatives.Plant AS [Physical Plant (SAP Plant)]  --AD
,ProgressHeader.AreaPlant  AS [Area/Panel No.] --AE
,ProgressHeader.PhysicalUnit  AS [Physical Unit] --AF
, '' AS [eMOC Number] -- TEMPX  --AG 
, '' AS [Project Material Cost] --AH
, CASE  WHEN ProgressHeader.AppropriationNo IS NULL OR  ProgressHeader.AppropriationNo = ''  OR  ProgressHeader.AppropriationNo = '0' THEN ''  ELSE ProgressHeader.AppropriationNo END AS [Appropriation request] --AI 
, 'CRTD Create' AS [Project  Definition System Status] --AJ
, 'X' AS [AK] --AK
, 'X' AS [AL] --AL
, 'X' AS [AM] --AM 
FROM v_Initiatives Initiatives

LEFT JOIN CapexInformations ON CapexInformations.InitiativeID = Initiatives.ID
LEFT JOIN CommonData invest ON invest.DataType = 'typeofinvestment' AND invest.Attribute02 = Initiatives.TypeOfInvestment

LEFT JOIN v_InvestmentType InvestmentType ON InvestmentType.[NAME] = CASE WHEN (ISNULL(Initiatives.InitiativeType, '') = 'ER' OR ISNULL(CapexInformations.PoolBudgetForm, '') = 'ER' OR ISNULL(Initiatives.PoolType, '') = 'ER' OR invest.Attribute01 = '07' OR ISNULL(Initiatives.BudgetSource, '') = 'ER') THEN 'Engineering Request ER'
WHEN Initiatives.BudgetSource = 'ER'  AND Initiatives.InitiativeType = 'directCapex' THEN 'Engineering Request ER'
ELSE Initiatives.TypeOfInvestment END

--LEFT JOIN v_InvestmentType InvestmentType ON InvestmentType.[NAME] = Initiatives.TypeOfInvestment
LEFT JOIN v_Operation_Warehouse_Plant_Mapping  WarehousePlant ON WarehousePlant.OperationPlant = dbo.[fn_MAP_SAP_Plant](Initiatives.Plant)
LEFT JOIN v_s_Company Company ON Company.[ShortName] = Initiatives.[Company]
LEFT JOIN DetailInformations ON DetailInformations.InitiativeID = Initiatives.ID 
LEFT JOIN ProgressHeader ON ProgressHeader.InitiativeID = Initiatives.ID 
--LEFT JOIN CapexInformations ON CapexInformations.InitiativeID = Initiatives.ID
LEFT JOIN OWNERS ProjectManagerInfo ON LOWER(ProjectManagerInfo.OwnerName) = LOWER(DetailInformations.ProjectManager)
LEFT JOIN OWNERS InitiativeOwnerInfo ON LOWER(InitiativeOwnerInfo.OwnerName) = LOWER(Initiatives.OwnerName)
LEFT JOIN OWNERS VPInfo ON LOWER(VPInfo.OwnerName) = LOWER(DetailInformations.President)
LEFT JOIN ProgressPlan ON ProgressPlan.InitiativeId = Initiatives.ID AND UPPER(ProgressPlan.ProgressPlanType) <> 'OVER ALL'AND UPPER(ProgressPlan.ProgressPlanType )<> 'OVERALL' AND ProgressPlan.PlanActual = 'Plan'
LEFT JOIN ProgressPlanDate ON ProgressPlanDate.InitiativeId = Initiatives.ID and ProgressPlanDate.ProgressPlanDateType = progressplan.ProgressPlanType  AND ProgressPlanDate.PocWeightPercent <> 0  --AND Initiatives.InitiativeType NOT IN ('directCapex')


--LEFT JOIN (SELECT 'W' AS suffix
--UNION SELECT'X' AS suffix
--UNION SELECT'Y' AS suffixsuffix
GO

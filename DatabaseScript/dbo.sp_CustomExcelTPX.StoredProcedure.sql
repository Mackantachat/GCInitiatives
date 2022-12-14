/****** Object:  StoredProcedure [dbo].[sp_CustomExcelTPX]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_CustomExcelTPX]
AS
	SELECT   
T.[Project Id] AS [Project Id],  
ISNULL(ph.WBSNO,'') as [Project No Sap],
ISNULL(i.[Name],'') as [Project Name],
ISNULL(MP.EmocNo,'') as [eMOC No],
CASE WHEN LOWER(i.Status) = 'revised' THEN 'ON GOING' ELSE UPPER(i.Status ) END  as [Project Status],
CASE WHEN CHARINDEX (':',i.Stage,0)>0 THEN  TRIM(LEFT(i.Stage,  CHARINDEX (':',i.Stage,0)-1)) ELSE  ISNULL(i.Stage,'') END AS [Gate Status],
ISNULL(TRIM(RIGHT(i.Stage, LEN(i.Stage) - CHARINDEX (':',i.Stage,0))),'')  as [Phase],
UPPER(i.InitiativeType) as [Process],
CASE WHEN i.[Max] = 1 THEN 'Y' ELSE 'N' END AS [Project Max],
i.ScopeOfWork as [Scope Of Project],
i.ResultObjective as [Objective],
ISNULL(UPPER(Replace(o4.EmployeeID + ' ' + LEFT(o4.email,  CHARINDEX ('@',o4.email,0)-1),'.',' ')),'') as [Project Engineer],
ISNULL(o4.Indicator,'') AS [Indicator],
ISNULL(UPPER(Replace(o3.EmployeeID + ' ' + LEFT(o3.email,  CHARINDEX ('@',o3.email,0)-1),'.',' ')),'') as [Project Manager],
'' as [Investment Type Name],
ISNULL(i.TypeOfInvestment,'') as [Project Type Name] ,
ISNULL(i.Ram ,'')as [Priority Name],
ISNULL(i.Company ,'') as [Company Name],
i.Organization as [Business Unit Name],
i.Plant as [Plant],
'' as [Unit No],
ISNULL(i.RegisteringDate,'') as [Registered Date],
ISNULL(di.KickoffMeeting,'') as [Kickoff Date],
ISNULL(UPPER(Replace(o2.EmployeeID + ' ' + LEFT(o2.email,  CHARINDEX ('@',o2.email,0)-1),'.',' ')),'') as [Initiator],

'' as [Approver],
ISNULL(Convert(nvarchar(255),i.[JFactor]),'')    as [J-Factor],
ISNULL(Convert(nvarchar(255),i.[PayBackPeriod]),'')  as [Simp Payback Year],
ISNULL(Convert(nvarchar(255),i.Irr),'') as [IRR],
ISNULL(Convert(nvarchar(255),i.CostEstCapex*1000000),'')  as [Estimate Cost],
ISNULL(Convert(nvarchar(255),i.FinishingDate),'') as [Plan Date To Complete],



WRP.[Gate1approveDate],
WRP.[Gate1targetCompleteDate],
WRP.[Gate1estimatedBudget],
WRP.[Gate2approveDate],
WRP.[Gate2targetCompleteDate],
WRP.[Gate2estimatedBudget],
WRP.[Gate3approveDate],
WRP.[Gate3targetCompleteDate],
WRP.[Gate3estimatedBudget],
WRP.[Revised1approvedDate],
WRP.[Revised1targetCompletionDate],
WRP.[Revised1approvedBudget],
WRP.[Revised2approvedDate],
WRP.[Revised2targetCompletionDate],
WRP.[Revised2approvedBudget],
WRP.[Gate4approveDate],
WRP.[Gate4targetCompleteDate],
WRP.[Gate4estimatedBudget],
  
WRP.[SAPBasic_StartDate],
WRP.[SAPActualStartDate],
WRP.[ProjectCompletionDateEMOCorCAPDate],
WRP.[SAPForecastFinishDate],
WRP.[SAPBasicFinishDate], 


NULL as[SAP CLSD Date],
ISNULL(Convert(nvarchar(255),i.CostEstCapex*1000000),'')  as [Approved Budget],
 
NULL as [Project Size],
NULL as [Project Phase],

WRP.[PlanPOC],
WRP.[ActualPOC],
WRP.[Variant], 
WRP.[ActualCost],
WRP.[Committed],
WRP.[Outstanding],
WRP.[Contingency],  
NULL as [Validate Complaint],

  (SELECT TOP 1 [HighlightWork]
    FROM [dbo].[BscNarrative]
    where InitiativeId = i.Id
    Order by Year , Month desc ) as[Highlight Work],

  (SELECT TOP 1 MitigationPlan
    FROM [dbo].[BscNarrative]
    where InitiativeId = i.Id
    Order by Year , Month desc ) as [Mitigation Plan],
    NULL as [Performance Lookback],
    NULL as[PSR],
    NULL as[Hide From Dashboard],
    NULL as[Plan Cost Version],
    NULL as[Version],
    WRP.IsSimplify as[Is Simplify],
  i.BenefitAmount as[Benefit],
  i.Background,
  NUll as [MAP Idea MANI]

 

FROM 
Temp_WPMigration t
LEFT JOIN Initiatives i ON i.InitiativeCode = t.[Tobe Idea MANI Initiative] AND   (ISNULl(I.Stage,'')  <>  'Cancelled'  AND  ISNULl(I.Status,'' ) <>  'cancelled')
LEFT JOIN  ProgressHeader ph on ph.initiativeId = i.id 
LEFT JOIN  MainPlant MP ON MP.InitiativeId = I.Id  
LEFT JOIN  [DetailInformations] di on i.Id = di.InitiativeId 
LEFT JOIN  Owners o2 on i.OwnerName = o2.OwnerName 
LEFT JOIN  Owners o3 on di.ProjectManager = o3.OwnerName 
LEFT JOIN  Owners o4 on di.ProjectEngineer = o4.OwnerName 
LEFT JOIN  ZZ_WebinputReport WRP ON WRP.ProjectId =   t.[Project Id]
 
ORDER BY Convert(INT,T.[Project Id])
--GO;
GO

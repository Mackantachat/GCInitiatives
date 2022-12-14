/****** Object:  View [dbo].[v_bi_ViewProjectInfo]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







 

CREATE view [dbo].[v_bi_ViewProjectInfo] AS
select  
distinct i.id as ProjectID,
NULL as ProfileID,
i.InitiativeCode as ProjectNo,
i.Name as ProjectName,
o.EmployeeID as BudgetOwner,
o.EmployeeID + ' ' +  [dbo].[fn_OwnerDispByEmail](o.email) as BudgetOwnerDisp,
o.Indicator as BudgetOwnerDept,
o2.EmployeeID as ProjectOwner,
o2.EmployeeID + ' '  +  [dbo].[fn_OwnerDispByEmail](o2.email) as ProjectOwnerDisp,
o2.Indicator as ProjectOwnerDept,
o3.EmployeeID as ProjectManager,
o3.EmployeeID + ' ' +  [dbo].[fn_OwnerDispByEmail](o3.email) as ProjectManagerDisp,
o3.Indicator as ProjectManagerDept,
o4.EmployeeID as ProjectEngineer,
o4.EmployeeID + ' ' +  [dbo].[fn_OwnerDispByEmail](o4.email)  as ProjectEngineerDisp,
o4.Indicator as ProjectEngineerDept,
o4.[Indicator] as Indicator,
o5.EmployeeID as [ProcessEng],
o5.EmployeeID + ' ' +  [dbo].[fn_OwnerDispByEmail](o5.email) as ProcessEngDisp,
o5.Indicator as ProcessEngDept,
o9.EmployeeID as ProjectEngDivManager,
o9.EmployeeID + ' ' +  [dbo].[fn_OwnerDispByEmail](o9.email) as ProjectEngDivManagerDisp,
o6.Indicator as ProjectEngDivManagerDept,
ProjCtr.EmployeeID as ProjectCtrl,
ProjCtr.EmployeeID + ' ' + LEFT(ProjCtr.email,  CHARINDEX ('@',ProjCtr.email,0)-1) as ProjectCtrlDisp,
ProjCtr.Indicator as ProjectCtrlDept,


 
 -- CASE WHEN cd.Attribute07 IS NULL THEN 99 ELSE cd.Attribute07 END   as CompanyID,
 cd.Attribute01   as CompanyID,
 MstEVP.EVPID as EVPID, 
 MstPlant.PlantID as PlantID,
 



'TH' as CountryCode,
3 as CurrencyID,
cd.Attribute01 as PSRProjectTypeID,
cd.Attribute01  as ProjectTypeID,
NULL as EROwnerID,
i.FinishingDate as PlanDateToComplete,
i.FinishingDate as ForecastDateToComplete,
PlanDate.ActualFinishDate as ActualDateToComplete,
ci.ProjecctComRun as CommercialRunDate,
Lookback.PlanLookbackDate as PlanLookbackDate,
ActLookback.ApprovedDate as ActualLookbackDate,
(ci.ProjectCost*1000000) as ApprovalBudget,

--EMOC.EmocNo as EMOCNo, 
--di.ExternalEmoc  as EMOCNo,
MOC2.eMOCNo  as EMOCNo,

 




Progress.WbsNo as ProjectNoWBS,
Progress.AppropriationNo as ProjectNoAppr,
i.ScopeOfWork as ScopeOfProject,
i.ResultObjective as Objective,
i.Background as ProjectBackground,
(i.CostEstCapex*1000000) as EstimateCost,
o8.EmployeeID as CreatedBy,
i.CreatedDate as CreatedDate,
case when o7.EmployeeID is null then o2.EmployeeID else o7.EmployeeID end as ModifiedBy,
i.UpdatedDate as ModifiedDate,
NULL as ProjectRiskOwner,
SUBSTRING(CAST( YEAR(GETDATE()) AS VARCHAR(4)), 1,2) + SUBSTRING(Progress.WbsNo, 9, 2) as ApprovalYear,
ps.ProjectStatusID as ProjectStatusID,
null as IsShowInDashboard
from v_Initiatives i  
left join DetailInformations di on di.InitiativeId = i.Id 
left join CapexInformations ci on ci.InitiativeId = i.Id AND ISNULL(ci.Sequent, 0) = (SELECT ISNULL(MAX(Sequent), 0) FROM CapexInformations WHERE InitiativeId = i.Id)
left join Owners o on ci.CostCenterOfVP = o.OwnerName 
left join Owners o2 on i.OwnerName = o2.OwnerName 
left join Owners o3 on di.ProjectManager = o3.OwnerName  
left join Owners o4 on di.ProjectEngineer = o4.OwnerName 
left join Owners o5 on di.ProcessEngineer = o5.OwnerName 
left join Owners o6 on di.DivMgrOfProcessEngineer = o6.OwnerName
left join Owners o7 on i.UpdatedBy = o7.Email
left join Owners o8 on i.CreatedBy = o8.Email
left join Owners o9 on convert(nvarchar(255),o4.DivManagerEmpID) = convert(nvarchar(255),o9.EmployeeID )
--left join Owners o10 on convert(nvarchar(255),o4.FNGRPManagerEmpID) = convert(nvarchar(255),o10.EmployeeID )

left join CommonData cd on cd.Attribute03 = i.Company and cd.DataType = 'Company'
left join AnnualInvestmentPlans aip on aip.CapexInformationId = ci.CapexInformationId and aip.InitiativeId = i.id
left join Currency c on c.CurrencyTitle = aip.Currency 
left join CommonData toi on toi.Attribute02 = i.TypeOfInvestment and toi.Attribute01 is not null
left join Owners ProjCtr on ProjCtr.Email = cd.Attribute19
left join v_bi_TbMstPlant MstPlant on LEFT(MstPlant.ATOMsPlantCode,4) = LEFT(i.plant,4)
left join v_bi_TbMstEVP MstEVP on MstEVP.EVP = i.Organization
left join ProgressPlanDate PlanDate on PlanDate.InitiativeId = i.Id and  PlanDate.ProgressPlanDateType IN( 'Overall' , 'Over All')
left join ProjectLookback Lookback on Lookback.InitiativeId = i.Id
left join MainPlant EMOC on EMOC.InitiativeId = i.id
left join ProgressHeader Progress on Progress.InitiativeId = i.id
left join InitiativeStatusTrackings ActLookback on ActLookback.InitiativeId = i.Id and ActLookback.Stage = 'Gate4 : Execution Lookback-2'
left join v_bi_ProjectStatus PS on PS.Id = i.id
left join InititiveEmoc MOC2 ON MOC2.InitiativeId = i.id


 
WHERE  ISNULL( i.HistoryFlag,0 ) = 0 
AND  ISNULL(Progress.WBSNO,'') <> ''
AND ISNULL( MstEVP.EVPID,'' ) <> '' 
AND  ISNULL(MstPlant.PlantID,'' ) <> '' 
AND  ISNULL(  toi.Attribute01,'' ) <> '' 
AND   i.Status NOT IN ('deleted','cancelled')

GO

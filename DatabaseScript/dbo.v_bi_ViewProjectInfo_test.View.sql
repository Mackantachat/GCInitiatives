/****** Object:  View [dbo].[v_bi_ViewProjectInfo_test]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_ViewProjectInfo_test] as 
select 
	i.id as [ProjectID]
      ,'3' as [ProfileID]
      ,i.InitiativeCode as [ProjectNo]
      ,i.Name as [ProjectName]
      ,'26000623' as [BudgetOwner]
      ,'26000623 Sawat T' as [BudgetOwnerDisp]
      ,'A-MN' as [BudgetOwnerDept]
      ,'26000032' as [ProjectOwner]
      ,'26000032 Wiboon C' as [ProjectOwnerDisp]
      ,'E-GC-AS' as [ProjectOwnerDept]
      ,o.EmployeeID as [ProjectManager]
      ,o.EmployeeID + ' ' + o.FirstName + ' ' + left(o.LastName,1) as [ProjectManagerDisp]
      ,'TP-PP-PB' as [ProjectManagerDept]
      ,'26002219' as [ProjectEngineer]
      ,'26002219 Prasoporn L' as [ProjectEngineerDisp]
      ,'TP-PP-DM' as [ProjectEngineerDept]
      ,'TP-PP-PB' as [Indicator]
      ,'26002711' as [ProcessEng]
      ,'26002711 Supawadee R' as [ProcessEngDisp]
      ,'R-P1-TE' as [ProcessEngDept]
      ,'26001852' as [ProjectEngDivManager]
      ,'26001852 Nittaya A' as [ProjectEngDivManagerDisp]
      ,'R-MO-TE' as [ProjectEngDivManagerDept]
      ,'26002136' as [ProjectCtrl]
      ,'26002136 Pisit Pe' as [ProjectCtrlDisp]
      ,'TP-PM-CO' as [ProjectCtrlDept]
      ,cd.Attribute01 as [CompanyID]
      ,'1' as [EVPID]
      ,i.Plant as [PlantID]
      ,'TH' as [CountryCode]
      ,'1' as [CurrencyID]
      ,'7' as [PSRProjectTypeID]
      ,'7' as [ProjectTypeID]
      ,'1' as [EROwnerID]
      ,'12/31/2015 12:00:00 AM' as [PlanDateToComplete]
      ,'12/31/2015 12:00:00 AM' as [ForecastDateToComplete]
      ,'12/31/2015 12:00:00 AM' as [ActualDateToComplete]
      ,'12/31/2015 12:00:00 AM' as [CommercialRunDate]
      ,'12/31/2015 12:00:00 AM' as [PlanLookbackDate]
      ,'12/31/2015 12:00:00 AM' as [ActualLookbackDate]
      ,'1. Basic design 2. Procurement process 3. Engineering design 4. Execution process 5. Commissioning' as [ScopeOfProject]
      ,'CW piping which has been installed underground piping
and found water leak and need to repair. 
The reason is our existing sacrificial anode fail 
and cannot prevent underground piping corrosion. 
So we would like to propose new retrofit cathodic
 protection system for replacing of existing system.' as [Objective]
      ,'PTTGC-Refinery has own utility 
complex for supply to all process units in Refinery.  
The utility system is complicated, 
where the utility supply depends on process requirement.  
The utility online-optimization model will monitor and 
assist operation with making optimum operational 
decisions to improve performance of the utility system.' as [ProjectBackground]
      ,'32530000' as [EstimateCost]
      ,'31000000' as [ApprovalBudget]
      ,'' as [ProjectStatusID]
      ,'1' as [IsShowInDashboard]
      ,i.OwnerName as [CreatedBy]
      ,i.RegisteringDate as [CreatedDate]
      ,i.OwnerName as [ModifiedBy]
      ,i.RegisteringDate as [ModifiedDate]
      ,'R-P1-2014/023' as [EMOCNo]
      ,'CE-101A-10701' as [ProjectNoWBS]
      ,'1010-THB01-01-04-02-001' as [ProjectNoAppr]
      ,'' as [ProjectRiskOwner]
      ,'2010' as [ApprovalYear]
FROM v_Initiatives i
left join CommonData cd on cd.Attribute03 = i.Company and cd.DataType = 'company'
left join DetailInformations di on i.Id = di.InitiativeId
left join Owners o on o.OwnerName = di.ProjectManager

GO

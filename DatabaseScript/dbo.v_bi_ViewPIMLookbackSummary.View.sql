/****** Object:  View [dbo].[v_bi_ViewPIMLookbackSummary]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE view [dbo].[v_bi_ViewPIMLookbackSummary] AS
select
distinct i.id																																as ProjectID,
i.id																																		as PIRNo,
o1.FirstName + ' ' + o1.LastName																											as BudgetOwnerFullName,
o2.FirstName + ' ' + o2.LastName																											as ProjectEngineerFullName,
null																																		as PIRReviewer1FullName,
null																																		as PIRReviewer2FullName,
null																																		as PIRReviewer3FullName,
null																																		as PIRReviewer4FullName,
null																																		as PIRReviewer5FullName,
o1.[Indicator]																																as SupportBy,
ci.ProjectCost																																as budget,
PerfLookback.ApprovedDate																													as ReviewDate,
Benefit.EstimatedPlaned																														as BenefitObjective,
IRR.EstimatedPlaned																															as PlanIRR,
IRR.Actual																																	as ActualIRR,
Benefit.EstimatedPlaned																														as PlanBenefit,
Benefit.Actual																																as ActualBenefit,
ExecLookback.ApprovedDate																													as ExecLookbackDate,
PerfLookback.ApprovedDate																													as PerfLookbackDate,
EnvLookbackP2.ApprovedDate																													as EnvLookbackDate,
count(distinct le.MilestoneNo)																												as NoOfLessonLearn,
Lookback.EnvironmentResultBenefitYearThb																									as EnviBenefit,
(case when ExecLookback.Status	= 'Complete' then 'Pass' else null End)																		as ExecLookbackStatus,
(case when PerfLookback.Status	= 'Complete' then 'Pass' else null End)																		as PerfLookbackStatus,
(case when EnvLookbackP1.Status = 'Complete' then 'Pass' else null End)																		as EnvLookbackStatusP1,
(case when EnvLookbackP2.Status = 'Complete' then 'Pass' else null End)																		as EnvLookbackStatusP2,
(case when Env1Submit.Status	= 'Complete' then (select employeeid from owners where OwnerName = Env1Submit.ApprovedBy) else null End)	as Env1Submitter,
(case when Env1Submit.Status	= 'Complete' then Env1Submit.ApprovedBy else null End)														as Env1SubmitterName,
(case when Env1Approve.Status	= 'Complete' then (select employeeid from owners where OwnerName = Env1Approve.ApprovedBy)else null End)	as Env1Approver,
(case when Env1Approve.Status	= 'Complete' then Env1Approve.ApprovedBy else null End)														as Env1ApproverName					
from v_Initiatives i 
left join CapexInformations ci						on ci.InitiativeId = i.Id 
left join DetailInformations di						on di.InitiativeId = i.id 
left join Owners o1									on ci.CostCenterOfVP = o1.OwnerName  
left join Owners o2									on di.ProjectEngineer = o2.EmployeeID 
left join ProjectLookback Lookback					on Lookback.InitiativeId = i.Id
left join CoreUplift Benefit						on Benefit.ProjectLookbackId = Lookback.ProjectLookbackId and Benefit.Economics = 'Benefit Objective of this project'
left join CoreUplift IRR							on IRR.ProjectLookbackId = Lookback.ProjectLookbackId and IRR.Economics = '%IRR'
left join LessonsLearned le							on le.InitiativeId = i.Id
left join InitiativeStatusTrackings ExecLookback	on ExecLookback.InitiativeId = i.Id AND ExecLookback.Stage = 'Gate4 : Execution Lookback-2' 
left join InitiativeStatusTrackings PerfLookback	on PerfLookback.InitiativeId = i.Id AND PerfLookback.Stage = 'GATE4 : Performance-6'			 
left join InitiativeStatusTrackings EnvLookbackP1	on EnvLookbackP1.InitiativeId = i.Id AND EnvLookbackP1.Stage = 'GATE4 : envi-3'					 
left join InitiativeStatusTrackings EnvLookbackP2	on EnvLookbackP2.InitiativeId = i.Id AND EnvLookbackP2.Stage = 'GATE4 : envi-5'					 
left join InitiativeStatusTrackings Env1Submit		on Env1Submit.InitiativeId = i.Id AND Env1Submit.Stage = 'GATE4 : envi-1'
left join InitiativeStatusTrackings Env1Approve		on Env1Approve.InitiativeId = i.Id AND Env1Approve.Stage = 'GATE4 : envi-3'	
group by i.id, o1.FirstName + ' ' + o1.LastName,o2.FirstName + ' ' + o2.LastName,o1.[Indicator],ci.ProjectCost,PerfLookback.ApprovedDate
,Benefit.EstimatedPlaned,IRR.EstimatedPlaned,IRR.Actual,Benefit.EstimatedPlaned, Benefit.Actual	,ExecLookback.ApprovedDate,PerfLookback.ApprovedDate
,EnvLookbackP2.ApprovedDate,Lookback.EnvironmentResultBenefitYearThb,ExecLookback.Status,PerfLookback.Status	, EnvLookbackP1.Status ,EnvLookbackP2.Status 
,Env1Submit.Status	,Env1Submit.Status	,Env1Approve.Status	, Env1Approve.Status	
,Env1Submit.ApprovedBy,Env1Approve.ApprovedBy
GO

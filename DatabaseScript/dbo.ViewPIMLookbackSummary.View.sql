/****** Object:  View [dbo].[ViewPIMLookbackSummary]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[ViewPIMLookbackSummary] AS
select
i.id as ProjectID,
Null as PIRNo,
o.EmployeeID as BudgetOwnerFullName,
Null as ProjectEngineerFullName,
Null as PIRReviewer1FullName,
Null as PIRReviewer2FullName,
Null as PIRReviewer3FullName,
Null as PIRReviewer4FullName,
Null as PIRReviewer5FullName,
o.Indicator as SupportBy, 
Null as budget,
Null as ReviewDate,
Null as BenefitObjective,
Null as PlanIRR,
Null as ActualIRR,
Null as PlanBenefit,
Null as ActualBenefit,
Null as ExecLookbackDate,
Null as PerfLookbackDate,
Null as EnvLookbackDate,
Null as NoOfLessonLearn,
Null as EnviBenefit,
Null as ExecLookbackStatus,
Null as PerfLookbackStatus,
Null as EnvLookbackStatusP1,
Null as EnvLookbackStatusP2,
Null as Env1Submitter,
Null as Env1SubmitterName,
Null as Env1Approver,
Null as Env1ApproverName
from dbo.v_Initiatives i 
left join dbo.CapexInformations ci on ci.InitiativeId = i.Id 
left join dbo.Owners o on o.OwnerName = i.OwnerName 
left join dbo.Owners o2 on o2.OwnerName = ci.CostCenterOfVP 
GO

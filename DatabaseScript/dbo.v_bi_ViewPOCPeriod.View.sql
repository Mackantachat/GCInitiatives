/****** Object:  View [dbo].[v_bi_ViewPOCPeriod]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE view [dbo].[v_bi_ViewPOCPeriod] AS
select
distinct i.id as ProjectID,
FORMAT (getdate(), 'MM/yyyy') as Period,
(case when EngPlan.PlanActual = 'Plan'			then (select DBO.[GetCurrentMonthFromPeriod] (MONTH(GETDATE()),YEAR(GETDATE()),'Engineering'	,'Plan'	))	end)	as EngineeringPlan,
(case when EngActual.PlanActual = 'Actual'		then (select DBO.[GetCurrentMonthFromPeriod] (MONTH(GETDATE()),YEAR(GETDATE()),'Engineering'	,'Actual'))	 end)	as EngineeringActual,
(case when ProPlan.PlanActual = 'Plan'			then (select DBO.[GetCurrentMonthFromPeriod] (MONTH(GETDATE()),YEAR(GETDATE()),'Procurement'	,'Plan'	))	end)	as ProcurementPlan,
(case when ProActual.PlanActual = 'Actual'		then (select DBO.[GetCurrentMonthFromPeriod] (MONTH(GETDATE()),YEAR(GETDATE()),'Procurement'	,'Actual'))	 end)	as ProcurementActual,
(case when ConPlan.PlanActual = 'Plan'			then (select DBO.[GetCurrentMonthFromPeriod] (MONTH(GETDATE()),YEAR(GETDATE()),'Construction'	,'Plan'	))	end)	as ConstructionPlan,
(case when ConActual.PlanActual = 'Actual'		then (select DBO.[GetCurrentMonthFromPeriod] (MONTH(GETDATE()),YEAR(GETDATE()),'Construction'	,'Actual'))	 end)	as ConstructionActual,
(case when ComPlan.PlanActual = 'Plan'			then (select DBO.[GetCurrentMonthFromPeriod] (MONTH(GETDATE()),YEAR(GETDATE()),'Commissioning'	,'Plan'	))	end)	as CommissioningPlan,
(case when ComActual.PlanActual = 'Actual'		then (select DBO.[GetCurrentMonthFromPeriod] (MONTH(GETDATE()),YEAR(GETDATE()),'Commissioning'	,'Actual'))	 end)	as CommissioningActual,
(case when OverallPlan.PlanActual = 'Plan'		then (select DBO.[GetCurrentMonthFromPeriod] (MONTH(GETDATE()),YEAR(GETDATE()),'Overall'		,'Plan'	))	end)	as OverallPlan,
(case when OverallActual.PlanActual = 'Actual'	then (select DBO.[GetCurrentMonthFromPeriod] (MONTH(GETDATE()),YEAR(GETDATE()),'Overall'		,'Actual'))	 end)	as OverallActual
from dbo.v_Initiatives i 
left join ProgressPlan EngPlan			on EngPlan.InitiativeId = i.id			and EngPlan.ProgressPlanType		= 'Engineering'		and EngPlan.PlanActual			= 'Plan'
left join ProgressPlan EngActual		on EngActual.InitiativeId = i.id		and EngActual.ProgressPlanType		= 'Engineering'		and EngActual.PlanActual		= 'Actual'
left join ProgressPlan ProPlan			on EngPlan.InitiativeId = i.id			and EngPlan.ProgressPlanType		= 'Procurement'		and EngPlan.PlanActual			= 'Plan'
left join ProgressPlan ProActual		on EngActual.InitiativeId = i.id		and EngActual.ProgressPlanType		= 'Procurement'		and EngActual.PlanActual		= 'Actual'
left join ProgressPlan ConPlan			on EngPlan.InitiativeId = i.id			and EngPlan.ProgressPlanType		= 'Construction'	and EngPlan.PlanActual			= 'Plan'
left join ProgressPlan ConActual		on EngActual.InitiativeId = i.id		and EngActual.ProgressPlanType		= 'Construction'	and EngActual.PlanActual		= 'Actual'
left join ProgressPlan ComPlan			on EngPlan.InitiativeId = i.id			and EngPlan.ProgressPlanType		= 'Commissioning'	and EngPlan.PlanActual			= 'Plan'
left join ProgressPlan ComActual		on EngActual.InitiativeId = i.id		and EngActual.ProgressPlanType		= 'Commissioning'	and EngActual.PlanActual		= 'Actual'
left join ProgressPlan OverallPlan		on OverallPlan.InitiativeId = i.id		and OverallPlan.ProgressPlanType	= 'Overall'			and OverallPlan.PlanActual		= 'Plan'
left join ProgressPlan OverallActual	on OverallActual.InitiativeId = i.id	and OverallActual.ProgressPlanType	= 'Overall'			and OverallActual.PlanActual	= 'Actual'
WHERE I.ID = 61054

GO

/****** Object:  View [dbo].[v_bi_ViewTbTxnNarrative]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[v_bi_ViewTbTxnNarrative] AS
select
i.Id as ProjectID,
Null as Period,
BscNarrative.HighlightWork as HighlightWork,
BscNarrative.ExecutiveSummary as Summary,
BscNarrative.RiskAndConcern as RiskConcern,
null as Achievement,
BscNarrative.MitigationPlan as MitigationPlan,
null as PlanNextMonth,
BscNarrative.WorkForNextMonth as WorkForNextMonth,
null as AreaOfConcern,
null as HighlightWorkPlain,
null as SummaryPlain,
null as RiskConcernPlain,
null as AchievementPlain,
null as MitigationPlanPlain,
null as PlanNextMonthPlain,
null as WorkForNextMonthPlain,
null as AreaOfConcernPlain,
Null as PublishFlag
from dbo.v_Initiatives i 
left join BscNarrative on BscNarrative.InitiativeId = i.id
GO

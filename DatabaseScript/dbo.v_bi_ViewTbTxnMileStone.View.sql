/****** Object:  View [dbo].[v_bi_ViewTbTxnMileStone]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE view [dbo].[v_bi_ViewTbTxnMileStone] AS
select
i.id as ProjectID,
i.InitiativeCode as ProjectNo,
hd.WbsNo as ProjectNoWBS,
pd.Milestone as MilestoneID,
pd.KeyDeliverable as MilestoneName,
pd.PlanFinish as PlanFinishDate,
pd.ActualFinish as ActualFinishDate,
pd.PlanFinish as [ForecastDate],
'Other' as MilestoneGroup,
1 as IsActive,
CASE 	
	WHEN pd.ActualFinish IS NULL AND pd.PlanFinish > (select CONVERT(Date,getdate() - Day(getdate())))
		THEN pd.PlanFinish
	ELSE pd.ActualFinish END AS Period,
CASE 
	WHEN pd.ActualFinish IS NULL AND pd.PlanFinish <= (select CONVERT(Date,getdate() - Day(getdate())))
	THEN 0
	WHEN pd.ActualFinish IS NULL AND pd.PlanFinish> (select CONVERT(Date,getdate() - Day(getdate())))  THEN 2
	WHEN pd.ActualFinish <= pd.PlanFinish THEN 2 ELSE 0 
END AS Status,
NULL AS [PublishFlag],
(select CONVERT(Date,getdate() - Day(getdate()))) as PMOAsOf
from dbo.v_Initiatives i 
left join ProgressDetails pd on pd.InitiativeId = i.Id 
left join ProgressHeader hd on hd.InitiativeId = i.id
GO

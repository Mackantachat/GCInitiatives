/****** Object:  View [dbo].[v_bi_TbTxnPIMLookbackResultItem]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE view [dbo].[v_bi_TbTxnPIMLookbackResultItem] AS
select
i.id as ProjectID,
Lookback.ProjectLookbackId as ItemNo,
Lookback.CoreUpliftResultDescription as Description,
Lookback.CoreUpliftResultBefore as Before,
Lookback.CoreUpliftResultAfter as After,
Lookback.CoreUpliftResultUnit as Unit,
Lookback.CoreUpliftResultBenefit as Benefits,
0 as BenefitsTHB,
null as Remark,
'Perf-Lookback' as TabSubView
from dbo.v_Initiatives i 
left join ProjectLookback Lookback on Lookback.InitiativeId = i.id
where Lookback.ProjectLookbackId IS NOT NULL
GO

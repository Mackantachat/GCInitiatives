/****** Object:  View [dbo].[v_bi_TbTxnProjectReference]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE view [dbo].[v_bi_TbTxnProjectReference] AS
select 
 
MAX(i.id) as ProjectID,
i.InitiativeCode as InitiativeCode,
MAX(mp.EmocNo) as EMOCNo,
null as CAPEXReqID,
MAX(hd.AppropriationNo) as ProjectNoAppr,
MAX(hd.WbsNo) as ProjectNoWBS
from v_Initiatives i 
left join ProgressHeader hd on hd.InitiativeId = i.id
left join MainPlant mp on mp.InitiativeId = i.id
where hd.AppropriationNo is not null or hd.WbsNo is not null
Group by i.InitiativeCode 
GO

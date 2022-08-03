/****** Object:  View [dbo].[v_bi_TbTxnProjectPhase_20210830]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE view [dbo].[v_bi_TbTxnProjectPhase_20210830] AS
select
i.id as ProjectID,
--i.stage as Phase
CASE 
WHEN i.stage like 'Gate1%' THEN 1 
WHEN i.stage like 'Gate2%' THEN 2
WHEN i.stage like 'Gate3%' THEN 3
WHEN i.stage like 'Gate4%' THEN 4
ELSE 4
END AS   Phase
from v_Initiatives i 


GO

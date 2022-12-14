/****** Object:  View [dbo].[v_bi_TbTxnProjectStatus]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[v_bi_TbTxnProjectStatus] AS
select
i.id as ProjectID,
ps.ProjectStatusID as ProjectStatusID,
CASE 
   when Status = 'Canceled' then UpdatedDate
   when Status = 'cancel' then UpdatedDate
   when Status = 'cancelled' then UpdatedDate
   else null
   end as CancelDate,
CASE 
   when Status = 'Finished' then UpdatedDate 
   when Status = 'finish' then UpdatedDate 
   else null
   end as CompleteDate
from v_Initiatives i 
left join v_bi_ProjectStatus ps on ps.Id = i.id
GO

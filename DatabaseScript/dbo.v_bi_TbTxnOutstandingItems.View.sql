/****** Object:  View [dbo].[v_bi_TbTxnOutstandingItems]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE view [dbo].[v_bi_TbTxnOutstandingItems] AS

SELECT ProjectID,Period,ItemID , MAX(Description) AS Description, MAX(Cost) AS Cost
FROM
(
		select
		i.id as ProjectID,
		cast (OT.Month as varchar) + '/' + cast (OT.YEAR as varchar) as Period,
		ot.OutstandingId as ItemID,
		ot.ItemDescription as Description,
		ot.ItemListValueBaht as Cost
		from dbo.v_Initiatives i 
		left join OutstandingData ot on ot.InitiativeId = i.id
		where ot.ItemDescription IS NOT NULL
) AS T
GROUP BY ProjectID,Period,ItemID
GO

/****** Object:  View [dbo].[v_bi_TbTxnProjectPhase_]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_bi_TbTxnProjectPhase_] AS
SELECT 
	ISNULL(i.LagacyInitiativeId, i.Id) AS ProjectID 
	,'4' AS Phase 
FROM v_Initiatives i 
GO

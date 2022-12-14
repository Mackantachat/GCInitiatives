/****** Object:  View [dbo].[v_bi_TbTxnProjectPhase]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
	2021-08-27 Revise by Ken: Add special condition for CE%
*/

CREATE view [dbo].[v_bi_TbTxnProjectPhase] AS
	SELECT
		Initiatives.id as ProjectID,
		CASE 
			WHEN ProgressHeader.WbsNo LIKE 'CE%' THEN 4
			WHEN (ProgressHeader.WbsNo NOT LIKE 'CE%') OR (ProgressHeader.WbsNo) IS NULL THEN
				CASE 
					WHEN Initiatives.stage LIKE 'Gate1%' THEN 1 
					WHEN Initiatives.stage LIKE 'Gate2%' THEN 2
					WHEN Initiatives.stage LIKE 'Gate3%' THEN 3
					WHEN Initiatives.stage LIKE 'Gate4%' THEN 4
					ELSE 4
				END 
		END AS Phase
	FROM 
		v_Initiatives Initiatives
	LEFT JOIN
		ProgressHeader ProgressHeader
	ON Initiatives.Id = ProgressHeader.InitiativeId
GO

/****** Object:  View [dbo].[v_InitiativeStageDetail]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE view [dbo].[v_InitiativeStageDetail]
AS


--SELECT
--Type AS Process,
--Stage AS Stage,
--[Order] AS Sequence,
--SubType AS Subtype,
--0 AS InitiativeId,
--'' AS FlowType
--
--FROM TypeStage


-- Nok Change Enable
----------------------------------------------------------------
SELECT DISTINCT
Process AS Process,
CurrentStage AS Stage,
--MIN(Sequence) AS Sequence,
CAST(ROW_NUMBER() OVER (PARTITION BY Process,Subtype  ORDER BY MIN(Sequence)) AS INT) AS Sequence,
Subtype AS Subtype,
0 AS InitiativeId,
FlowType AS FlowType
--FlowType AS FlowType

FROM StageMaster
WHERE 
Event = 'createnew'
AND CurrentStage IS NOT NULL
--AND FlowType = 'initiative'


GROUP BY 
Process,
CurrentStage,
Subtype,
FlowType
--FlowType


UNION

/*  add for pim show capex tabs  */

SELECT DISTINCT
'pim' AS Process,
CurrentStage AS Stage,
--MIN(Sequence) AS Sequence,
CAST(ROW_NUMBER() OVER (PARTITION BY Process,Subtype  ORDER BY MIN(Sequence)) AS INT) + 11 AS Sequence,
Subtype AS Subtype,
0 AS InitiativeId,
FlowType AS FlowType
--FlowType AS FlowType

FROM StageMaster
WHERE 
Event = 'createnew'
AND CurrentStage IS NOT NULL
--AND FlowType = 'initiative'
AND Process = 'directCapex'
AND FlowType = 'initiative'

GROUP BY 
Process,
CurrentStage,
Subtype,
FlowType




-------------------------------------------------------------


--SELECT DISTINCT
--Type AS Process,
--Stage AS Stage,
--CAST(ROW_NUMBER() OVER (PARTITION BY b.Process, ISNULL(b.SubType, a.SubType)  ORDER BY Type, ISNULL(b.SubType, a.SubType), MIN(Sequence)) AS INT) AS Sequence,
--ISNULL(b.SubType, a.SubType) AS Subtype,
--0 AS InitiativeId,
--'' AS FlowType

--FROM TypeStage a
--LEFT JOIN (SELECT DISTINCT Process, SubType, Sequence FROM StageMaster WHERE PRocess = 'cim') b ON a.Type = b.Process
--WHERE Type NOT LIKE '%BAK%'

--GROUP BY 
--Type,
--Process,
--Stage,
--ISNULL(b.SubType, a.SubType)

--ORDER BY Process, ISNULL(b.SubType, a.SubType), Sequence

--ORDER BY MIN(Sequence)

GO

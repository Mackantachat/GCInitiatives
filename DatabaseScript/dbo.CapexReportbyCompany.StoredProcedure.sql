/****** Object:  StoredProcedure [dbo].[CapexReportbyCompany]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CapexReportbyCompany]
(
    @reportID   NVARCHAR(255) = ''
)
AS
BEGIN

 DECLARE @statDate AS DATETIME
 DECLARE @endDate AS DATETIME

 SET @statDate = CONVERT(DATE,GETDATE())
 SET @endDate = @statDate

 SELECT
	'01. BAU' AS [CAPEX]
	--GC Glycol Co., Ltd.
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-GC Glycol Co., Ltd.)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Glycol Co., Ltd.]
	--GC Maintenance and Engineering Company Limited
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END ) AS [Count-GC Maintenance and Engineering Company Limited)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Maintenance and Engineering Company Limited]
	--GC-M PTA
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END ) AS [Count-GC-M PTA)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC-M PTA]
	--GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END ) AS [Count-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED]
	--NPC Safety and Environment
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-NPC Safety and Environment)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-NPC Safety and Environment]
	--PTT Phenol
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END ) AS [Count-PTT Phenol)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-PTT Phenol]
	--Thai PET Resin
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END ) AS [Count-Thai PET Resin)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-Thai PET Resin]
	--Total
	--Count
	,(SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END )
	) AS [Count-Total]
	--Sum
	,(SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END )
	) AS [Sum-Total]

	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	Where
	( [v_Initiatives].TypeOfInvestment = 'Environment' 
	OR [v_Initiatives].TypeOfInvestment = 'Safty' 
	OR [v_Initiatives].TypeOfInvestment = 'Law & Regulation'
	OR ([v_Initiatives].TypeOfInvestment = 'Maintain Reliability' and (RequestCapex = 'false' OR RequestCapex IS NULL))
	OR ([v_Initiatives].TypeOfInvestment = 'Replacement'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = 'Turnaround'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = 'Overhaul'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = 'CSR'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = 'Welfare'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
    OR ([v_Initiatives].TypeOfInvestment = 'Lab & Quality'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = 'Others'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = 'Engineering Request ER'  and (RequestCapex = 'false' OR RequestCapex IS NULL) ) )
	
	UNION 
	-- 2
	SELECT
	'02. Sustain Core < 300MB' AS [CAPEX]
	--GC Glycol Co., Ltd.
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-GC Glycol Co., Ltd.)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Glycol Co., Ltd.]
	--GC Maintenance and Engineering Company Limited
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END ) AS [Count-GC Maintenance and Engineering Company Limited)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Maintenance and Engineering Company Limited]
	--GC-M PTA
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END ) AS [Count-GC-M PTA)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC-M PTA]
	--GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END ) AS [Count-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED]
	--NPC Safety and Environment
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-NPC Safety and Environment)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-NPC Safety and Environment]
	--PTT Phenol
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END ) AS [Count-PTT Phenol)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-PTT Phenol]
	--Thai PET Resin
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END ) AS [Count-Thai PET Resin)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-Thai PET Resin]
	--Total
	--Count
	,(SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END )
	) AS [Count-Total]
	--Sum
	,(SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END )
	) AS [Sum-Total]
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	Where
	[CapexInformations].ProjectCost <= 300 AND
	([v_Initiatives].TypeOfInvestment = 'Sustain Core: Operational Excellence' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Marketing Excellence' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Debot/Expansion' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Chain Integration' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: New derivative' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Map ta put retrofit' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Energy saving' )
	UNION 
	-- 2
	SELECT
	'03. R&D' AS [CAPEX]
	--GC Glycol Co., Ltd.
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-GC Glycol Co., Ltd.)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Glycol Co., Ltd.]
	--GC Maintenance and Engineering Company Limited
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END ) AS [Count-GC Maintenance and Engineering Company Limited)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Maintenance and Engineering Company Limited]
	--GC-M PTA
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END ) AS [Count-GC-M PTA)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC-M PTA]
	--GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END ) AS [Count-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED]
	--NPC Safety and Environment
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-NPC Safety and Environment)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-NPC Safety and Environment]
	--PTT Phenol
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END ) AS [Count-PTT Phenol)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-PTT Phenol]
	--Thai PET Resin
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END ) AS [Count-Thai PET Resin)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-Thai PET Resin]
	--Total
	--Count
	,(SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END )
	) AS [Count-Total]
	--Sum
	,(SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END )
	) AS [Sum-Total]
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	Where [v_Initiatives].TypeOfInvestment = 'Technical Support for R&D' OR [v_Initiatives].TypeOfInvestment = 'R&D'

	UNION 
	-- 5
	SELECT
	'05. Max Infinity' AS [CAPEX]
	--GC Glycol Co., Ltd.
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-GC Glycol Co., Ltd.)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Glycol Co., Ltd.]
	--GC Maintenance and Engineering Company Limited
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END ) AS [Count-GC Maintenance and Engineering Company Limited)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Maintenance and Engineering Company Limited]
	--GC-M PTA
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END ) AS [Count-GC-M PTA)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC-M PTA]
	--GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END ) AS [Count-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED]
	--NPC Safety and Environment
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-NPC Safety and Environment)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-NPC Safety and Environment]
	--PTT Phenol
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END ) AS [Count-PTT Phenol)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-PTT Phenol]
	--Thai PET Resin
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END ) AS [Count-Thai PET Resin)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-Thai PET Resin]
	--Total
	--Count
	,(SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END )
	) AS [Count-Total]
	--Sum
	,(SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END )
	) AS [Sum-Total]
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	Where 
	[CapexInformations].ProjectCost <= 300 AND
	([v_Initiatives].TypeOfInvestment = 'Maintain Reliability'
	OR [v_Initiatives].TypeOfInvestment = 'Replacement' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Operational Excellence' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Marketing Excellence' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Debot/Expansion' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Chain Integration' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: New derivative' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Map ta put retrofit' 
	OR [v_Initiatives].TypeOfInvestment = 'Sustain Core: Energy saving'
	OR [v_Initiatives].TypeOfInvestment = 'Turnaround' 
	OR [v_Initiatives].TypeOfInvestment = 'Overhaul' 
	OR [v_Initiatives].TypeOfInvestment = 'CSR' 
	OR [v_Initiatives].TypeOfInvestment = 'Welfare' 
	OR [v_Initiatives].TypeOfInvestment = 'Lab & Quality' 
	OR [v_Initiatives].TypeOfInvestment = 'Others' 
	OR [v_Initiatives].TypeOfInvestment = 'Engineering Request ER')

	UNION 
	-- 5
	SELECT
	'06. Digital & IT' AS [CAPEX]
	--GC Glycol Co., Ltd.
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-GC Glycol Co., Ltd.)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Glycol Co., Ltd.]
	--GC Maintenance and Engineering Company Limited
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END ) AS [Count-GC Maintenance and Engineering Company Limited)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Maintenance and Engineering Company Limited]
	--GC-M PTA
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END ) AS [Count-GC-M PTA)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC-M PTA]
	--GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END ) AS [Count-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED]
	--NPC Safety and Environment
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-NPC Safety and Environment)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-NPC Safety and Environment]
	--PTT Phenol
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END ) AS [Count-PTT Phenol)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-PTT Phenol]
	--Thai PET Resin
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END ) AS [Count-Thai PET Resin)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-Thai PET Resin]
	--Total
	--Count
	,(SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END )
	) AS [Count-Total]
	--Sum
	,(SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END )
	) AS [Sum-Total]
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  [v_Initiatives].TypeOfInvestment = 'IT CAPEX' OR [v_Initiatives].TypeOfInvestment = 'Digital CAPEX'
END
GO

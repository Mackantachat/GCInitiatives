/****** Object:  StoredProcedure [dbo].[CapexReportbyCompany_TEST]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[CapexReportbyCompany_TEST]
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
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-GC Glycol Co., Ltd.)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Glycol Co., Ltd.]
	--GC Maintenance and Engineering Company Limited
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END ) AS [Count-GC Maintenance and Engineering Company Limited)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Maintenance and Engineering Company Limited]
	--GC-M PTA
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END ) AS [Count-GC-M PTA)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC-M PTA]
	--GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END ) AS [Count-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED]
	--NPC Safety and Environment
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-NPC Safety and Environment)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-NPC Safety and Environment]
	--PTT Phenol
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END ) AS [Count-PTT Phenol)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-PTT Phenol]
	--Thai PET Resin
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END ) AS [Count-Thai PET Resin)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-Thai PET Resin]
	--Total
	--Count
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END )
	) AS [Count-Total]
	--Sum
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END )
	) AS [Sum-Total]

	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = ini.Id
	Where
	( ini.TypeOfInvestment = 'Environment' 
	OR ini.TypeOfInvestment = 'Safty' 
	OR ini.TypeOfInvestment = 'Law & Regulation'
	OR (ini.TypeOfInvestment = 'Maintain Reliability' and (RequestCapex = 'false' OR RequestCapex IS NULL))
	OR (ini.TypeOfInvestment = 'Replacement'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR (ini.TypeOfInvestment = 'Turnaround'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR (ini.TypeOfInvestment = 'Overhaul'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR (ini.TypeOfInvestment = 'CSR'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR (ini.TypeOfInvestment = 'Welfare'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
    OR (ini.TypeOfInvestment = 'Lab & Quality'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR (ini.TypeOfInvestment = 'Others'  and (RequestCapex = 'false' OR RequestCapex IS NULL) )
	OR (ini.TypeOfInvestment = 'Engineering Request ER'  and (RequestCapex = 'false' OR RequestCapex IS NULL) ) )
	
	UNION 
	-- 2
	SELECT
	'02. Sustain Core < 300MB' AS [CAPEX]
	--GC Glycol Co., Ltd.
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-GC Glycol Co., Ltd.)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Glycol Co., Ltd.]
	--GC Maintenance and Engineering Company Limited
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END ) AS [Count-GC Maintenance and Engineering Company Limited)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Maintenance and Engineering Company Limited]
	--GC-M PTA
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END ) AS [Count-GC-M PTA)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC-M PTA]
	--GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END ) AS [Count-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED]
	--NPC Safety and Environment
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-NPC Safety and Environment)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-NPC Safety and Environment]
	--PTT Phenol
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END ) AS [Count-PTT Phenol)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-PTT Phenol]
	--Thai PET Resin
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END ) AS [Count-Thai PET Resin)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-Thai PET Resin]
	--Total
	--Count
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END )
	) AS [Count-Total]
	--Sum
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END )
	) AS [Sum-Total]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = ini.Id
	Where
	[CapexInformations].ProjectCost <= 300 AND
	(ini.TypeOfInvestment = 'Sustain Core: Operational Excellence' 
	OR ini.TypeOfInvestment = 'Sustain Core: Marketing Excellence' 
	OR ini.TypeOfInvestment = 'Sustain Core: Debot/Expansion' 
	OR ini.TypeOfInvestment = 'Sustain Core: Chain Integration' 
	OR ini.TypeOfInvestment = 'Sustain Core: New derivative' 
	OR ini.TypeOfInvestment = 'Sustain Core: Map ta put retrofit' 
	OR ini.TypeOfInvestment = 'Sustain Core: Energy saving' )
	UNION 
	-- 2
	SELECT
	'03. R&D' AS [CAPEX]
	--GC Glycol Co., Ltd.
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-GC Glycol Co., Ltd.)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Glycol Co., Ltd.]
	--GC Maintenance and Engineering Company Limited
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END ) AS [Count-GC Maintenance and Engineering Company Limited)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Maintenance and Engineering Company Limited]
	--GC-M PTA
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END ) AS [Count-GC-M PTA)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC-M PTA]
	--GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END ) AS [Count-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED]
	--NPC Safety and Environment
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-NPC Safety and Environment)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-NPC Safety and Environment]
	--PTT Phenol
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END ) AS [Count-PTT Phenol)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-PTT Phenol]
	--Thai PET Resin
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END ) AS [Count-Thai PET Resin)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-Thai PET Resin]
	--Total
	--Count
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END )
	) AS [Count-Total]
	--Sum
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END )
	) AS [Sum-Total]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = ini.Id
	Where ini.TypeOfInvestment = 'Technical Support for R&D' OR ini.TypeOfInvestment = 'R&D'

	UNION 
	-- 5
	SELECT
	'05. Max Infinity' AS [CAPEX]
	--GC Glycol Co., Ltd.
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-GC Glycol Co., Ltd.)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Glycol Co., Ltd.]
	--GC Maintenance and Engineering Company Limited
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END ) AS [Count-GC Maintenance and Engineering Company Limited)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Maintenance and Engineering Company Limited]
	--GC-M PTA
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END ) AS [Count-GC-M PTA)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC-M PTA]
	--GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END ) AS [Count-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED]
	--NPC Safety and Environment
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-NPC Safety and Environment)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-NPC Safety and Environment]
	--PTT Phenol
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END ) AS [Count-PTT Phenol)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-PTT Phenol]
	--Thai PET Resin
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END ) AS [Count-Thai PET Resin)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-Thai PET Resin]
	--Total
	--Count
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END )
	) AS [Count-Total]
	--Sum
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END )
	) AS [Sum-Total]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = ini.Id
	Where 
	[CapexInformations].ProjectCost <= 300 AND
	(ini.TypeOfInvestment = 'Maintain Reliability'
	OR ini.TypeOfInvestment = 'Replacement' 
	OR ini.TypeOfInvestment = 'Sustain Core: Operational Excellence' 
	OR ini.TypeOfInvestment = 'Sustain Core: Marketing Excellence' 
	OR ini.TypeOfInvestment = 'Sustain Core: Debot/Expansion' 
	OR ini.TypeOfInvestment = 'Sustain Core: Chain Integration' 
	OR ini.TypeOfInvestment = 'Sustain Core: New derivative' 
	OR ini.TypeOfInvestment = 'Sustain Core: Map ta put retrofit' 
	OR ini.TypeOfInvestment = 'Sustain Core: Energy saving'
	OR ini.TypeOfInvestment = 'Turnaround' 
	OR ini.TypeOfInvestment = 'Overhaul' 
	OR ini.TypeOfInvestment = 'CSR' 
	OR ini.TypeOfInvestment = 'Welfare' 
	OR ini.TypeOfInvestment = 'Lab & Quality' 
	OR ini.TypeOfInvestment = 'Others' 
	OR ini.TypeOfInvestment = 'Engineering Request ER')

	UNION 
	-- 5
	SELECT
	'06. Digital & IT' AS [CAPEX]
	--GC Glycol Co., Ltd.
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-GC Glycol Co., Ltd.)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Glycol Co., Ltd.]
	--GC Maintenance and Engineering Company Limited
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END ) AS [Count-GC Maintenance and Engineering Company Limited)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC Maintenance and Engineering Company Limited]
	--GC-M PTA
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END ) AS [Count-GC-M PTA)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GC-M PTA]
	--GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END ) AS [Count-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED]
	--NPC Safety and Environment
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END ) AS [Count-NPC Safety and Environment)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-NPC Safety and Environment]
	--PTT Phenol
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END ) AS [Count-PTT Phenol)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-PTT Phenol]
	--Thai PET Resin
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END ) AS [Count-Thai PET Resin)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [Sum-Thai PET Resin]
	--Total
	--Count
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN 1 ELSE 0 END )
	) AS [Count-Total]
	--Sum
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Glycol Co., Ltd.') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC Maintenance and Engineering Company Limited') = 'GC Maintenance and Engineering Company Limited'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GC-M PTA') = 'GC-M PTA'THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED') = 'GLOBAL GREEN CHEMICALS PUBLIC COMPANY LIMITED'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'NPC Safety and Environment') = 'GC Glycol Co., Ltd.'THEN [CapexInformations].ProjectCost ELSE 0 END)
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'PTT Phenol') = 'PTT Phenol'THEN [CapexInformations].ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, 'Thai PET Resin') = 'Thai PET Resin'THEN [CapexInformations].ProjectCost ELSE 0 END )
	) AS [Sum-Total]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = ini.Id
	WHERE  ini.TypeOfInvestment = 'IT CAPEX' OR ini.TypeOfInvestment = 'Digital CAPEX'
END
GO

/****** Object:  StoredProcedure [dbo].[sp_NewCapexReport_BAU]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
CREATE PROCEDURE [dbo].[sp_NewCapexReport_BAU]
(
    @reportID   NVARCHAR(255) = ''
)
as
BEGIN

    DECLARE @statDate    AS DATETIME
    DECLARE @endDate    AS DATETIME

	DECLARE @Tmp as Table(
		CountGcOnly1 int
	)
    SET @statDate = CONVERT(DATE,GETDATE())
    SET @endDate = @statDate

   -- SELECT TimeOut FROM TBTimeSheets (NOLOCK) WHERE (TimeIn >= @statDate and TimeIn < @endDate + 1) AND UserID = @UserID

   SELECT
	'01. BAU' AS [CAPEX]
	,NULL AS [จำนวนโครงการ (GC Only)]
	,NULL AS [งบประมาณรวม(GC Only)]  
	,NULL AS [จำนวนโครงการ (Subsidiary)]
	,NULL AS [งบประมาณรวม(Subsidiary)]  
	,NULL AS [จำนวนโครงการ (GC Group)]
	,NULL AS [งบประมาณรวม(GC Group)]  

	union all
	SELECT
	'1.1. Turnaround'
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE 
	([v_Initiatives].TypeOfInvestment = 'Turnaround'  and ([CapexInformations].RequestPoolMAX = 'false' OR [CapexInformations].RequestPoolMAX IS NULL) )
	union all
	SELECT
	'1.2. Replacement/Overhaul'
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE 
	([v_Initiatives].TypeOfInvestment = 'Replacement/Overhaul'  and ([CapexInformations].RequestPoolMAX = 'false' OR [CapexInformations].RequestPoolMAX IS NULL) )
	union all
	SELECT
	'1.3. Safety'
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE
	([v_Initiatives].TypeOfInvestment = 'Safty'  and ([CapexInformations].RequestPoolMAX = 'false' OR [CapexInformations].RequestPoolMAX IS NULL) )
	union all
	SELECT
	'1.4. Law & Regulations'
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE 
	([v_Initiatives].TypeOfInvestment = 'Law & Regulations'  and ([CapexInformations].RequestPoolMAX = 'false' OR [CapexInformations].RequestPoolMAX IS NULL) )
	union all
	SELECT
	'1.5 Maintain Reliability (No EBITDA Uplift)'
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  
	([v_Initiatives].TypeOfInvestment = 'Maintain Reliability (No EBITDA Uplift)'  and ([CapexInformations].RequestPoolMAX = 'false' OR [CapexInformations].RequestPoolMAX IS NULL) )
	union all
	SELECT
	'1.6 Engineering Request (ER)'
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  
	([v_Initiatives].TypeOfInvestment = 'Engineering Request (ER)'  and ([CapexInformations].RequestPoolMAX = 'false' OR [CapexInformations].RequestPoolMAX IS NULL) )
	union all
	SELECT
	'1.7 Welfare'
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  
	([v_Initiatives].TypeOfInvestment = 'Welfare'  and ([CapexInformations].RequestPoolMAX = 'false' OR [CapexInformations].RequestPoolMAX IS NULL) )
	union all
	SELECT
	'1.8 Other'
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') = 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, 'PTT Global Chemical') <> 'PTT Global Chemical'THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  
	([v_Initiatives].TypeOfInvestment = 'Other'  and ([CapexInformations].RequestPoolMAX = 'false' OR [CapexInformations].RequestPoolMAX IS NULL) )


	
 
END
GO

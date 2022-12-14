/****** Object:  StoredProcedure [dbo].[sp_NewCapexGcGroupByProjectType]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 
CREATE PROCEDURE [dbo].[sp_NewCapexGcGroupByProjectType]
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
   SELECT * INTO #ReportParameter FROM CustomReportParameter WHERE ReportID = TRIM(@ReportID) AND ISNULL([ParameterField], '') <> ''

		DECLARE @tmpStringParam NVARCHAR(MAX) = '';

	------ LOOP STORE VALUE IN PARAMETER 
		DECLARE CURSOR_PARAM CURSOR FOR SELECT [Sequence], ParameterName, ParameterField, FilterCondition, ParameterType, [Required], DefaultValue FROM #ReportParameter ORDER BY [Sequence]
		DECLARE @sequenceParam INT;
		DECLARE @parameterField NVARCHAR(255);
		DECLARE @parameterName NVARCHAR(255);
		DECLARE @parameterType NVARCHAR(255);
		DECLARE @filterCondition NVARCHAR(255);
		DECLARE @Required NVARCHAR(255);
		DECLARE @DefaultValue NVARCHAR(255);
		DECLARE @isParamNothing AS INT;

		OPEN CURSOR_PARAM 
		FETCH NEXT FROM CURSOR_PARAM 
		INTO @sequenceParam, @parameterName, @parameterField, @filterCondition, @parameterType, @Required, @DefaultValue
		-- Loop From Cursor
		WHILE (@@FETCH_STATUS = 0) 
		BEGIN	
			--DECLARE @tmpQueryChk NVARCHAR(MAX) = (' SELECT LEN(@Param' + CAST(@sequenceParam AS NVARCHAR(5)) + ') AS cnt INTO ##tmpChkData')
			--EXEC(@tmpQueryChk);
			--DECLARE @lenOfParam INT = (SELECT cnt FROM ##tmpChkData);
			IF (ISNULL(@parameterField, '') = '') GOTO NEXTLOOP;  --if param = blank then skip

			IF (ISNULL(@tmpStringParam, '') <> '')
			BEGIN
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + ' AND '
			END			

			IF (@filterCondition LIKE '%IN')
			BEGIN
				
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + SUBSTRING(@parameterField, 1, CHARINDEX('.' , @parameterField)) + '[' + SUBSTRING(@parameterField, CHARINDEX('.' , @parameterField) + 1, LEN(@parameterField) ) + ']' +  ' ' + @filterCondition + ' ( (SELECT TRIM(dbo.fn_CustomReportParamDecoder(VALUE)) FROM STRING_SPLIT(''' + @DefaultValue + ''', '','') ) )' 
			END
			ELSE 
			BEGIN
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + SUBSTRING(@parameterField, 1, CHARINDEX('.' , @parameterField)) + '[' + SUBSTRING(@parameterField, CHARINDEX('.' , @parameterField) + 1, LEN(@parameterField) ) + ']' +  ' ' + @filterCondition + ' ( CASE WHEN ''' + ISNULL(@DefaultValue, '') + ''' = '''' THEN ' + SUBSTRING(@parameterField, 1, CHARINDEX('.' , @parameterField)) + '[' + SUBSTRING(@parameterField, CHARINDEX('.' , @parameterField) + 1, LEN(@parameterField) ) + ']' + ' ELSE ''' + @DefaultValue + ''' END )' 
			END

			NEXTLOOP:  --label for GOTO
			FETCH NEXT FROM CURSOR_PARAM -- Fetch next cursor
			INTO @sequenceParam, @parameterName, @parameterField, @filterCondition, @parameterType, @Required, @DefaultValue
		END

		-- Close cursor
		CLOSE CURSOR_PARAM ; 
		DEALLOCATE CURSOR_PARAM ; 




        PRINT(@tmpStringParam);

        IF (@tmpStringParam <> '') SET @tmpStringParam = ' AND ' + @tmpStringParam;


        EXEC('

   SELECT
	''1. BAU'' AS [CAPEX]
	,NULL AS [จำนวนโครงการ (GC Only)]
	,NULL AS [งบประมาณรวม(GC Only)]  
	,NULL AS [จำนวนโครงการ (Subsidiary)]
	,NULL AS [งบประมาณรวม(Subsidiary)]  
	,NULL AS [จำนวนโครงการ (GC Group)]
	,NULL AS [งบประมาณรวม(GC Group)]  

	union all
	SELECT
	''1.1. Environment''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE   
	((ini.TypeOfInvestment = ''Environment'')  and cap.ProjectCost <= 300
	 AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	)

 

    ' + @tmpStringParam + '
	union all
	SELECT
	''1.2. Safety''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	((ini.TypeOfInvestment = ''Safety'') and cap.ProjectCost <= 300
	 AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	)
    ' + @tmpStringParam + '
	union all
	SELECT
	''1.3. Law & Regulations''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	((ini.TypeOfInvestment = ''Law & Regulation'') and cap.ProjectCost <= 300
	 AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	)
    ' + @tmpStringParam + '
	union all
	SELECT
	''1.4.Maintain Reliability (No EBITDA Uplift)''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  
	((ini.TypeOfInvestment = ''Maintain Reliability'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL)) and cap.ProjectCost <= 300
	 AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	)

	 
    ' + @tmpStringParam + '
	union all
	SELECT
	''1.5.Replacement/Overhaul''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE   
	(ini.TypeOfInvestment IN (''Replacement/Overhaul'', ''Replacement'' , ''Overhaul'') and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL)  and cap.ProjectCost <= 300
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	)
    ' + @tmpStringParam + '
	union all
	SELECT
	''1.6.Turnaround''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	((ini.TypeOfInvestment = ''Turnaround''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) ) and cap.ProjectCost <= 300
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	)
	' + @tmpStringParam + '
    union all 
	SELECT
	''1.7.CSR''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	((ini.TypeOfInvestment = ''CSR''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) ) and cap.ProjectCost <= 300
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	)
	' + @tmpStringParam + '
    union all
	SELECT
	''1.8.Welfare''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	((ini.TypeOfInvestment = ''Welfare''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) ) and cap.ProjectCost <= 300
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	)
	' + @tmpStringParam + '
    union all
	SELECT
	''1.9.Lab & Quality''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	((ini.TypeOfInvestment = ''Lab & Quality''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) ) and cap.ProjectCost <= 300
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	)
	' + @tmpStringParam + '
    union all
	SELECT
	''1.10.Other''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	(ini.TypeOfInvestment = ''Others''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL)  and cap.ProjectCost <= 300
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	)
	' + @tmpStringParam + '
    union all
	SELECT
	''1.11.Engineering Request (ER)''
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  
	((ini.TypeOfInvestment = ''Engineering Request ER''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) ) and cap.ProjectCost <= 300
	OR (ini.[PoolType] = ''ER'' )
	OR (cap.[Poolbudgetform] = ''ER'' )) 
		
	' + @tmpStringParam + '
    union all
	SELECT
	''SUM BAU'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  
	(( ini.TypeOfInvestment = ''Environment'' 
	OR ini.TypeOfInvestment = ''Safety'' 
	OR ini.TypeOfInvestment = ''Law & Regulation''
	OR (ini.TypeOfInvestment = ''Maintain Reliability'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR (ini.TypeOfInvestment  IN (''Replacement/Overhaul'', ''Replacement'' , ''Overhaul'')  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Turnaround''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Overhaul''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''CSR''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Welfare''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
    OR (ini.TypeOfInvestment = ''Lab & Quality''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Others''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Engineering Request ER''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.[PoolType] = ''ER'' )
	OR (cap.[Poolbudgetform] = ''ER'' ) 

	)) and cap.ProjectCost <= 300


	 --- exec [sp_NewCapexGcGroupByProjectType] 503

	' + @tmpStringParam + '
    union all
	 SELECT
	''2. Sustain Core < 300MB'' AS [CAPEX]
	,NULL AS [จำนวนโครงการ (GC Only)]
	,NULL AS [งบประมาณรวม(GC Only)]  
	,NULL AS [จำนวนโครงการ (Subsidiary)]
	,NULL AS [งบประมาณรวม(Subsidiary)]  
	,NULL AS [จำนวนโครงการ (GC Group)]
	,NULL AS [งบประมาณรวม(GC Group)]  

	union all
	 SELECT
	''2.1.Operational Excellence'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	 (( ini.TypeOfInvestment = ''Sustain Core: Operational Excellence'' and  cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	 AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	 )
	' + @tmpStringParam + '
	union all
	 SELECT
	''2.2.Sustain Core: Marketing Excellence'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	 ) 
	' + @tmpStringParam + '
	union all
	 SELECT
	''2.3.Sustain Core: Debot/Expansion'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	 )
	 ' + @tmpStringParam + '
	 union all
	 SELECT
	''2.4.Sustain Core: Chain Integration'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( ini.TypeOfInvestment = ''Sustain Core: Chain Integration'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	 )
	' + @tmpStringParam + '
    union all

	 SELECT
	''2.5.Sustain Core: New derivative'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( ini.TypeOfInvestment = ''Sustain Core: New derivative'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	 )
	' + @tmpStringParam + '
	union all
	 SELECT
	''2.6.Sustain Core: Map ta put retrofit'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit''and  cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	 )
    ' + @tmpStringParam + '
 union all
	 SELECT
	''2.7.Sustain Core: Energy saving'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( ini.TypeOfInvestment = ''Sustain Core: Energy saving'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
	 )
    ' + @tmpStringParam + '
 UNION all

	 SELECT
	''SUM Sustain Core < 300MB'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  
	((
	  ( ini.TypeOfInvestment = ''Sustain Core: Operational Excellence'' and  cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR( ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Chain Integration'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: New derivative'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit''and  cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Energy saving'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	)
	AND ( ini.[PoolType] = '''' OR ini.[PoolType] IS NULL ) AND ( cap.[Poolbudgetform]  = '''' OR cap.[Poolbudgetform] IS NULL ) 
   	)
    ' + @tmpStringParam + '
	union all
	SELECT
	''3. R&D'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE   
	(ini.TypeOfInvestment = ''Technical Support for R&D'' OR ini.TypeOfInvestment = ''R&D'')
    ' + @tmpStringParam + '
	union all
	SELECT
	''SUM R&D'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE   
	(ini.TypeOfInvestment = ''Technical Support for R&D'' OR ini.TypeOfInvestment = ''R&D'')
    ' + @tmpStringParam + '
	union all
	 SELECT
	''4. Max Infinity'' AS [CAPEX]
	,NULL AS [จำนวนโครงการ (GC Only)]
	,NULL AS [งบประมาณรวม(GC Only)]  
	,NULL AS [จำนวนโครงการ (Subsidiary)]
	,NULL AS [งบประมาณรวม(Subsidiary)]  
	,NULL AS [จำนวนโครงการ (GC Group)]
	,NULL AS [งบประมาณรวม(GC Group)]  

	 

	union all
	SELECT
	''4.1. Maintain Reliability (No EBITDA Uplift)'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE 
	((ini.TypeOfInvestment = ''Maintain Reliability''  and cap.RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.2. Replacement/Overhaul'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE 
	((ini.TypeOfInvestment IN (''Replacement/Overhaul'', ''Replacement'' , ''Overhaul'')  and cap.RequestPoolMAX = ''true'' ))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.3.Operational Excellence'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  
	((ini.TypeOfInvestment = ''Operational Excellence'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.4. Sustain Core: Marketing Excellence'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE 
	((ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'' ))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.5. Sustain Core: Debot/Expansion'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE
	((ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'' ))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.6. Sustain Core: Chain Integration'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE 
	((ini.TypeOfInvestment = ''Sustain Core: Chain Integration'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.7. Sustain Core: New derivative'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE 
	((ini.TypeOfInvestment = ''Sustain Core: New derivative'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.8. Sustain Core: Map ta put retrofit'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	((ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.9. Sustain Core: Energy saving'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	((ini.TypeOfInvestment = ''Sustain Core: Energy saving'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.10. Turnaround'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	((ini.TypeOfInvestment = ''Turnaround'' and cap.RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.11. CSR'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	((ini.TypeOfInvestment = ''CSR'' and cap.RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.12. Welfare'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	((ini.TypeOfInvestment = ''Welfare'' and cap.RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.13. Lab & Quality'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	((ini.TypeOfInvestment = ''Lab & Quality'' and cap.RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.14. Other'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	((ini.TypeOfInvestment = ''Others'' and cap.RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.15. Engineering Request (ER)'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  
	((ini.TypeOfInvestment = ''Engineering Request ER'' and cap.RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '

	union all
	SELECT
	''4.16. Pool MAX'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  
	( (ini.TypeOfInvestment IS NULL AND ini.PoolType=''MAX'') )
     ' + @tmpStringParam + ' 
	union all
	SELECT
	''SUM Max Infinity'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini INNER JOIN 
	[CapexInformations] cap ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	WHERE  
	((
	   (ini.TypeOfInvestment = ''Maintain Reliability''  and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment IN (''Replacement/Overhaul'', ''Replacement'' , ''Overhaul'')  and cap.RequestPoolMAX = ''true'' )
	OR (ini.TypeOfInvestment = ''Operational Excellence'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'' )
	OR (ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'' )
	OR (ini.TypeOfInvestment = ''Sustain Core: Chain Integration'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Sustain Core: New derivative'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Sustain Core: Energy saving'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Turnaround'' and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Overhaul'' and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''CSR'' and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Welfare'' and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Lab & Quality'' and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Others'' and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Engineering Request ER'' and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment IS NULL AND ini.PoolType=''MAX'')
	))
    ' + @tmpStringParam + '
    
    union all
	 SELECT
	''5. Digital & IT'' AS [CAPEX]
	,NULL AS [จำนวนโครงการ (GC Only)]
	,NULL AS [งบประมาณรวม(GC Only)]  
	,NULL AS [จำนวนโครงการ (Subsidiary)]
	,NULL AS [งบประมาณรวม(Subsidiary)]  
	,NULL AS [จำนวนโครงการ (GC Group)]
	,NULL AS [งบประมาณรวม(GC Group)]  
    
    UNION ALL

    SELECT
	''5.1 Digital'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini  INNER JOIN 
	[CapexInformations] cap  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
				 LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and  
	(((ISNULL(ini.TypeOfInvestment, '''') = ''Digital CAPEX'')
    ) 
	AND cap.ProjectCost <= 300
	OR (ini.PoolType = ''Digital CAPEX'')) --editted 23/09/2020
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
     ' + @tmpStringParam +  '
    
    
    UNION ALL

    SELECT
	''5.2 IT'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini  INNER JOIN 
	[CapexInformations] cap  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
				 LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and  
	(((ISNULL(ini.TypeOfInvestment, '''') = ''IT CAPEX'' )
    ) 
	AND cap.ProjectCost <= 300
	OR (ini.PoolType = ''IT CAPEX'')) --editted 23/09/2020
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
     ' + @tmpStringParam +  '
    
    
    UNION ALL

    SELECT
	''SUM Digital & IT'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, '''') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini  INNER JOIN 
	[CapexInformations] cap  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
				 LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and  
	(((ISNULL(ini.TypeOfInvestment, '''') = ''IT CAPEX'' 
	OR ISNULL(ini.TypeOfInvestment, '''') = ''Digital CAPEX'')
    ) 
	AND cap.ProjectCost <= 300
	OR (ini.PoolType = ''IT CAPEX'' OR ini.PoolType = ''Digital CAPEX'')) --editted 23/09/2020
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
     ' + @tmpStringParam +  '
    
    union all

	 SELECT
	''6. MTPi'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini  INNER JOIN 
	[CapexInformations] cap  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and   
    (cap.ProjectCost = 999)
	or (ini.PoolType = ''MTPi'') ---Added 16/09/2020
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
     ' + @tmpStringParam +  '
     
    
    
    UNION ALL

    SELECT
	''SUM MTPi'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini  INNER JOIN 
	[CapexInformations] cap  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and   
    (cap.ProjectCost = 999)
	or (ini.PoolType = ''MTPi'') ---Added 16/09/2020
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
     ' + @tmpStringParam +  '
    
    
    UNION ALL

     SELECT
	''7. Large Project'' AS [CAPEX]
	,NULL AS [จำนวนโครงการ (GC Only)]
	,NULL AS [งบประมาณรวม(GC Only)]  
	,NULL AS [จำนวนโครงการ (Subsidiary)]
	,NULL AS [งบประมาณรวม(Subsidiary)]  
	,NULL AS [จำนวนโครงการ (GC Group)]
	,NULL AS [งบประมาณรวม(GC Group)]  
    

    UNION ALL

    SELECT ''7.1 Sustain Core: Operational Excellence'' AS [CAPEX]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (Subsidiary)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(Subsidiary)]
	    ,Count(*) AS [จำนวนโครงการ (GC Group)]
	    ,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
    FROM [v_Initiatives] ini
    INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	    AND cap.Revistion = (
		    SELECT MAX(Revistion) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
	    AND cap.Sequent = (
		    SELECT MAX(Sequent) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
    LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
    WHERE (
		    cap.ProjectCost > 300
		    AND ini.InitiativeType <> ''Request Pool''
		    AND (
			    (
				    ini.TypeOfInvestment = ''Sustain Core: Operational Excellence''
				    AND (
					    cap.RequestPoolMAX = ''false''
					    OR cap.RequestPoolMAX IS NULL
					    )
				    )
			    )
		    )
	    AND (
		    ini.PoolType <> ''MAX''
		    OR ini.PoolType IS NULL
		    )
	    AND (
		    pool.PoolType <> ''MAX''
		    OR pool.PoolType IS NULL
		    ) ' + @tmpStringParam + '

    UNION ALL

    SELECT ''7.2 Sustain Core: Marketing Excellence'' AS [CAPEX]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (Subsidiary)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(Subsidiary)]
	    ,Count(*) AS [จำนวนโครงการ (GC Group)]
	    ,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
    FROM [v_Initiatives] ini
    INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	    AND cap.Revistion = (
		    SELECT MAX(Revistion) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
	    AND cap.Sequent = (
		    SELECT MAX(Sequent) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
    LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
    WHERE (
		    cap.ProjectCost > 300
		    AND ini.InitiativeType <> ''Request Pool''
		    AND (
			    (
				    ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence''
				    AND (
					    cap.RequestPoolMAX = ''false''
					    OR cap.RequestPoolMAX IS NULL
					    )
				    )
			    )
		    )
	    AND (
		    ini.PoolType <> ''MAX''
		    OR ini.PoolType IS NULL
		    )
	    AND (
		    pool.PoolType <> ''MAX''
		    OR pool.PoolType IS NULL
		    ) ' + @tmpStringParam + '

    UNION ALL

    SELECT ''7.3 Sustain Core: Debot/Expansion'' AS [CAPEX]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (Subsidiary)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(Subsidiary)]
	    ,Count(*) AS [จำนวนโครงการ (GC Group)]
	    ,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
    FROM [v_Initiatives] ini
    INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	    AND cap.Revistion = (
		    SELECT MAX(Revistion) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
	    AND cap.Sequent = (
		    SELECT MAX(Sequent) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
    LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
    WHERE (
		    cap.ProjectCost > 300
		    AND ini.InitiativeType <> ''Request Pool''
		    AND (
			    (
				    ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion''
				    AND (
					    cap.RequestPoolMAX = ''false''
					    OR cap.RequestPoolMAX IS NULL
					    )
				    )
			    )
		    )
	    AND (
		    ini.PoolType <> ''MAX''
		    OR ini.PoolType IS NULL
		    )
	    AND (
		    pool.PoolType <> ''MAX''
		    OR pool.PoolType IS NULL
		    ) ' + @tmpStringParam + '

    UNION ALL

    SELECT ''7.4 Sustain Core: Chain Integration'' AS [CAPEX]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (Subsidiary)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(Subsidiary)]
	    ,Count(*) AS [จำนวนโครงการ (GC Group)]
	    ,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
    FROM [v_Initiatives] ini
    INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	    AND cap.Revistion = (
		    SELECT MAX(Revistion) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
	    AND cap.Sequent = (
		    SELECT MAX(Sequent) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
    LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
    WHERE (
		    cap.ProjectCost > 300
		    AND ini.InitiativeType <> ''Request Pool''
		    AND (
			    (
				    ini.TypeOfInvestment = ''Sustain Core: Chain Integration''
				    AND (
					    cap.RequestPoolMAX = ''false''
					    OR cap.RequestPoolMAX IS NULL
					    )
				    )
			    )
		    )
	    AND (
		    ini.PoolType <> ''MAX''
		    OR ini.PoolType IS NULL
		    )
	    AND (
		    pool.PoolType <> ''MAX''
		    OR pool.PoolType IS NULL
		    ) ' + @tmpStringParam + '

    UNION ALL

    SELECT ''7.5 Sustain Core: New derivative'' AS [CAPEX]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (Subsidiary)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(Subsidiary)]
	    ,Count(*) AS [จำนวนโครงการ (GC Group)]
	    ,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
    FROM [v_Initiatives] ini
    INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	    AND cap.Revistion = (
		    SELECT MAX(Revistion) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
	    AND cap.Sequent = (
		    SELECT MAX(Sequent) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
    LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
    WHERE (
		    cap.ProjectCost > 300
		    AND ini.InitiativeType <> ''Request Pool''
		    AND (
			    (
				    ini.TypeOfInvestment = ''Sustain Core: New derivative''
				    AND (
					    cap.RequestPoolMAX = ''false''
					    OR cap.RequestPoolMAX IS NULL
					    )
				    )
			    )
		    )
	    AND (
		    ini.PoolType <> ''MAX''
		    OR ini.PoolType IS NULL
		    )
	    AND (
		    pool.PoolType <> ''MAX''
		    OR pool.PoolType IS NULL
		    ) ' + @tmpStringParam + '

    UNION ALL

    SELECT ''7.6 Sustain Core: Map ta put retrofit'' AS [CAPEX]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (Subsidiary)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(Subsidiary)]
	    ,Count(*) AS [จำนวนโครงการ (GC Group)]
	    ,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
    FROM [v_Initiatives] ini
    INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	    AND cap.Revistion = (
		    SELECT MAX(Revistion) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
	    AND cap.Sequent = (
		    SELECT MAX(Sequent) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
    LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
    WHERE (
		    cap.ProjectCost > 300
		    AND ini.InitiativeType <> ''Request Pool''
		    AND (
			    (
				    ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit''
				    AND (
					    cap.RequestPoolMAX = ''false''
					    OR cap.RequestPoolMAX IS NULL
					    )
				    )
			    )
		    )
	    AND (
		    ini.PoolType <> ''MAX''
		    OR ini.PoolType IS NULL
		    )
	    AND (
		    pool.PoolType <> ''MAX''
		    OR pool.PoolType IS NULL
		    ) ' + @tmpStringParam + '

    UNION ALL

    SELECT ''7.7 Sustain Core: Energy saving'' AS [CAPEX]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (Subsidiary)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(Subsidiary)]
	    ,Count(*) AS [จำนวนโครงการ (GC Group)]
	    ,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
    FROM [v_Initiatives] ini
    INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	    AND cap.Revistion = (
		    SELECT MAX(Revistion) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
	    AND cap.Sequent = (
		    SELECT MAX(Sequent) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
    LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
    WHERE (
		    cap.ProjectCost > 300
		    AND ini.InitiativeType <> ''Request Pool''
		    AND (
			    (
				    ini.TypeOfInvestment = ''Sustain Core: Energy saving''
				    AND (
					    cap.RequestPoolMAX = ''false''
					    OR cap.RequestPoolMAX IS NULL
					    )
				    )
			    )
		    )
	    AND (
		    ini.PoolType <> ''MAX''
		    OR ini.PoolType IS NULL
		    )
	    AND (
		    pool.PoolType <> ''MAX''
		    OR pool.PoolType IS NULL
		    ) ' + @tmpStringParam + '

    
    

UNION ALL

SELECT ''7.8 IT CAPEX'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''IT CAPEX''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.9 Digital CAPEX'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Digital CAPEX''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.10 Environment'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Environment''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.11 Safety'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Safety''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.12 Law & Regulation'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Law & Regulation''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.13 Maintain Reliability'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Maintain Reliability''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.14 Replacement'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Replacement''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.15 Turnaround'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Turnaround''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.16 Overhaul'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Overhaul''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.17 CSR'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''CSR''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.18 Welfare'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Welfare''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.19 Lab & Quality'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Lab & Quality''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.20 Others'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Others''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''7.21 Engineering Request ER'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND ini.InitiativeType <> ''Request Pool''
		AND ((ISNULL(ini.TypeOfInvestment, '''') = ''Engineering Request ER''))
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

    SELECT ''7.22 ER'' AS [CAPEX]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(GC Only)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN 1
			    ELSE 0
			    END) AS [จำนวนโครงการ (Subsidiary)]
	    ,SUM(CASE 
			    WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				    THEN cap.ProjectCost
			    ELSE 0
			    END) AS [งบประมาณรวม(Subsidiary)]
	    ,Count(*) AS [จำนวนโครงการ (GC Group)]
	    ,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
    FROM [v_Initiatives] ini
    INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	    AND cap.Revistion = (
		    SELECT MAX(Revistion) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
	    AND cap.Sequent = (
		    SELECT MAX(Sequent) AS Expr1
		    FROM dbo.CapexInformations
		    WHERE (InitiativeId = ini.Id)
		    )
    LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
    WHERE (
		    cap.ProjectCost > 300
		    AND ini.InitiativeType <> ''Request Pool''
		    AND ((ini.TypeOfInvestment IS NULL AND ini.PoolType = ''ER''))
		    )
	    AND (
		    ini.PoolType <> ''MAX''
		    OR ini.PoolType IS NULL
		    )
	    AND (
		    pool.PoolType <> ''MAX''
		    OR pool.PoolType IS NULL
		    ) ' + @tmpStringParam + '

     UNION ALL

        SELECT
	''SUM Large Project'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini  INNER JOIN 
	[CapexInformations] cap  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and  
    (cap.ProjectCost > 300 AND ini.InitiativeType <> ''Request Pool'' AND
	(
	(ini.TypeOfInvestment = ''Sustain Core: Operational Excellence'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Sustain Core: Chain Integration'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Sustain Core: New derivative'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Sustain Core: Energy saving'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ISNULL(ini.TypeOfInvestment, '''') = ''IT CAPEX'' OR ISNULL(ini.TypeOfInvestment, '''') = ''Digital CAPEX'' --added 18/09/2020
	--OR (PoolType = ''IT CAPEX'' OR ini.PoolType = ''Digital CAPEX'') --edited 18/09/2020
	OR ini.TypeOfInvestment = ''Environment''					--add 2020-09-28 from BAU
	OR ini.TypeOfInvestment = ''Safety''						--add 2020-09-28 from BAU
	OR ini.TypeOfInvestment = ''Law & Regulation''				--add 2020-09-28 from BAU
	OR ini.TypeOfInvestment = ''Maintain Reliability''			--add 2020-09-28 from BAU
	OR ini.TypeOfInvestment = ''Replacement''					--add 2020-09-28 from BAU
	OR ini.TypeOfInvestment = ''Turnaround''					--add 2020-09-28 from BAU
	OR ini.TypeOfInvestment = ''Overhaul''						--add 2020-09-28 from BAU
	OR ini.TypeOfInvestment = ''CSR''							--add 2020-09-28 from BAU
	OR ini.TypeOfInvestment = ''Welfare''						--add 2020-09-28 from BAU
    OR ini.TypeOfInvestment = ''Lab & Quality''					--add 2020-09-28 from BAU
	OR ini.TypeOfInvestment = ''Others''						--add 2020-09-28 from BAU
	OR ini.TypeOfInvestment = ''Engineering Request ER''		--add 2020-09-28 from BAU
	OR (ini.TypeOfInvestment IS NULL AND ini.PoolType = ''ER'')	--add 2020-09-28 from BAU
	) 
	))

	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
     ' + @tmpStringParam +  '

     UNION ALL

     SELECT
	''8. MAX Large Project'' AS [CAPEX]
	,NULL AS [จำนวนโครงการ (GC Only)]
	,NULL AS [งบประมาณรวม(GC Only)]  
	,NULL AS [จำนวนโครงการ (Subsidiary)]
	,NULL AS [งบประมาณรวม(Subsidiary)]  
	,NULL AS [จำนวนโครงการ (GC Group)]
	,NULL AS [งบประมาณรวม(GC Group)]  
    
    UNION ALL

SELECT ''8.1 Operational Excellence'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Operational Excellence''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''8.2 Sustain Core: Marketing Excellence'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''8.3 Sustain Core: Debot/Expansion'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''8.4 Sustain Core: Chain Integration'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Sustain Core: Chain Integration''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''8.5 Sustain Core: New derivative'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Sustain Core: New derivative''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''8.6 Sustain Core: Map ta put retrofit'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''8.7 Sustain Core: Energy saving'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Sustain Core: Energy saving''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

    SELECT
	''SUM MAX Large Project'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini  INNER JOIN 
	[CapexInformations] cap  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and   
    (cap.ProjectCost > 300 AND
	(
	   (ini.TypeOfInvestment = ''Operational Excellence'' and cap.RequestPoolMAX = ''true'' and cap.ProjectCost > 300 )
	OR (ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence''  and cap.RequestPoolMAX = ''true'' and cap.ProjectCost > 300 )
	OR (ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and cap.RequestPoolMAX = ''true'' and cap.ProjectCost > 300 )
	OR (ini.TypeOfInvestment = ''Sustain Core: Chain Integration'' and cap.RequestPoolMAX = ''true'' and cap.ProjectCost > 300 )
	OR (ini.TypeOfInvestment = ''Sustain Core: New derivative'' and cap.RequestPoolMAX = ''true'' and cap.ProjectCost > 300 )
	OR (ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit'' and cap.RequestPoolMAX = ''true'' and cap.ProjectCost > 300 )
	OR (ini.TypeOfInvestment = ''Sustain Core: Energy saving'' and cap.RequestPoolMAX = ''true'' and cap.ProjectCost > 300 )
	))
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
     ' + @tmpStringParam +  '

UNION ALL

     SELECT
	''9. Growth'' AS [CAPEX]
	,NULL AS [จำนวนโครงการ (GC Only)]
	,NULL AS [งบประมาณรวม(GC Only)]  
	,NULL AS [จำนวนโครงการ (Subsidiary)]
	,NULL AS [งบประมาณรวม(Subsidiary)]  
	,NULL AS [จำนวนโครงการ (GC Group)]
	,NULL AS [งบประมาณรวม(GC Group)]  
    



UNION ALL

SELECT ''9.1 Growth: New business'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Growth: New business''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''9.2 Growth: Build International Competitive base'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Growth: Build International Competitive base''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''9.3 Growth: Diversify to performance chemicals'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Growth: Diversify to performance chemicals''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''9.4 Growth: Enhance green'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''Growth: Enhance green''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''9.5 M&A'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''M&A''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

SELECT ''9.6 CVC'' AS [CAPEX]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(GC Only)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN 1
			ELSE 0
			END) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE 
			WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''
				THEN cap.ProjectCost
			ELSE 0
			END) AS [งบประมาณรวม(Subsidiary)]
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]
FROM [v_Initiatives] ini
INNER JOIN [CapexInformations] cap ON cap.InitiativeId = ini.Id
	AND cap.Revistion = (
		SELECT MAX(Revistion) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
	AND cap.Sequent = (
		SELECT MAX(Sequent) AS Expr1
		FROM dbo.CapexInformations
		WHERE (InitiativeId = ini.Id)
		)
LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
WHERE (
		cap.ProjectCost > 300
		AND (
			(
				ini.TypeOfInvestment = ''CVC''
				AND cap.RequestPoolMAX = ''true''
				AND cap.ProjectCost > 300
				)
			)
		)
	AND (
		ini.PoolType <> ''MAX''
		OR ini.PoolType IS NULL
		)
	AND (
		pool.PoolType <> ''MAX''
		OR pool.PoolType IS NULL
		) ' + @tmpStringParam + '

UNION ALL

    SELECT
	''SUM Growth  '' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') = ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') <> ''PTTGC''THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM(cap.ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] ini  INNER JOIN 
	[CapexInformations] cap  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	((ini.TypeOfInvestment = ''Growth: New business'' 
	OR ini.TypeOfInvestment = ''Growth: Build International Competitive base'' 
	OR ini.TypeOfInvestment = ''Growth: Diversify to performance chemicals'' 
	OR ini.TypeOfInvestment = ''Growth: Enhance green'' 
	OR ini.TypeOfInvestment = ''M&A'' 
	OR ini.TypeOfInvestment = ''CVC'' ))
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
     ' + @tmpStringParam +  '


    ')







END
 
GO

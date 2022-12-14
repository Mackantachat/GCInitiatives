/****** Object:  StoredProcedure [dbo].[sp_NewCapexGcGroupByProjectType_Backup2]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 
CREATE PROCEDURE [dbo].[sp_NewCapexGcGroupByProjectType_Backup2]
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
				
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + SUBSTRING(@parameterField, 1, CHARINDEX('.' , @parameterField)) + '[' + SUBSTRING(@parameterField, CHARINDEX('.' , @parameterField) + 1, LEN(@parameterField) ) + ']' +  ' ' + @filterCondition + ' ( (SELECT TRIM(VALUE) FROM STRING_SPLIT(''' + @DefaultValue + ''', '','') ) )' 
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
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE   
	(([v_Initiatives].TypeOfInvestment = ''Environment'') 
	 AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	)

 

    ' + @tmpStringParam + '
	union all
	SELECT
	''1.2. Safety''
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	(([v_Initiatives].TypeOfInvestment = ''Safety'')
	 AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	)
    ' + @tmpStringParam + '
	union all
	SELECT
	''1.3. Law & Regulations''
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	(([v_Initiatives].TypeOfInvestment = ''Law & Regulation'')
	 AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	)
    ' + @tmpStringParam + '
	union all
	SELECT
	''1.4.Maintain Reliability (No EBITDA Uplift)''
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  
	(([v_Initiatives].TypeOfInvestment = ''Maintain Reliability'' and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	 AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	)

	 
    ' + @tmpStringParam + '
	union all
	SELECT
	''1.5.Replacement/Overhaul''
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE   
	([v_Initiatives].TypeOfInvestment IN (''Replacement/Overhaul'', ''Replacement'' , ''Overhaul'') and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) 
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	)
    ' + @tmpStringParam + '
	union all
	SELECT
	''1.6.Turnaround''
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	(([v_Initiatives].TypeOfInvestment = ''Turnaround''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	)
	' + @tmpStringParam + '
    union all 
	SELECT
	''1.7.CSR''
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	(([v_Initiatives].TypeOfInvestment = ''CSR''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	)
	' + @tmpStringParam + '
    union all
	SELECT
	''1.8.Welfare''
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	(([v_Initiatives].TypeOfInvestment = ''Welfare''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	)
	' + @tmpStringParam + '
    union all
	SELECT
	''1.9.Lab & Quality''
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	(([v_Initiatives].TypeOfInvestment = ''Lab & Quality''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	)
	' + @tmpStringParam + '
    union all
	SELECT
	''1.10.Other''
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))  and
	([v_Initiatives].TypeOfInvestment = ''Others''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) 
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	)
	' + @tmpStringParam + '
    union all
	SELECT
	''1.11.Engineering Request (ER)''
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  
	(([v_Initiatives].TypeOfInvestment = ''Engineering Request ER''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	OR ([v_Initiatives].[PoolType] = ''ER'' )
	OR ([CapexInformations].[Poolbudgetform] = ''ER'' )) 
		
	' + @tmpStringParam + '
    union all
	SELECT
	''SUM BAU'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]  
	FROM  [v_Initiatives] (Nolock) INNER JOIN [CapexInformations] (Nolock)  ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  
	(( [v_Initiatives].TypeOfInvestment = ''Environment'' 
	OR [v_Initiatives].TypeOfInvestment = ''Safety'' 
	OR [v_Initiatives].TypeOfInvestment = ''Law & Regulation''
	OR ([v_Initiatives].TypeOfInvestment = ''Maintain Reliability'' and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	OR ([v_Initiatives].TypeOfInvestment  IN (''Replacement/Overhaul'', ''Replacement'' , ''Overhaul'')  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = ''Turnaround''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = ''Overhaul''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = ''CSR''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = ''Welfare''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
    OR ([v_Initiatives].TypeOfInvestment = ''Lab & Quality''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = ''Others''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	OR ([v_Initiatives].TypeOfInvestment = ''Engineering Request ER''  and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	OR ([v_Initiatives].[PoolType] = ''ER'' )
	OR ([CapexInformations].[Poolbudgetform] = ''ER'' ) 
	))


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
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	 (( [v_Initiatives].TypeOfInvestment = ''Operational Excellence'' and  [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	 AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	 )
	' + @tmpStringParam + '
	union all
	 SELECT
	''2.2.Sustain Core: Marketing Excellence'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	 ) 
	' + @tmpStringParam + '
	union all
	 SELECT
	''2.3.Sustain Core: Debot/Expansion'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	 )
	 ' + @tmpStringParam + '
	 union all
	 SELECT
	''2.4.Sustain Core: Chain Integration'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Chain Integration'' and [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	 )
	' + @tmpStringParam + '
    union all

	 SELECT
	''2.5.Sustain Core: New derivative'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( [v_Initiatives].TypeOfInvestment = ''Sustain Core: New derivative'' and [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	 )
	' + @tmpStringParam + '
	union all
	 SELECT
	''2.6.Sustain Core: Map ta put retrofit'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Map ta put retrofit''and  [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	 )
    ' + @tmpStringParam + '
 union all
	 SELECT
	''2.7.Sustain Core: Energy saving'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	(( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Energy saving'' and [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
	 )
    ' + @tmpStringParam + '
 UNION all

	 SELECT
	''SUM Sustain Core < 300MB'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  
	((
	  ( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Operational Excellence'' and  [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL) )
	OR( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	OR( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	OR( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Chain Integration'' and [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	OR( [v_Initiatives].TypeOfInvestment = ''Sustain Core: New derivative'' and [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	OR( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Map ta put retrofit''and  [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	OR( [v_Initiatives].TypeOfInvestment = ''Sustain Core: Energy saving'' and [CapexInformations].ProjectCost <= 300 and ([CapexInformations].RequestPoolMAX = ''false'' OR [CapexInformations].RequestPoolMAX IS NULL))
	)
	AND ( [v_Initiatives].[PoolType] = '''' OR [v_Initiatives].[PoolType] IS NULL ) AND ( [CapexInformations].[Poolbudgetform]  = '''' OR [CapexInformations].[Poolbudgetform] IS NULL ) 
   	)
    ' + @tmpStringParam + '
	union all
	SELECT
	''3. R&D'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE   
	([v_Initiatives].TypeOfInvestment = ''Technical Support for R&D'' OR [v_Initiatives].TypeOfInvestment = ''R&D'')
    ' + @tmpStringParam + '
	union all
	SELECT
	''SUM R&D'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE   
	([v_Initiatives].TypeOfInvestment = ''Technical Support for R&D'' OR [v_Initiatives].TypeOfInvestment = ''R&D'')
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
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE 
	(([v_Initiatives].TypeOfInvestment = ''Maintain Reliability''  and [CapexInformations].RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.2. Replacement/Overhaul'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE 
	(([v_Initiatives].TypeOfInvestment IN (''Replacement/Overhaul'', ''Replacement'' , ''Overhaul'')  and [CapexInformations].RequestPoolMAX = ''true'' ))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.3.Operational Excellence'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  
	(([v_Initiatives].TypeOfInvestment = ''Operational Excellence'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.4. Sustain Core: Marketing Excellence'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE 
	(([v_Initiatives].TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true'' ))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.5. Sustain Core: Debot/Expansion'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE
	(([v_Initiatives].TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true'' ))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.6. Sustain Core: Chain Integration'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE 
	(([v_Initiatives].TypeOfInvestment = ''Sustain Core: Chain Integration'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.7. Sustain Core: New derivative'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE 
	(([v_Initiatives].TypeOfInvestment = ''Sustain Core: New derivative'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.8. Sustain Core: Map ta put retrofit'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	(([v_Initiatives].TypeOfInvestment = ''Sustain Core: Map ta put retrofit'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.9. Sustain Core: Energy saving'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	(([v_Initiatives].TypeOfInvestment = ''Sustain Core: Energy saving'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.10. Turnaround'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	(([v_Initiatives].TypeOfInvestment = ''Turnaround'' and [CapexInformations].RequestPoolMAX = ''true''))
    ' + @tmpStringParam + '
	union all
	SELECT
	''4.11. CSR'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	(([v_Initiatives].TypeOfInvestment = ''CSR'' and [CapexInformations].RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.12. Welfare'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	(([v_Initiatives].TypeOfInvestment = ''Welfare'' and [CapexInformations].RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.13. Lab & Quality'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	(([v_Initiatives].TypeOfInvestment = ''Lab & Quality'' and [CapexInformations].RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.14. Other'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	(([v_Initiatives].TypeOfInvestment = ''Others'' and [CapexInformations].RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '
	union all
	SELECT
	''4.15. Engineering Request (ER)'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	(([v_Initiatives].TypeOfInvestment = ''Engineering Request ER'' and [CapexInformations].RequestPoolMAX = ''true''))
     ' + @tmpStringParam + '

	union all
	SELECT
	''4.16. Pool MAX'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE  
	( ([v_Initiatives].TypeOfInvestment IS NULL AND [v_Initiatives].PoolType=''MAX'') )
     ' + @tmpStringParam + ' 
	union all
	SELECT
	''SUM Max Infinity'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (GC Only)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') = ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(GC Only)]  
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN 1 ELSE 0 END ) AS [จำนวนโครงการ (Subsidiary)]
	,SUM(CASE WHEN ISNULL([v_Initiatives].COMPANY, ''PTTGC'') <> ''PTTGC''THEN [CapexInformations].ProjectCost ELSE 0 END) AS [งบประมาณรวม(Subsidiary)]  
	,Count(*) AS [จำนวนโครงการ (GC Group)]
	,SUM([CapexInformations].ProjectCost) AS [งบประมาณรวม(GC Group)]   
	FROM  
	[v_Initiatives] INNER JOIN 
	[CapexInformations] ON [CapexInformations].InitiativeId = [v_Initiatives].Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	((
	   ([v_Initiatives].TypeOfInvestment = ''Maintain Reliability''  and [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment IN (''Replacement/Overhaul'', ''Replacement'' , ''Overhaul'')  and [CapexInformations].RequestPoolMAX = ''true'' )
	OR ([v_Initiatives].TypeOfInvestment = ''Operational Excellence'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true'' )
	OR ([v_Initiatives].TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true'' )
	OR ([v_Initiatives].TypeOfInvestment = ''Sustain Core: Chain Integration'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''Sustain Core: New derivative'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''Sustain Core: Map ta put retrofit'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''Sustain Core: Energy saving'' and  [CapexInformations].ProjectCost <= 300 AND [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''Turnaround'' and [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''Overhaul'' and [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''CSR'' and [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''Welfare'' and [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''Lab & Quality'' and [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''Others'' and [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment = ''Engineering Request ER'' and [CapexInformations].RequestPoolMAX = ''true'')
	OR ([v_Initiatives].TypeOfInvestment IS NULL AND [v_Initiatives].PoolType=''MAX'')
	))
    ' + @tmpStringParam + '
    ')


END
-- exec [sp_NewCapexGcGroupByProjectType] 503
-- xxx


-- select * from [dbo].[CustomReportHeader]
GO

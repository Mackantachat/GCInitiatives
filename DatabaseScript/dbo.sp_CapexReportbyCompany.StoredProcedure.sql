/****** Object:  StoredProcedure [dbo].[sp_CapexReportbyCompany]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_CapexReportbyCompany]
(
    @reportID   NVARCHAR(255) = ''
)
AS
BEGIN

 DECLARE @statDate AS DATETIME
 DECLARE @endDate AS DATETIME

 SET @statDate = CONVERT(DATE,GETDATE())
 SET @endDate = @statDate

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

PRINT(@tmpStringParam );
        EXEC('

--PTTGC
--TFA
--TPRC
--Vencorex (Thailand)
--GCME
--GCMPTA
--GCO
--GCP
--GCS
--GGC
--Glycol
--NPC S&E
--PPCL
--------------------------------
--PTTGC
--AP ROH
--Bio Spectrum
--GCEC
--GCME
--GCMP
--GCMPTA
--GCO
--GCP
--GCS
--GCTC
--GGC
--Glycol
--NPC S&E
--NPC S&E Security
--PPCL
--SUN
--TFA
--TPRC
--TTEX
--Vencorex (Thailand)





 SELECT
	''01. BAU'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )


	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]

	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))   and
	(( ini.TypeOfInvestment = ''Environment'' 
	OR ini.TypeOfInvestment = ''Safety'' 
	OR ini.TypeOfInvestment = ''Law & Regulation''
	OR (ini.TypeOfInvestment = ''Maintain Reliability'' )
	OR (ini.TypeOfInvestment = ''Replacement''  )
	OR (ini.TypeOfInvestment = ''Turnaround''   )
	OR (ini.TypeOfInvestment = ''Replacement/Overhaul''   )
	OR (ini.TypeOfInvestment = ''Overhaul''   )
	OR (ini.TypeOfInvestment = ''CSR''   )
	OR (ini.TypeOfInvestment = ''Welfare''   )
    OR (ini.TypeOfInvestment = ''Lab & Quality''  )
	OR (ini.TypeOfInvestment = ''Others''  )
	OR (ini.TypeOfInvestment = ''Engineering Request ER''   )
	OR (ini.TypeOfInvestment IS NULL AND ini.PoolType = ''ER'')  
	))
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) and cap.ProjectCost <= 300

    ' + @tmpStringParam + '
Union	
 SELECT
	''02. Sustain Core < 300MB'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )




	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]

	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) AND
	((
	  ( ini.TypeOfInvestment = ''Sustain Core: Operational Excellence'' and  cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR( ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Chain Integration'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: New derivative'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit''and  cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Energy saving'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	))
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 


    ' + @tmpStringParam + '

Union	
 SELECT
	''03. R&D'' AS [CAPEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TFA''THEN 1 ELSE 0 END )  
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''TFA''THEN 1 ELSE 0 END )  

	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]

	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and   
	(ini.TypeOfInvestment = ''Technical Support for R&D'' OR ini.TypeOfInvestment = ''R&D'')
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
    ' + @tmpStringParam + '

Union
	select
	''04. Sub Total'' AS [CAPEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )


	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	--1
	(
    (
    cap.ProjectCost <= 300 AND
    ( 
	ini.TypeOfInvestment = ''Environment'' 
	OR ini.TypeOfInvestment = ''Safety'' 
	OR ini.TypeOfInvestment = ''Law & Regulation''
	OR (ini.TypeOfInvestment = ''Maintain Reliability'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR (ini.TypeOfInvestment = ''Replacement''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Turnaround''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Overhaul''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''CSR''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Welfare''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
    OR (ini.TypeOfInvestment = ''Lab & Quality''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Others''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Engineering Request ER''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment IS NULL AND ini.PoolType = ''ER'') --Added 17/09/2020
	)
    )
	OR --2
	(
	cap.ProjectCost <= 300 AND
	(
	  ( ini.TypeOfInvestment = ''Sustain Core: Operational Excellence'' and  cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR( ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Chain Integration'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: New derivative'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit''and  cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Energy saving'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	))
	OR --3
	(
	ini.TypeOfInvestment = ''Technical Support for R&D'' OR ini.TypeOfInvestment = ''R&D''
	))
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
    ' + @tmpStringParam + '

UNION
	SELECT
	''05. Max Infinity'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END ) 
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )


	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	--LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))     and 
	((
	   (ini.TypeOfInvestment = ''Maintain Reliability''  and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Replacement''  and cap.RequestPoolMAX = ''true'' )
	OR (ini.TypeOfInvestment = ''Sustain Core: Operational Excellence'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'')
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
	)) 
	OR (ini.TypeOfInvestment IS NULL AND ini.PoolType=''MAX'') --added 16/09/2020
	--AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	--AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
    ' + @tmpStringParam + '

UNION 

	SELECT
	''06. Digital & IT'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )


	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]
	FROM  
	[v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
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
	--OR (ini.PoolType = ''IT CAPEX'' OR ini.PoolType = ''Digital CAPEX'') -- editted 17/09/2020
    ) -- Added 14/09/2020
	AND cap.ProjectCost <= 300
	OR (ini.PoolType = ''IT CAPEX'' OR ini.PoolType = ''Digital CAPEX'')) --editted 23/09/2020
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
    ' + @tmpStringParam + '

UNION 

	SELECT
	''07 MTPi'' AS [CAPEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )


	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
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
    ' + @tmpStringParam + '
UNION 
	SELECT
	''08. Large Project'' AS [CAPEX]
	,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )


	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
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
    ' + @tmpStringParam + '
UNION
	SELECT
	''09.MAX Large Project'' AS [CAPEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )


	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
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
	' + @tmpStringParam + '

UNION 
	SELECT
	''10.Growth'' AS [CAPEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )


	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
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
	' + @tmpStringParam + '
UNION 
	SELECT
	''11. Sub Total'' AS [CAPEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )


	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	WHERE  --((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631)) and 
	--5
	(((
	   (ini.TypeOfInvestment = ''Maintain Reliability''  and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Replacement''  and cap.RequestPoolMAX = ''true'' )
	OR (ini.TypeOfInvestment = ''Sustain Core: Operational Excellence'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'')
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
	)) 
	OR (ini.TypeOfInvestment IS NULL AND ini.PoolType=''MAX'') --added 16/09/2020
	OR --6
	(
	(((ISNULL(ini.TypeOfInvestment, '''') = ''IT CAPEX'' 
	OR ISNULL(ini.TypeOfInvestment, '''') = ''Digital CAPEX'')
	--OR (ini.PoolType = ''IT CAPEX'' OR ini.PoolType = ''Digital CAPEX'') -- editted 17/09/2020
    ) -- Added 14/09/2020
	AND cap.ProjectCost <= 300
	OR (ini.PoolType = ''IT CAPEX'' OR ini.PoolType = ''Digital CAPEX'')) --editted 23/09/2020
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
	)
	OR ( --7 ---Added 16/09/2020
    (cap.ProjectCost = 999)
	or (ini.PoolType = ''MTPi'') ---Added 16/09/2020
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
    ) 
	OR --8
	(
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
	)
	OR --9
	(
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
	)
	OR --10
	(
	ini.TypeOfInvestment = ''Growth: New business'' 
	OR ini.TypeOfInvestment = ''Growth: Build International Competitive base'' 
	OR ini.TypeOfInvestment = ''Growth: Diversify to performance chemicals'' 
	OR ini.TypeOfInvestment = ''Growth: Enhance green'' 
	OR ini.TypeOfInvestment = ''M&A'' 
	OR ini.TypeOfInvestment = ''CVC'' 
	))
    ' + @tmpStringParam + '

	UNION 

	SELECT
	''Grand Total'' AS [CAPEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PTTGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PTTGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ AP ROH]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม AP ROH]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Bio Spectrum]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Bio Spectrum]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCEC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCEC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCME]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCME]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCMPTA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'') THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCMPTA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCO]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCO]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCP]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCP]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCS]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCS]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GCTC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GCTC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ GGC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม GGC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Glycol]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Glycol]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ NPC S&E Security]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม NPC S&E Security]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ PPCL]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม PPCL]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ SUN]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม SUN]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TFA]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TFA]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TPRC]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TPRC]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ TTEX]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม TTEX]
,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Vencorex (Thailand)]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Vencorex (Thailand)]	

,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN 1 ELSE 0 END ) AS [จำนวนโครงการ Others]  ,SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others'' THEN cap.ProjectCost ELSE 0 END) AS [งบประมาณรวม Others]
	--CountTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN 1 ELSE 0 END )
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN 1 ELSE 0 END )


	) AS [จำนวนโครงการทั้งหมด]
	--SumTotal
	,(SUM(CASE WHEN ISNULL(ini.COMPANY, ''PTTGC'') IN (''PTTGC'',''PTT Polyethylene Co.,Ltd.'')THEN cap.ProjectCost ELSE 0 END )
	+SUM(CASE WHEN ISNULL(ini.COMPANY, ''AP ROH'') = ''AP ROH''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Bio Spectrum'') = ''Bio Spectrum''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCEC'') = ''GCEC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCME'') = ''GCME''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMP'') = ''GCMP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCMPTA'') IN (''GCMPTA'',''GCM-PTA'')THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCO'') = ''GCO''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCP'') = ''GCP''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCS'') = ''GCS''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GCTC'') = ''GCTC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''GGC'') = ''GGC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Glycol'') = ''Glycol''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E'') = ''NPC S&E''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''NPC S&E Security'') = ''NPC S&E Security''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''PPCL'') = ''PPCL''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''SUN'') = ''SUN''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TFA'') = ''TFA''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TPRC'') = ''TPRC''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''TTEX'') = ''TTEX''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Vencorex (Thailand)'') = ''Vencorex (Thailand)''THEN cap.ProjectCost ELSE 0 END)
+SUM(CASE WHEN ISNULL(ini.COMPANY, ''Others'') = ''Others''THEN cap.ProjectCost ELSE 0 END)

	) AS [งบประมาณรวมทั้งหมด]
	FROM  [v_Initiatives] ini (Nolock) INNER JOIN [CapexInformations] cap (Nolock)  ON cap.InitiativeId = ini.Id AND cap.Revistion =
                 (SELECT MAX(Revistion) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id)) AND cap.Sequent =
                 (SELECT MAX(Sequent) AS Expr1
                 FROM    dbo.CapexInformations
                 WHERE (InitiativeId = ini.Id))
	LEFT JOIN v_Initiatives pool ON cap.PoolId = pool.Id
	--where ((id >= 557 AND id <= 598) OR (id >= 619 AND id <= 631))
    WHERE

    (
    (
    (
    (
    cap.ProjectCost <= 300 AND
    ( 
	ini.TypeOfInvestment = ''Environment'' 
	OR ini.TypeOfInvestment = ''Safety'' 
	OR ini.TypeOfInvestment = ''Law & Regulation''
	OR (ini.TypeOfInvestment = ''Maintain Reliability'' and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR (ini.TypeOfInvestment = ''Replacement''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Turnaround''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Overhaul''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''CSR''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Welfare''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
    OR (ini.TypeOfInvestment = ''Lab & Quality''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Others''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment = ''Engineering Request ER''  and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR (ini.TypeOfInvestment IS NULL AND ini.PoolType = ''ER'') --Added 17/09/2020
	)
    )
	OR --2
	(
	cap.ProjectCost <= 300 AND
	(
	  ( ini.TypeOfInvestment = ''Sustain Core: Operational Excellence'' and  cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL) )
	OR( ini.TypeOfInvestment = ''Sustain Core: Marketing Excellence'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Debot/Expansion'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Chain Integration'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: New derivative'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Map ta put retrofit''and  cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	OR( ini.TypeOfInvestment = ''Sustain Core: Energy saving'' and cap.ProjectCost <= 300 and (cap.RequestPoolMAX = ''false'' OR cap.RequestPoolMAX IS NULL))
	))
	OR --3
	(
	ini.TypeOfInvestment = ''Technical Support for R&D'' OR ini.TypeOfInvestment = ''R&D''
	))
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
    )


    OR

    (
    (((
	   (ini.TypeOfInvestment = ''Maintain Reliability''  and cap.RequestPoolMAX = ''true'')
	OR (ini.TypeOfInvestment = ''Replacement''  and cap.RequestPoolMAX = ''true'' )
	OR (ini.TypeOfInvestment = ''Sustain Core: Operational Excellence'' and  cap.ProjectCost <= 300 AND cap.RequestPoolMAX = ''true'')
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
	)) 
	OR (ini.TypeOfInvestment IS NULL AND ini.PoolType=''MAX'') --added 16/09/2020
	OR --6
	(
	(((ISNULL(ini.TypeOfInvestment, '''') = ''IT CAPEX'' 
	OR ISNULL(ini.TypeOfInvestment, '''') = ''Digital CAPEX'')
	--OR (ini.PoolType = ''IT CAPEX'' OR ini.PoolType = ''Digital CAPEX'') -- editted 17/09/2020
    ) -- Added 14/09/2020
	AND cap.ProjectCost <= 300
	OR (ini.PoolType = ''IT CAPEX'' OR ini.PoolType = ''Digital CAPEX'')) --editted 23/09/2020
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
	)
	OR ( --7 ---Added 16/09/2020
    (cap.ProjectCost = 999)
	or (ini.PoolType = ''MTPi'') ---Added 16/09/2020
	AND (ini.PoolType <> ''MAX''  OR ini.PoolType  IS NULL)
	AND (pool.PoolType <> ''MAX''  OR pool.PoolType  IS NULL ) 
    ) 
	OR --8
	(
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
	)
	OR --9
	(
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
	)
	OR --10
	(
	ini.TypeOfInvestment = ''Growth: New business'' 
	OR ini.TypeOfInvestment = ''Growth: Build International Competitive base'' 
	OR ini.TypeOfInvestment = ''Growth: Diversify to performance chemicals'' 
	OR ini.TypeOfInvestment = ''Growth: Enhance green'' 
	OR ini.TypeOfInvestment = ''M&A'' 
	OR ini.TypeOfInvestment = ''CVC'' 
	))
    )
    )
    ' + @tmpStringParam
    )
END
GO

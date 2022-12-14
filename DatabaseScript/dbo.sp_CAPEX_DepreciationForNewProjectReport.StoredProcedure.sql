/****** Object:  StoredProcedure [dbo].[sp_CAPEX_DepreciationForNewProjectReport]    Script Date: 9/22/2021 7:01:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_DepreciationForNewProjectReport]
(
    -- Add the parameters for the stored procedure here
    @ReportID VARCHAR(50) = ''
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    

    
IF (ISNULL(@ReportID, '') = '')
	BEGIN

			RAISERROR (N'ReportCode not specify.', -- Message text.  
				   11, -- Severity,  
				   1 -- State
				   );
			RETURN;
	END



    
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
				
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + '[' + @parameterField + ']' +  ' ' + @filterCondition + ' ( (SELECT TRIM(dbo.fn_CustomReportParamDecoder(VALUE)) FROM STRING_SPLIT(''' + @DefaultValue + ''', '','') ) )' 
			END
			ELSE 
			BEGIN
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + '[' + @parameterField + ']' +  ' ' + @filterCondition + ' ( CASE WHEN ''' + ISNULL(@DefaultValue, '') + ''' = '''' THEN ' + '[' + @parameterField + ']' + ' ELSE ''' + @DefaultValue + ''' END )' 
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
            


PRINT(@tmpStringParam);

    
--TempTable
IF OBJECT_ID('tempdb..#tmpData') IS NOT NULL
DROP TABLE #tmpData


DECLARE @tmpStringMain NVARCHAR(MAX) = '';



SET @tmpStringMain = '
SELECT 

ROW_NUMBER() OVER (ORDER BY [Company],

CASE WHEN VP IS NULL THEN ''ZZZ'' ELSE VP END,
CASE WHEN [Initiative No] IS NULL THEN ''ZZZ'' ELSE [Initiative No] END,
[Investment Type],
[EVP],
[No]) AS [sortNo],

*
INTO #tmpData

FROM (
SELECT 
ROW_NUMBER() OVER (PARTITION BY ISNULL(comp.CompanyShorttxt, ini.Company) ORDER BY ISNULL(comp.CompanyShorttxt, ini.Company), own.Indicator, ini.InitiativeCode, ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool''),ini.Organization) AS ''No'',
cap.Revistion AS ''Revision No'',
cap.BudgetYear AS ''Year'',
ini.InitiativeCode AS ''Initiative No'',
'''' AS ''WBS'',
mapping.AppropriationNo AS ''Appropriation No.'',
ini.Name AS ''Project Name'',
'''' AS ''Investment type sub Group'',
ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') AS ''Investment Type'',
ISNULL(comp.CompanyShorttxt, ini.Company) AS ''Company'',
ini.Organization AS ''EVP'',
MAX(own.Indicator) AS ''VP'',
cap.CodeCostCenterOfVP AS ''Cost Center'',
CONVERT(VARCHAR(10), cap.ProjecctComRun, 120) AS ''Go-live Date'',
CASE WHEN ini.InitiativeType = ''Request Pool'' THEN cap.ProjectCost ELSE ini.CostEstCapex END * 1000000 AS ''Total Budget (Baht)'',
COALESCE(CAST( CONVERT(DECIMAL(10,0), ISNULL( det.UsefulYear, 0)) AS VARCHAR(MAX)), '''') + '' Year(s) '' + COALESCE(CAST( CONVERT(DECIMAL(10,0), (ISNULL(det.UsefulMonth, 0) % 12) ) AS VARCHAR(MAX)), '''') + '' Month(s)'' AS ''Useful life'',
--SUM( CONVERT( DECIMAL(18,2), det.DepreciationCost) ) 
SUM( CASE WHEN YEAR(cap.ProjecctComRun) <> YEAR(GETDATE()) + 1 THEN 0 ELSE dbo.fn_CalculateDepreciationCost(cap.ProjecctComRun, CASE WHEN ini.InitiativeType = ''Request Pool'' THEN cap.ProjectCost ELSE ini.CostEstCapex END, det.UsefulYear, det.UsefulMonth) END ) * 1000000 AS ''Depreciation Cost (Baht)''

FROM v_Initiatives ini 
LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
LEFT JOIN v_Companies comp ON comp.CompanyName = ini.Company
LEFT JOIN v_MappingIniAppWbs mapping ON  mapping.InitiativeCode = ini.InitiativeCode
LEFT JOIN Owners own ON own.OwnerName = cap.CostCenterOfVP
    WHERE 1=1 
    ' + @tmpStringParam + '


GROUP BY
    ini.Id,
    ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') ,
    ISNULL(comp.CompanyShorttxt, ini.Company),
    ini.Organization,
    --ini.Plant,
    ini.InitiativeCode,
    ini.Name,
    det.UsefulYear,
    det.UsefulMonth,
    cap.BudgetYear,
    cap.CostCenterOfVP,
    cap.ProjectCost,
    cap.Revistion,
    mapping.AppropriationNo,
    CONVERT(VARCHAR(10), cap.ProjecctComRun, 120),
    own.Indicator,
    cap.CodeCostCenterOfVP,
    ini.CostEstCapex,
    YEAR(cap.ProjecctComRun),
    ini.InitiativeType



    UNION ALL

-- Total by plant
SELECT 
    9000001 AS ''No'',
    NULL AS ''Revision No'',
    NULL AS ''Year'',
    NULL AS ''Initiative No'',
    NULL AS ''WBS'',
    NULL AS ''Appropriation No.'',
    ''Total By Indicator : '' + ISNULL(MAX(own.Indicator), '''') AS ''Project Name'',
    NULL AS ''Investment type sub Group'',
    NULL AS ''Investment Type'',
    ISNULL(comp.CompanyShorttxt, ini.Company) AS ''Company'',
    NULL AS ''EVP'',
    MAX(own.Indicator) AS ''VP'',
    NULL AS ''Cost Center'',
    NULL AS ''Go-live Date'',
    SUM(CASE WHEN ini.InitiativeType = ''Request Pool'' THEN cap.ProjectCost ELSE ini.CostEstCapex END * 1000000) AS ''Total Budget (Baht)'',
    NULL AS ''Useful life'',
    --SUM( CONVERT( DECIMAL(18,2), det.DepreciationCost) ) 
SUM(    CASE WHEN YEAR(cap.ProjecctComRun) <> YEAR(GETDATE()) + 1 THEN 0 ELSE  dbo.fn_CalculateDepreciationCost(cap.ProjecctComRun, CASE WHEN ini.InitiativeType = ''Request Pool'' THEN cap.ProjectCost ELSE ini.CostEstCapex END, det.UsefulYear, det.UsefulMonth) END ) * 1000000  AS ''Depreciation Cost (Baht)''

    FROM v_Initiatives ini 
    LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
    INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
    LEFT JOIN v_Companies comp ON comp.CompanyName = ini.Company
    LEFT JOIN Owners own ON own.OwnerName = cap.CostCenterOfVP

    WHERE 1=1 
    ' + @tmpStringParam + '


GROUP BY
    --ini.Plant,
    own.Indicator,
    ISNULL(comp.CompanyShorttxt, ini.Company)

UNION ALL

-- Total by Company
SELECT 
    9000002 AS ''No'',
    NULL AS ''Revision No'',
    NULL AS ''Year'',
    NULL AS ''Initiative No'',
    NULL AS ''WBS'',
    NULL AS ''Appropriation No.'',
    ''Total By Company : '' + ISNULL(comp.CompanyShorttxt, ini.Company) AS ''Project Name'',
    NULL AS ''Investment type sub Group'',
    NULL AS ''Investment Type'',
    ISNULL(comp.CompanyShorttxt, ini.Company) AS ''Company'',
    NULL AS ''EVP'',
    NULL AS ''VP'',
    NULL AS ''Cost Center'',
    NULL AS ''Go-live Date'',
    SUM(CASE WHEN ini.InitiativeType = ''Request Pool'' THEN cap.ProjectCost ELSE ini.CostEstCapex END * 1000000) AS ''Total Budget (Baht)'',
    NULL AS ''Useful life'',
    --SUM( CONVERT( DECIMAL(18,2), det.DepreciationCost) ) 
SUM(     CASE WHEN YEAR(cap.ProjecctComRun) <> YEAR(GETDATE()) + 1 THEN 0 ELSE dbo.fn_CalculateDepreciationCost(cap.ProjecctComRun, CASE WHEN ini.InitiativeType = ''Request Pool'' THEN cap.ProjectCost ELSE ini.CostEstCapex END, det.UsefulYear, det.UsefulMonth) END ) * 1000000   AS ''Depreciation Cost (Baht)''

    FROM v_Initiatives ini 
    LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
    INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
    LEFT JOIN v_Companies comp ON comp.CompanyName = ini.Company
    WHERE 1=1 
    ' + @tmpStringParam + '

GROUP BY
    ISNULL(comp.CompanyShorttxt, ini.Company)


    ) a

ORDER BY

[Company],
CASE WHEN VP = '''' THEN ''ZZZ'' ELSE VP END,
CASE WHEN [Initiative No] = '''' THEN ''ZZZ'' ELSE [Initiative No] END,
[Investment Type],
[EVP],
[No]

'


                ----------------------------------

                DECLARE @tmpQuery NVARCHAR(MAX) = '
                                    SELECT 
                        CASE WHEN [No] >= 9000000 THEN '''' ELSE CAST([No] AS VARCHAR(100)) END AS [No],
                            [Revision No],
                            [Year],
                            [Initiative No],                            
                            [Project Name],
                            [Investment type sub Group],
                            [Investment Type],
                            [Company] AS [Company],
                            [EVP],
                            CASE WHEN CASE WHEN [No] >= 9000000 THEN '''' ELSE CAST([No] AS VARCHAR(100)) END = '''' THEN NULL ELSE [VP] END [VP],
                            [Cost Center],
                            [Go-live Date],
                            [Total Budget (Baht)],
                            [Useful life],
                            [Depreciation Cost (Baht)],
                            [WBS],
                            [Appropriation No.]
FROM
                    
  #tmpData
                    ORDER BY sortNo
                '
PRINT(@tmpStringMain + ' ' + @tmpQuery)
EXEC( @tmpStringMain + ' ' + @tmpQuery); 


END
GO
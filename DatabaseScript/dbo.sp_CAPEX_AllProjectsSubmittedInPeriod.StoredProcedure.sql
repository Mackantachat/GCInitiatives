/****** Object:  StoredProcedure [dbo].[sp_CAPEX_AllProjectsSubmittedInPeriod]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_AllProjectsSubmittedInPeriod]
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


        DECLARE @tmpStringMain NVARCHAR(MAX) = '';
    
--TempTable
IF OBJECT_ID('tempdb..#tmpData') IS NOT NULL
DROP TABLE #tmpData


SET @tmpStringMain = '

SELECT 
ROW_NUMBER() OVER (ORDER BY CASE WHEN [Investment Type] = ''Total'' THEN ''ZZZZ'' ELSE [Investment Type] END, [no])  AS [sortNo],
* 
INTO #tmpData
FROM (

SELECT 
    ROW_NUMBER() OVER (ORDER BY CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ISNULL(ini.PoolType, '''') + '' Pool'' ELSE ini.TypeOfInvestment END ,ini.InitiativeCode)  AS [No],
    CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ISNULL(ini.PoolType, '''') + '' Pool'' ELSE ini.TypeOfInvestment END AS ''Investment Type'',
    ini.InitiativeCode AS ''Initiative No'',
    mapping.AppRequestNumber AS ''Appropriation'',
    '''' AS ''WBS No'',
    ini.Name AS ''Project Name'',
    ini.ResultObjective AS ''Objective'',
    ini.OwnerName AS ''Requester'',
    own.Indicator AS ''Project Owner'',
    cap.ProjectCost  AS ''Project Cost (MTHB)'',
    ini.Organization AS ''Organization'',
    ini.Company AS ''Company'',
    CONVERT(VARCHAR(10), cap.ActionYear, 120) AS ''Start Date'',
    CONVERT(VARCHAR(10), cap.ProjecctComRun, 120) AS ''End Date'',
    ini.Remark AS ''Comment'',
    ini.Stage AS ''Stage'',
    ini.Status AS ''Status'',
    '''' AS ''Progress'',
    '''' AS ''Actual Cost''
FROM v_Initiatives ini
INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId  AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
LEFT JOIN v_MappingIniAppWbs mapping ON  mapping.InitiativeCode = ini.InitiativeCode
LEFT JOIN Owners own ON own.OwnerName = cap.CostCenterOfVP
WHERE 1=1 
' + @tmpStringParam + '

UNION

SELECT 
    900000  AS [No],
    CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ISNULL(ini.PoolType, '''') + '' Pool'' ELSE ini.TypeOfInvestment END AS ''Investment Type'',
    '''' AS ''Initiative No'',
    '''' AS ''Appropriation'',
    '''' AS ''WBS No'',
    '''' AS ''Project Name'',
    '''' AS ''Objective'',
    '''' AS ''Requester'',
    '''' AS ''Project Owner'',
    SUM(cap.ProjectCost ) AS ''Project Cost (MTHB)'',
    '''' AS ''Organization'',
    '''' AS ''Company'',
    '''' AS ''Start Date'',
    '''' AS ''End Date'',
    '''' AS ''Comment'',
    '''' AS ''Stage'',
    '''' AS ''Status'',
    '''' AS ''Progress'',
    '''' AS ''Actual Cost''
FROM v_Initiatives ini
INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId  AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)

WHERE 1=1 
 ' + @tmpStringParam + '

GROUP BY
CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ISNULL(ini.PoolType, '''') + '' Pool'' ELSE ini.TypeOfInvestment END

UNION

SELECT 
    900001  AS [No],
    ''Total'' AS ''Investment Type'',
    '''' AS ''Initiative No'',
    '''' AS ''Appropriation'',
    '''' AS ''WBS No'',
    '''' AS ''Project Name'',
    '''' AS ''Objective'',
    '''' AS ''Requester'',
    '''' AS ''Project Owner'',
    SUM(cap.ProjectCost ) AS ''Project Cost (MTHB)'',
    '''' AS ''Organization'',
    '''' AS ''Company'',
    '''' AS ''Start Date'',
    '''' AS ''End Date'',
    '''' AS ''Comment'',
    '''' AS ''Stage'',
    '''' AS ''Status'',
    '''' AS ''Progress'',
    '''' AS ''Actual Cost''
FROM v_Initiatives ini
INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
WHERE 1=1 

 ' + @tmpStringParam + '

) a

ORDER BY [Investment Type], [No]





SELECT 
                        CASE WHEN [No] >= 900000 THEN '''' ELSE CAST([No] AS VARCHAR(100)) END AS [No],
                         [Investment Type],
                         [Initiative No],
                         Appropriation,
                         [WBS No],
                         [Project Name],
                         Objective,
                         ISNULL(emp.OwnerName, Requester) AS [Requester],
                         [Project Owner],
                         [Project Cost (MTHB)],
                         [Organization],
                         ISNULL(comp.CompanyShortTxt , Company) AS [Company],
                         [Start Date] ,
                         [End Date] ,
                         Comment,
                         [Stage],
                         [Status],
                         Progress,
                         [Actual Cost]
                    FROM  #tmpData tmp
                    LEFT JOIN v_Companies comp ON comp.CompanyName = tmp.Company
                    LEFT JOIN v_EmployeeName emp ON emp.EmployeeId = tmp.Requester AND ISNULL(tmp.Requester, '''') <> '''' 
                    ORDER BY sortNo


' ;

EXEC(@tmpStringMain);

END
GO

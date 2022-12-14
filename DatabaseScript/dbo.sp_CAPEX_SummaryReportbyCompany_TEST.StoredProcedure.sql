/****** Object:  StoredProcedure [dbo].[sp_CAPEX_SummaryReportbyCompany_TEST]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_SummaryReportbyCompany_TEST]
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
				
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + ' ISNULL([' + @parameterField + '], '''')' +  ' ' + @filterCondition + ' ( (SELECT TRIM(VALUE) FROM STRING_SPLIT(''' + @DefaultValue + ''', '','') ) )' 
			END
			ELSE 
			BEGIN
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + ' ISNULL([' + @parameterField + '], '''')' +  ' ' + @filterCondition + ' ( CASE WHEN ''' + ISNULL(@DefaultValue, '') + ''' = '''' THEN ' + ' ISNULL([' + @parameterField + '], '''')' + ' ELSE ''' + @DefaultValue + ''' END )' 
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
    ROW_NUMBER() OVER (ORDER BY CASE WHEN (a.[Company]) = ''Grand Total'' THEN ''ZZZ'' ELSE REPLACE(a.[Company], ''Total By Company : '', '''') END,
CASE WHEN (a.[Value Center/BU]) = '''' THEN ''ZZZZ'' ELSE (REPLACE(a.[Value Center/BU], ''Total By Org : '', '''')) END,
CASE WHEN (a.[Investment Type]) = '''' THEN ''ZZZZ'' ELSE (REPLACE(a.[Investment Type], ''Total By Investment Type : '', '''')) END,
[No]) AS [sortNo],
    *
    INTO #tmpData
    FROM (

            SELECT 
            ROW_NUMBER() OVER (ORDER BY (ini.Company),(ini.Organization), CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ISNULL(ini.PoolType, '''') + '' Pool'' ELSE ini.TypeOfInvestment END ) AS [No],
            (ini.Company),
            (ini.Organization) AS ''Value Center/BU'',
            CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ISNULL(ini.PoolType, '''') + '' Pool'' ELSE ini.TypeOfInvestment END AS ''Investment Type'',
            cap.Revistion AS ''Revision No'',
            ini.InitiativeCode AS ''Initiative No'',
            (ini.Stage) AS ''Stage'',
            (ini.Status) AS ''Status'',
            mapping.WBsNo AS ''WBS No'',
            '''' AS ''WBS No'',
            (ini.Name) AS ''Project Name'',
            (ini.ResultObjective) AS ''Objective'',
            ini.OwnerName AS ''Project Owner(VP)'',
            (cap.ProjectCost) AS ''Project Cost (MTHB)'',
            CONVERT(VARCHAR(10), (cap.ActionYear), 120) AS ''Start Date'',
            CONVERT(VARCHAR(10), (cap.ProjecctComRun), 120) AS ''End Date'',
            '''' AS ''Comment''
            FROM v_Initiatives ini
            INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
            LEFT JOIN v_MappingIniAppWbs mapping ON  mapping.InitiativeCode = ini.InitiativeCode

            where 1=1 
            ' + @tmpStringParam + '


            --ORDER BY 
            --(ini.Company),
            --(ini.Organization)


            UNION


            SELECT 
            9000001 AS [No],
            (ini.Company) AS ''Company'',
            ini.Organization AS ''Value Center/BU'',
            ''Total By Investment Type : '' + CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ISNULL(ini.PoolType, '''') + '' Pool'' ELSE ini.TypeOfInvestment END AS ''Investment Type'',
            NULL AS ''Revision No'',
            '''' AS ''Initiative No'',
            '''' AS ''Stage'',
            '''' AS ''Status'',
            '''' AS ''Appropriation No'',
            '''' AS ''WBS No'',
            '''' AS ''Project Name'',
            '''' AS ''Objective'',
            '''' AS ''Project Owner(VP)'',
            SUM(cap.ProjectCost) AS ''Project Cost (MTHB)'',
            '''' AS ''Start Date'',
            '''' AS ''End Date'',
            '''' AS ''Comment''
            FROM v_Initiatives ini
            INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)


            where 1=1 
            ' + @tmpStringParam + '

            GROUP BY 
            (ini.Company),
            (ini.Organization),
            CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ISNULL(ini.PoolType, '''') + '' Pool'' ELSE ini.TypeOfInvestment END

            --ORDER BY
            --(ini.Organization)

            UNION


            SELECT 
            9000002 AS [No],
            (ini.Company) AS ''Company'',
            ''Total By Org : '' + ISNULL(ini.Organization, '''') AS ''Value Center/BU'',
            '''' AS ''Investment Type'',
            NULL AS ''Revision No'',
            '''' AS ''Initiative No'',
            '''' AS ''Stage'',
            '''' AS ''Status'',
            '''' AS ''Appropriation No'',
            '''' AS ''WBS No'',
            '''' AS ''Project Name'',
            '''' AS ''Objective'',
            '''' AS ''Project Owner(VP)'',
            SUM(cap.ProjectCost) AS ''Project Cost (MTHB)'',
            '''' AS ''Start Date'',
            '''' AS ''End Date'',
            '''' AS ''Comment''
            FROM v_Initiatives ini
            INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)


            where 1=1 
            ' + @tmpStringParam + '

            GROUP BY 
            (ini.Company),
            (ini.Organization)

            --ORDER BY
            --(ini.Organization)


            UNION

            SELECT 
            9000003 AS [No],
            ''Total By Company : '' + (ini.Company) AS ''Company'',
            '''' AS ''Value Center/BU'',
            '''' AS ''Investment Type'',
            NULL AS ''Revision No'',
            '''' AS ''Initiative No'',
            '''' AS ''Stage'',
            '''' AS ''Status'',
            '''' AS ''Appropriation No'',
            '''' AS ''WBS No'',
            '''' AS ''Project Name'',
            '''' AS ''Objective'',
            '''' AS ''Project Owner(VP)'',
            SUM(cap.ProjectCost) AS ''Project Cost (MTHB)'',
            '''' AS ''Start Date'',
            '''' AS ''End Date'',
            '''' AS ''Comment''
            FROM v_Initiatives ini
            INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)


            where 1=1 
            ' + @tmpStringParam + '

            GROUP BY 
            (ini.Company)



            UNION

            SELECT 
            9000003 AS [No],
            ''Grand Total'' AS ''Company'',
            '''' AS ''Value Center/BU'',
            '''' AS ''Investment Type'',
            NULL AS ''Revision No'',
            '''' AS ''Initiative No'',
            '''' AS ''Stage'',
            '''' AS ''Status'',
            '''' AS ''Appropriation No'',
            '''' AS ''WBS No'',
            '''' AS ''Project Name'',
            '''' AS ''Objective'',
            '''' AS ''Project Owner(VP)'',
            SUM(cap.ProjectCost) AS ''Project Cost (MTHB)'',
            '''' AS ''Start Date'',
            '''' AS ''End Date'',
            '''' AS ''Comment''
            FROM v_Initiatives ini
            INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)


            where 1=1 
            ' + @tmpStringParam + '

) a
--ORDER BY
--(ini.Company)


ORDER BY
CASE WHEN (a.[Company]) = '''' THEN ''ZZZ'' ELSE (a.[Company]) END,
CASE WHEN (a.[Value Center/BU]) = '''' THEN ''ZZZZ'' ELSE (a.[Value Center/BU]) END,
CASE WHEN (a.[Investment Type]) = '''' THEN ''ZZZZ'' ELSE (a.[Investment Type]) END,
[No]


'


                ----------------------------------

                DECLARE @tmpQuery NVARCHAR(MAX) = '
                                    SELECT 
                        CASE WHEN [No] >= 900000 THEN '''' ELSE CAST([No] AS VARCHAR(100)) END AS [No],
                         [Initiative No],
                         ISNULL(cp.CompanyShortTxt ,[Company]) AS [Company] ,
                         [Value Center/BU],
                         [Investment Type],
                         [Appropriation No],
                         [WBS No],
                         [Project Name],
                         ISNULL(emp.OwnerName, [Project Owner(VP)]) AS [Project Owner(VP)],
                         [Project Cost (MTHB)],
                         [Revision No],
                         [Objective],
                         [Stage],
                         [Status],
                         [Start Date],
                         [End Date],
                         [Comment]
FROM
                    
  #tmpData tmp
  LEFT JOIN v_Companies cp ON cp.CompanyName = tmp.[Company]
  LEFT JOIN v_EmployeeName emp ON emp.EmployeeId = tmp.[Project Owner(VP)] AND ISNULL(tmp.[Project Owner(VP)], '''') <> '''' 
                    ORDER BY sortNo
                '
PRINT(@tmpQuery)
EXEC( @tmpStringMain + ' ' + @tmpQuery); 

--SELECT * FROM v_Companies
END
GO

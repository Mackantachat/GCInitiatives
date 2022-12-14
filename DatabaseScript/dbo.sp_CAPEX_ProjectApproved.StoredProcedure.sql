/****** Object:  StoredProcedure [dbo].[sp_CAPEX_ProjectApproved]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_ProjectApproved]
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

SELECT DISTINCT
    cap.Revistion AS ''Revision No.'',
    ini.InitiativeCode AS ''Initiative No'',
    mapping.AppRequestNumber AS ''APP NO.'',
    '''' AS ''WBS NO.'',
    ini.Name AS ''ProjectName'',
    ini.ResultObjective AS ''ProjectDescription'',
    ini.Organization AS ''Value Center/BU'',
    ISNULL(comp.CompanyShorttxt, ini.Company) AS ''Company Name'',
    ini.Plant AS ''Plant'',
    ini.OwnerName AS ''Project Owner'',
    co.CoDeveloperName AS ''Project Co-Ordinator'',
    own.Indicator AS ''Division'',
    CAST(ISNULL(cap.BudgetPeriod, '''') AS VARCHAR(MAX)) + '' '' + CAST(ISNULL(cap.BetweenYear, '''') AS VARCHAR(MAX)) AS ''Budget Year'',
    cap.CodeCostCenterOfVP AS ''Cost Center'',

    CASE
    WHEN ini.TypeOfInvestment = ''ER'' THEN ''ER''
    WHEN ini.InitiativeType = ''Request Pool'' THEN ''Pool''
    WHEN cap.ProjectCost >= 300 THEN ''Large''
    WHEN cap.ProjectCost BETWEEN 50 AND 200 THEN ''Medium''
    WHEN cap.ProjectCost < 50 THEN ''Small''
    END

    AS ''Project Catagory'',
    ini.TypeOfInvestment AS ''Investment Type'',
    COALESCE(CAST( CONVERT(DECIMAL(10,0), ISNULL( det.UsefulYear, 0) + (ISNULL(det.UsefulMonth, 0) / 12)) AS VARCHAR(MAX)), '''') + '' Year(s) '' + COALESCE(CAST( CONVERT(DECIMAL(10,0), (ISNULL(det.UsefulMonth, 0) % 12) ) AS VARCHAR(MAX)), '''') + '' Month(s)'' AS ''Useful Life'',
    --ISNULL(tr.Stage, '''') + '' '' + ISNULL(tr.ApprovedDate, '''')  -- removed
    cap.ProjectCost AS ''Budget Approved'',
    CONVERT(VARCHAR(10), cap.ActionYear, 120) AS ''Start Date'',
    CONVERT(VARCHAR(10), cap.ProjecctComRun, 120) AS ''End Date'',
    '''' AS ''Comment''
FROM v_Initiatives ini
INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
LEFT JOIN (SELECT InitiativeId, STRING_AGG(CoDeveloperName,'', '') AS CoDeveloperName FROM InitiativeCoDevelopers GROUP BY InitiativeId ) co ON ini.Id = co.InitiativeId
--LEFT JOIN TypeStage ts ON ini.InitiativeType = ts.Type AND ini.Stage = ts.Stage AND ts.SubType = dbo.fn_GetSubTypeFromCapexInformations(cap.CapexInformationId)
--LEFT JOIN TypeStage tsStepBack ON ts.Type = tsStepBack.Type AND (ts.[Order] -1) = tsStepBack.[Order] AND ts.SubType = dbo.fn_GetSubTypeFromCapexInformations(cap.CapexInformationId) -- stepback 1 stage
--LEFT JOIN (SELECT InitiativeId, Stage, MAX(ApprovedDate) AS ApprovedDate
--            FROM InitiativeStatusTrackings 
--            GROUP BY InitiativeId, Stage
--) tr ON ini.Id = tr.InitiativeId AND tr.Stage = tsStepBack.Stage
LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
LEFT JOIN Plants plnt ON plnt.PlantId = ini.Plant
LEFT JOIN v_Companies comp ON comp.CompanyName = ini.Company
LEFT JOIN v_MappingIniAppWbs mapping ON  mapping.InitiativeCode = ini.InitiativeCode
LEFT JOIN Owners own ON own.OwnerName = cap.CostCenterOfVP
LEFT JOIN CommonData compa ON compa.DataType = ''company'' AND (ini.Company = compa.Attribute03 OR ini.Company = compa.Attribute02 OR ini.Company = compa.Attribute01)
LEFT JOIN CommonData budgetanalyst ON budgetanalyst.DataType = ''budgetanalyst'' AND budgetanalyst.Attribute02 = compa.Attribute01 AND budgetanalyst.Attribute03 = ''Y''
LEFT JOIN Owners budgetname ON budgetname.EmployeeID = budgetanalyst.Attribute01
WHERE 
1=1
' + @tmpStringParam + '
--ts.[Order] > 4  -- where only stage more than ''budget''

';

EXEC(@tmpStringMain)

END
GO

/****** Object:  StoredProcedure [dbo].[sp_CAPEX_Report_Request_Pool]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CAPEX_Report_Request_Pool]
(
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

    DECLARE @tmpStringMain NVARCHAR(MAX) = '';

 SET @tmpStringMain = '
     SELECT
     ROW_NUMBER() OVER (ORDER BY ini.Id)      AS   [No]
     ,   cap.Revistion      AS   [Revision No]
     ,  cap.BudgetYear       AS   [Year]
     ,  ini.InitiativeCode       AS   [Initiative No]
     ,  mapping.AppropriationNo      AS   [Appropriation No.]
     ,   ini.Name      AS   [Project Name]
     ,   ISNULL(comp.CompanyShorttxt, ini.Company)      AS  [Company Name]
     ,   ini.Organization      AS   [Organization]
     ,   cap.CodeCostCenterOfVP     AS   [Cost Center]
     ,   cap.ProjectCost      AS   [Total Budget]
     ,   budgetUsed.RealBudgetUsed      AS   [Budget Used]
     ,   cap.ProjectCost - ISNULL(cap.AvailableBudget, 0) - ISNULL(budgetUsed.RealBudgetUsed, 0)    AS [Spending External Budget]
     ,   cap.ProjectCost - ISNULL(budgetUsed.RealBudgetUsed, 0) - (cap.ProjectCost - ISNULL(cap.AvailableBudget, 0) - ISNULL(budgetUsed.RealBudgetUsed, 0))     AS   [Budget Available]
     FROM
     v_Initiatives ini
     INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
     LEFT JOIN v_Companies comp ON comp.CompanyName = ini.Company
     LEFT JOIN v_MappingIniAppWbs mapping ON  mapping.InitiativeCode = ini.InitiativeCode
     LEFT JOIN (SELECT
            PoolId, 
            SUM(cap.ProjectCost) AS RealBudgetUsed
            FROM v_Initiatives ini
            INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id
            WHERE ISNULL(cap.PoolBudgetForm, '''') <> '''' 
            GROUP BY PoolId

            ) budgetUsed ON budgetUsed.PoolId = ini.Id
     WHERE 1=1  
     AND ini.InitiativeType = ''Request Pool''  '
     + @tmpStringParam

     PRINT(@tmpStringMain)
     EXEC(@tmpStringMain)

    -- Code


   


END
GO

/****** Object:  StoredProcedure [dbo].[sp_CAPEX_Report_Used_Pool_v01]    Script Date: 10/8/2021 4:56:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO














 CREATE PROCEDURE [dbo].[sp_CAPEX_Report_Used_Pool_v01]
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

        DECLARE @startYear INT = 0;

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

            IF (@parameterField = 'BudgetYear') SET @startYear = CAST( ISNULL(@DefaultValue, 0) AS INT )


			NEXTLOOP:  --label for GOTO
			FETCH NEXT FROM CURSOR_PARAM -- Fetch next cursor
			INTO @sequenceParam, @parameterName, @parameterField, @filterCondition, @parameterType, @Required, @DefaultValue
		END

		-- Close cursor
		CLOSE CURSOR_PARAM ; 
		DEALLOCATE CURSOR_PARAM ; 




        PRINT(@tmpStringParam);

        IF (@tmpStringParam <> '') SET @tmpStringParam = ' AND ' + @tmpStringParam;
        IF (@startYear = 0) SET @startYear = (SELECT YEAR(GETDATE()));
    DECLARE @tmpStringMain NVARCHAR(MAX) = '';

SET @tmpStringMain = '

	with minavailable as
	(
	select initiativeid, min(AvailableBudget) AS [minavailable] from CapexInformations capmin 
	inner join v_Initiatives ini on capmin.initiativeid = ini.id
	where  ini.InitiativeType = ''Request Pool'' group by InitiativeId
	)
    SELECT
	
    ROW_NUMBER() OVER (ORDER BY ini.Id)  AS [No]
    ,CASE WHEN ini.InitiativeType = ''Request Pool'' And cap.CapexType = ''Requestpool'' THEN ''Request Pool''
	WHEN ini.InitiativeType = ''Request Pool'' And cap.CapexType = ''ReturnCapex'' THEN ''Return Pool''
	ELSE ''Use Pool'' END AS [Pool]
	,CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ini.PoolType ELSE cap.PoolBudgetForm END AS [Type]
	,ISNULL(comp.CompanyShorttxt, ini.Company) AS [Company Name]
	,cap.SubmitDate AS [Submitted Date]
	,CASE WHEN isnull(cap.BudgetYear,'''') = '''' then year(cap.actionyear)
	ELSE cap.BudgetYear end AS [Year]
	,ini.InitiativeCode AS [Initiative No]
    ,mapping.AppropriationNo AS [Appropriation No.]
    ,prog.wbsno AS [WBS]
    ,CASE WHEN ini.InitiativeType = ''Request Pool'' And cap.CapexType = ''ReturnCapex'' THEN cap.ReasonOfChanging 
	ELSE ini.Name  END AS [Project Name]
    ,CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ISNULL(ini.PoolType, '''') + '' Pool'' ELSE ini.TypeOfInvestment END AS [Investment Type]    
    ,ini.Organization AS [EVP]
    ,ownCostCenter.Indicator AS [VP]
	, CASE WHEN (cap.CapexType = ''Createnew'' or ini.InitiativeType = ''Request Pool'') THEN cap.Projectcost  ELSE cap.AdditionalCost  END  as [Project Cost]
	, cap.ReturnCost AS [Return Budget] 
	, CASE WHEN ini.InitiativeType = ''Request Pool'' THEN mi.minavailable  ELSE null END AS [Pool Available Budget]
    ,det.projectirrbasecase AS [Project IRR(%)]
    ,det.npvbasecase AS [NPV]
    ,det.paybackbasecase AS [Payback]
    ,det.ebitdabasecase AS [EBITDA]
    ,'''' AS [Uplift]
    
FROM 
    v_Initiatives ini
    INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId and (isnull(cap.PoolBudgetForm,'''') <> '''' or capextype in  (''Requestpool'',''ReturnCapex''))
    LEFT JOIN DetailInformations det ON det.InitiativeId = ini.Id
    LEFT JOIN v_Companies comp ON comp.CompanyShortTxt = ini.Company
	left join progressheader prog on ini.id = prog.initiativeid
    LEFT JOIN AnnualInvestmentPlans aip ON aip.InitiativeId = ini.Id AND aip.PlanType = ''SumTotalBaht''  AND aip.CapexInformationId = cap.CapexInformationId	
    LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName
    LEFT JOIN Owners ownVP ON ownVP.EmployeeId = CAST(own.DivManagerEmpID AS NVARCHAR(100))
    LEFT JOIN v_MappingIniAppWbs mapping ON  mapping.InitiativeCode = ini.InitiativeCode
    LEFT JOIN Owners ownCostCenter ON ownCostCenter.OwnerName = cap.CostCenterOfVP
	LEFT JOIN minavailable mi on  ini.id = mi.InitiativeId 


WHERE 1=1      
AND [Company] = ( CASE WHEN ''PTTGC'' = '''' THEN [Company] ELSE ''PTTGC'' END )
and isnull(ini.stage,'''') <> ''cancelled''' + @tmpStringParam + '
order by 
CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ini.PoolType ELSE cap.PoolBudgetForm END
,CASE WHEN ini.InitiativeType = ''Request Pool'' THEN  ini.id ELSE cap.poolid END
,CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ''Request Pool'' ELSE ''Use Pool'' END'



--PRINT(@tmpStringMain)
PRINT CAST(@tmpStringMain AS NTEXT)
--WAITFOR DELAY '00:00:20'; --wait one second
EXEC(@tmpStringMain)
    -- Code







END
GO

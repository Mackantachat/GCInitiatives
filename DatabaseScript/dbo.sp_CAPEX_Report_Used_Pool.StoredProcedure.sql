/****** Object:  StoredProcedure [dbo].[sp_CAPEX_Report_Used_Pool]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_CAPEX_Report_Used_Pool]
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


    DECLARE @tmpString_TotalByYear_1 NVARCHAR(MAX) = '
      (  ISNULL( mip1.Jan , 0)
      +  ISNULL( mip1.Feb , 0)
      +  ISNULL( mip1.Mar , 0)
      +  ISNULL( mip1.Apr , 0)
      +  ISNULL( mip1.May , 0)
      +  ISNULL( mip1.Jun , 0)
      +  ISNULL( mip1.Jul , 0)
      +  ISNULL( mip1.Aug , 0)
      +  ISNULL( mip1.Sep , 0)
      +  ISNULL( mip1.Oct , 0)
      +  ISNULL( mip1.Nov , 0)
      +  ISNULL( mip1.Dec , 0)
      ) / 1000000  AS  [' + CAST ( @startYear      AS NVARCHAR(50) ) + ']    
    ,(  ISNULL( mip2.Jan , 0)
      +  ISNULL( mip2.Feb , 0)
      +  ISNULL( mip2.Mar , 0)
      +  ISNULL( mip2.Apr , 0)
      +  ISNULL( mip2.May , 0)
      +  ISNULL( mip2.Jun , 0)
      +  ISNULL( mip2.Jul , 0)
      +  ISNULL( mip2.Aug , 0)
      +  ISNULL( mip2.Sep , 0)
      +  ISNULL( mip2.Oct , 0)
      +  ISNULL( mip2.Nov , 0)
      +  ISNULL( mip2.Dec , 0)
      ) / 1000000  AS  [' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,(  ISNULL( mip3.Jan , 0)
      +  ISNULL( mip3.Feb , 0)
      +  ISNULL( mip3.Mar , 0)
      +  ISNULL( mip3.Apr , 0)
      +  ISNULL( mip3.May , 0)
      +  ISNULL( mip3.Jun , 0)
      +  ISNULL( mip3.Jul , 0)
      +  ISNULL( mip3.Aug , 0)
      +  ISNULL( mip3.Sep , 0)
      +  ISNULL( mip3.Oct , 0)
      +  ISNULL( mip3.Nov , 0)
      +  ISNULL( mip3.Dec , 0)
      ) / 1000000  AS  [' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,(  ISNULL( mip4.Jan , 0)
      +  ISNULL( mip4.Feb , 0)
      +  ISNULL( mip4.Mar , 0)
      +  ISNULL( mip4.Apr , 0)
      +  ISNULL( mip4.May , 0)
      +  ISNULL( mip4.Jun , 0)
      +  ISNULL( mip4.Jul , 0)
      +  ISNULL( mip4.Aug , 0)
      +  ISNULL( mip4.Sep , 0)
      +  ISNULL( mip4.Oct , 0)
      +  ISNULL( mip4.Nov , 0)
      +  ISNULL( mip4.Dec , 0)
      ) / 1000000  AS  [' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,(  ISNULL( mip5.Jan , 0)
      +  ISNULL( mip5.Feb , 0)
      +  ISNULL( mip5.Mar , 0)
      +  ISNULL( mip5.Apr , 0)
      +  ISNULL( mip5.May , 0)
      +  ISNULL( mip5.Jun , 0)
      +  ISNULL( mip5.Jul , 0)
      +  ISNULL( mip5.Aug , 0)
      +  ISNULL( mip5.Sep , 0)
      +  ISNULL( mip5.Oct , 0)
      +  ISNULL( mip5.Nov , 0)
      +  ISNULL( mip5.Dec , 0)
      ) / 1000000  AS  [' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,(  ISNULL( mip6.Jan , 0)
      +  ISNULL( mip6.Feb , 0)
      +  ISNULL( mip6.Mar , 0)
      +  ISNULL( mip6.Apr , 0)
      +  ISNULL( mip6.May , 0)
      +  ISNULL( mip6.Jun , 0)
      +  ISNULL( mip6.Jul , 0)
      +  ISNULL( mip6.Aug , 0)
      +  ISNULL( mip6.Sep , 0)
      +  ISNULL( mip6.Oct , 0)
      +  ISNULL( mip6.Nov , 0)
      +  ISNULL( mip6.Dec , 0)
      ) / 1000000  AS  [' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    '
    DECLARE @tmpString_TotalByYear_2 NVARCHAR(MAX) = '
    
      (  ISNULL( mip7.Jan , 0)
      +  ISNULL( mip7.Feb , 0)
      +  ISNULL( mip7.Mar , 0)
      +  ISNULL( mip7.Apr , 0)
      +  ISNULL( mip7.May , 0)
      +  ISNULL( mip7.Jun , 0)
      +  ISNULL( mip7.Jul , 0)
      +  ISNULL( mip7.Aug , 0)
      +  ISNULL( mip7.Sep , 0)
      +  ISNULL( mip7.Oct , 0)
      +  ISNULL( mip7.Nov , 0)
      +  ISNULL( mip7.Dec , 0)
      ) / 1000000   AS  [' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,(  ISNULL( mip8.Jan , 0)
      +  ISNULL( mip8.Feb , 0)
      +  ISNULL( mip8.Mar , 0)
      +  ISNULL( mip8.Apr , 0)
      +  ISNULL( mip8.May , 0)
      +  ISNULL( mip8.Jun , 0)
      +  ISNULL( mip8.Jul , 0)
      +  ISNULL( mip8.Aug , 0)
      +  ISNULL( mip8.Sep , 0)
      +  ISNULL( mip8.Oct , 0)
      +  ISNULL( mip8.Nov , 0)
      +  ISNULL( mip8.Dec , 0)
      ) / 1000000  AS  [' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,(  ISNULL( mip9.Jan , 0)
      +  ISNULL( mip9.Feb , 0)
      +  ISNULL( mip9.Mar , 0)
      +  ISNULL( mip9.Apr , 0)
      +  ISNULL( mip9.May , 0)
      +  ISNULL( mip9.Jun , 0)
      +  ISNULL( mip9.Jul , 0)
      +  ISNULL( mip9.Aug , 0)
      +  ISNULL( mip9.Sep , 0)
      +  ISNULL( mip9.Oct , 0)
      +  ISNULL( mip9.Nov , 0)
      +  ISNULL( mip9.Dec , 0)
      ) / 1000000  AS  [' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , (  ISNULL( mip10.Jan , 0)
      +  ISNULL( mip10.Feb , 0)
      +  ISNULL( mip10.Mar , 0)
      +  ISNULL( mip10.Apr , 0)
      +  ISNULL( mip10.May , 0)
      +  ISNULL( mip10.Jun , 0)
      +  ISNULL( mip10.Jul , 0)
      +  ISNULL( mip10.Aug , 0)
      +  ISNULL( mip10.Sep , 0)
      +  ISNULL( mip10.Oct , 0)
      +  ISNULL( mip10.Nov , 0)
      +  ISNULL( mip10.Dec , 0)
      ) / 1000000 AS  [' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    '


     DECLARE @tmpString_Total NVARCHAR(MAX) = '
      (
      (  ISNULL( mip1.Jan , 0)
      +  ISNULL( mip1.Feb , 0)
      +  ISNULL( mip1.Mar , 0)
      +  ISNULL( mip1.Apr , 0)
      +  ISNULL( mip1.May , 0)
      +  ISNULL( mip1.Jun , 0)
      +  ISNULL( mip1.Jul , 0)
      +  ISNULL( mip1.Aug , 0)
      +  ISNULL( mip1.Sep , 0)
      +  ISNULL( mip1.Oct , 0)
      +  ISNULL( mip1.Nov , 0)
      +  ISNULL( mip1.Dec , 0)
      ) +
      (  ISNULL( mip2.Jan , 0)
      +  ISNULL( mip2.Feb , 0)
      +  ISNULL( mip2.Mar , 0)
      +  ISNULL( mip2.Apr , 0)
      +  ISNULL( mip2.May , 0)
      +  ISNULL( mip2.Jun , 0)
      +  ISNULL( mip2.Jul , 0)
      +  ISNULL( mip2.Aug , 0)
      +  ISNULL( mip2.Sep , 0)
      +  ISNULL( mip2.Oct , 0)
      +  ISNULL( mip2.Nov , 0)
      +  ISNULL( mip2.Dec , 0)
      ) + 
      (  ISNULL( mip3.Jan , 0)
      +  ISNULL( mip3.Feb , 0)
      +  ISNULL( mip3.Mar , 0)
      +  ISNULL( mip3.Apr , 0)
      +  ISNULL( mip3.May , 0)
      +  ISNULL( mip3.Jun , 0)
      +  ISNULL( mip3.Jul , 0)
      +  ISNULL( mip3.Aug , 0)
      +  ISNULL( mip3.Sep , 0)
      +  ISNULL( mip3.Oct , 0)
      +  ISNULL( mip3.Nov , 0)
      +  ISNULL( mip3.Dec , 0)
      ) + 
      (  ISNULL( mip4.Jan , 0)
      +  ISNULL( mip4.Feb , 0)
      +  ISNULL( mip4.Mar , 0)
      +  ISNULL( mip4.Apr , 0)
      +  ISNULL( mip4.May , 0)
      +  ISNULL( mip4.Jun , 0)
      +  ISNULL( mip4.Jul , 0)
      +  ISNULL( mip4.Aug , 0)
      +  ISNULL( mip4.Sep , 0)
      +  ISNULL( mip4.Oct , 0)
      +  ISNULL( mip4.Nov , 0)
      +  ISNULL( mip4.Dec , 0)
      ) + 
      (  ISNULL( mip5.Jan , 0)
      +  ISNULL( mip5.Feb , 0)
      +  ISNULL( mip5.Mar , 0)
      +  ISNULL( mip5.Apr , 0)
      +  ISNULL( mip5.May , 0)
      +  ISNULL( mip5.Jun , 0)
      +  ISNULL( mip5.Jul , 0)
      +  ISNULL( mip5.Aug , 0)
      +  ISNULL( mip5.Sep , 0)
      +  ISNULL( mip5.Oct , 0)
      +  ISNULL( mip5.Nov , 0)
      +  ISNULL( mip5.Dec , 0)
      ) + 
      (  ISNULL( mip6.Jan , 0)
      +  ISNULL( mip6.Feb , 0)
      +  ISNULL( mip6.Mar , 0)
      +  ISNULL( mip6.Apr , 0)
      +  ISNULL( mip6.May , 0)
      +  ISNULL( mip6.Jun , 0)
      +  ISNULL( mip6.Jul , 0)
      +  ISNULL( mip6.Aug , 0)
      +  ISNULL( mip6.Sep , 0)
      +  ISNULL( mip6.Oct , 0)
      +  ISNULL( mip6.Nov , 0)
      +  ISNULL( mip6.Dec , 0)
      ) + 
      (  ISNULL( mip7.Jan , 0)
      +  ISNULL( mip7.Feb , 0)
      +  ISNULL( mip7.Mar , 0)
      +  ISNULL( mip7.Apr , 0)
      +  ISNULL( mip7.May , 0)
      +  ISNULL( mip7.Jun , 0)
      +  ISNULL( mip7.Jul , 0)
      +  ISNULL( mip7.Aug , 0)
      +  ISNULL( mip7.Sep , 0)
      +  ISNULL( mip7.Oct , 0)
      +  ISNULL( mip7.Nov , 0)
      +  ISNULL( mip7.Dec , 0)
      ) + 
      (  ISNULL( mip8.Jan , 0)
      +  ISNULL( mip8.Feb , 0)
      +  ISNULL( mip8.Mar , 0)
      +  ISNULL( mip8.Apr , 0)
      +  ISNULL( mip8.May , 0)
      +  ISNULL( mip8.Jun , 0)
      +  ISNULL( mip8.Jul , 0)
      +  ISNULL( mip8.Aug , 0)
      +  ISNULL( mip8.Sep , 0)
      +  ISNULL( mip8.Oct , 0)
      +  ISNULL( mip8.Nov , 0)
      +  ISNULL( mip8.Dec , 0)
      ) + 
      (  ISNULL( mip9.Jan , 0)
      +  ISNULL( mip9.Feb , 0)
      +  ISNULL( mip9.Mar , 0)
      +  ISNULL( mip9.Apr , 0)
      +  ISNULL( mip9.May , 0)
      +  ISNULL( mip9.Jun , 0)
      +  ISNULL( mip9.Jul , 0)
      +  ISNULL( mip9.Aug , 0)
      +  ISNULL( mip9.Sep , 0)
      +  ISNULL( mip9.Oct , 0)
      +  ISNULL( mip9.Nov , 0)
      +  ISNULL( mip9.Dec , 0)
      ) + 
      (  ISNULL( mip10.Jan , 0)
      +  ISNULL( mip10.Feb , 0)
      +  ISNULL( mip10.Mar , 0)
      +  ISNULL( mip10.Apr , 0)
      +  ISNULL( mip10.May , 0)
      +  ISNULL( mip10.Jun , 0)
      +  ISNULL( mip10.Jul , 0)
      +  ISNULL( mip10.Aug , 0)
      +  ISNULL( mip10.Sep , 0)
      +  ISNULL( mip10.Oct , 0)
      +  ISNULL( mip10.Nov , 0)
      +  ISNULL( mip10.Dec , 0)
      )
      ) / 1000000 ';

SET @tmpStringMain = '
    SELECT
    ROW_NUMBER() OVER (ORDER BY ini.Id)  AS [No]
    ,cap.Revistion AS [Revision No]
    ,ini.LastSubmittedDate AS [Submitted Date]
    ,cap.BudgetYear AS [Year] 
    ,ini.InitiativeCode AS [Initiative No]
    ,'''' AS [WBS]
    ,mapping.AppropriationNo AS [Appropriation No.]
    ,ini.Name AS [Project Name]
    ,CASE WHEN ini.InitiativeType = ''Request Pool'' THEN ISNULL(ini.PoolType, '''') + '' Pool'' ELSE ini.TypeOfInvestment END AS [Investment Type]
    ,ISNULL(comp.CompanyShorttxt, ini.Company) AS [Company Name]
    ,ini.Organization AS [EVP]
    ,ownCostCenter.Indicator AS [VP]
    ,det.projectirrbasecase AS [Project IRR(%)]
    ,det.npvbasecase AS [NPV]
    ,det.paybackbasecase AS [Payback]
    ,det.ebitdabasecase AS [EBITDA]
    ,'''' AS [Uplift]
    ,COALESCE(CAST( CONVERT(DECIMAL(10,0), ISNULL( det.UsefulYear, 0) + (ISNULL(det.UsefulMonth, 0) / 12)) AS VARCHAR(MAX)), '''') + '' Year(s) '' + COALESCE(CAST( CONVERT(DECIMAL(10,0), (ISNULL(det.UsefulMonth, 0) % 12) ) AS VARCHAR(MAX)), '''') + '' Month(s)'' AS [Useful life]
    ,cap.CodeCostCenterOfVP AS [Cost Center]
    ,mip1.Jan  AS [Jan]
    ,mip1.Feb  AS [Feb]
    ,mip1.Mar  AS [Mar]
    ,mip1.Apr  AS [Apr]
    ,mip1.May  AS [May]
    ,mip1.Jun  AS [Jun]
    ,mip1.Jul  AS [Jul]
    ,mip1.Aug  AS [Aug]
    ,mip1.Sep  AS [Sep]
    ,mip1.Oct  AS [Oct]
    ,mip1.Nov  AS [Nov]
    ,mip1.Dec  AS [Dec]
    
     ,' + @tmpString_TotalByYear_1 + '
     ,' + @tmpString_TotalByYear_2 + '
    , ' + @tmpString_Total + ' AS [Total Budget]
FROM 
    v_Initiatives ini
    INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
    LEFT JOIN DetailInformations det ON det.InitiativeId = ini.Id
    LEFT JOIN v_Companies comp ON comp.CompanyName = ini.Company
    LEFT JOIN AnnualInvestmentPlans aip ON aip.InitiativeId = ini.Id AND aip.PlanType = ''SumTotalBaht''  AND aip.CapexInformationId = cap.CapexInformationId
    LEFT JOIN MonthlyInvestmentPlans mip1 ON   mip1.CapexInformationId   =  cap.CapexInformationId       AND mip1.YearOfMonth =  cap.BudgetYear        --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip2 ON   mip2.CapexInformationId   =  cap.CapexInformationId       AND mip2.YearOfMonth =  cap.BudgetYear + 1    --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip3 ON   mip3.CapexInformationId   =  cap.CapexInformationId       AND mip3.YearOfMonth =  cap.BudgetYear + 2    --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip4 ON   mip4.CapexInformationId   =  cap.CapexInformationId       AND mip4.YearOfMonth =  cap.BudgetYear + 3    --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip5 ON   mip5.CapexInformationId   =  cap.CapexInformationId       AND mip5.YearOfMonth =  cap.BudgetYear + 4    --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip6 ON   mip6.CapexInformationId   =  cap.CapexInformationId       AND mip6.YearOfMonth =  cap.BudgetYear + 5    --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip7 ON   mip7.CapexInformationId   =  cap.CapexInformationId       AND mip7.YearOfMonth =  cap.BudgetYear + 6    --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip8 ON   mip8.CapexInformationId   =  cap.CapexInformationId       AND mip8.YearOfMonth =  cap.BudgetYear + 7    --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip9 ON   mip9.CapexInformationId   =  cap.CapexInformationId       AND mip9.YearOfMonth =  cap.BudgetYear + 8    --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip10 ON  mip10.CapexInformationId  =  cap.CapexInformationId       AND mip10.YearOfMonth = cap.BudgetYear + 9 --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน
    LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName
    LEFT JOIN Owners ownVP ON ownVP.EmployeeId = CAST(own.DivManagerEmpID AS NVARCHAR(100))
    LEFT JOIN v_MappingIniAppWbs mapping ON  mapping.InitiativeCode = ini.InitiativeCode
    LEFT JOIN Owners ownCostCenter ON ownCostCenter.OwnerName = cap.CostCenterOfVP

WHERE 1=1   AND ISNULL(PoolBudgetForm, '''') <> ''''    ' + @tmpStringParam


PRINT(@tmpStringMain)
EXEC(@tmpStringMain)
    -- Code







END
GO

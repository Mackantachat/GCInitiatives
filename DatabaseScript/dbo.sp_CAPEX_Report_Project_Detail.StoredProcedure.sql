/****** Object:  StoredProcedure [dbo].[sp_CAPEX_Report_Project_Detail]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[sp_CAPEX_Report_Project_Detail]
(
   @ReportID VARCHAR(50) = ''
)
AS
BEGIN
     --SET NOCOUNT ON added to prevent extra result sets from
     --interfering with SELECT statements.
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

    SELECT * INTO #ReportDetailY FROM CustomReportDetail WHERE ReportID = TRIM(@ReportID) AND [Axis] = 'Y' AND ISNULL([FieldName], '') <> '' ORDER BY [Sequence];
    SELECT * INTO #ReportParameter FROM CustomReportParameter WHERE ReportID = TRIM(@ReportID) AND ISNULL([ParameterField], '') <> ''



        DECLARE @tmpStringDetailY AS NVARCHAR(MAX);
        DECLARE @tmpStringDetailY_Empty AS NVARCHAR(MAX);
		DECLARE @tmpStringParam NVARCHAR(MAX) = '';
        DECLARE @tmpOrder AS NVARCHAR(MAX) = '';

        DECLARE @startYear INT = 0;


        ------ LOOP STORE VALUE IN DETAIL Y
		DECLARE CURSOR_DETAILY CURSOR FOR SELECT [Sequence], FieldName, AggregateFunction, Axis FROM #ReportDetailY ORDER BY [Sequence]
		DECLARE @sequenceDetailY INT;
		DECLARE @fieldNameY NVARCHAR(255);
		DECLARE @aggregateFunctionY NVARCHAR(255);
		DECLARE @axisY NVARCHAR(255);
		
		OPEN CURSOR_DETAILY 
		FETCH NEXT FROM CURSOR_DETAILY
		INTO @sequenceDetailY, @fieldNameY, @aggregateFunctionY, @axisY
		-- Loop From Cursor
		WHILE (@@FETCH_STATUS = 0) 
		BEGIN		
		
			IF (ISNULL(@tmpStringDetailY, '') <> '')
			BEGIN
				SET @tmpStringDetailY = ISNULL(@tmpStringDetailY, '') + ', '
			END            

            IF (ISNULL(@tmpStringDetailY_Empty, '') <> '')
			BEGIN
				SET @tmpStringDetailY_Empty = ISNULL(@tmpStringDetailY_Empty, '') + ', '
			END  

			--ORDER BY
			IF (ISNULL(@tmpOrder, '') <> '')
			BEGIN
				SET @tmpOrder = ISNULL(@tmpOrder, '') + ', '	
			END

			    SET @tmpOrder = ISNULL(@tmpOrder, '') + '[' + ISNULL(@fieldNameY, '') + ']'

			   SET @tmpStringDetailY = ISNULL(@tmpStringDetailY, '') + ' [' + ISNULL(@fieldNameY, '') +'] ' + ' AS [' + ISNULL(@fieldNameY, '') + ']'                                   

               SET @tmpStringDetailY_Empty = ISNULL(@tmpStringDetailY_Empty, '') + ' NULL ' + ' AS [' + ISNULL(@fieldNameY, '') + ']'   

			FETCH NEXT FROM CURSOR_DETAILY -- Fetch next cursor
			INTO @sequenceDetailY, @fieldNameY, @aggregateFunctionY, @axisY
		END
				-- Close cursor
		CLOSE CURSOR_DETAILY; 
		DEALLOCATE CURSOR_DETAILY;
	  ----- END LOOP DETAIL






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

            IF (@parameterField = 'Year') SET @startYear = CAST( ISNULL(@DefaultValue, (SELECT YEAR(GETDATE())) ) AS INT )


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


        --TempTable
IF OBJECT_ID('tempdb..#tmpData') IS NOT NULL
DROP TABLE #tmpData

    DECLARE @tmpStringMain NVARCHAR(MAX) = '';
    DECLARE @tmpStringUNION_SUM NVARCHAR(MAX) = '';
    
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

    DECLARE @tmpString_TotalUNION NVARCHAR(MAX) = '(
      (  ISNULL( SUM( mip1.Jan ) , 0)
      +  ISNULL( SUM( mip1.Feb ) , 0)
      +  ISNULL( SUM( mip1.Mar ) , 0)
      +  ISNULL( SUM( mip1.Apr ) , 0)
      +  ISNULL( SUM( mip1.May ) , 0)
      +  ISNULL( SUM( mip1.Jun ) , 0)
      +  ISNULL( SUM( mip1.Jul ) , 0)
      +  ISNULL( SUM( mip1.Aug ) , 0)
      +  ISNULL( SUM( mip1.Sep ) , 0)
      +  ISNULL( SUM( mip1.Oct ) , 0)
      +  ISNULL( SUM( mip1.Nov ) , 0)
      +  ISNULL( SUM( mip1.Dec ) , 0)
      ) +
      (  ISNULL( SUM( mip2.Jan ) , 0)
      +  ISNULL( SUM( mip2.Feb ) , 0)
      +  ISNULL( SUM( mip2.Mar ) , 0)
      +  ISNULL( SUM( mip2.Apr ) , 0)
      +  ISNULL( SUM( mip2.May ) , 0)
      +  ISNULL( SUM( mip2.Jun ) , 0)
      +  ISNULL( SUM( mip2.Jul ) , 0)
      +  ISNULL( SUM( mip2.Aug ) , 0)
      +  ISNULL( SUM( mip2.Sep ) , 0)
      +  ISNULL( SUM( mip2.Oct ) , 0)
      +  ISNULL( SUM( mip2.Nov ) , 0)
      +  ISNULL( SUM( mip2.Dec ) , 0)
      ) + 
      (  ISNULL( SUM( mip3.Jan ) , 0)
      +  ISNULL( SUM( mip3.Feb ) , 0)
      +  ISNULL( SUM( mip3.Mar ) , 0)
      +  ISNULL( SUM( mip3.Apr ) , 0)
      +  ISNULL( SUM( mip3.May ) , 0)
      +  ISNULL( SUM( mip3.Jun ) , 0)
      +  ISNULL( SUM( mip3.Jul ) , 0)
      +  ISNULL( SUM( mip3.Aug ) , 0)
      +  ISNULL( SUM( mip3.Sep ) , 0)
      +  ISNULL( SUM( mip3.Oct ) , 0)
      +  ISNULL( SUM( mip3.Nov ) , 0)
      +  ISNULL( SUM( mip3.Dec ) , 0)
      ) + 
      (  ISNULL( SUM( mip4.Jan ) , 0)
      +  ISNULL( SUM( mip4.Feb ) , 0)
      +  ISNULL( SUM( mip4.Mar ) , 0)
      +  ISNULL( SUM( mip4.Apr ) , 0)
      +  ISNULL( SUM( mip4.May ) , 0)
      +  ISNULL( SUM( mip4.Jun ) , 0)
      +  ISNULL( SUM( mip4.Jul ) , 0)
      +  ISNULL( SUM( mip4.Aug ) , 0)
      +  ISNULL( SUM( mip4.Sep ) , 0)
      +  ISNULL( SUM( mip4.Oct ) , 0)
      +  ISNULL( SUM( mip4.Nov ) , 0)
      +  ISNULL( SUM( mip4.Dec ) , 0)
      ) + 
      (  ISNULL( SUM( mip5.Jan ) , 0)
      +  ISNULL( SUM( mip5.Feb ) , 0)
      +  ISNULL( SUM( mip5.Mar ) , 0)
      +  ISNULL( SUM( mip5.Apr ) , 0)
      +  ISNULL( SUM( mip5.May ) , 0)
      +  ISNULL( SUM( mip5.Jun ) , 0)
      +  ISNULL( SUM( mip5.Jul ) , 0)
      +  ISNULL( SUM( mip5.Aug ) , 0)
      +  ISNULL( SUM( mip5.Sep ) , 0)
      +  ISNULL( SUM( mip5.Oct ) , 0)
      +  ISNULL( SUM( mip5.Nov ) , 0)
      +  ISNULL( SUM( mip5.Dec ) , 0)
      ) + 
      (  ISNULL( SUM( mip6.Jan ) , 0)
      +  ISNULL( SUM( mip6.Feb ) , 0)
      +  ISNULL( SUM( mip6.Mar ) , 0)
      +  ISNULL( SUM( mip6.Apr ) , 0)
      +  ISNULL( SUM( mip6.May ) , 0)
      +  ISNULL( SUM( mip6.Jun ) , 0)
      +  ISNULL( SUM( mip6.Jul ) , 0)
      +  ISNULL( SUM( mip6.Aug ) , 0)
      +  ISNULL( SUM( mip6.Sep ) , 0)
      +  ISNULL( SUM( mip6.Oct ) , 0)
      +  ISNULL( SUM( mip6.Nov ) , 0)
      +  ISNULL( SUM( mip6.Dec ) , 0)
      ) + 
      (  ISNULL( SUM( mip7.Jan ) , 0)
      +  ISNULL( SUM( mip7.Feb ) , 0)
      +  ISNULL( SUM( mip7.Mar ) , 0)
      +  ISNULL( SUM( mip7.Apr ) , 0)
      +  ISNULL( SUM( mip7.May ) , 0)
      +  ISNULL( SUM( mip7.Jun ) , 0)
      +  ISNULL( SUM( mip7.Jul ) , 0)
      +  ISNULL( SUM( mip7.Aug ) , 0)
      +  ISNULL( SUM( mip7.Sep ) , 0)
      +  ISNULL( SUM( mip7.Oct ) , 0)
      +  ISNULL( SUM( mip7.Nov ) , 0)
      +  ISNULL( SUM( mip7.Dec ) , 0)
      ) + 
      (  ISNULL( SUM( mip8.Jan ) , 0)
      +  ISNULL( SUM( mip8.Feb ) , 0)
      +  ISNULL( SUM( mip8.Mar ) , 0)
      +  ISNULL( SUM( mip8.Apr ) , 0)
      +  ISNULL( SUM( mip8.May ) , 0)
      +  ISNULL( SUM( mip8.Jun ) , 0)
      +  ISNULL( SUM( mip8.Jul ) , 0)
      +  ISNULL( SUM( mip8.Aug ) , 0)
      +  ISNULL( SUM( mip8.Sep ) , 0)
      +  ISNULL( SUM( mip8.Oct ) , 0)
      +  ISNULL( SUM( mip8.Nov ) , 0)
      +  ISNULL( SUM( mip8.Dec ) , 0)
      ) + 
      (  ISNULL( SUM( mip9.Jan ) , 0)
      +  ISNULL( SUM( mip9.Feb ) , 0)
      +  ISNULL( SUM( mip9.Mar ) , 0)
      +  ISNULL( SUM( mip9.Apr ) , 0)
      +  ISNULL( SUM( mip9.May ) , 0)
      +  ISNULL( SUM( mip9.Jun ) , 0)
      +  ISNULL( SUM( mip9.Jul ) , 0)
      +  ISNULL( SUM( mip9.Aug ) , 0)
      +  ISNULL( SUM( mip9.Sep ) , 0)
      +  ISNULL( SUM( mip9.Oct ) , 0)
      +  ISNULL( SUM( mip9.Nov ) , 0)
      +  ISNULL( SUM( mip9.Dec ) , 0)
      ) + 
      (  ISNULL( SUM( mip10.Jan ) , 0)
      +  ISNULL( SUM( mip10.Feb ) , 0)
      +  ISNULL( SUM( mip10.Mar ) , 0)
      +  ISNULL( SUM( mip10.Apr ) , 0)
      +  ISNULL( SUM( mip10.May ) , 0)
      +  ISNULL( SUM( mip10.Jun ) , 0)
      +  ISNULL( SUM( mip10.Jul ) , 0)
      +  ISNULL( SUM( mip10.Aug ) , 0)
      +  ISNULL( SUM( mip10.Sep ) , 0)
      +  ISNULL( SUM( mip10.Oct ) , 0)
      +  ISNULL( SUM( mip10.Nov ) , 0)
      +  ISNULL( SUM( mip10.Dec ) , 0)
      )
      ) / 1000000 ' ;

SET @tmpStringMain = '

SELECT 
ROW_NUMBER() OVER (ORDER BY [no])  AS [sortNo],
* 
INTO #tmpData FROM (
    SELECT 
    --f.* 
    ROW_NUMBER() OVER (ORDER BY ' + @tmpOrder + ')  AS [No]
    ,
    ' + @tmpStringDetailY + '
    
	,ProjectCost AS [Total Budget (MTHB)] --Added 21/09/2020
    ,mip1.Jan  AS [Jan-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.Feb  AS [Feb-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.Mar  AS [Mar-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.Apr  AS [Apr-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.May  AS [May-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.Jun  AS [Jun-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.Jul  AS [Jul-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.Aug  AS [Aug-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.Sep  AS [Sep-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.Oct  AS [Oct-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.Nov  AS [Nov-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,mip1.Dec  AS [Dec-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , (  ISNULL( mip1.Jan , 0)
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

    ,mip2.Jan  AS [Jan-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.Feb  AS [Feb-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.Mar  AS [Mar-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.Apr  AS [Apr-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.May  AS [May-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.Jun  AS [Jun-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.Jul  AS [Jul-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.Aug  AS [Aug-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.Sep  AS [Sep-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.Oct  AS [Oct-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.Nov  AS [Nov-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,mip2.Dec  AS [Dec-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , (  ISNULL( mip2.Jan , 0)
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

    ,mip3.Jan  AS [Jan-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.Feb  AS [Feb-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.Mar  AS [Mar-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.Apr  AS [Apr-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.May  AS [May-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.Jun  AS [Jun-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.Jul  AS [Jul-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.Aug  AS [Aug-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.Sep  AS [Sep-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.Oct  AS [Oct-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.Nov  AS [Nov-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,mip3.Dec  AS [Dec-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , (  ISNULL( mip3.Jan , 0)
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

    ,mip4.Jan  AS [Jan-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.Feb  AS [Feb-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.Mar  AS [Mar-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.Apr  AS [Apr-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.May  AS [May-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.Jun  AS [Jun-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.Jul  AS [Jul-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.Aug  AS [Aug-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.Sep  AS [Sep-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.Oct  AS [Oct-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.Nov  AS [Nov-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,mip4.Dec  AS [Dec-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , (  ISNULL( mip4.Jan , 0)
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

    ,mip5.Jan  AS [Jan-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.Feb  AS [Feb-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.Mar  AS [Mar-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.Apr  AS [Apr-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.May  AS [May-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.Jun  AS [Jun-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.Jul  AS [Jul-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.Aug  AS [Aug-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.Sep  AS [Sep-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.Oct  AS [Oct-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.Nov  AS [Nov-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,mip5.Dec  AS [Dec-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , (  ISNULL( mip5.Jan , 0)
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

    ,mip6.Jan  AS [Jan-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.Feb  AS [Feb-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.Mar  AS [Mar-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.Apr  AS [Apr-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.May  AS [May-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.Jun  AS [Jun-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.Jul  AS [Jul-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.Aug  AS [Aug-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.Sep  AS [Sep-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.Oct  AS [Oct-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.Nov  AS [Nov-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,mip6.Dec  AS [Dec-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , (  ISNULL( mip6.Jan , 0)
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

    ,mip7.Jan  AS [Jan-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.Feb  AS [Feb-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.Mar  AS [Mar-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.Apr  AS [Apr-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.May  AS [May-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.Jun  AS [Jun-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.Jul  AS [Jul-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.Aug  AS [Aug-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.Sep  AS [Sep-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.Oct  AS [Oct-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.Nov  AS [Nov-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,mip7.Dec  AS [Dec-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , (  ISNULL( mip7.Jan , 0)
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
      ) / 1000000  AS  [' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']

    ,mip8.Jan  AS [Jan-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.Feb  AS [Feb-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.Mar  AS [Mar-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.Apr  AS [Apr-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.May  AS [May-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.Jun  AS [Jun-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.Jul  AS [Jul-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.Aug  AS [Aug-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.Sep  AS [Sep-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.Oct  AS [Oct-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.Nov  AS [Nov-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,mip8.Dec  AS [Dec-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , (  ISNULL( mip8.Jan , 0)
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

    ,mip9.Jan  AS [Jan-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.Feb  AS [Feb-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.Mar  AS [Mar-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.Apr  AS [Apr-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.May  AS [May-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.Jun  AS [Jun-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.Jul  AS [Jul-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.Aug  AS [Aug-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.Sep  AS [Sep-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.Oct  AS [Oct-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.Nov  AS [Nov-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,mip9.Dec  AS [Dec-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , (  ISNULL( mip9.Jan , 0)
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

    ,mip10.Jan  AS [Jan-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.Feb  AS [Feb-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.Mar  AS [Mar-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.Apr  AS [Apr-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.May  AS [May-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.Jun  AS [Jun-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.Jul  AS [Jul-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.Aug  AS [Aug-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.Sep  AS [Sep-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.Oct  AS [Oct-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.Nov  AS [Nov-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,mip10.Dec  AS [Dec-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
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
      ) / 1000000  AS  [' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']

FROM 
    v_CAPEX_Report_ProjectDetail_FlexyColumn f
    LEFT JOIN AnnualInvestmentPlans aip ON aip.CapexInformationId = f.CapexInformationId AND aip.PlanType = ''SumTotalBaht'' AND aip.InitiativeId = f.Initiativeid
    LEFT JOIN MonthlyInvestmentPlans mip1 ON   mip1.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId  AND mip1.YearOfMonth = f.[Year]        --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip2 ON   mip2.CapexInformationId   =  f.CapexInformationId  AND mip2.InitiativeId = f.InitiativeId  AND mip2.YearOfMonth = f.[Year] + 1     --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip3 ON   mip3.CapexInformationId   =  f.CapexInformationId  AND mip3.InitiativeId = f.InitiativeId AND mip3.YearOfMonth = f.[Year] + 2      --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip4 ON   mip4.CapexInformationId   =  f.CapexInformationId  AND mip4.InitiativeId = f.InitiativeId AND mip4.YearOfMonth = f.[Year] + 3      --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip5 ON   mip5.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId AND mip5.YearOfMonth = f.[Year] + 4     --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip6 ON   mip6.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId AND mip6.YearOfMonth = f.[Year] + 5     --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip7 ON   mip7.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId AND mip7.YearOfMonth = f.[Year] + 6      --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip8 ON   mip8.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId  AND mip8.YearOfMonth = f.[Year] + 7     --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip9 ON   mip9.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId AND mip9.YearOfMonth = f.[Year] + 8      --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip10 ON  mip10.CapexInformationId  =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId AND mip10.YearOfMonth = f.[Year] + 9    --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน

    --mip1.AnnualInvestmentPlanId = aip.AnnualInvestmentPlanId 
    --mip2.AnnualInvestmentPlanId = aip.AnnualInvestmentPlanId 
    --mip3.AnnualInvestmentPlanId = aip.AnnualInvestmentPlanId 
    --mip4.AnnualInvestmentPlanId = aip.AnnualInvestmentPlanId 
    --mip5.AnnualInvestmentPlanId = aip.AnnualInvestmentPlanId 
    --mip6.AnnualInvestmentPlanId = aip.AnnualInvestmentPlanId 
    --mip7.AnnualInvestmentPlanId = aip.AnnualInvestmentPlanId 
    --mip8.AnnualInvestmentPlanId = aip.AnnualInvestmentPlanId 
    --mip9.AnnualInvestmentPlanId = aip.AnnualInvestmentPlanId 
    --mip10.AnnualInvestmentPlanId = aip.AnnualInvestmentPlanId

WHERE 1=1      ' 

+ @tmpStringParam + 

' UNION      
    
    SELECT Distinct
    --f.* 
    9999999 AS [No] 
    ,
    ' + @tmpStringDetailY_Empty + '
    
	,SUM(ProjectCost) AS [Total Budget (MTHB)] --Added 21/09/2020
    ,SUM( mip1.Jan  )      AS [Jan-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.Feb  )      AS [Feb-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.Mar  )      AS [Mar-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.Apr  )      AS [Apr-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.May  )      AS [May-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.Jun  )      AS [Jun-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.Jul  )      AS [Jul-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.Aug  )      AS [Aug-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.Sep  )      AS [Sep-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.Oct  )      AS [Oct-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.Nov  )      AS [Nov-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    ,SUM( mip1.Dec  )      AS [Dec-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , (  ISNULL( SUM( mip1.Jan ) , 0)
      +  ISNULL( SUM( mip1.Feb ) , 0)
      +  ISNULL( SUM( mip1.Mar ) , 0)
      +  ISNULL( SUM( mip1.Apr ) , 0)
      +  ISNULL( SUM( mip1.May ) , 0)
      +  ISNULL( SUM( mip1.Jun ) , 0)
      +  ISNULL( SUM( mip1.Jul ) , 0)
      +  ISNULL( SUM( mip1.Aug ) , 0)
      +  ISNULL( SUM( mip1.Sep ) , 0)
      +  ISNULL( SUM( mip1.Oct ) , 0)
      +  ISNULL( SUM( mip1.Nov ) , 0)
      +  ISNULL( SUM( mip1.Dec ) , 0)
      ) / 1000000       AS [' + CAST ( @startYear      AS NVARCHAR(50) ) + '] 

    ,SUM( mip2.Jan  )      AS [Jan-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.Feb  )      AS [Feb-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.Mar  )      AS [Mar-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.Apr  )      AS [Apr-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.May  )      AS [May-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.Jun  )      AS [Jun-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.Jul  )      AS [Jul-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.Aug  )      AS [Aug-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.Sep  )      AS [Sep-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.Oct  )      AS [Oct-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.Nov  )      AS [Nov-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    ,SUM( mip2.Dec  )      AS [Dec-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , (  ISNULL( SUM( mip2.Jan ) , 0)
      +  ISNULL( SUM( mip2.Feb ) , 0)
      +  ISNULL( SUM( mip2.Mar ) , 0)
      +  ISNULL( SUM( mip2.Apr ) , 0)
      +  ISNULL( SUM( mip2.May ) , 0)
      +  ISNULL( SUM( mip2.Jun ) , 0)
      +  ISNULL( SUM( mip2.Jul ) , 0)
      +  ISNULL( SUM( mip2.Aug ) , 0)
      +  ISNULL( SUM( mip2.Sep ) , 0)
      +  ISNULL( SUM( mip2.Oct ) , 0)
      +  ISNULL( SUM( mip2.Nov ) , 0)
      +  ISNULL( SUM( mip2.Dec ) , 0)
      ) / 1000000       AS [' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']

    ,SUM( mip3.Jan  )      AS [Jan-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.Feb  )      AS [Feb-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.Mar  )      AS [Mar-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.Apr  )      AS [Apr-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.May  )      AS [May-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.Jun  )      AS [Jun-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.Jul  )      AS [Jul-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.Aug  )      AS [Aug-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.Sep  )      AS [Sep-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.Oct  )      AS [Oct-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.Nov  )      AS [Nov-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    ,SUM( mip3.Dec  )      AS [Dec-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , (  ISNULL( SUM( mip3.Jan ) , 0)
      +  ISNULL( SUM( mip3.Feb ) , 0)
      +  ISNULL( SUM( mip3.Mar ) , 0)
      +  ISNULL( SUM( mip3.Apr ) , 0)
      +  ISNULL( SUM( mip3.May ) , 0)
      +  ISNULL( SUM( mip3.Jun ) , 0)
      +  ISNULL( SUM( mip3.Jul ) , 0)
      +  ISNULL( SUM( mip3.Aug ) , 0)
      +  ISNULL( SUM( mip3.Sep ) , 0)
      +  ISNULL( SUM( mip3.Oct ) , 0)
      +  ISNULL( SUM( mip3.Nov ) , 0)
      +  ISNULL( SUM( mip3.Dec ) , 0)
      ) / 1000000       AS [' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']

    ,SUM( mip4.Jan  )      AS [Jan-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.Feb  )      AS [Feb-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.Mar  )      AS [Mar-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.Apr  )      AS [Apr-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.May  )      AS [May-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.Jun  )      AS [Jun-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.Jul  )      AS [Jul-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.Aug  )      AS [Aug-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.Sep  )      AS [Sep-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.Oct  )      AS [Oct-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.Nov  )      AS [Nov-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    ,SUM( mip4.Dec  )      AS [Dec-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , (  ISNULL( SUM( mip4.Jan ) , 0)
      +  ISNULL( SUM( mip4.Feb ) , 0)
      +  ISNULL( SUM( mip4.Mar ) , 0)
      +  ISNULL( SUM( mip4.Apr ) , 0)
      +  ISNULL( SUM( mip4.May ) , 0)
      +  ISNULL( SUM( mip4.Jun ) , 0)
      +  ISNULL( SUM( mip4.Jul ) , 0)
      +  ISNULL( SUM( mip4.Aug ) , 0)
      +  ISNULL( SUM( mip4.Sep ) , 0)
      +  ISNULL( SUM( mip4.Oct ) , 0)
      +  ISNULL( SUM( mip4.Nov ) , 0)
      +  ISNULL( SUM( mip4.Dec ) , 0)
      ) / 1000000       AS [' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']

    ,SUM( mip5.Jan  )      AS [Jan-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.Feb  )      AS [Feb-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.Mar  )      AS [Mar-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.Apr  )      AS [Apr-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.May  )      AS [May-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.Jun  )      AS [Jun-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.Jul  )      AS [Jul-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.Aug  )      AS [Aug-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.Sep  )      AS [Sep-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.Oct  )      AS [Oct-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.Nov  )      AS [Nov-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    ,SUM( mip5.Dec  )      AS [Dec-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , (  ISNULL( SUM( mip5.Jan ) , 0)
      +  ISNULL( SUM( mip5.Feb ) , 0)
      +  ISNULL( SUM( mip5.Mar ) , 0)
      +  ISNULL( SUM( mip5.Apr ) , 0)
      +  ISNULL( SUM( mip5.May ) , 0)
      +  ISNULL( SUM( mip5.Jun ) , 0)
      +  ISNULL( SUM( mip5.Jul ) , 0)
      +  ISNULL( SUM( mip5.Aug ) , 0)
      +  ISNULL( SUM( mip5.Sep ) , 0)
      +  ISNULL( SUM( mip5.Oct ) , 0)
      +  ISNULL( SUM( mip5.Nov ) , 0)
      +  ISNULL( SUM( mip5.Dec ) , 0)
      ) / 1000000       AS [' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']

    ,SUM( mip6.Jan  )      AS [Jan-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.Feb  )      AS [Feb-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.Mar  )      AS [Mar-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.Apr  )      AS [Apr-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.May  )      AS [May-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.Jun  )      AS [Jun-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.Jul  )      AS [Jul-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.Aug  )      AS [Aug-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.Sep  )      AS [Sep-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.Oct  )      AS [Oct-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.Nov  )      AS [Nov-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    ,SUM( mip6.Dec  )      AS [Dec-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , (  ISNULL( SUM( mip6.Jan ) , 0)
      +  ISNULL( SUM( mip6.Feb ) , 0)
      +  ISNULL( SUM( mip6.Mar ) , 0)
      +  ISNULL( SUM( mip6.Apr ) , 0)
      +  ISNULL( SUM( mip6.May ) , 0)
      +  ISNULL( SUM( mip6.Jun ) , 0)
      +  ISNULL( SUM( mip6.Jul ) , 0)
      +  ISNULL( SUM( mip6.Aug ) , 0)
      +  ISNULL( SUM( mip6.Sep ) , 0)
      +  ISNULL( SUM( mip6.Oct ) , 0)
      +  ISNULL( SUM( mip6.Nov ) , 0)
      +  ISNULL( SUM( mip6.Dec ) , 0)
      ) / 1000000       AS [' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']

    ,SUM( mip7.Jan  )      AS [Jan-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.Feb  )      AS [Feb-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.Mar  )      AS [Mar-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.Apr  )      AS [Apr-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.May  )      AS [May-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.Jun  )      AS [Jun-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.Jul  )      AS [Jul-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.Aug  )      AS [Aug-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.Sep  )      AS [Sep-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.Oct  )      AS [Oct-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.Nov  )      AS [Nov-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    ,SUM( mip7.Dec  )      AS [Dec-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , (  ISNULL( SUM( mip7.Jan ) , 0)
      +  ISNULL( SUM( mip7.Feb ) , 0)
      +  ISNULL( SUM( mip7.Mar ) , 0)
      +  ISNULL( SUM( mip7.Apr ) , 0)
      +  ISNULL( SUM( mip7.May ) , 0)
      +  ISNULL( SUM( mip7.Jun ) , 0)
      +  ISNULL( SUM( mip7.Jul ) , 0)
      +  ISNULL( SUM( mip7.Aug ) , 0)
      +  ISNULL( SUM( mip7.Sep ) , 0)
      +  ISNULL( SUM( mip7.Oct ) , 0)
      +  ISNULL( SUM( mip7.Nov ) , 0)
      +  ISNULL( SUM( mip7.Dec ) , 0)
      ) / 1000000       AS [' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']

    ,SUM( mip8.Jan  )      AS [Jan-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.Feb  )      AS [Feb-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.Mar  )      AS [Mar-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.Apr  )      AS [Apr-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.May  )      AS [May-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.Jun  )      AS [Jun-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.Jul  )      AS [Jul-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.Aug  )      AS [Aug-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.Sep  )      AS [Sep-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.Oct  )      AS [Oct-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.Nov  )      AS [Nov-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    ,SUM( mip8.Dec  )      AS [Dec-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , (  ISNULL( SUM( mip8.Jan ) , 0)
      +  ISNULL( SUM( mip8.Feb ) , 0)
      +  ISNULL( SUM( mip8.Mar ) , 0)
      +  ISNULL( SUM( mip8.Apr ) , 0)
      +  ISNULL( SUM( mip8.May ) , 0)
      +  ISNULL( SUM( mip8.Jun ) , 0)
      +  ISNULL( SUM( mip8.Jul ) , 0)
      +  ISNULL( SUM( mip8.Aug ) , 0)
      +  ISNULL( SUM( mip8.Sep ) , 0)
      +  ISNULL( SUM( mip8.Oct ) , 0)
      +  ISNULL( SUM( mip8.Nov ) , 0)
      +  ISNULL( SUM( mip8.Dec ) , 0)
      ) / 1000000       AS [' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']

    ,SUM( mip9.Jan  )      AS [Jan-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.Feb  )      AS [Feb-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.Mar  )      AS [Mar-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.Apr  )      AS [Apr-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.May  )      AS [May-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.Jun  )      AS [Jun-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.Jul  )      AS [Jul-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.Aug  )      AS [Aug-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.Sep  )      AS [Sep-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.Oct  )      AS [Oct-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.Nov  )      AS [Nov-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    ,SUM( mip9.Dec  )      AS [Dec-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , (  ISNULL( SUM( mip9.Jan ) , 0)
      +  ISNULL( SUM( mip9.Feb ) , 0)
      +  ISNULL( SUM( mip9.Mar ) , 0)
      +  ISNULL( SUM( mip9.Apr ) , 0)
      +  ISNULL( SUM( mip9.May ) , 0)
      +  ISNULL( SUM( mip9.Jun ) , 0)
      +  ISNULL( SUM( mip9.Jul ) , 0)
      +  ISNULL( SUM( mip9.Aug ) , 0)
      +  ISNULL( SUM( mip9.Sep ) , 0)
      +  ISNULL( SUM( mip9.Oct ) , 0)
      +  ISNULL( SUM( mip9.Nov ) , 0)
      +  ISNULL( SUM( mip9.Dec ) , 0)
      ) / 1000000       AS [' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']

    ,SUM( mip10.Jan  )     AS [Jan-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.Feb  )     AS [Feb-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.Mar  )     AS [Mar-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.Apr  )     AS [Apr-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.May  )     AS [May-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.Jun  )     AS [Jun-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.Jul  )     AS [Jul-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.Aug  )     AS [Aug-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.Sep  )     AS [Sep-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.Oct  )     AS [Oct-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.Nov  )     AS [Nov-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    ,SUM( mip10.Dec  )     AS [Dec-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , (  ISNULL( SUM( mip10.Jan ) , 0)
      +  ISNULL( SUM( mip10.Feb ) , 0)
      +  ISNULL( SUM( mip10.Mar ) , 0)
      +  ISNULL( SUM( mip10.Apr ) , 0)
      +  ISNULL( SUM( mip10.May ) , 0)
      +  ISNULL( SUM( mip10.Jun ) , 0)
      +  ISNULL( SUM( mip10.Jul ) , 0)
      +  ISNULL( SUM( mip10.Aug ) , 0)
      +  ISNULL( SUM( mip10.Sep ) , 0)
      +  ISNULL( SUM( mip10.Oct ) , 0)
      +  ISNULL( SUM( mip10.Nov ) , 0)
      +  ISNULL( SUM( mip10.Dec ) , 0)
      ) / 1000000      AS [' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
FROM 
    v_CAPEX_Report_ProjectDetail_FlexyColumn f
    LEFT JOIN AnnualInvestmentPlans aip ON aip.CapexInformationId = f.CapexInformationId AND aip.PlanType = ''SumTotalBaht'' AND aip.InitiativeId = f.Initiativeid
    LEFT JOIN MonthlyInvestmentPlans mip1 ON   mip1.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId  AND mip1.YearOfMonth = f.[Year]        --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip2 ON   mip2.CapexInformationId   =  f.CapexInformationId  AND mip2.InitiativeId = f.InitiativeId  AND mip2.YearOfMonth = f.[Year] + 1     --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip3 ON   mip3.CapexInformationId   =  f.CapexInformationId  AND mip3.InitiativeId = f.InitiativeId AND mip3.YearOfMonth = f.[Year] + 2      --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip4 ON   mip4.CapexInformationId   =  f.CapexInformationId  AND mip4.InitiativeId = f.InitiativeId AND mip4.YearOfMonth = f.[Year] + 3      --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip5 ON   mip5.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId AND mip5.YearOfMonth = f.[Year] + 4     --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip6 ON   mip6.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId AND mip6.YearOfMonth = f.[Year] + 5     --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip7 ON   mip7.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId AND mip7.YearOfMonth = f.[Year] + 6      --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip8 ON   mip8.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId  AND mip8.YearOfMonth = f.[Year] + 7     --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip9 ON   mip9.CapexInformationId   =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId AND mip9.YearOfMonth = f.[Year] + 8      --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน 
    LEFT JOIN MonthlyInvestmentPlans mip10 ON  mip10.CapexInformationId  =  f.CapexInformationId  AND mip1.InitiativeId = f.InitiativeId AND mip10.YearOfMonth = f.[Year] + 9    --AND mip.SumMonthlyType = ''Total อะไรสักอย่าง''  --ต้อง join ด้วย sum total bath ตอนนี้รอข้อมูลก่อน  // แจงรายละเอียด 12 เดือน

WHERE 1=1      ' 
+ @tmpStringParam +
' ) a 
ORDER BY [No] 


SELECT
    CASE WHEN [No] >= 999999 THEN ''Total'' ELSE CAST( [No] AS VARCHAR(150)) END AS [No]
    , ' + @tmpStringDetailY + '
    , [Total Budget (MTHB)]
    , [Jan-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [Feb-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [Mar-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [Apr-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [May-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [Jun-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [Jul-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [Aug-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [Sep-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [Oct-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [Nov-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [Dec-' + CAST ( @startYear AS NVARCHAR(50) ) + ']
    , [' + CAST ( @startYear      AS NVARCHAR(50) ) + '] 
    
    , [Jan-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [Feb-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [Mar-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [Apr-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [May-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [Jun-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [Jul-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [Aug-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [Sep-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [Oct-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [Nov-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [Dec-' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    , [' + CAST ( @startYear + 1  AS NVARCHAR(50) ) + ']
    
    , [Jan-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [Feb-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [Mar-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [Apr-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [May-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [Jun-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [Jul-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [Aug-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [Sep-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [Oct-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [Nov-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [Dec-' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    , [' + CAST ( @startYear + 2  AS NVARCHAR(50) ) + ']
    
    , [Jan-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [Feb-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [Mar-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [Apr-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [May-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [Jun-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [Jul-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [Aug-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [Sep-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [Oct-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [Nov-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [Dec-' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    , [' + CAST ( @startYear + 3  AS NVARCHAR(50) ) + ']
    
    , [Jan-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [Feb-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [Mar-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [Apr-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [May-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [Jun-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [Jul-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [Aug-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [Sep-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [Oct-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [Nov-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [Dec-' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    , [' + CAST ( @startYear + 4  AS NVARCHAR(50) ) + ']
    
    , [Jan-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [Feb-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [Mar-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [Apr-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [May-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [Jun-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [Jul-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [Aug-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [Sep-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [Oct-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [Nov-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [Dec-' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    , [' + CAST ( @startYear + 5  AS NVARCHAR(50) ) + ']
    
    , [Jan-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [Feb-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [Mar-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [Apr-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [May-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [Jun-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [Jul-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [Aug-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [Sep-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [Oct-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [Nov-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [Dec-' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    , [' + CAST ( @startYear + 6  AS NVARCHAR(50) ) + ']
    
    , [Jan-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [Feb-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [Mar-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [Apr-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [May-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [Jun-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [Jul-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [Aug-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [Sep-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [Oct-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [Nov-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [Dec-' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    , [' + CAST ( @startYear + 7  AS NVARCHAR(50) ) + ']
    
    , [Jan-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [Feb-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [Mar-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [Apr-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [May-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [Jun-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [Jul-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [Aug-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [Sep-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [Oct-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [Nov-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [Dec-' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    , [' + CAST ( @startYear + 8  AS NVARCHAR(50) ) + ']
    
    , [Jan-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [Feb-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [Mar-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [Apr-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [May-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [Jun-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [Jul-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [Aug-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [Sep-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [Oct-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [Nov-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [Dec-' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
    , [' + CAST ( @startYear + 9  AS NVARCHAR(50) ) + ']
FROM
    #tmpData
ORDER BY 
    sortNo
    


'
print(@tmpStringMain)
EXEC(@tmpStringMain)

print(@tmpStringParam)
    -- Code





END
GO

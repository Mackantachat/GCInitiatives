/****** Object:  StoredProcedure [dbo].[sp_CustomReportChart_Historical_Dumping_IL5]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_CustomReportChart_Historical_Dumping_IL5] 
	-- Add the parameters for the stored procedure here
	@ReportID   NVARCHAR(255) = '',
	@Param1   NVARCHAR(255) = '',
	@Param2   NVARCHAR(255) = '',
	@Param3   NVARCHAR(255) = '',
	@Param4   NVARCHAR(255) = '',
	@Param5   NVARCHAR(255) = '',
	@Param6   NVARCHAR(255) = '',
	@Param7   NVARCHAR(255) = '',
	@Param8   NVARCHAR(255) = '',
	@Param9   NVARCHAR(255) = '',
	@Param10  NVARCHAR(255) = '',
	@Param11  NVARCHAR(255) = '',
	@Param12  NVARCHAR(255) = '',
	@Param13  NVARCHAR(255) = '',
	@Param14  NVARCHAR(255) = '',
	@Param15  NVARCHAR(255) = '',
	@Param16  NVARCHAR(255) = '',
	@Param17  NVARCHAR(255) = '',
	@Param18  NVARCHAR(255) = '',
	@Param19  NVARCHAR(255) = '',
	@Param20  NVARCHAR(255) = ''
AS
BEGIN

    --LastUpdate : 2020-06-29

	--Test Run
	--sp_CustomReportChart_Bar 'RPT001/2020'

	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		
	--SET @ReportID = 1;  --//Mockup Parameter

	IF (ISNULL(@ReportID, '') = '')
	BEGIN

			RAISERROR (N'ReportCode not specify.', -- Message text.  
				   11, -- Severity,  
				   1 -- State
				   );
			RETURN;
	END

	--TempTable
	IF OBJECT_ID('tempdb..#ReportHeader') IS NOT NULL
    DROP TABLE #ReportHeader
	
	IF OBJECT_ID('tempdb..#ReportDetailX') IS NOT NULL
    DROP TABLE #ReportDetailX

	IF OBJECT_ID('tempdb..#ReportDetailY') IS NOT NULL
    DROP TABLE #ReportDetailY

	IF OBJECT_ID('tempdb..#ReportParameter') IS NOT NULL
    DROP TABLE #ReportParameter

	--IF OBJECT_ID('tempdb..#ReportJoin') IS NOT NULL
 --   DROP TABLE #ReportJoin

	-- End TempTable ------

    DECLARE @reportIdMock VARCHAR(300) = '19,20'

    --IL5 CLevel All  = Report ID 225
    --IL5 CLevel COE  = Report ID 231
    --IL5 CLevel SEVP-D  = Report ID 232
    --IL5 CLevel SEVP-U/MCS  = Report ID 233

    DECLARE @CLevel VARCHAR(300) = 'ALL';

		DECLARE @isAccumulate BIT = (SELECT iSNULL(isAccumulate, 0) AS isAccumulate FROM CustomReportHeader WHERE ReportID = TRIM(@ReportID));
		DECLARE @unionTotalYAxis NVARCHAR(MAX) = '';
        DECLARE @unionTotalYAxis_WithCLevelOrder NVARCHAR(MAX) = '';
		SELECT * INTO #ReportHeader FROM CustomReportHeader WHERE ReportID = TRIM(@ReportID);
		SELECT * INTO #ReportDetailX FROM CustomReportDetail WHERE ReportID = TRIM(@ReportID) AND [Axis] = 'X' AND ISNULL([FieldName], '') <> '' ORDER BY [Sequence];
		SELECT * INTO #ReportDetailY FROM CustomReportDetail WHERE ReportID = TRIM(@ReportID) AND [Axis] = 'Y' AND ISNULL([FieldName], '') <> '' ORDER BY [Sequence];
		SELECT * INTO #ReportParameter FROM CustomReportParameter WHERE ReportID = TRIM(@ReportID) AND ISNULL([ParameterField], '') <> '' --AND ParameterName IN (@Param1,@Param2,@Param3,@Param4,@Param5,@Param6,@Param7,@Param8,@Param9,@Param10,@Param11,@Param12,@Param13,@Param14,@Param15,@Param16,@Param17,@Param18,@Param19,@Param20) ;

		 --SELECT * FROM	#ReportHeader
		 --SELECT * FROM	#ReportDetailX
		 --SELECT * FROM	#ReportDetailY
		 --SELECT * FROM	#ReportParameter


		DECLARE @tmpStringHeader AS NVARCHAR(MAX);
		DECLARE @tmpStringDetailX AS NVARCHAR(MAX);
        DECLARE @tmpStringDetailX_WithAxis_NoAgg AS NVARCHAR(MAX);
		DECLARE @tmpStringDetailX_accu AS NVARCHAR(MAX);
		DECLARE @tmpStringDetailY AS NVARCHAR(MAX);
        DECLARE @tmpStringDetailY_WithAxis_NoAgg AS NVARCHAR(MAX);
		DECLARE @tmpStringParam AS NVARCHAR(MAX);
		DECLARE @tmpGroup AS NVARCHAR(MAX);
		DECLARE @tmpOrder AS NVARCHAR(MAX);
		DECLARE @tmpOuterQuery AS NVARCHAR(MAX);
		--DECLARE @tmpStringParamInputUser AS NVARCHAR(MAX);
		DECLARE @tmpAccumulate AS NVARCHAR(MAX);


		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param1 NVARCHAR(255) = ' + '''' +  @Param1  + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param2 NVARCHAR(255) = ' + '''' +  @Param2  + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param3 NVARCHAR(255) = ' + '''' +  @Param3  + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param4 NVARCHAR(255) = ' + '''' +  @Param4  + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param5 NVARCHAR(255) = ' + '''' +  @Param5  + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param6 NVARCHAR(255) = ' + '''' +  @Param6  + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param7 NVARCHAR(255) = ' + '''' +  @Param7  + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param8 NVARCHAR(255) = ' + '''' +  @Param8  + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param9 NVARCHAR(255) = ' + '''' +  @Param9  + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param10 NVARCHAR(255) = ' + '''' +  @Param10 + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param11 NVARCHAR(255) = ' + '''' +  @Param11 + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param12 NVARCHAR(255) = ' + '''' +  @Param12 + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param13 NVARCHAR(255) = ' + '''' +  @Param13 + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param14 NVARCHAR(255) = ' + '''' +  @Param14 + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param15 NVARCHAR(255) = ' + '''' +  @Param15 + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param16 NVARCHAR(255) = ' + '''' +  @Param16 + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param17 NVARCHAR(255) = ' + '''' +  @Param17 + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param18 NVARCHAR(255) = ' + '''' +  @Param18 + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param19 NVARCHAR(255) = ' + '''' +  @Param19 + ''' ')
		--SET @tmpStringParamInputUser = (ISNULL(@tmpStringParamInputUser, '') + ' DECLARE  @Param20 NVARCHAR(255) = ' + '''' +  @Param20 + ''' ')




	   ------ LOOP STORE VALUE IN HEADER 
		DECLARE CURSOR_HEADER CURSOR FOR SELECT ReportCode, ReportName, [Description], GraphType, X_AxisLabel, Y_AxisLabel, OtherTypeLabel FROM #ReportHeader
		DECLARE @reportCode NVARCHAR(255);
		DECLARE @reportName NVARCHAR(255);
		DECLARE @description NVARCHAR(255);
		DECLARE @graphType NVARCHAR(255);
		DECLARE @X_label NVARCHAR(255);
		DECLARE @Y_label NVARCHAR(255);
		DECLARE @otherTypeLabel NVARCHAR(255);
		DECLARE @FieldNameXforOrder NVARCHAR(255);

		OPEN CURSOR_HEADER 
		FETCH NEXT FROM CURSOR_HEADER 
		INTO @reportCode, @reportName, @description, @graphType, @X_label, @Y_label, @otherTypeLabel
		-- Header 1 row no need to loop
		SET @tmpStringHeader = '''' + ISNULL(@reportName, '') + '''' + ' AS ReportName '											+ ',' ; 
		SET @tmpStringHeader = ISNULL(@tmpStringHeader, '') + '''' +  ISNULL(@reportCode	, '')  + ''''	+ ' AS ReportCode '		+ ',' ; 
		SET @tmpStringHeader = ISNULL(@tmpStringHeader, '') + '''' +  ISNULL(@description	, '')  + ''''	+ ' AS [Description] '	+ ',' ; 
		SET @tmpStringHeader = ISNULL(@tmpStringHeader, '') + '''' +  ISNULL(@graphType		, '')  + ''''	+ ' AS GraphType '		+ ',' ; 
		SET @tmpStringHeader = ISNULL(@tmpStringHeader, '') + '''' +  ISNULL(@X_label		, '')  + ''''	+ ' AS X_Label '		+ ',' ; 
		SET @tmpStringHeader = ISNULL(@tmpStringHeader, '') + '''' +  ISNULL(@Y_label		, '')  + ''''	+ ' AS Y_Label '		+ ',' ; 
		SET @tmpStringHeader = ISNULL(@tmpStringHeader, '') + '''' +  ISNULL(@otherTypeLabel, '')  + ''''	+ ' AS OtherTypeLabel '		  ;
		
		SET @tmpOuterQuery = @tmpStringHeader --Copy Header Selected column

		-- Close cursor
		CLOSE CURSOR_HEADER ; 
		DEALLOCATE CURSOR_HEADER ; 
	  ----- END LOOP HEADER


	  ------------------------------------------------------------------------------------------------------------------	  
	  ------ LOOP STORE VALUE IN DETAIL  X
		DECLARE CURSOR_DETAILX CURSOR FOR SELECT [Sequence], FieldName, AggregateFunction, Axis FROM #ReportDetailX ORDER BY [Sequence]
		DECLARE @sequenceDetailX INT;
		DECLARE @fieldNameX NVARCHAR(255);
		DECLARE @aggregateFunctionX NVARCHAR(255);
		DECLARE @axisX NVARCHAR(255);
		
		OPEN CURSOR_DETAILX 
		FETCH NEXT FROM CURSOR_DETAILX
		INTO @sequenceDetailX, @fieldNameX, @aggregateFunctionX, @axisX
		-- Loop From Cursor
		WHILE (@@FETCH_STATUS = 0) 
		BEGIN		
		
			IF (ISNULL(@tmpStringDetailX, '') <> '')
			BEGIN
				SET @tmpStringDetailX = ISNULL(@tmpStringDetailX, '') + ', '	
			END
			IF (ISNULL(@tmpStringDetailX_accu, '') <> '')
			BEGIN
				SET @tmpStringDetailX_accu = ISNULL(@tmpStringDetailX_accu, '') + ', '	
			END
            IF (ISNULL(@tmpStringDetailX_WithAxis_NoAgg, '') <> '')
			BEGIN
				SET @tmpStringDetailX_WithAxis_NoAgg = ISNULL(@tmpStringDetailX_WithAxis_NoAgg, '') + ', '	
			END


			--ORDER BY
			IF (ISNULL(@tmpOrder, '') <> '')
			BEGIN
				SET @tmpOrder = ISNULL(@tmpOrder, '') + ', '	
			END
			SET @tmpOrder = ISNULL(@tmpOrder, '') + '[X_' + ISNULL(@fieldNameX, '') + ']'

			SET @FieldNameXforOrder = ISNULL(@fieldNameX, ''); -- for sorting workstreams


            IF (@ReportID IN (SELECT VALUE FROM STRING_SPLIT(@reportIdMock, ',')) )
            BEGIN

			SET @tmpStringDetailX_accu = ISNULL(@tmpStringDetailX_accu, '') + ' [X_' + ISNULL(@fieldNameX, '') + '] ' ---ใช้สำหรับเป็น Field X ของ Accumulate
			SET @tmpStringDetailX = ISNULL(@tmpStringDetailX, '') + (ISNULL(@aggregateFunctionX, '') + '([' + ISNULL(@fieldNameX, '') +'])' + ' AS [X_' + ISNULL(@fieldNameX, '') + ']' );
			SET @tmpStringDetailX_WithAxis_NoAgg = ISNULL(@tmpStringDetailX_WithAxis_NoAgg, '') + '([X_' + ISNULL(@fieldNameX, '') +'])' + ' AS [X_' + ISNULL(@fieldNameX, '') + ']';

            END 
                ELSE
            BEGIN
            
            BEGIN
                SET @tmpStringDetailX_accu = ISNULL(@tmpStringDetailX_accu, '') + ' [X_' + ISNULL(@fieldNameX, '') + '] ' ---ใช้สำหรับเป็น Field X ของ Accumulate
			    SET @tmpStringDetailX = ISNULL(@tmpStringDetailX, '') + (ISNULL(@aggregateFunctionX, '') + '([' + ISNULL(@fieldNameX, '') +'])' + ' AS [X_' + ISNULL(@fieldNameX, '') + ']' );
			    SET @tmpStringDetailX_WithAxis_NoAgg = ISNULL(@tmpStringDetailX_WithAxis_NoAgg, '') + '([X_' + ISNULL(@fieldNameX, '') +'])' + ' AS [X_' + ISNULL(@fieldNameX, '') + ']';
            END


            END


			--IF aggregate then not group  (ถ้ามี SUM ไม่ต้อง group)
			IF (ISNULL(@aggregateFunctionX, '') = '') 
			BEGIN 

				IF (ISNULL(@tmpGroup, '') <> '') BEGIN 
					SET @tmpGroup = ISNULL(@tmpGroup, '') + ', ' 
				END
				
				SET @tmpGroup = ISNULL(@tmpGroup, '') + '([' + ISNULL(@fieldNameX, '') +'])';
			END


			FETCH NEXT FROM CURSOR_DETAILX -- Fetch next cursor
			INTO @sequenceDetailX, @fieldNameX, @aggregateFunctionX, @axisX
		END
				-- Close cursor
		CLOSE CURSOR_DETAILX; 
		DEALLOCATE CURSOR_DETAILX;
	  ----- END LOOP DETAIL


      --- ADD YEAR COLUMN
                SET @tmpStringDetailX_accu = ISNULL(@tmpStringDetailX_accu, '') + ', [X_Year] ' ---ใช้สำหรับเป็น Field X ของ Accumulate
			    SET @tmpStringDetailX = ISNULL(@tmpStringDetailX, '') + ', YEAR(GETDATE()) ' + ' AS [X_Year]';
			    SET @tmpStringDetailX_WithAxis_NoAgg = ISNULL(@tmpStringDetailX_WithAxis_NoAgg, '') + ', ([X_Year])' + ' AS [X_Year]';



	  ------------------------------------------------------------------------------------------------------------------	  
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

            IF (ISNULL(@tmpStringDetailY_WithAxis_NoAgg, '') <> '')
			BEGIN
				SET @tmpStringDetailY_WithAxis_NoAgg = ISNULL(@tmpStringDetailY_WithAxis_NoAgg, '') + ', '
			END

			IF (ISNULL(@tmpAccumulate, '') <> '')
			BEGIN
				SET @tmpAccumulate = ISNULL(@tmpAccumulate, '') + ', '
			END

			--ORDER BY
			IF (ISNULL(@tmpOrder, '') <> '')
			BEGIN
				SET @tmpOrder = ISNULL(@tmpOrder, '') + ', '	
			END
			SET @tmpOrder = ISNULL(@tmpOrder, '') + '[Y_' + ISNULL(@fieldNameY, '') + ']'

			IF (@isAccumulate = 1)
			  BEGIN
                IF (@fieldNameY LIKE '%Target Line%')
                    BEGIN                    
                        --SET @tmpAccumulate = ISNULL(@tmpAccumulate, '') + ' ISNULL([Y_' + ISNULL(@fieldNameY, '') + '], 0) AS [Y_' + ISNULL(@fieldNameY, '') + ']'
				        SET @tmpAccumulate = ISNULL(@tmpAccumulate, '') + ' MAX([Y_' + ISNULL(@fieldNameY, '') + ']) OVER ( ORDER BY ' + @tmpOrder + ') AS [Y_' + ISNULL(@fieldNameY, '') + ']'
                    END
                ELSE 
                    BEGIN
				        SET @tmpAccumulate = ISNULL(@tmpAccumulate, '') + ' SUM([Y_' + ISNULL(@fieldNameY, '') + ']) OVER ( ORDER BY ' + @tmpOrder + ') AS [Y_' + ISNULL(@fieldNameY, '') + ']'
                    END
			  END			  

			IF (LOWER(TRIM(ISNULL(@aggregateFunctionY, ''))) = 'count')
				BEGIN --COUNT เฉพาะที่มี value (รวม 0 ด้วย)
					SET @tmpStringDetailY = ISNULL(@tmpStringDetailY, '') + (ISNULL(@aggregateFunctionY, '') + '( CASE WHEN ([' + ISNULL(@fieldNameY, '') +']) = -9999 THEN NULL ELSE 1 END )' + ' AS [Y_' + ISNULL(@fieldNameY, '') + ']' );
				END
			--ELSE IF (LOWER(TRIM(ISNULL(@aggregateFunctionY, ''))) = 'min')
			--	BEGIN
			--		SET @tmpStringDetail = ISNULL(@tmpStringDetail, '') + (ISNULL(@aggregateFunctionY, '') + '( CASE WHEN ([' + ISNULL(@fieldNameY, '') +']) = -9999 THEN 9999 ELSE ([' + ISNULL(@fieldNameY, '') +']) END )' + ' AS [Y_' + ISNULL(@fieldNameY, '') + ']' );
			--	END
			--ELSE IF (LOWER(TRIM(ISNULL(@aggregateFunctionY, ''))) = 'max')
			--	BEGIN
			--		SET @tmpStringDetail = ISNULL(@tmpStringDetail, '') + (ISNULL(@aggregateFunctionY, '') + '( CASE WHEN ([' + ISNULL(@fieldNameY, '') +']) = -9999 THEN -9999 ELSE ([' + ISNULL(@fieldNameY, '') +']) END )' + ' AS [Y_' + ISNULL(@fieldNameY, '') + ']' );
			--	END
			ELSE
				BEGIN
                IF (@fieldNameY LIKE '%Blankable%')
                    BEGIN
					    SET @tmpStringDetailY = ISNULL(@tmpStringDetailY, '') + 'MAX ( CASE WHEN ([' + ISNULL(@fieldNameY, '') +']) = -9999 THEN 0 ELSE ([' + ISNULL(@fieldNameY, '') +']) END )' + ' AS [Y_' + ISNULL(@fieldNameY, '') + ']' ;				        
                    END
                ELSE IF (@fieldNameY LIKE '%Target Line%')
                    BEGIN
					    SET @tmpStringDetailY = ISNULL(@tmpStringDetailY, '') + 'MAX ( CASE WHEN ([' + ISNULL(@fieldNameY, '') +']) = -9999 THEN 0 ELSE ([' + ISNULL(@fieldNameY, '') +']) END )' + ' AS [Y_' + ISNULL(@fieldNameY, '') + ']' ;				        
                    END
                ELSE 
                    BEGIN
                    IF (@ReportID IN (SELECT VALUE FROM STRING_SPLIT(@reportIdMock, ',')) )
                        BEGIN
                        	SET @tmpStringDetailY = ISNULL(@tmpStringDetailY, '') + ' MAX( CASE WHEN ([' + ISNULL(@fieldNameY, '') +']) = -9999 THEN 0 ELSE ([' + ISNULL(@fieldNameY, '') +']) END )' + ' AS [Y_' + ISNULL(@fieldNameY, '') + ']';
                        END 
                            ELSE
                        BEGIN
                        	SET @tmpStringDetailY = ISNULL(@tmpStringDetailY, '') + (ISNULL(@aggregateFunctionY, '') + '( CASE WHEN ([' + ISNULL(@fieldNameY, '') +']) = -9999 THEN 0 ELSE ([' + ISNULL(@fieldNameY, '') +']) END )' + ' AS [Y_' + ISNULL(@fieldNameY, '') + ']' );
                        END
                    END
            END

            SET @tmpStringDetailY_WithAxis_NoAgg = ISNULL(@tmpStringDetailY_WithAxis_NoAgg, '') + ' ([Y_' + ISNULL(@fieldNameY, '') +']) AS [Y_' + ISNULL(@fieldNameY, '') + ']';


			--IF aggregate then not group  (ถ้ามี aggregate ไม่ต้อง group)
			IF (ISNULL(@aggregateFunctionY, '') = '') 
			BEGIN 
				IF (ISNULL(@tmpGroup, '') <> '') BEGIN 
					SET @tmpGroup = ISNULL(@tmpGroup, '') + ', ' 
				END
				
				SET @tmpGroup = ISNULL(@tmpGroup, '') + '([' + ISNULL(@fieldNameY, '') +'])';
			END

			

			FETCH NEXT FROM CURSOR_DETAILY -- Fetch next cursor
			INTO @sequenceDetailY, @fieldNameY, @aggregateFunctionY, @axisY
		END
				-- Close cursor
		CLOSE CURSOR_DETAILY; 
		DEALLOCATE CURSOR_DETAILY;
	  ----- END LOOP DETAIL



	  ------------------------------------------------------------------------------------------------------------------

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

			----CHECK VALUE IF Blank
			--TempTable
			IF OBJECT_ID('tempdb..##tmpChkData') IS NOT NULL
			DROP TABLE ##tmpChkData

			--DECLARE @tmpQueryChk NVARCHAR(MAX) = (' SELECT LEN(@Param' + CAST(@sequenceParam AS NVARCHAR(5)) + ') AS cnt INTO ##tmpChkData')
			--EXEC(@tmpQueryChk);
			--DECLARE @lenOfParam INT = (SELECT cnt FROM ##tmpChkData);
			IF (ISNULL(@parameterField, '') = '') GOTO NEXTLOOP;  --if param = blank then skip

			IF (ISNULL(@tmpStringParam, '') <> '')
			BEGIN
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + ' AND '
			END			

            IF(@parameterField = 'Target_to_IL5_Date_C')
            BEGIN
            -- parameter year  -- fix month , day   format : yyyy-12-31  (2020-12-31)
                SET @tmpStringParam = ISNULL(@tmpStringParam, '') + 'ISNULL([' + @parameterField + '], '''')' +  ' <= ''' + CAST(YEAR(GETDATE() -2) AS NVARCHAR(50)) + '-12-31'' '
                goto NEXTLOOP;
            END

			IF (@filterCondition LIKE '%IN')
			BEGIN
				
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + 'ISNULL([' + @parameterField + '], '''') ' +  ' ' + @filterCondition + ' ( (SELECT dbo.fn_CustomReportParamDecoder(VALUE) FROM STRING_SPLIT(''' + @DefaultValue + ''', '','') ) )' 
			END
			ELSE 
			BEGIN
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + 'ISNULL([' + @parameterField + '], '''')' +  ' ' + @filterCondition  + ' ''' + ISNULL(@DefaultValue, '') + ''' '  --' ( CASE WHEN ''' + ISNULL(@DefaultValue, '') + ''' = '''' THEN ' + '[' + @parameterField + ']' + ' ELSE ''' + @DefaultValue + ''' END )' 
			END

            IF(@parameterField = 'C-level')
            BEGIN
                SET @CLevel = @DefaultValue;
            END

			NEXTLOOP:  --label for GOTO
			FETCH NEXT FROM CURSOR_PARAM -- Fetch next cursor
			INTO @sequenceParam, @parameterName, @parameterField, @filterCondition, @parameterType, @Required, @DefaultValue
		END

		-- Close cursor
		CLOSE CURSOR_PARAM ; 
		DEALLOCATE CURSOR_PARAM ; 
	  ----- END LOOP PARAMETER

	  --PRINT(@tmpStringParamInputUser);
	  --STRING SELECT

	  IF (ISNULL(@tmpStringParam, '') = '' ) BEGIN SET @tmpStringParam = ' 1=1 ' END
	  IF (ISNULL(@tmpStringDetailX, '') <> '' ) BEGIN SET @tmpStringDetailX = ' , ' + @tmpStringDetailX END
	  IF (ISNULL(@tmpStringDetailY, '') <> '' ) BEGIN SET @tmpStringDetailY = ' , ' + @tmpStringDetailY END

      IF (ISNULL(@tmpStringDetailX_WithAxis_NoAgg, '') <> '' ) BEGIN SET @tmpStringDetailX_WithAxis_NoAgg = ' , ' + @tmpStringDetailX_WithAxis_NoAgg END
	  IF (ISNULL(@tmpStringDetailY_WithAxis_NoAgg, '') <> '' ) BEGIN SET @tmpStringDetailY_WithAxis_NoAgg = ' , ' + @tmpStringDetailY_WithAxis_NoAgg END

	  SET @unionTotalYAxis =  ISNULL(@unionTotalYAxis, '') + ' UNION  (' + 'SELECT ' + @tmpStringHeader + ' ,''Total'' AS [Total] ' + @tmpStringDetailY  + ' FROM v_DataGraphEnhanced WHERE ' + @tmpStringParam + ' ) '
	  SET @unionTotalYAxis_WithCLevelOrder =  ISNULL(@unionTotalYAxis_WithCLevelOrder, '') + ' UNION  (' + 'SELECT ' + @tmpStringHeader + ' ,''Total'' AS [Total] ' + @tmpStringDetailY  + ',999999 AS [clevelorder] FROM v_DataGraphEnhanced WHERE ' + @tmpStringParam + ' ) '

	  SET @tmpGroup = ' GROUP BY ' + @tmpGroup;
	  --PRINT('SELECT ' + @tmpStringHeader +  @tmpStringDetailX + @tmpStringDetailY + ' FROM v_DataGraphEnhanced WHERE ' + @tmpStringParam + @tmpGroup + @unionTotalYAxis + ' ORDER BY ' + @tmpOrder)

	  DECLARE @tmpJOINOrder NVARCHAR(MAX) = '';
	  DECLARE @tmpJOINOrderBy NVARCHAR(MAX) = '';
      DECLARE @tmpJOINOrder_WithAxis NVARCHAR(MAX) = '';
      DECLARE @tmpJOINOrderBy_NoAgg NVARCHAR(MAX) = '';


	  IF( @tmpStringDetailX LIKE '%workstream%' AND @tmpStringDetailX NOT LIKE '%sub-workstream%') -- if x axis = workstream or sub-workstream   no total in y axis
		BEGIN
			SET @tmpJOINOrder = '  LEFT JOIN (SELECT DISTINCT WorkStreamTitle AS val, CLevelOrder, WorkstreamOrder AS mainOrder FROM SubWorkstreams) w ON w.val = v.[' + @FieldNameXforOrder + ']';
			SET @tmpJOINOrderBy = 'MAX(CLevelOrder), MAX(mainOrder),'
		END
	  IF( @tmpStringDetailX LIKE '%sub-workstream%') -- if x axis = workstream or sub-workstream   no total in y axis
		BEGIN
			SET @tmpJOINOrder = '  LEFT JOIN (SELECT DISTINCT SubWorkstream1 AS val, CLevelOrder, SubWorkstream1Order AS mainOrder FROM SubWorkstreams) w ON w.val = v.[' + @FieldNameXforOrder + ']';
			SET @tmpJOINOrderBy = 'MAX(CLevelOrder), MAX(mainOrder),'
		END
      IF( @tmpStringDetailX LIKE '%C-Level%') -- if x axis = clevel
		BEGIN
			SET @tmpJOINOrder = '  LEFT JOIN (SELECT DISTINCT CLevel AS val, CLevelOrder AS mainOrder FROM SubWorkstreams) w ON w.val = v.[' + @FieldNameXforOrder + ']';
			SET @tmpJOINOrderBy = ' MAX(mainOrder)'
            SET @tmpJOINOrder_WithAxis = ' LEFT JOIN (SELECT DISTINCT CLevel AS val, CLevelOrder AS mainOrder FROM SubWorkstreams) w ON w.val = v.[X_' + @FieldNameXforOrder + ']';
            SET @tmpJOINOrderBy_NoAgg = 'mainOrder'
		END
		



	  IF (@isAccumulate = 1)
		  BEGIN
	  			EXEC('SELECT ' + @tmpStringHeader + ' , ' + @tmpStringDetailX_accu + ' , ' + @tmpAccumulate + ' INTO #tempQureyData FROM ( SELECT ' + @tmpStringHeader + @tmpStringDetailX + @tmpStringDetailY + ' FROM v_DataGraphEnhanced WHERE ' + @tmpStringParam + @tmpGroup + ' ) a ORDER BY ' + @tmpOrder
                + ';  INSERT INTO HistoricalGraphIL5Achievement ([Week], [Year] ,[IL5] ,[SIL5] ,[UnconvertedIL4], [CLevel]) SELECT [X_Target_To_IL5_Week], [X_Year], [Y_IL5], [Y_SIL5], 0 AS [Y_Unconverted_IL4], ''' + @CLevel + ''' FROM #tempQureyData WHERE X_Target_To_IL5_Week = DATEPART(wk, GETDATE() - 2) '
                + ';  SELECT * FROM #tempQureyData  WHERE X_Target_To_IL5_Week = DATEPART(wk, GETDATE() - 2) '
                ) -- need to call on monday!!!!
	  			PRINT('SELECT ' + @tmpStringHeader + ' , ' + @tmpStringDetailX_accu + ' , ' + @tmpAccumulate + ' INTO #tempQureyData FROM ( SELECT ' + @tmpStringHeader + @tmpStringDetailX + @tmpStringDetailY + ' FROM v_DataGraphEnhanced WHERE ' + @tmpStringParam + @tmpGroup + ' ) a ORDER BY ' + @tmpOrder
                + ';  INSERT INTO HistoricalGraphIL5Achievement ([Week], [Year]  ,[IL5] ,[SIL5] ,[UnconvertedIL4], [CLevel]) SELECT [X_Target_To_IL5_Week], [X_Year], [Y_IL5], [Y_SIL5], 0 AS [Y_Unconverted_IL4], ''' + @CLevel + ''' FROM #tempQureyData WHERE X_Target_To_IL5_Week = DATEPART(wk, GETDATE() - 2) '
                + ';  SELECT * FROM #tempQureyData  WHERE  X_Target_To_IL5_Week = DATEPART(wk, GETDATE() - 2) '
                ) -- need to call on monday!!!!

		  END
	  ELSE
		BEGIN
			IF( @tmpStringDetailX LIKE '%workstream%') -- if x axis = workstream or sub-workstream   no total in y axis
				BEGIN
					PRINT('SELECT ' + @tmpStringHeader +  @tmpStringDetailX + @tmpStringDetailY + '  FROM v_DataGraphEnhanced v' + @tmpJOINOrder + ' WHERE ' + @tmpStringParam + @tmpGroup + ' ORDER BY ' + @tmpJOINOrderBy + @tmpOrder )
                    PRINT(@unionTotalYAxis);
					EXEC('SELECT ' + @tmpStringHeader +  @tmpStringDetailX + @tmpStringDetailY + '  FROM v_DataGraphEnhanced v' + @tmpJOINOrder + ' WHERE ' + @tmpStringParam + @tmpGroup + ' ORDER BY ' + @tmpJOINOrderBy + @tmpOrder )
				END
			ELSE IF( @tmpStringDetailX LIKE '%week%')
				BEGIN
                IF (@ReportID IN (SELECT VALUE FROM STRING_SPLIT(@reportIdMock, ',')) )
                        BEGIN
                    	    PRINT('SELECT ' + @tmpStringHeader +  @tmpStringDetailX + @tmpStringDetailY + ' FROM v_DataGraphEnhanced_NewNormal WHERE ' + @tmpStringParam + @tmpGroup + ' ORDER BY ' + @tmpOrder)

                    	    EXEC('SELECT ' + @tmpStringHeader +  @tmpStringDetailX + @tmpStringDetailY + ' FROM v_DataGraphEnhanced_NewNormal WHERE ' + @tmpStringParam + @tmpGroup + ' ORDER BY ' + @tmpOrder)
                        END
                    ELSE
                        BEGIN
                    	    EXEC('SELECT ' + @tmpStringHeader +  @tmpStringDetailX + @tmpStringDetailY + ' FROM v_DataGraphEnhanced WHERE ' + @tmpStringParam + @tmpGroup + ' ORDER BY ' + @tmpOrder)
                        END
				END
            ELSE IF(@tmpStringDetailX LIKE '%C-Level%')
				BEGIN
					EXEC('SELECT ' + @tmpStringHeader +  @tmpStringDetailX + @tmpStringDetailY + ', MAX(w.' + @tmpJOINOrderBy_NoAgg + ') AS [' + @tmpJOINOrderBy_NoAgg + ']  INTO #tmpResult FROM v_DataGraphEnhanced v' + @tmpJOINOrder + ' WHERE ' + @tmpStringParam + @tmpGroup + @unionTotalYAxis_WithCLevelOrder + ' ORDER BY ' + @tmpJOINOrderBy_NoAgg + ',' + @tmpOrder
                     + ' SELECT ' + @tmpStringHeader + @tmpStringDetailX_WithAxis_NoAgg + @tmpStringDetailY_WithAxis_NoAgg + ' FROM #tmpResult x ORDER BY ' + @tmpJOINOrderBy_NoAgg)
                     PRINT('SELECT ' + @tmpStringHeader +  @tmpStringDetailX + @tmpStringDetailY + ', MAX(w.' + @tmpJOINOrderBy_NoAgg + ') AS [' + @tmpJOINOrderBy_NoAgg + ']  INTO #tmpResult FROM v_DataGraphEnhanced v' + @tmpJOINOrder + ' WHERE ' + @tmpStringParam + @tmpGroup + @unionTotalYAxis_WithCLevelOrder + ' ORDER BY ' + @tmpJOINOrderBy_NoAgg + ',' + @tmpOrder
                     + ' SELECT ' + @tmpStringHeader + @tmpStringDetailX_WithAxis_NoAgg + @tmpStringDetailY_WithAxis_NoAgg + ' FROM #tmpResult x ORDER BY ' + @tmpJOINOrderBy_NoAgg)
					--PRINT('SELECT ' + @tmpStringHeader +  @tmpStringDetailX + @tmpStringDetailY + ' INTO #tmpResult  FROM v_DataGraphEnhanced v' + @tmpJOINOrder + ' WHERE ' + @tmpStringParam + @tmpGroup + @unionTotalYAxis + ' ORDER BY ' + @tmpJOINOrderBy + ',' + @tmpOrder
     --                + ' SELECT * FROM #tmpResult v' + @tmpJOINOrder_WithAxis + @unionTotalYAxis  + ' ORDER BY ' + @tmpJOINOrderBy_NoAgg)
                    -- + @unionTotalYAxis
				END
			ELSE
			  BEGIN
				EXEC('SELECT ' + @tmpStringHeader +  @tmpStringDetailX + @tmpStringDetailY + '  FROM v_DataGraphEnhanced WHERE ' + @tmpStringParam + @tmpGroup + @unionTotalYAxis  + ' ORDER BY ' + @tmpOrder)
			  END
		  END

    



	  --REMOVE ALL TEMPTABLE
        IF OBJECT_ID('tempdb..#tmpResult') IS NOT NULL
		DROP TABLE #tmpResult

		IF OBJECT_ID('tempdb..#ReportHeader') IS NOT NULL
		DROP TABLE #ReportHeader
	
		IF OBJECT_ID('tempdb..#ReportDetailX') IS NOT NULL
		DROP TABLE #ReportDetailX

		IF OBJECT_ID('tempdb..#ReportDetailY') IS NOT NULL
		DROP TABLE #ReportDetailY

		IF OBJECT_ID('tempdb..#ReportParameter') IS NOT NULL
		DROP TABLE #ReportParameter

		--IF OBJECT_ID('tempdb..##tmpChkData') IS NOT NULL
		--DROP TABLE ##tmpChkData

    -- Insert statements for procedure here
	--SELECT GETDATE();
END
GO

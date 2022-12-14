/****** Object:  StoredProcedure [dbo].[sp_CustomExcel]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_CustomExcel]
@reportID NVARCHAR(255) = ''
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	IF (ISNULL(@ReportID, '') = '')
	BEGIN

			RAISERROR (N'ReportCode not specify.', -- Message text.  
				   11, -- Severity,  
				   1 -- State
				   );
			RETURN;
	END

    DECLARE @viewReport NVARCHAR(300) = (SELECT TOP 1 GraphType FROM CustomReportHeader WHERE ReportID = TRIM(@ReportID))
    

	SELECT * INTO #ReportParameter FROM CustomReportParameter WHERE ReportID = TRIM(@ReportID) AND ISNULL([ParameterField], '') <> '' --AND ParameterName IN (@Param1,@Param2,@Param3,@Param4,@Param5,@Param6,@Param7,@Param8,@Param9,@Param10,@Param11,@Param12,@Param13,@Param14,@Param15,@Param16,@Param17,@Param18,@Param19,@Param20) ;

	DECLARE @tmpSelectColumn NVARCHAR(MAX) = ( SELECT STRING_AGG ('[' + FieldName + ']', ',')  WITHIN GROUP (ORDER BY Sequence) FROM CustomReportDetail WHERE Axis = 'Y' AND ISNULL(FieldName, '') <> '' AND ReportID = @reportID );
	DECLARE @tmpStringParam NVARCHAR(MAX) = '';

	if @tmpSelectColumn = '[defaultParam]'
		set @tmpSelectColumn = '*'

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
				
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + 'ISNULL([' + @parameterField + '], '''')' +  ' ' + @filterCondition + ' ( (SELECT dbo.fn_CustomReportParamDecoder(VALUE) FROM STRING_SPLIT(''' + @DefaultValue + ''', '','') ) )' 
			END
			ELSE 
			BEGIN
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + 'ISNULL([' + @parameterField + '], '''')' +  ' ' + @filterCondition  + ' ''' + ISNULL(@DefaultValue, '') + ''' '  --' ( CASE WHEN ''' + ISNULL(@DefaultValue, '') + ''' = '''' THEN ' + '[' + @parameterField + ']' + ' ELSE ''' + @DefaultValue + ''' END )' 
			END

			NEXTLOOP:  --label for GOTO
			FETCH NEXT FROM CURSOR_PARAM -- Fetch next cursor
			INTO @sequenceParam, @parameterName, @parameterField, @filterCondition, @parameterType, @Required, @DefaultValue
		END

		-- Close cursor
		CLOSE CURSOR_PARAM ; 
		DEALLOCATE CURSOR_PARAM ; 
	  ----- END LOOP PARAMETER
      DECLARE @queryString NVARCHAR(3000) = ''
	  IF (ISNULL(@tmpStringParam, '') = '' ) BEGIN SET @tmpStringParam = ' 1=1 ' END
        SET @queryString = 'SELECT  id AS InitiativeIdParam, DATEADD(HOUR,7,GETDATE()) AS [Exported On],' + @tmpSelectColumn + ' FROM v_' + CASE WHEN @viewReport in ('CustomExcel','CustomTable') THEN  + 'CustomExcel1' ELSE @viewReport END + ' WHERE ' + @tmpStringParam
        PRINT(@queryString);
		EXEC(@queryString);
    -- Insert statements for procedure here
	--SELECT GETDATE()
END
GO

/****** Object:  StoredProcedure [dbo].[sp_GetCashInById]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetCashInById]
(
    @ReportID  NVARCHAR(255) = ''
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

	IF OBJECT_ID('tempdb..#tmpViewCashIn') IS NOT NULL
    DROP TABLE #tmpViewCashIn

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
				
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + '[' + @parameterField + ']' +  ' ' + @filterCondition + ' ( (SELECT dbo.fn_CustomReportParamDecoder(VALUE) FROM STRING_SPLIT(''' + @DefaultValue + ''', '','') ) )' 
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


	SELECT
	* 
	INTO #tmpViewCashIn
	FROM [dbo].[v_CashIn];


	IF (ISNULL(@tmpStringParam, '') = '' ) BEGIN SET @tmpStringParam = ' 1=1 ' END


	--PRINT ('		SELECT * 
	--	, ROW_NUMBER() OVER (PARTITION BY InitiativeCode ORDER BY WorkStreamTitle, SubWorkStream,Organization,typeofbenefitgroup ,impacttypeofbenefittable,  versionprice) AS InitiativeCodeOrder
	--	, ROW_NUMBER() OVER (PARTITION BY InitiativeCode ORDER BY WorkStreamTitle, SubWorkStream,Organization,typeofbenefitgroup ,impacttypeofbenefittable DESC,  versionprice DESC) AS IncentiveOrder
	--	,RANK () OVER ( ORDER BY InitiativeId, WorkStreamTitle, SubWorkStream,Organization,typeofbenefitgroup) AS grpNumber --ใช้สำหรับ grouping data เพื่อ check ว่าจะเอา value row บน หรือล่าง
	--	, InitiativeCode + ''-'' + CAST(DENSE_RANK() OVER (PARTITION BY InitiativeId  ORDER BY InitiativeCode, WorkStreamTitle, SubWorkStream) AS VARCHAR(10)) AS SubId
 --FROM #tmpViewCashIn WHERE ' + @tmpStringParam + '

 --ORDER BY InitiativeId, InitiativeCodeOrder');
	--EXEC('		SELECT * 
	--	, ROW_NUMBER() OVER (PARTITION BY InitiativeCode ORDER BY WorkStreamTitle, SubWorkStream,Organization,typeofbenefitgroup ,impacttypeofbenefittable,  versionprice) AS InitiativeCodeOrder
	--	, ROW_NUMBER() OVER (PARTITION BY InitiativeCode ORDER BY WorkStreamTitle, SubWorkStream,Organization,typeofbenefitgroup ,impacttypeofbenefittable DESC,  versionprice DESC) AS IncentiveOrder
	--	, RANK () OVER ( ORDER BY InitiativeId, WorkStreamTitle, SubWorkStream,Organization,typeofbenefitgroup) AS grpNumber --ใช้สำหรับ grouping data เพื่อ check ว่าจะเอา value row บน หรือล่าง
	--	, InitiativeCode + ''-'' + CAST(DENSE_RANK() OVER (PARTITION BY InitiativeId  ORDER BY InitiativeCode, WorkStreamTitle, SubWorkStream) AS VARCHAR(10)) AS SubId
 --FROM #tmpViewCashIn WHERE ' + @tmpStringParam + '

 --ORDER BY InitiativeId, InitiativeCodeOrder');



	PRINT ('		SELECT * 
		, ROW_NUMBER() OVER (PARTITION BY InitiativeCode ORDER BY WorkStreamTitle, SubWorkStream,Organization, typeofbenefitgroup ,CASE WHEN versionprice = ''FloatFX'' THEN ''A'' ELSE impacttypeofbenefittable END,  CASE WHEN versionprice = ''FloatFX'' THEN ''A'' ELSE versionprice END) AS InitiativeCodeOrder
		, ROW_NUMBER() OVER (PARTITION BY InitiativeCode ORDER BY WorkStreamTitle, SubWorkStream,Organization,typeofbenefitgroup ,impacttypeofbenefittable DESC,  versionprice DESC) AS IncentiveOrder
		,RANK () OVER ( ORDER BY InitiativeId, WorkStreamTitle, SubWorkStream,Organization,typeofbenefitgroup) AS grpNumber --ใช้สำหรับ grouping data เพื่อ check ว่าจะเอา value row บน หรือล่าง
		, InitiativeCode + ''-'' + CAST(DENSE_RANK() OVER (PARTITION BY InitiativeId  ORDER BY InitiativeCode, WorkStreamTitle, SubWorkStream) AS VARCHAR(10)) AS SubId
 FROM #tmpViewCashIn WHERE ' + @tmpStringParam + '

 ORDER BY InitiativeId, InitiativeCodeOrder');
	EXEC('		SELECT * 
		, ROW_NUMBER() OVER (PARTITION BY InitiativeCode ORDER BY WorkStreamTitle, SubWorkStream,Organization, typeofbenefitgroup ,CASE WHEN versionprice = ''FloatFX'' THEN ''A'' ELSE impacttypeofbenefittable END,  CASE WHEN versionprice = ''FloatFX'' THEN ''A'' ELSE versionprice END) AS InitiativeCodeOrder
		, ROW_NUMBER() OVER (PARTITION BY InitiativeCode ORDER BY WorkStreamTitle, SubWorkStream,Organization,typeofbenefitgroup ,impacttypeofbenefittable DESC,  versionprice DESC) AS IncentiveOrder
		, RANK () OVER ( ORDER BY InitiativeId, WorkStreamTitle, SubWorkStream,Organization,typeofbenefitgroup) AS grpNumber --ใช้สำหรับ grouping data เพื่อ check ว่าจะเอา value row บน หรือล่าง
		, InitiativeCode + ''-'' + CAST(DENSE_RANK() OVER (PARTITION BY InitiativeId  ORDER BY InitiativeCode, WorkStreamTitle, SubWorkStream) AS VARCHAR(10)) AS SubId
 FROM #tmpViewCashIn WHERE ' + @tmpStringParam + '

 ORDER BY InitiativeId, InitiativeCodeOrder');

	
	--WHERE InitiativeId = CASE WHEN ISNULL(@initiativeId, '') = '' THEN InitiativeId ELSE @initiativeId END
	--OR (@sheetNum = 1 AND VersionPrice IN ('Actual','Revise'))

    

END
GO

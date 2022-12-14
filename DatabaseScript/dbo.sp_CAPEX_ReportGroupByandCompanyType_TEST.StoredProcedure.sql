/****** Object:  StoredProcedure [dbo].[sp_CAPEX_ReportGroupByandCompanyType_TEST]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_ReportGroupByandCompanyType_TEST]
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

        DECLARE @startYear INT = 0;

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
				
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + '[' + @parameterField + ']' +  ' ' + @filterCondition + ' ( (SELECT TRIM(VALUE) FROM STRING_SPLIT(''' + @DefaultValue + ''', '','') ) )' 
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
        IF (@startYear = 0) SET @startYear = (SELECT YEAR(GETDATE()));


----TempTable
IF OBJECT_ID('tempdb..#tmpData') IS NOT NULL
DROP TABLE #tmpData

DECLARE @tmpStringMain NVARCHAR(MAX) = '';

SET @tmpStringMain = '

SELECT 
ROW_NUMBER() OVER (ORDER BY ISNULL(orderInvest.Attribute02, orderPoolType.Attribute02),CASE WHEN Company <> '''' THEN 1 ELSE 2 END,  CASE WHEN org = '''' THEN ''ZZZ'' ELSE org END ,[no])  AS [sortNo],
a.* 
INTO #tmpData
FROM (

--/* GC Only */
---- main data
        SELECT
                ROW_NUMBER() OVER (PARTITION BY ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') ORDER BY ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') ,ISNULL(ini.Organization, ''''),ini.InitiativeCode)  AS [No],
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') AS ''InvestmentType'',
                ini.Name,
                CONVERT(DECIMAL(10,2), cap.ProjectCost) AS ''ProjectCost'',
                ini.InitiativeCode,
                MAX(own.Indicator) AS VP,
                COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool''),ISNULL(ini.Organization, '''')) AS TotalRecordsOfOrg,
                ISNULL(ini.Organization, '''') AS org
                ,ISNULL(Company, '''') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                LEFT JOIN Owners own ON own.OwnerName = cap.CostCenterOfVP
                 where (ini.Company = ''PTT Global Chemical''  OR ini.Company = ''PTTGC'')
                 ' + @tmpStringParam + '

                GROUP BY 
                ISNULL(ini.Organization, ''''),
                ini.Name,
                cap.ProjectCost,
                ini.InitiativeCode,
                ini.Plant,
                ini.Company,
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'')

                UNION

     -- count by org
                SELECT DISTINCT
                900000,
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') AS ''InvestmentType'',
               ''Total '' + ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') + '' '' + CAST(COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool''),ISNULL(ini.Organization, '''')) AS VARCHAR(50)) + '' Project(s) ('' +  ISNULL(ini.Organization, '''') + '')'' AS total,
               CONVERT(DECIMAL(10,2), SUM(cap.ProjectCost) OVER (PARTITION BY ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool''),ISNULL(ini.Organization, ''''))  )
               ,''''
               ,''''
               ,0
                ,ISNULL(ini.Organization, '''') AS org
                ,ISNULL(Company, '''') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                
                WHERE (ini.Company = ''PTT Global Chemical'' OR ini.Company = ''PTTGC'')
                 ' + @tmpStringParam + '

                GROUP BY 
                ini.InitiativeCode,
                ISNULL(ini.Organization, ''''),
                ini.Company,
                cap.ProjectCost,
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'')


                UNION
    
    -- count by company 
                SELECT 
                900001,
                MAX(ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'')) AS ''InvestmentType'',
               ''Total '' + CAST(COUNT(ini.InitiativeCode)AS VARCHAR(50)) + '' Project(s) GC Only'' AS total,
               CONVERT(DECIMAL(10,2), SUM(cap.ProjectCost))
               ,''''
               ,''''
               ,0
                , ''''
                ,ISNULL(MAX(Company), '''') as Company 
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                 where (ini.Company = ''PTT Global Chemical'' OR ini.Company = ''PTTGC'') 
                 ' + @tmpStringParam + '

                GROUP BY 
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'')

/*END  GC Only */

                UNION

------------------------------

        SELECT
               900002,
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') AS ''InvestmentType'',
                ''Subsidiary'',
                NULL,
                '''',
                ''''
                ,0
                , '''' 
                ,''PTT Global Chemical''
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                 where (ini.Company <> ''PTT Global Chemical''  AND ini.Company <> ''PTTGC'') 
                 ' + @tmpStringParam + '

                GROUP BY
                ISNULL(ini.Organization, ''''),
                Company,
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'')

                UNION
------------------------------

--- Subsidiary  group of not GC company   [no group organization]

                SELECT
                ROW_NUMBER() OVER (PARTITION BY ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') ORDER BY ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool''),ISNULL(ini.Organization, ''''),ini.InitiativeCode)  AS [No],
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') AS ''InvestmentType'',
                ini.Name,
                CONVERT(DECIMAL(10,2), cap.ProjectCost),
                ini.InitiativeCode,
                MAX(own.Indicator) AS VP,
                COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool''),ISNULL(ini.Organization, '''')) AS TotalRecordsOfOrg,
                ISNULL(ini.Organization, '''') AS org
                ,''''  as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                LEFT JOIN Owners own ON own.OwnerName = cap.CostCenterOfVP
                 where (ini.Company <> ''PTT Global Chemical''  AND ini.Company <> ''PTTGC'') 
                 ' + @tmpStringParam + '

                GROUP BY
                ini.Name,
                cap.ProjectCost,
                ISNULL(ini.Organization, ''''),
                ini.InitiativeCode,
                ini.Plant,
                Company,
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'')

            UNION
                
                SELECT DISTINCT
                900000,
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') AS ''InvestmentType'',
               ''Total '' + CAST(COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool''),ISNULL(ini.Organization, '''')) AS VARCHAR(50)) + '' Project(s) ('' +  ISNULL(ini.Organization, '''') + '')'' AS total,
               CONVERT(DECIMAL(10,2),  SUM(cap.ProjectCost) OVER (PARTITION BY ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool''),ISNULL(ini.Organization, ''''))  ) 
               ,''''
               ,''''
               ,0

                ,ISNULL(ini.Organization, '''') AS org
               ,''''  as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                 where (ini.Company <> ''PTT Global Chemical''  AND ini.Company <> ''PTTGC'') 
                 ' + @tmpStringParam + '
                GROUP BY 
                ini.InitiativeCode,
                ISNULL(ini.Organization, ''''),
                Company,
                cap.ProjectCost,
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'')

                UNION

         -- count by company
                SELECT 
                900003,
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') AS ''InvestmentType'',               
               ''Total '' + CAST(COUNT(ini.InitiativeCode) AS VARCHAR(50)) + '' Project(s) Subsidiary'' AS total,
               CONVERT(DECIMAL(10,2),  SUM(cap.ProjectCost)  ) 
               ,''''
               ,''''
               ,0
                , ''''
                ,''''
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                 where (ini.Company <> ''PTT Global Chemical''  AND ini.Company <> ''PTTGC'') 
                ' + @tmpStringParam + '
                GROUP BY 
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'')

                UNION
                 -- count 2 group companies
                SELECT 
                900004,
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'') AS ''InvestmentType'',               
               ''Total '' + CAST(COUNT(ini.InitiativeCode) AS VARCHAR(50)) + '' Project(s) (GC Group)'' AS total,
               CONVERT(DECIMAL(10,2), SUM(cap.ProjectCost))  
               ,''''
               ,''''
               ,0
                , ''''
                ,''''
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND ISNULL(cap.Sequent, 0) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = ini.Id)
                 where 1=1 
                 ' + @tmpStringParam + '
                GROUP BY 
                ISNULL(ini.TypeOfInvestment, ini.PoolType + '' Pool'')


                
                ) a
                
                LEFT JOIN CommonData orderInvest ON orderInvest.DataType = ''typeofinvestment'' AND orderInvest.Attribute02 = a.[InvestmentType]
                LEFT JOIN CommonData orderPoolType ON orderPoolType.DataType = ''pooltype'' AND orderPoolType.Attribute02 = REPLACE(a.[InvestmentType], '' Pool'', '''')

                ORDER BY ISNULL(orderInvest.Attribute02, orderPoolType.Attribute02)  ,CASE WHEN Company <> '''' THEN 1 ELSE 2 END , CASE WHEN org = '''' THEN ''ZZZ'' ELSE org END ,[no]

                ';

                ----------------------------------
--PRINT(@tmpStringMain)
--EXEC(@tmpStringMain);

                DECLARE @tmpQuery NVARCHAR(MAX) = '
                                    SELECT 
                        CASE WHEN [No] >= 900000 THEN '''' ELSE CAST([No] AS VARCHAR(100)) END AS [No],
                        [InvestmentType] AS ''Investment Type'',
                        [Name] AS ''Initiative Name'',
                        [ProjectCost] AS ''Budget for Approval [Year]'',
                        [InitiativeCode],
						[VP]
                        

                    FROM  #tmpData
                    ORDER BY sortNo
                '
PRINT(@tmpQuery)
EXEC(@tmpStringMain + ' ' + @tmpQuery); 


END
GO

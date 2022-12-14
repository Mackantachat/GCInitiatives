/****** Object:  StoredProcedure [dbo].[sp_CAPEX_ReportGroupByandCompanyType_noparam]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_ReportGroupByandCompanyType_noparam]
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
				
				SET @tmpStringParam = ISNULL(@tmpStringParam, '') + '[' + @parameterField + ']' +  ' ' + @filterCondition + ' ( (SELECT VALUE FROM STRING_SPLIT(''' + @DefaultValue + ''', '','') ) )' 
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


    
----TempTable
IF OBJECT_ID('tempdb..#tmpData') IS NOT NULL
DROP TABLE #tmpData

SELECT 
ROW_NUMBER() OVER (ORDER BY [InvestmentType],CASE WHEN Company <> '' THEN 1 ELSE 2 END,  CASE WHEN org = '' THEN 'ZZZ' ELSE org END ,[no])  AS [sortNo],
* 
INTO #tmpData
FROM (

--/* GC Only */
---- main data
        SELECT
                ROW_NUMBER() OVER (PARTITION BY ini.TypeOfInvestment ORDER BY ini.TypeOfInvestment,ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode)  AS [No],
                ini.TypeOfInvestment AS 'InvestmentType',
                ini.Name,
                cap.ProjectCost,
                ini.InitiativeCode,
                ini.Plant AS VP,
                COUNT(ini.InitiativeCode) OVER (PARTITION BY ini.TypeOfInvestment,ISNULL(ini.Organization, 'thisnull')) AS TotalRecordsOfOrg,
                ISNULL(ini.Organization, 'thisnull') AS org
                ,ISNULL(Company, 'companynull') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId

                 where id between 557 and 631 and id not between 599 and 618
                 AND ini.Company = 'PTT Global Chemical'
                 --AND ini.TypeofInvestment = 'Operational Excellence'
                 --AND Company = 'PTT Phenol'
                GROUP BY 
                ISNULL(ini.Organization, 'thisnull'),
                ini.Name,
                cap.ProjectCost,
                ini.InitiativeCode,
                ini.Plant,
                ini.Company,
                ini.TypeofInvestment

                UNION

     -- count by org
                SELECT DISTINCT
                9000,
                ini.TypeOfInvestment AS 'InvestmentType',
                --ROW_NUMBER() OVER (ORDER BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode) AS [No],
               'Total ' + ini.TypeOfInvestment + ' ' + CAST(COUNT(ini.InitiativeCode) OVER (PARTITION BY ini.TypeOfInvestment,ISNULL(ini.Organization, 'thisnull')) AS VARCHAR(50)) + ' Project(s) (' +  ISNULL(ini.Organization, 'thisnull') + ')' AS total,
               SUM(cap.ProjectCost) OVER (PARTITION BY ini.TypeOfInvestment,ISNULL(ini.Organization, 'thisnull'))
               ,''
               ,''
               ,0

               -- COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull')) AS TotalRecordsOfOrg
                ,ISNULL(ini.Organization, 'thisnull') AS org
                ,ISNULL(Company, 'companynull') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId
                 where id between 557 and 631 and id not between 599 and 618
                 AND ini.Company = 'PTT Global Chemical'
                 --AND ini.TypeofInvestment = 'Operational Excellence'
                GROUP BY 
                ini.InitiativeCode,
                ISNULL(ini.Organization, 'thisnull'),
                ini.Company,
                cap.ProjectCost,
                ini.TypeOfInvestment


                UNION
    
    -- count by company 
                SELECT 
                9001,
                MAX(ini.TypeOfInvestment) AS 'InvestmentType',
                --ROW_NUMBER() OVER (ORDER BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode) AS [No],
               'Total ' + CAST(COUNT(ini.InitiativeCode)AS VARCHAR(50)) + ' Project(s) GC Only' AS total,
               SUM(cap.ProjectCost) 
               ,''
               ,''
               ,0

               -- COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull')) AS TotalRecordsOfOrg
                , '' --,ISNULL(ini.Organization, 'thisnull') AS org
                ,ISNULL(MAX(Company), 'companynull') as Company --,ISNULL(Company, 'companynull') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId
                 where id between 557 and 631 and id not between 599 and 618
                 AND ini.Company = 'PTT Global Chemical'
                 --AND ini.TypeofInvestment = 'Operational Excellence'
                GROUP BY 
                --cap.ProjectCost
                ini.TypeOfInvestment
                --ini.InitiativeCode
                --ISNULL(ini.Organization, 'thisnull'),
                --ini.Company

/*END  GC Only */

                UNION

------------------------------

        SELECT
               9002,
                ini.TypeOfInvestment AS 'InvestmentType',
                'Subsidiary',
                NULL,
                '',
                ''
                ,0
                , '' 
                ,'PTT Global Chemical'
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId

                 where id between 557 and 631 and id not between 599 and 618
                 AND ini.Company <> 'PTT Global Chemical'
                 --AND ini.TypeofInvestment = 'Operational Excellence'
                 --AND Company = 'PTT Phenol'
                GROUP BY
                ISNULL(ini.Organization, 'thisnull'),
                Company,
                ini.TypeofInvestment

                UNION
------------------------------

--- Subsidiary  group of not GC company   [no group organization]

                SELECT
                ROW_NUMBER() OVER (PARTITION BY ini.TypeOfInvestment ORDER BY ini.TypeOfInvestment,ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode)  AS [No],
                ini.TypeOfInvestment AS 'InvestmentType',
                ini.Name,
                cap.ProjectCost,
                ini.InitiativeCode,
                ini.Plant AS VP,
                COUNT(ini.InitiativeCode) OVER (PARTITION BY ini.TypeOfInvestment,ISNULL(ini.Organization, 'thisnull')) AS TotalRecordsOfOrg,
                ISNULL(ini.Organization, 'thisnull') AS org
                ,''  as Company --,ISNULL(Company, 'companynull') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId

                 where id between 557 and 631 and id not between 599 and 618
                 AND ini.Company <> 'PTT Global Chemical'
                 --AND ini.TypeofInvestment = 'Operational Excellence'
                 --AND Company = 'PTT Phenol'
                GROUP BY
                ini.Name,
                cap.ProjectCost,
                ISNULL(ini.Organization, 'thisnull'),
                ini.InitiativeCode,
                ini.Plant,
                Company,
                ini.TypeofInvestment

            UNION
                
                SELECT DISTINCT
                9000,
                ini.TypeOfInvestment AS 'InvestmentType',
                --ROW_NUMBER() OVER (ORDER BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode) AS [No],
               'Total ' + CAST(COUNT(ini.InitiativeCode) OVER (PARTITION BY ini.TypeOfInvestment,ISNULL(ini.Organization, 'thisnull')) AS VARCHAR(50)) + ' Project(s) (' +  ISNULL(ini.Organization, 'thisnull') + ')' AS total,
               SUM(cap.ProjectCost) OVER (PARTITION BY ini.TypeOfInvestment,ISNULL(ini.Organization, 'thisnull'))
               ,''
               ,''
               ,0

               -- COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull')) AS TotalRecordsOfOrg
                ,ISNULL(ini.Organization, 'thisnull') AS org
               ,''  as Company --,ISNULL(Company, 'companynull') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId
                 where id between 557 and 631 and id not between 599 and 618
                 AND ini.Company <> 'PTT Global Chemical'
                 --AND ini.TypeofInvestment = 'Operational Excellence'
                GROUP BY 
                ini.InitiativeCode,
                ISNULL(ini.Organization, 'thisnull'),
                Company,
                cap.ProjectCost,
                ini.TypeOfInvestment

                UNION

         -- count by company
                SELECT 
                9003,
                ini.TypeOfInvestment AS 'InvestmentType',
                --ROW_NUMBER() OVER (ORDER BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode) AS [No],
               'Total ' + CAST(COUNT(ini.InitiativeCode) AS VARCHAR(50)) + ' Project(s) Subsidiary' AS total,
               SUM(cap.ProjectCost)
               ,''
               ,''
               ,0

               -- COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull')) AS TotalRecordsOfOrg
                , '' --,ISNULL(ini.Organization, 'thisnull') AS org
                ,'' --,ISNULL(Company, 'companynull') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId
                 where id between 557 and 631 and id not between 599 and 618
                 AND ini.Company <> 'PTT Global Chemical'
                 --AND ini.TypeofInvestment = 'Operational Excellence'
                GROUP BY 
                ini.TypeOfInvestment
                --ini.InitiativeCode
                --ISNULL(ini.Organization, 'thisnull'),
                --ini.Company

                UNION
                 -- count 2 group companies
                SELECT 
                9004,
                ini.TypeOfInvestment,
                --ROW_NUMBER() OVER (ORDER BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode) AS [No],
               'Total ' + CAST(COUNT(ini.InitiativeCode) AS VARCHAR(50)) + ' Project(s) (GC Group)' AS total,
               SUM(cap.ProjectCost)
               ,''
               ,''
               ,0

               -- COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull')) AS TotalRecordsOfOrg
                , '' --,ISNULL(ini.Organization, 'thisnull') AS org
                ,'' --,ISNULL(Company, 'companynull') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId
                 where id between 557 and 631 and id not between 599 and 618
                 --AND ini.Company <> 'PTT Global Chemical'
                 --AND ini.TypeofInvestment = 'Operational Excellence'
                GROUP BY 
                ini.TypeOfInvestment
                --ini.InitiativeCode
                --ISNULL(ini.Organization, 'thisnull'),
                --ini.Company

                
                ) a

                ORDER BY [InvestmentType],CASE WHEN Company <> '' THEN 1 ELSE 2 END , CASE WHEN org = '' THEN 'ZZZ' ELSE org END ,[no]


                ----------------------------------

                DECLARE @tmpQuery NVARCHAR(MAX) = '
                                    SELECT 
                        CASE WHEN [No] >= 9000 THEN '''' ELSE CAST([No] AS VARCHAR(100)) END AS [No],
                        [InvestmentType] AS ''Investment Type'',
                        [Name] AS ''Initiative Name'',
                        [ProjectCost] AS ''Project Cost'',
                        [InitiativeCode],
                        [VP]

                    FROM  #tmpData
                    WHERE  ' + @tmpStringParam + '
                    ORDER BY sortNo
                '
PRINT(@tmpQuery)
EXEC(@tmpQuery); 


END
GO

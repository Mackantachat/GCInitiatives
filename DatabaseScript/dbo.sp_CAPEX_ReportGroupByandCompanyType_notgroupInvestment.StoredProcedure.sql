/****** Object:  StoredProcedure [dbo].[sp_CAPEX_ReportGroupByandCompanyType_notgroupInvestment]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_ReportGroupByandCompanyType_notgroupInvestment]
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
    


    DECLARE @tmpYear INT = 2020;
    DECLARE @tmpInvesment VARCHAR(200) = 'Operational Excellence';

    IF (ISNULL(@ReportID, '') = '')
	BEGIN

			RAISERROR (N'ReportCode not specify.', -- Message text.  
				   11, -- Severity,  
				   1 -- State
				   );
			RETURN;
	END


    
--TempTable
IF OBJECT_ID('tempdb..#tmpData') IS NOT NULL
DROP TABLE #tmpData

SELECT 
ROW_NUMBER() OVER (ORDER BY CASE WHEN Company <> '' THEN 1 ELSE 2 END , CASE WHEN org = '' THEN 'ZZZ' ELSE org END ,[no])  AS [sortNo],
* 
INTO #tmpData
FROM (

/* GC Only */
-- main data
        SELECT
                ROW_NUMBER() OVER (ORDER BY ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode)  AS [No],
                ini.Name,
                cap.ProjectCost,
                ini.InitiativeCode,
                ini.Plant AS VP,
                COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(ini.Organization, 'thisnull')) AS TotalRecordsOfOrg,
                ISNULL(ini.Organization, 'thisnull') AS org
                ,ISNULL(Company, 'companynull') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId

                 where id between 557 and 631 and id not between 599 and 618
                 AND ini.Company = 'PTT Global Chemical'
                 AND ini.TypeofInvestment = @tmpInvesment
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
                --ROW_NUMBER() OVER (ORDER BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode) AS [No],
               'Total ' + CAST(COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(ini.Organization, 'thisnull')) AS VARCHAR(50)) + ' Project(s) (' +  ISNULL(ini.Organization, 'thisnull') + ')' AS total,
               SUM(cap.ProjectCost) OVER (PARTITION BY ISNULL(ini.Organization, 'thisnull'))
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
                 AND ini.TypeofInvestment = @tmpInvesment
                GROUP BY 
                ini.InitiativeCode,
                ISNULL(ini.Organization, 'thisnull'),
                ini.Company,
                cap.ProjectCost

                UNION
    
    -- count by company
                SELECT 
                9001,
                --ROW_NUMBER() OVER (ORDER BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode) AS [No],
               'Total ' + @tmpInvesment + ' ' + CAST(COUNT(ini.InitiativeCode) AS VARCHAR(50)) + ' Project(s) GC Only' AS total,
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
                 AND ini.TypeofInvestment = @tmpInvesment
                --GROUP BY 
                --ini.InitiativeCode
                --ISNULL(ini.Organization, 'thisnull'),
                --ini.Company

/*END  GC Only */

                UNION

------------------------------

        --SELECT
        --        9002
        --        ,'Subsidiary'
        --        ,NULL
        --        ,NULL
        --        ,NULL
        --        ,NULL
        --        ,NULL
        --        ,NULL

        --        UNION
------------------------------

--- Subsidiary  group of not GC company   [no group organization]

                SELECT
                ROW_NUMBER() OVER (ORDER BY ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode)  AS [No],
                ini.Name,
                cap.ProjectCost,
                ini.InitiativeCode,
                ini.Plant AS VP,
                COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(ini.Organization, 'thisnull')) AS TotalRecordsOfOrg,
                ISNULL(ini.Organization, 'thisnull') AS org
                ,''  as Company --,ISNULL(Company, 'companynull') as Company
                FROM v_Initiatives ini 
                INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId

                 where id between 557 and 631 and id not between 599 and 618
                 AND ini.Company <> 'PTT Global Chemical'
                 AND ini.TypeofInvestment = @tmpInvesment
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
                --ROW_NUMBER() OVER (ORDER BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode) AS [No],
               'Total ' + CAST(COUNT(ini.InitiativeCode) OVER (PARTITION BY ISNULL(ini.Organization, 'thisnull')) AS VARCHAR(50)) + ' Project(s) (' +  ISNULL(ini.Organization, 'thisnull') + ')' AS total,
               SUM(cap.ProjectCost) OVER (PARTITION BY ISNULL(ini.Organization, 'thisnull'))
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
                 AND ini.TypeofInvestment = @tmpInvesment
                GROUP BY 
                ini.InitiativeCode,
                ISNULL(ini.Organization, 'thisnull'),
                Company,
                cap.ProjectCost

                UNION

         -- count by company
                SELECT 
                9001,
                --ROW_NUMBER() OVER (ORDER BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode) AS [No],
               'Total ' + @tmpInvesment + ' ' + CAST(COUNT(ini.InitiativeCode) AS VARCHAR(50)) + ' Project(s) Subsidiary' AS total,
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
                 AND ini.TypeofInvestment = @tmpInvesment
                --GROUP BY 
                --ini.InitiativeCode
                --ISNULL(ini.Organization, 'thisnull'),
                --ini.Company

                UNION

/*END  Subsidiary */

                 -- count 2 group companies
                SELECT 
                9003,
                --ROW_NUMBER() OVER (ORDER BY ISNULL(Company, 'companynull'),ISNULL(ini.Organization, 'thisnull'),ini.InitiativeCode) AS [No],
               'Total ' + @tmpInvesment + ' ' + CAST(COUNT(ini.InitiativeCode) AS VARCHAR(50)) + ' Project(s) (GC Group)' AS total,
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
                 AND ini.TypeofInvestment = @tmpInvesment
                --GROUP BY 
                --ini.InitiativeCode
                --ISNULL(ini.Organization, 'thisnull'),
                --ini.Company


                ) a

                ORDER BY CASE WHEN Company <> '' THEN 1 ELSE 2 END , CASE WHEN org = '' THEN 'ZZZ' ELSE org END ,[no]


                ----------------------------------

                DECLARE @tmpQuery NVARCHAR(MAX) = '
                                    SELECT 
                        CASE WHEN [No] >= 9000 THEN '''' ELSE CAST([No] AS VARCHAR(100)) END AS [No],
                        [Name] AS ''Initiative Name'',
                        [ProjectCost] AS ''Project Cost ' + CAST(@tmpYear AS VARCHAR(30)) + ''',
                        [InitiativeCode],
                        [VP]

                    FROM  #tmpData
                    ORDER BY sortNo
                '
PRINT(@tmpQuery)
EXEC(@tmpQuery); 


END
GO

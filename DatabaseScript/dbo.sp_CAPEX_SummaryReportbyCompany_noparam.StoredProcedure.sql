/****** Object:  StoredProcedure [dbo].[sp_CAPEX_SummaryReportbyCompany_noparam]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CAPEX_SummaryReportbyCompany_noparam]
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


    
--TempTable
IF OBJECT_ID('tempdb..#tmpData') IS NOT NULL
DROP TABLE #tmpData


SELECT 
    ROW_NUMBER() OVER (ORDER BY CASE WHEN (a.[Company]) = '' THEN 'ZZZ' ELSE (a.[Company]) END,
CASE WHEN (a.[Value Center/BU]) = '' THEN 'ZZZZ' ELSE (a.[Value Center/BU]) END,
[No]) AS [sortNo],
    *
    INTO #tmpData
    FROM (

            SELECT 
            ROW_NUMBER() OVER (ORDER BY (ini.Company),(ini.Organization)) AS [No],
            (ini.Company),
            (ini.Organization) AS 'Value Center/BU',
            '' AS 'Revision No',
            ini.InitiativeCode AS 'Initiative No',
            (ini.Stage) AS 'Status',
            '' AS 'Appropriation No',
            '' AS 'WBS No',
            (ini.Name) AS 'Project Name',
            (ini.ResultObjective) AS 'Objective',
            '' AS 'Project Owner(VP)',
            (cap.ProjectCost) AS 'Project Cost (MTHB)',
            (cap.RequestIniNoDate) AS 'Start Date',
            (cap.ProjecctComRun) AS 'End Date',
            '' AS 'Comment'
            FROM v_Initiatives ini
            INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId


            where id between 557 and 631 and id not between 599 and 618

            --ORDER BY 
            --(ini.Company),
            --(ini.Organization)



            UNION


            SELECT 
            9001 AS [No],
            (ini.Company) AS 'Company',
            (ini.Organization) AS 'Value Center/BU',
            '' AS 'Revision No',
            '' AS 'Initiative No',
            '' AS 'Status',
            '' AS 'Appropriation No',
            '' AS 'WBS No',
            '' AS 'Project Name',
            '' AS 'Objective',
            '' AS 'Project Owner(VP)',
            SUM(cap.ProjectCost) AS 'Project Cost (MTHB)',
            '' AS 'Start Date',
            '' AS 'End Date',
            '' AS 'Comment'
            FROM v_Initiatives ini
            INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId


            where id between 557 and 631 and id not between 599 and 618

            GROUP BY 
            (ini.Company),
            (ini.Organization)

            --ORDER BY
            --(ini.Organization)


            UNION

            SELECT 
            9002 AS [No],
            (ini.Company) AS 'Company',
            '' AS 'Value Center/BU',
            '' AS 'Revision No',
            '' AS 'Initiative No',
            '' AS 'Status',
            '' AS 'Appropriation No',
            '' AS 'WBS No',
            '' AS 'Project Name',
            '' AS 'Objective',
            '' AS 'Project Owner(VP)',
            SUM(cap.ProjectCost) AS 'Project Cost (MTHB)',
            '' AS 'Start Date',
            '' AS 'End Date',
            '' AS 'Comment'
            FROM v_Initiatives ini
            INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId


            where id between 557 and 631 and id not between 599 and 618

            GROUP BY 
            (ini.Company)



            UNION

            SELECT 
            9003 AS [No],
            '' AS 'Company',
            '' AS 'Value Center/BU',
            '' AS 'Revision No',
            '' AS 'Initiative No',
            '' AS 'Status',
            '' AS 'Appropriation No',
            '' AS 'WBS No',
            '' AS 'Project Name',
            '' AS 'Objective',
            '' AS 'Project Owner(VP)',
            SUM(cap.ProjectCost) AS 'Project Cost (MTHB)',
            '' AS 'Start Date',
            '' AS 'End Date',
            '' AS 'Comment'
            FROM v_Initiatives ini
            INNER JOIN CapexInformations cap ON ini.Id = cap.InitiativeId


            where id between 557 and 631 and id not between 599 and 618
) a
--ORDER BY
--(ini.Company)


ORDER BY
CASE WHEN (a.[Company]) = '' THEN 'ZZZ' ELSE (a.[Company]) END,
CASE WHEN (a.[Value Center/BU]) = '' THEN 'ZZZZ' ELSE (a.[Value Center/BU]) END,
[No]





                ----------------------------------

                DECLARE @tmpQuery NVARCHAR(MAX) = '
                                    SELECT 
                        CASE WHEN [No] >= 9000 THEN '''' ELSE CAST([No] AS VARCHAR(100)) END AS [No],
                         [Company],
                         [Value Center/BU],
                         [Revision No],
                         [Initiative No],
                         [Status],
                         [Appropriation No],
                         [WBS No],
                         [Project Name],
                         [Objective],
                         [Project Owner(VP)],
                         [Project Cost (MTHB)],
                         [Start Date],
                         [End Date],
                         [Comment]


                    FROM  #tmpData
                    ORDER BY sortNo
                '
PRINT(@tmpQuery)
EXEC(@tmpQuery); 


END
GO

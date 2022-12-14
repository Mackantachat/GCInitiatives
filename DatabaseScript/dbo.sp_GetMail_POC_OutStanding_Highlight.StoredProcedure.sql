/****** Object:  StoredProcedure [dbo].[sp_GetMail_POC_OutStanding_Highlight]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetMail_POC_OutStanding_Highlight]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    IF OBJECT_ID('tempdb..#tmpOwnerNoDups') IS NOT NULL
        DROP TABLE #tmpOwnerNoDups
        

        ----       
       SELECT 
            --SUBSTRING(Email,0,CHARINDEX('@',Email)) + ' <' + ISNULL(MAX(Indicator),'') + '/' + ISNULL(MAX(Extension),'-') +  '>' AS OwnerName,
            MAX(OwnerName) AS OwnerName,
			MAX(OwnerName) AS oldOwnerName,
            Email,
            MAX(DepTextEN) AS DepTextEN,
            MAX(DepShortTextEN) AS DepShortTextEN,
            MAX(FNShortTextEN) AS FNShortTextEN
            INTO #tmpOwnerNoDups
        FROM Owners
        GROUP BY
            Email


    -- Insert statements for procedure here
    --CASE WHEN (CAST(ISNULL(POC , 'false') AS INT) + CAST(ISNULL(OutstandingItems  , 'false') AS INT) + CAST(ISNULL(HighlightWork     , 'false') AS INT)) >= 2 THEN 'are' ELSE 'is' END

    SELECT DISTINCT
        
     'Initiative ' + ini.InitiativeCode + ' requires your update' AS SubjectMail,

     '"' + 
    
         CASE WHEN ISNULL(POC , 'false') = 'false'                  THEN ' POC % Table,'                      ELSE '' END   --POC
         + CASE WHEN ISNULL(OutstandingItems , 'false') = 'false'   THEN ' Outstanding Table,'                      ELSE '' END  --Outstanding
         + CASE WHEN ISNULL(HighlightWork , 'false') = 'false'      THEN ' BSC / Narrative Table '                      ELSE '' END  --BSC Narative / Highlightwork    
    
     + '"'
     + CASE WHEN (CAST(ISNULL(POC , 'false') AS INT) + CAST(ISNULL(OutstandingItems  , 'false') AS INT) + CAST(ISNULL(HighlightWork     , 'false') AS INT)) <= 1 THEN ' are ' ELSE ' is ' END
     AS ThingsToUpdate,

     own.Email AS DearEmail,
     dbo.HtmlEncode(own.OwnerName) AS DearName,

     ini.Name AS Name,
     ini.InitiativeCode AS InitiativeCode,
     '<a href="https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoId=' + CAST((ini.id) AS VARCHAR(50)) + '&gotoPage=edit">Click Here</a>' AS InitiativeLink



    FROM v_Initiatives ini
    INNER JOIN DetailInformations det ON det.InitiativeId = ini.Id
    LEFT JOIN #tmpOwnerNoDups own ON own.OwnerName = ini.OwnerName OR own.Email = ini.CreatedBy OR own.OwnerName = det.ProjectEngineer
    LEFT JOIN PerformanceInactive per ON per.InitiativeCode = ini.InitiativeCode AND DATEADD(HOUR, 7, GETDATE()) BETWEEN per.FromDate AND per.ToDate  -- with in period time only
    LEFT JOIN ProgressHeader ph ON ini.Id = ph.InitiativeId


    WHERE 
    ISNULL(ph.WbsNo, '') <> ''
    AND (CAST(ISNULL(POC , 'false') AS INT) + CAST(ISNULL(OutstandingItems  , 'false') AS INT) + CAST(ISNULL(HighlightWork     , 'false') AS INT)) < 3   -- if inactive 3 checkbox then not send
    AND ini.InitiativeType IN ('max','pim')



END
GO

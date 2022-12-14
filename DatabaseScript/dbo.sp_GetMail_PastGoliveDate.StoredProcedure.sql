/****** Object:  StoredProcedure [dbo].[sp_GetMail_PastGoliveDate]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetMail_PastGoliveDate]
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
     

     own.Email AS DearEmail,
     dbo.HtmlEncode(own.OwnerName) AS DearName,

     ini.Name AS Name,
     ini.InitiativeCode AS InitiativeCode,


     '<a href="https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoId=' + CAST((ini.id) AS VARCHAR(50)) + '&gotoPage=edit">Click Here</a>' AS InitiativeLink
     , CAST(ISNULL(cap.ProjectCost, 0) AS VARCHAR(50)) AS ProjectCost
     , DAY(GETDATE()) AS NowDay
    FROM v_Initiatives ini
    INNER JOIN DetailInformations det ON det.InitiativeId = ini.Id
    INNER JOIN CapexInformations cap ON cap.InitiativeId = ini.Id AND ISNULL(cap.Sequent, 0) = (SELECT ISNULL(MAX(Sequent), 0) FROM CapexInformations WHERE InitiativeId = ini.Id)
    LEFT JOIN InitiativeCoDevelopers co ON co.InitiativeId = ini.Id
    LEFT JOIN #tmpOwnerNoDups own ON own.OwnerName = ini.OwnerName OR own.Email = ini.CreatedBy OR own.OwnerName = co.CoDeveloperName


    WHERE 
    ini.InitiativeType IN ('dim')
    AND ini.Stage LIKE 'Implement%'
    AND ISNULL(det.reviseForecastFinishDate, GETDATE()) >= CAST(GETDATE() AS DATETIME2)  -- if have revise forecast finish date then use it as start of reminder


    --AND DAY(GETDATE()) =  1   -- send only day 1

END
GO

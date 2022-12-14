/****** Object:  StoredProcedure [dbo].[sp_GetInformationComment_Flow]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetInformationComment_Flow]
(
    @initiativeId VARCHAR(50)
)
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

            
       IF OBJECT_ID('tempdb..#tmpActionBy') IS NOT NULL
        DROP TABLE #tmptmpActionBy

        SELECT
        TOP 1 * 
        INTO #tmptmpActionBy
        FROM InitiativeActions iniac
        WHERE iniac.InitiativeId = @InitiativeId AND ISNULL(iniac.IsInactive, 'false') = 'false' AND ISNULL(iniac.ActionResult, '') = '' AND ISNULL(iniac.Counter, -1) = (SELECT MAX(Counter) FROM InitiativeActions WHERE InitiativeId = @InitiativeId AND ISNULL(iniac.IsInactive, 'false') = 'false' AND ISNULL(iniac.ActionResult, '') = '')



    -- Insert statements for procedure here
       SELECT DISTINCT
    (ini.id) AS InitiativeId
    ,(ini.InitiativeCode) AS InitiativeCode
    ,ISNULL((ini.Name), '') AS InitiativeName
    ,ISNULL((iniac.Stage), '') AS Stage
    ,ISNULL((iniac.Status), '') AS Status
    , dbo.HtmlEncode(ini.OwnerName) AS OwnerName
    , LOWER(ownEmail.Email) AS OwnerEmail
    , ISNULL(dbo.HtmlEncode(creName.OwnerName),  LOWER(ini.CreatedBy)) AS CreatorName  
    , LOWER(ini.CreatedBy) AS CreatorEmail
    , '' AS Indicator
    , ISNULL(det.Workstream, '') AS Workstream
    , '' AS FieldName
    , LOWER(im.ContactIOBy) AS CommentByEmail
    , dbo.HtmlEncode(ioBy.OwnerName) AS CommentByName
    , ISNULL(im.ContactIO, '') AS CommentDetail
    , GETDATE() AS CommentDate
    , '<a href="https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoId=' + CAST((ini.id) AS VARCHAR(50)) + '&gotoPage=view">Click Here</a>' AS InitiativeLink
    FROM ImpactTrackings im
    INNER JOIN v_Initiatives ini ON ini.Id = im.InitiativeId
    LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
    LEFT JOIN #tmpOwnerNoDups creName ON ini.CreatedBy = creName.Email
    LEFT JOIN #tmpOwnerNoDups ownEmail ON ini.OwnerName = ownEmail.oldOwnerName
    LEFT JOIN #tmpOwnerNoDups ioBy ON ioBy.Email = im.ContactIOBy
    LEFT JOIN #tmptmpActionBy iniac ON iniac.InitiativeId = ini.Id

    WHERE im.InitiativeId = @initiativeId

    
        
        
        

END
GO

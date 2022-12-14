/****** Object:  StoredProcedure [dbo].[sp_GetOwnerInformation_Flow]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetOwnerInformation_Flow]
(
    @InitiativeId VARCHAR(50)
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


		IF OBJECT_ID('tempdb..#CloneprojectEngToOwner') IS NOT NULL
        DROP TABLE #CloneprojectEngToOwner

		select ini.id,ini.OwnerName 
		INTO #CloneprojectEngToOwner
		from v_Initiatives ini
		left join DetailInformations det on ini.id = det.InitiativeId where ini.id = @InitiativeId
		
		union
		select ini.id,det.ProjectEngineer from v_Initiatives ini
		left join DetailInformations det on ini.id = det.InitiativeId where ini.id = @InitiativeId
		
    -- Insert statements for procedure here
    SELECT DISTINCT
        (ini.id) AS InitiativeId
        ,(ini.InitiativeCode) AS InitiativeCode
        , '' AS Indicator
        , ISNULL(det.Workstream, '') AS Workstream
        , (ini.Name) AS InitiativeName
        , ISNULL((iniac.Stage), '') AS Stage
        , ISNULL((iniac.Status), '') AS Status
		, dbo.HtmlEncode(cloneProjectEn.OwnerName) AS OwnerName
        , ISNULL(LOWER(cloneProjectEnEmail.Email), '') AS OwnerEmail
	   -- , dbo.HtmlEncode(ini.OwnerName) AS OwnerName
       -- , ISNULL(LOWER(OwnerName.Email), '') AS OwnerEmail
        , LOWER(ini.CreatedBy) AS CreatorEmail  
        , ISNULL(dbo.HtmlEncode(creName.OwnerName),  LOWER(ini.CreatedBy)) AS CreatorName  
        , LOWER(ISNULL(appEmail.Email, inista.ActionBy)) AS ApproverEmail
        , dbo.HtmlEncode(appEmail.OwnerName) AS ApproverName
        , ISNULL(inista.Comment, '') AS ApproverComment 
        , ISNULL(inista.Stage, '') AS ApproverStage
        , '<a href="https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoId=' + CAST((ini.id) AS VARCHAR(50)) + '&gotoPage=' + CASE (ini.Status) WHEN 'revised' THEN 'edit' WHEN 'rejected' THEN 'view' ELSE 'view' END + '">Click Here</a>' AS InitiativeLink   
    FROM v_Initiatives ini
    LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
    LEFT JOIN #tmpOwnerNoDups creName ON ini.CreatedBy = creName.Email
	Left join #CloneprojectEngToOwner cloneProjectEn on ini.id = cloneProjectEn.Id  and cloneProjectEn.OwnerName is not null
	Left join #tmpOwnerNoDups cloneProjectEnEmail on cloneProjectEn.OwnerName = cloneProjectEnEmail.OwnerName
    LEFT JOIN #tmpOwnerNoDups ownEmail ON ini.OwnerName = ownEmail.oldOwnerName
    LEFT JOIN (SELECT TOP 1 * FROM InitiativeStatusHistory WHERE InitiativeId = @InitiativeId ORDER BY Id DESC) inista ON ini.Id = inista.InitiativeId
    LEFT JOIN #tmpOwnerNoDups appEmail ON inista.ActionBy = appEmail.oldOwnerName
    LEFT JOIN #tmptmpActionBy iniac ON iniac.InitiativeId = ini.Id


    WHERE ini.Id = @InitiativeId

     AND ini.Id NOT IN (53679)
        
        
        

END
GO

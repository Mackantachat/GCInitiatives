/****** Object:  StoredProcedure [dbo].[sp_GetAllApproved_Flow]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetAllApproved_Flow]
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

 ----------------- Nok Edit Add project Eng Like Owner @20-Feb-21
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
        MAX(ini.id) AS InitiativeId
        ,MAX(ini.InitiativeCode) AS InitiativeCode
        , '' AS Indicator
        , ISNULL(MAX(det.Workstream), '') AS Workstream
        , (MAX(ini.Name)) AS InitiativeName
        , ISNULL(MAX(iniapprovedstage.Stage), '') AS ApprovedStage
         , ISNULL(MAX(iniac.Stage), '') AS NowStage
        , ISNULL(MAX(iniac.Status), '') AS Status
        , dbo.HtmlEncode(cloneProjectEn.OwnerName) AS OwnerName
        , ISNULL(LOWER(cloneProjectEnEmail.Email), '') AS OwnerEmail
	   -- , dbo.HtmlEncode(ini.OwnerName) AS OwnerName
       -- , ISNULL(LOWER(OwnerName.Email), '') AS OwnerEmail
        , MAX(LOWER(ini.CreatedBy)) AS CreatorEmail  
        , ISNULL(dbo.HtmlEncode(MAX(creName.OwnerName)),  MAX(LOWER(ini.CreatedBy))) AS CreatorName  
        , STRING_AGG(ISNULL(appEmail.Email, LOWER(inista.ActionBy)), ',') AS ApproverEmail
        , STRING_AGG(ISNULL(dbo.HtmlEncode(appEmail.OwnerName), '') , ',') AS ApproverName
        , STRING_AGG(ISNULL(inista.Comment, ''), ',') AS ApproverComment 
        , '<a href="https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoId=' + CAST(MAX(ini.id) AS VARCHAR(50)) + '&gotoPage=edit">Click Here</a>' AS InitiativeLink       
    FROM v_Initiatives ini
    LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
    --LEFT JOIN MaxApprovers maxap ON ini.id = maxap.InitiativeId
    LEFT JOIN #tmpOwnerNoDups creName ON ini.CreatedBy = creName.Email
	----------------------------------------
	Left join #CloneprojectEngToOwner cloneProjectEn on ini.id = cloneProjectEn.Id and cloneProjectEn.OwnerName is not null
	Left join #tmpOwnerNoDups cloneProjectEnEmail on cloneProjectEn.OwnerName = cloneProjectEnEmail.OwnerName
	----------------------------------------
    LEFT JOIN #tmpOwnerNoDups ownEmail ON ini.OwnerName = ownEmail.oldOwnerName 
    LEFT JOIN (SELECT TOP 1 * FROM InitiativeStatusHistory  WHERE InitiativeId = @InitiativeId ORDER BY Id DESC) iniapprovedstage ON ini.Id = iniapprovedstage.InitiativeId
    LEFT JOIN InitiativeStatusTrackings initr ON ini.id = initr.InitiativeId AND initr.Stage = iniapprovedstage.Stage
    LEFT JOIN InitiativeStatusHistory inista ON ini.Id = inista.InitiativeId AND initr.Stage = inista.Stage AND initr.ApprovedDate = inista.ActionDate
    LEFT JOIN #tmpOwnerNoDups appEmail ON ISNULL(initr.ApprovedBy, iniapprovedstage.ActionBy) = appEmail.oldOwnerName
    LEFT JOIN MaxApprovers maxap ON ini.id = maxap.InitiativeId AND appEmail.Email = maxap.ApproverEmail
    LEFT JOIN #tmptmpActionBy iniac ON iniac.InitiativeId = ini.Id

    WHERE ini.Id = @InitiativeId
    AND ISNULL(maxap.ApproverType, '') <> 'CFO'
    --AND ini.Stage <> 'App. Request'  -- temporary fix for not send mail to owner/creator if stage approved from BOD to App.Request
    AND (ISNULL(iniapprovedstage.Stage, '') NOT LIKE '%APP.%' AND ISNULL(iniapprovedstage.Stage, '') NOT LIKE '%APP %' AND ISNULL(iniapprovedstage.Stage, '') NOT LIKE '%WBS%' AND ISNULL(iniapprovedstage.Stage, '') NOT IN  ('Budget Pool','Budget Distribute'))
         
          AND ini.Id NOT IN (53679,65780)
		  group by  cloneProjectEn.OwnerName ,cloneProjectEnEmail.Email
END
GO

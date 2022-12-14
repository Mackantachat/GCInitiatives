/****** Object:  StoredProcedure [dbo].[sp_GetApproverInformation_Flow]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetApproverInformation_Flow]
	-- Add the parameters for the stored procedure here
	@initiativeId VARCHAR(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	--SELECT 
 --   (ini.id) AS InitiativeId
 --       ,(ini.InitiativeCode) AS InitiativeCode
 --       , (ini.Name) AS InitiativeName
 --       , (ini.Stage) AS Stage
 --       , (ini.Status) AS Status
 --       , (ini.OwnerName) AS OwnerName
 --       , LOWER(ownEmail.Email) AS OwnerEmail
 --       --, (maxap.ApproverType) AS Indicator
 --       ,'' AS Indicator
 --       , (det.Workstream) AS Workstream
 --       , ISNULL((creName.OwnerName),  LOWER(ini.CreatedBy)) AS CreatorName  
 --       , LOWER(ini.CreatedBy) AS CreatorEmail
 --       , LOWER(iniac.ActionBy) AS ApproversEmail
 --       , ISNULL(appName.OwnerName, LOWER(iniac.ActionBy)) AS ApproversName
 --       , '<a href="https://gcinitiative-front.azurewebsites.net/initiative/initiativeredirector?gotoId=' + CAST((ini.id) AS VARCHAR(50)) + '&gotoPage=approve">Click Here</a>' AS InitiativeLink
 --       FROM v_Initiatives ini
 --       LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
 --       INNER JOIN InitiativeActions iniac ON iniac.InitiativeId = ini.Id
 --       LEFT JOIN Owners creName ON ini.CreatedBy = creName.Email
 --       LEFT JOIN Owners appName ON iniac.ActionBy = appName.Email
 --       LEFT JOIN Owners ownEmail ON ini.OwnerName = ownEmail.OwnerName
 --       --LEFT JOIN MaxApprovers maxap ON maxap.InitiativeId = ini.Id AND maxap.ApproverEmail = iniac.ActionBy
        

 --       WHERE ini.Id = @initiativeId

        --GROUP BY iniac.ActionBy
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
            
        SELECT DISTINCT
    (ini.id) AS InitiativeId
    ,ISNULL((ini.Organization), '') AS Organization
    ,ISNULL((ownEmail.DepTextEN + ' (' + ownEmail.DepShortTextEN + ')'), '') AS Department
    ,ISNULL((yrs.YearOverall), 0) AS ProjectCost
        ,(ini.InitiativeCode) AS InitiativeCode
        , (ini.Name) AS InitiativeName

         --,  ISNULL(inistage.Stage, ISNULL((ini.Stage), '')) AS Stage
		,CASE WHEN RIGHT(ISNULL(inistage.Stage, ISNULL((ini.Stage), '')),2) in ('-1','-2','-3') THEN 
			substring(ISNULL(inistage.Stage, ISNULL((ini.Stage), '')),1,len(ISNULL(inistage.Stage, ISNULL((ini.Stage), '')))-2) 
		 ELSE 
			ISNULL(inistage.Stage, ISNULL((ini.Stage), '')) 
		 END AS Stage

        , ISNULL(inistage.Status,  ISNULL((ini.Status), '')) AS Status
        , dbo.HtmlEncode(ini.OwnerName) AS OwnerName
        , LOWER(ownEmail.Email) AS OwnerEmail

		-- เพิ่ม isnull Indicator// กับ TO Team Nok 30 jul
        --, ISNULL(maxap.ApproverType,'Admin')  AS Indicator
		, Case 
		when maxap.ApproverType = 'TOTeam' then 'TO Team'
		else ISNULL(maxap.ApproverType,'Admin')  end AS Indicator
        , ISNULL((det.Workstream), '') AS Workstream
        , ISNULL(dbo.HtmlEncode(creName.OwnerName),  LOWER(ini.CreatedBy)) AS CreatorName  
        , LOWER(ini.CreatedBy) AS CreatorEmail
        , LOWER(iniac.ActionBy) AS ApproversEmail
        , ISNULL(dbo.HtmlEncode(appName.OwnerName), LOWER(iniac.ActionBy)) AS ApproversName
        , '<a href="https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoId=' + CAST((ini.id) AS VARCHAR(50)) + '&gotoPage=approve">Click Here</a>' AS InitiativeLink
        , ISNULL((bumap.Description + '(' + bumap.BU + ')'), '') AS BU
        , ISNULL(ini.CostEstCapex, 0) AS CostEstimate
        , ISNULL(ini.TypeOfInvestment, '') AS TypeOfInvestment
        , ISNULL(det.President, '') AS VPName
        , ISNULL(ini.CommentCancelled, '') AS CancellationComment
        FROM v_Initiatives ini
        LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId
        INNER JOIN InitiativeActions iniac ON iniac.InitiativeId = ini.Id AND ISNULL(iniac.IsInactive, 'false') = 'false' AND ISNULL(iniac.ActionResult, '') = '' AND ISNULL(iniac.Counter, -1) = (SELECT MAX(Counter) FROM InitiativeActions WHERE InitiativeId = ini.Id AND ISNULL(IsInactive, 'false') = 'false' AND ISNULL(ActionResult, '') = '')
        --LEFT JOIN Owners creName ON ini.CreatedBy = creName.Email
        --LEFT JOIN Owners appName ON iniac.ActionBy = appName.Email
        --LEFT JOIN Owners ownEmail ON ini.OwnerName = ownEmail.OwnerName
        LEFT JOIN #tmpOwnerNoDups creName ON ini.CreatedBy = creName.Email
        LEFT JOIN #tmpOwnerNoDups appName ON iniac.ActionBy = appName.Email
        LEFT JOIN #tmpOwnerNoDups ownEmail ON ini.OwnerName = ownEmail.oldOwnerName
        LEFT JOIN CapexInformations cap ON ini.Id = cap.InitiativeId AND cap.Revistion = (SELECT TOP 1 MAX(Revistion) FROM CapexInformations WHERE InitiativeId = @initiativeId)
        LEFT JOIN AnnualInvestmentPlans yrs ON yrs.CapexInformationId = cap.CapexInformationId AND yrs.PlanType = 'SumTotalBaht' AND yrs.InitiativeId = INI.Id       
        LEFT JOIN BUMapping bumap ON bumap.BU = ownEmail.FNShortTextEN
        LEFT JOIN InitiativeStage inistage ON inistage.InitiativeId = ini.Id AND inistage.FlowType = iniac.FlowType
        LEFT JOIN MaxApprovers maxap ON maxap.InitiativeId = ini.Id AND maxap.ApproverEmail = iniac.ActionBy AND 1 = dbo.fn_MaxApproverWithIndicator(ini.InitiativeType, ISNULL(inistage.Stage, ISNULL((ini.Stage), '')), maxap.ApproverType)

        WHERE ini.Id = @initiativeId
		--AND dbo.fn_GetRealStage(ini.Id) <> 'IL3-2'
        AND ISNULL(maxap.ApproverType, '') <> 'CFO'
        AND
                NOT (ISNULL(cap.BetweenYear, '') = 'Pool Budget' AND ISNULL(ini.Stage, '') = 'BOD')
        AND LOWER(iniac.ActionBy) <> LOWER('NOREPLY-FROM-IDEAMANISYSTEM@PTTGCGROUP.COM')  -- prevent send mail to system
        AND ini.Id NOT IN (53679)

        --AND ini.Stage <> 'App. Request'  -- temporary fix for not send mail to owner/creator if stage approved from BOD to App.Request
END




GO

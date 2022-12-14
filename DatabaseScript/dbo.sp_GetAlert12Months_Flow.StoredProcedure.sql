/****** Object:  StoredProcedure [dbo].[sp_GetAlert12Months_Flow]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetAlert12Months_Flow]
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
     SELECT 
--DATEDIFF(MONTH, GETDATE() ,DATEADD(MONTH , 12, FirstRunRateMonth)) AS dif
--,CONVERT(VARCHAR(10), GETDATE(), 120) AS thisnow
--,DATEADD(MONTH , 12, FirstRunRateMonth) AS add12
--,FirstRunRateMonth
(ini.id) AS InitiativeId
,(ini.InitiativeCode) AS InitiativeCode
, '' AS Indicator
, '' AS Workstream
,(ini.Name) AS InitiativeName
,(ini.Stage) AS NowStage
,(ini.Status) AS Status
,dbo.HtmlEncode(ini.OwnerName) AS OwnerName
,LOWER(ownEmail.Email) AS OwnerEmail
,ISNULL(dbo.HtmlEncode(creName.OwnerName),  LOWER(ini.CreatedBy)) AS CreatorName
,LOWER(ini.CreatedBy) AS CreatorEmail
, '<a href="https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoId=' + CAST(ini.id AS VARCHAR(50)) + '&gotoPage=edit">Click Here</a>' AS InitiativeLink
FROM v_Initiatives ini 
INNER JOIN ImpactTrackings imtr ON imtr.Initiativeid = ini.id
LEFT JOIN #tmpOwnerNoDups creName ON ini.CreatedBy = creName.Email
LEFT JOIN #tmpOwnerNoDups ownEmail ON ini.OwnerName = ownEmail.oldOwnerName
LEFT JOIN PerformanceInactive per ON per.InitiativeCode = ini.InitiativeCode AND DATEADD(HOUR, 7, GETDATE()) BETWEEN per.FromDate AND per.ToDate  -- with in period time only

WHERE
  DATEDIFF(MONTH, GETDATE() ,DATEADD(MONTH , 12, FirstRunRateMonth)) > 0  -- start from create and no more than 12 months (1 year)
  AND ini.Stage IN ('IL4','IL5')
  AND ISNULL(per.BenefitTracking , 'false') = 'false'
        


END
GO

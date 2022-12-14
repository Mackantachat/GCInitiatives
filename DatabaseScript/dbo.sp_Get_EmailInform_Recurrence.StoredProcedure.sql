/****** Object:  StoredProcedure [dbo].[sp_Get_EmailInform_Recurrence]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_Get_EmailInform_Recurrence]
(
    @initiativeId NVARCHAR(150),
    @informType NVARCHAR(150),
    @year NVARCHAR(150)
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



    -- Insert statements for procedure here
    SELECT DISTINCT
        own.Email AS Email,
        dbo.HtmlEncode(own.OwnerName) AS OwnerName,
        ini.InitiativeCode AS InitiativeCode,
        dbo.HtmlEncode(ini.Name) AS Name,
        --'<a href="https://ideamani.pttgcgroup.com/initiative/kpi?id=' + CAST(ik.InitiativeId AS VARCHAR(100)) + '&year=' + CAST(ik.Year AS VARCHAR(100)) + '">Click Here</a>'  AS UrlLink,
        --'<a href="https://ideamani.pttgcgroup.com/initiative/kpi-maintain">Click Here</a>'  AS KpiMaintainLink,
		'<a href="https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoPage=kpi&gotoId=' + CAST(ik.InitiativeId AS VARCHAR(100)) + '&year=' + CAST(ik.Year AS VARCHAR(100)) + '">Click Here</a>'  AS UrlLink,
		'<a href="https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoPage=kpi-maintain"">Click Here</a>'  AS KpiMaintainLink,
        DATENAME(MONTH, DATEADD(MONTH, -1, GETDATE())) AS PrevMonth,
        DATENAME(MONTH, GETDATE()) AS CurrentMonth
    FROM InformKri ik
    INNER JOIN v_Initiatives ini ON ini.Id = ik.InitiativeId
    INNER JOIN Owners own ON own.OwnerName = ik.OwnerName
    WHERE 
    ik.InformType = @informType
END
GO

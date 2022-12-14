/****** Object:  StoredProcedure [dbo].[sp_GetInformationProjectEngineer]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetInformationProjectEngineer]
(
    -- Add the parameters for the stored procedure here
    @initiativeId NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    
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
        Name AS Name,
        projen.Email AS ProjectEngineerEmail,
        dbo.HtmlEncode(det.ProjectEngineer) AS ProjectEngineer,
        '<a href="https://ideamani.pttgcgroup.com/initiative/initiativeredirector?gotoId=' + CAST((ini.id) AS VARCHAR(50)) + '&gotoPage=edit">Click Here</a>' AS InitiativeLink,
        ini.Stage,
        ini.Status,
        ini.InitiativeCode,
        ini.UpdatedBy,
        dbo.HtmlEncode(ini.OwnerName) AS UpdatedByName
    FROM v_Initiatives ini
    INNER JOIN DetailInformations det ON det.InitiativeId = ini.Id
    LEFT JOIN #tmpOwnerNoDups updatedBy ON updatedBy.Email = ini.UpdatedBy
    LEFT JOIN #tmpOwnerNoDups projen ON projen.OwnerName = det.ProjectEngineer 
    LEFT JOIN InitiativeActions iniac ON iniac.InitiativeId = ini.Id AND iniac.ActionBy = projen.Email AND ISNULL(ActionResult, '') = '' AND ISNULL(IsInactive, 'false') = 'false' -- prevent send mail and cannot in edit mode  by checking from initiativeactions
    WHERE 
    ini.Id = @initiativeId
    AND ini.InitiativeType IN ('max','pim','directCapex')
    AND projen.Email IS NOT NULL
    AND iniac.Id IS NOT NULL

END
GO

/****** Object:  StoredProcedure [dbo].[sp_SetSIL4SIL5AcheivementImpactTrackings]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_SetSIL4SIL5AcheivementImpactTrackings]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    

    SELECT
        ini.id,
        ini.InitiativeCode,
        imp.SIL4Achievement,
        CAST(YEAR(GETDATE()) AS NVARCHAR(4))

        --UPDATE imp
        --SET imp.SIL4Achievement = CAST(YEAR(GETDATE()) AS NVARCHAR(4))
    FROM v_Initiatives ini
    INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
    WHERE ISNULL(ini.Stage, '') IN ('SIL4','IL4','SIL5','IL5') AND ISNULL(imp.SIL4Achievement, '') = ''





    SELECT
        ini.id,
        ini.InitiativeCode,
        imp.SIL5Achievement,
        CAST(YEAR(GETDATE()) AS NVARCHAR(4))

        --UPDATE imp
        --SET imp.SIL5Achievement = CAST(YEAR(GETDATE()) AS NVARCHAR(4))
    FROM v_Initiatives ini
    INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
    WHERE ISNULL(ini.Stage, '') IN ('SIL5','IL5') AND ISNULL(imp.SIL5Achievement, '') = ''




END
GO

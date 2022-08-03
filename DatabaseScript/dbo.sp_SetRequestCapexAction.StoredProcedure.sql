/****** Object:  StoredProcedure [dbo].[sp_SetRequestCapexAction]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_SetRequestCapexAction]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    -- logic update Field CapexTabStatus  = 1 (open tab and can edit)

    UPDATE ini SET ini.CapexTabStatus = 1 FROM Initiatives ini WHERE Id = @initiativeId




END
GO

/****** Object:  StoredProcedure [dbo].[sp_SetIL0Date]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
 CREATE PROCEDURE [dbo].[sp_SetIL0Date]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT,
    @flowType NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

	DECLARE @IL0Date datetime = (select UpdatedDate from initiatives where id = @initiativeId)

    update det set det.IL0date = @IL0Date
	from DetailInformations det where det.InitiativeId = @initiativeId

    --SELECT 1;
END
GO

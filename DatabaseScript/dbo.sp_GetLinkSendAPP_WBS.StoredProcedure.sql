/****** Object:  StoredProcedure [dbo].[sp_GetLinkSendAPP_WBS]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetLinkSendAPP_WBS]
(
    -- Add the parameters for the stored procedure here
   @initiativeId INT,
   @sendType NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    SELECT
    '<a href="https://ideamani.pttgcgroup.com/initiative/generateappwbs?id=' + CAST(@initiativeId AS NVARCHAR(150)) + '&createType=' + @sendType + '">Click Here To Create ' + @sendType + ' Request</a>' AS URLLink,
        own.Email AS Email
    FROM v_Initiatives ini
    LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName
    WHERE ini.Id = @initiativeId

    UNION

    SELECT
    '<a href="https://ideamani.pttgcgroup.com//initiative/generateappwbs?id=' + CAST(@initiativeId AS NVARCHAR(150)) + '&createType=' + @sendType + '">Click Here To Create ' + @sendType + ' Request</a>' AS URLLink,
        ini.CreatedBy  AS Email
    FROM v_Initiatives ini
    WHERE ini.Id = @initiativeId


END
GO

/****** Object:  StoredProcedure [dbo].[sp_ORG_GetOwnerCreatorByInitiativeId]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_ORG_GetOwnerCreatorByInitiativeId]
(
    -- Add the parameters for the stored procedure here
    @initiativeID AS NVARCHAR(150)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here

    -- get owner email / creator email
    SELECT
        MAX(ini.OwnerName) AS OwnerName,
        MAX(own.Email) AS OwnerEmail  
    FROM v_Initiatives ini 
    LEFT JOIN Owners own ON ini.OwnerName = own.OwnerName 
    WHERE ini.Id = @initiativeID

    UNION

    SELECT
        MAX(cre.OwnerName) AS CreatorName,
        MAX(ini.CreatedBy) AS CreatorEmail    
    FROM v_Initiatives ini 
    LEFT JOIN Owners cre ON ini.CreatedBy = cre.Email
    WHERE ini.Id = @initiativeID;

END
GO

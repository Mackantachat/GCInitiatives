/****** Object:  StoredProcedure [dbo].[sp_GetIsViewSubmittoForm]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetIsViewSubmittoForm]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT,
    @email NVARCHAR(300)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    DECLARE @EmailReturn NVARCHAR(150) = '';

    
    -- Insert statements for procedure here
    
    
    IF EXISTS(
                SELECT
                    um.EMail,
                    uw.WorkstreamTitle,
                    rm.RoleId,
                    SectionId
                    FROM 
                        UserManagements um
                        INNER JOIN UserRoles ur ON ur.UserId = um.Id
                        INNER JOIN RoleManagements rm ON rm.RoleId = ur.RoleId
                        INNER JOIN UserWorkstreams uw ON uw.UserId = um.Id
                        INNER JOIN DetailInformations det ON det.Workstream = uw.WorkstreamTitle
                    WHERE rm.SectionId = 'S00001' AND det.InitiativeID = @initiativeId AND um.Email = @email
    )
    BEGIN
        SET @EmailReturn = @email;
    END

    IF(ISNULL(@EmailReturn, '') = '')
    BEGIN
        IF EXISTS(
            SELECT *
            FROM v_Initiatives ini
            LEFT JOIN Owners own ON own.Email = ini.CreatedBy OR own.OwnerName = ini.OwnerName
            WHERE ini.Id = @initiativeId AND own.Email = @email
        )
        BEGIN
            SET @EmailReturn = @email;
        END
    END


    IF EXISTS(
            SELECT *
            FROM v_Initiatives ini
            WHERE ini.Id = @initiativeId
            AND (ISNULL(ini.Stage, '') IN ('cancelled','rejected','reject') OR ISNULL(ini.Status, '') IN ('rejected','reject','cancelled'))
        )
    BEGIN
        SET @EmailReturn = '';
    END

    --SELECT TOP 1 @EmailReturn = OwnerName FROM Owners WHERE Email = @email

    --IF(ISNULL(@EmailReturn, '') = '')
    --BEGIN
    --    SELECT TOP 1 @EmailReturn = Email FROM UserManagements WHERE Email = @email
    --END

    SELECT CASE WHEN ISNULL(@EmailReturn, '') <> '' THEN 'true' ELSE 'false' END
END
GO

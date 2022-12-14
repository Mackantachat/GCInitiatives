/****** Object:  StoredProcedure [dbo].[sp_ShowRiskTab]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_ShowRiskTab]
(
    @initiativeId INT,
    @flowType NVARCHAR(150)
)
AS
BEGIN

    SET NOCOUNT ON

    UPDATE ini 
    SET
    ini.RiskTabStatus              = 1
    FROM Initiatives ini
    WHERE ini.Id = @initiativeId
END;
GO

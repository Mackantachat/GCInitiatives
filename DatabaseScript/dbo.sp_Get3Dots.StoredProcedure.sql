/****** Object:  StoredProcedure [dbo].[sp_Get3Dots]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_Get3Dots]
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

    -- Insert statements for procedure here
    
    DECLARE @tmpReturnData TABLE (
                                    Id INT IDENTITY(1, 1) primary key ,
                                    IsAddMore BIT,
                                    IsRevise BIT,
                                    IsReturn BIT
                                    )    

    INSERT INTO @tmpReturnData(IsAddMore)
    EXEC sp_GetIsAddMore @initiativeId, @flowType

    INSERT INTO @tmpReturnData(IsRevise)
    EXEC sp_GetIsRevise @initiativeId, @flowType

    INSERT INTO @tmpReturnData(IsReturn)
    EXEC sp_GetIsReturn @initiativeId, @flowType



    UPDATE @tmpReturnData SET IsAddMore = (SELECT IsAddMore FROM @tmpReturnData WHERE Id = 1)
    UPDATE @tmpReturnData SET IsRevise =  (SELECT IsRevise FROM @tmpReturnData WHERE Id = 2)
    UPDATE @tmpReturnData SET IsReturn =  (SELECT IsReturn FROM @tmpReturnData WHERE Id = 3)


    IF NOT EXISTS(SELECT * FROM @tmpReturnData )
        BEGIN
            SELECT
            0 AS IsAddMore,
            0 AS IsRevise,
            0 AS IsReturn

        RETURN;
        END


    SELECT TOP 1
        ISNULL(IsAddMore, 'false' ) AS IsAddMore,
        ISNULL(IsRevise, 'false' ) AS IsRevise,
        ISNULL(IsReturn , 'false' ) AS IsReturn 
    FROM @tmpReturnData
    WHERE Id = 1

END
GO

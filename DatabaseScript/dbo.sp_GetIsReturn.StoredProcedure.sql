/****** Object:  StoredProcedure [dbo].[sp_GetIsReturn]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetIsReturn]
(
    @initiativeId INT,
    @flowType NVARCHAR(50) = ''
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    DECLARE @nowStage NVARCHAR(150) = '';
    DECLARE @nowStatus NVARCHAR(150) = '';
    DECLARE @returnData NVARCHAR(50) = 'false';
    DECLARE @isHasCapexRecordCreateNew BIT = 'false' -- for check record of requestcapex 


    if(@flowType NOT IN ('initiative', '')) 
    BEGIN
        SELECT @returnData;
        RETURN;
    END

    SELECT 
        @nowStage = Stage,
        @nowStatus = Status 
    FROM 
        InitiativeStage inis
    WHERE 
        InitiativeId = @initiativeId
        AND FLowType IN ('addmore', 'revise', 'return')
        AND ISNULL(Status, '') NOT IN ('finish','rejected','cancelled','')

    IF(ISNULL(@nowStatus, '') <> '')  --case กำลังขอ ทำ parallel approve flow รันอยู่ ห้ามกดเพิ่ม
        RETURN; 

    IF (NOT EXISTS(SELECT InitiativeId FROM CapexInformations WHERE CapexType IN ('CreateNew', 'Requestpool') AND InitiativeID = @initiativeId))
    RETURN;

    SELECT 
        @nowStage = Stage,
        @nowStatus = Status 
    FROM 
        v_Initiatives 
    WHERE 
        Id = @initiativeId

    SELECT TOP 1
        @returnData = CASE WHEN Attribute05 = '1' THEN 'true' ELSE 'false' END
    FROM 
        CommonData 
    WHERE 
        DataType = 'stagestatusaction3dots' 
        AND Attribute01 = @nowStage 
        AND Attribute02 = @nowStatus
    

    SELECT @returnData;
END
GO

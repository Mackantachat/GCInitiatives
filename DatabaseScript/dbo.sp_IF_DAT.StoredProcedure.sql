/****** Object:  StoredProcedure [dbo].[sp_IF_DAT]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_IF_DAT]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON
if exists (select initiativetype from v_Initiatives where id = @initiativeId and InitiativeType =  'Request Pool')
--if exists (select initiativetype from v_Initiatives where id = @initiativeId and (InitiativeType in  ('Request Pool', 'directCapex')))
 Begin --select * from v_Initiatives where 1 = 0
		INSERT INTO 
			[dbo].[DevLog] (LogDateTime, ProcessName, Details, InitiativeId) 
		VALUES 
			(GETDATE(), 'DAT', 'Request Pool or directCapex', @initiativeId)

 end
 else
 begin
SELECT
   
   [Project Definition]  
,  [WBS]    
,  [Basic Start Date] 
,  [Basic Finish Date] 
,  [Actual Start Date ] 

FROM [v_if_DAT] 
WHERE 
[LineNo] <2 OR[InitiativesID] = @initiativeId
ORDER BY [LineNo]
END
end
GO

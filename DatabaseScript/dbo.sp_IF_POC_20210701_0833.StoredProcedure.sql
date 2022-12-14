/****** Object:  StoredProcedure [dbo].[sp_IF_POC_20210701_0833]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[sp_IF_POC_20210701_0833]
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
 Begin select * from v_Initiatives where 1 = 0

 end
 else
 begin    
SELECT 
 [WBS Element]
,[POC Weight]
,[Plan/Actual]
,[Year]
,[Period1]
,[Period2]
,[Period3]
,[Period4]
,[Period5]
,[Period6]
,[Period7]
,[Period8]
,[Period9]
,[Period10]
,[Period11]
,[Period12]
FROM v_if_POC 
WHERE [LineNo] <2 OR[InitiativesID] = @initiativeId
ORDER BY [LineNo]
end
END
GO

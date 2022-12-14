/****** Object:  StoredProcedure [dbo].[sp_IF_PLA_20210705_1015]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE PROCEDURE [dbo].[sp_IF_PLA_20210705_1015]
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
 if exists (select initiativetype from v_Initiatives where id = @initiativeId and InitiativeType =  'Request Pool')
 Begin select * from v_Initiatives where 1 = 0

 end
 else
 begin  
--SELECT 
-- [WBS Element]
--,[Plan Version]
--,[Cost element]
--,[Year]
--,[Period1]
--,[Period2]
--,[Period3]
--,[Period4]
--,[Period5]
--,[Period6]
--,[Period7]
--,[Period8]
--,[Period9]
--,[Period10]
--,[Period11]
--,[Period12]
--FROM v_if_PLA
--WHERE [LineNo] <2 OR[InitiativesID] = @initiativeId
--ORDER BY [LineNo]

---- แม็กปรับแก้ข้อมูลดัก Case when เพื่อดักให้ส่ง Null แทน 0
SELECT 
 [WBS Element]
,[Plan Version]
,[Cost element]
,[Year]
,case	when [Period1] <> '0.00' then [Period1]
		else Null End as 'Period1'
,case	when [Period2] <> '0.00' then [Period2]
		else Null End as 'Period2'
,case	when [Period3] <> '0.00' then [Period3]
		else Null End as 'Period3'
,case	when [Period4] <> '0.00' then [Period4]
		else Null End as 'Period4'
,case	when [Period5] <> '0.00' then [Period5]
		else Null End as 'Period5'
,case	when [Period6] <> '0.00' then [Period6]
		else Null End as 'Period6'
,case	when [Period7] <> '0.00' then [Period7]
		else Null End as 'Period7'
,case	when [Period8] <> '0.00' then [Period8]
		else Null End as 'Period8'
,case	when [Period9] <> '0.00' then [Period9]
		else Null End as 'Period9'
,case	when [Period10] <> '0.00' then [Period10]
		else Null End as 'Period10'
,case	when [Period11] <> '0.00' then [Period11]
		else Null End as 'Period11'
,case	when [Period12] <> '0.00' then [Period12]
		else Null End as 'Period12'
FROM v_if_PLA
WHERE [LineNo] <2 OR[InitiativesID] = @initiativeId
ORDER BY [LineNo]


end



END
GO

/****** Object:  StoredProcedure [dbo].[sp_ChangeWorkstreamNameInvolve]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_ChangeWorkstreamNameInvolve]
(
    -- Add the parameters for the stored procedure here
    @initiativeid int 
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    -- logic update Field CapexTabStatus  = 1 (open tab and can edit)

    --INSERT INTO tmp_CheckExexuteStored(InitiativeId, FlowType, CurrentStage, CurrentStatus, StoredType)
    --SELECT Id, @flowType, Stage, STatus, 'PreStage' FROM v_Initiatives WHERE Id = @initiativeId


   

select * 
--update s set s.WorkStreamTitle = 'Digital (Non WS)' , s.subworkstream1 = 'Digital (Non WS)'
from SubWorkstreams s where WorkStreamTitle = 'health'

select * 
--update s set s.subworkstream2 = 'Digital (Non WS) - Green'
from SubWorkstreams s where subworkstream2 = 'Health - Green'

select * 
--update s set s.subworkstream2 = 'Digital (Non WS) - Multiple BUs'
from SubWorkstreams s where subworkstream2 = 'Health - Multiple BUs'


 select *
--update s set s.WorkStreamTitle = 'Digital (Non WS)'
FROM [dbo].[WorkStreams] s where WorkStreamTitle = 'health'



select subworkstream1,subworkstream2,* 
--update det set det.workstream = 'Digital (Non WS)' , det.subworkstream1 = 'Digital (Non WS)'
from DetailInformations det where Workstream  =  'health'


select subworkstream1,subworkstream2,* 
--update det set det.subworkstream2 = 'Digital (Non WS) - Multiple BUs'
from DetailInformations det where subworkstream2  =  'Health - Multiple BUs'


select * 
--update s set s.WorkstreamValue = 'Digital (Non WS)'
from MaxApproverSettings s where WorkstreamValue like  'health'


select *  
--update s set s.WorkstreamValue = 'Digital (Non WS) - Multiple BUs'
from MaxApproverSettings s where WorkstreamValue like  'Health - Multiple BUs'

select * 
--update s set s.WorkstreamValue = 'Digital (Non WS) - Green'
from MaxApproverSettings s where WorkstreamValue like  'Health - Green'
    --SELECT 1;
END
GO

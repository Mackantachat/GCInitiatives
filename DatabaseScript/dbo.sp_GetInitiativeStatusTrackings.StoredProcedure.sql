/****** Object:  StoredProcedure [dbo].[sp_GetInitiativeStatusTrackings]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetInitiativeStatusTrackings]
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
    
    SELECT DISTINCT
    ist.InitiativeId AS InitiativeId             
    ,ist.ProcessType AS ProcessType              
    ,ist.SubType AS SubType                  
    ,ist.ApprovedBy AS ApprovedBy               
    ,ist.ApprovedDate AS ApprovedDate             
    ,ist.FlowType AS FlowType                 
    ,ist.HistoryId AS HistoryId                
    ,ist.RunningSequence AS RunningSequence          
    ,ist.Sequence AS Sequence                 
    ,ist.Stage AS Stage                    
    ,ist.Status AS Status                   
    ,std.CurrentActionInformation AS CurrentActionInformation 
    ,std.CurrentStageDisplay AS CurrentStageDisplay      
    ,std.NextActionInformation AS NextActionInformation   
    FROM InitiativeStatusTrackings ist 
    LEFT JOIN InitiativeStageDetail std ON std.InitiativeId = ist.InitiativeId 
                                        AND std.Event = 'createnew'
                                        AND std.CurrentStage = ist.Stage
                                        AND std.FlowType = ist.FlowType
                                        AND std.Subtype = ist.SubType
                                        AND std.Process = ist.ProcessType

    WHERE ist.InitiativeId = @initiativeId
    ORDER BY ist.RunningSequence

END
GO

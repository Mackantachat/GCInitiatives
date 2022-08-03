
UPDATE [dbo].[InitiativeStageDetail]
   SET [NextStage] = 'Update Progress'
 WHERE Id = 240995
GO

UPDATE [dbo].[InitiativeStageDetail]
   SET [NextStatus] = 'wait for update'
 WHERE Id = 240995
GO


INSERT INTO [dbo].[InitiativeStageDetail]
           ([InitiativeStageDetailId]
           ,[InitiativeId]
           ,[Event]
           ,[Process]
           ,[FlowType]
           ,[Subtype]
           ,[CurrentStage]
           ,[CurrentStatus]
           ,[NextStage]
           ,[NextStatus]
           ,[ReviseStage]
           ,[ReviseStatus]
           ,[RejectStage]
           ,[RejectStatus]
           ,[BackwardStage]
           ,[BackwardStatus]
           ,[CancelStage]
           ,[CancelStatus]
           ,[Sequence]
           ,[NextCondition]
           ,[HistoryId]
           ,[IsCreateType]
           ,[IsSwitchProcess]
           ,[PostStageStoredProcedure]
           ,[PreStageStoredProcedure]
           ,[CurrentActionInformation]
           ,[CurrentStageDisplay]
           ,[NextActionInformation]
           ,[SwitchProcessStage]
           ,[SwitchProcessStatus])
     VALUES
           (402519
           ,73177
           ,'createnew'
           ,'directCapex'
           ,'initiative'
           ,'normal'
           ,'Update Progress'
           ,'wait for update'
           ,'Complete'
           ,'finish'
           ,'Update Progress'
           ,'wait for update'
           ,'cancelled'
           ,'rejected'
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,13
           ,'@Submit'
           ,0
           ,NULL
           ,NULL
           ,''
           ,''
           ,''
           ,NULL
           ,''
           ,NULL
           ,NULL)
GO

INSERT INTO [dbo].[InitiativeStageDetail]
           ([InitiativeStageDetailId]
           ,[InitiativeId]
           ,[Event]
           ,[Process]
           ,[FlowType]
           ,[Subtype]
           ,[CurrentStage]
           ,[CurrentStatus]
           ,[NextStage]
           ,[NextStatus]
           ,[ReviseStage]
           ,[ReviseStatus]
           ,[RejectStage]
           ,[RejectStatus]
           ,[BackwardStage]
           ,[BackwardStatus]
           ,[CancelStage]
           ,[CancelStatus]
           ,[Sequence]
           ,[NextCondition]
           ,[HistoryId]
           ,[IsCreateType]
           ,[IsSwitchProcess]
           ,[PostStageStoredProcedure]
           ,[PreStageStoredProcedure]
           ,[CurrentActionInformation]
           ,[CurrentStageDisplay]
           ,[NextActionInformation]
           ,[SwitchProcessStage]
           ,[SwitchProcessStatus])
     VALUES
           (402520
           ,73177
           ,'createnew'
           ,'directCapex'
           ,'initiative'
           ,'normal'
           ,'Completed'
           ,'finish'
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,14
           ,'#endflow|@submit'
           ,0
           ,NULL
           ,NULL
           ,''
           ,''
           ,''
           ,NULL
           ,NULL
           ,NULL
           ,NULL)
GO

INSERT INTO [dbo].[InitiativeStageActionDetail]
           ([InitiativeStageDetailId]
           ,[InitiativeId]
           ,[ActionType]
           ,[ActionBy])
     VALUES
           (402519
           ,73177
           ,'edit'
           ,'@owner/@creator/@projecteng')
GO

INSERT INTO [dbo].[InitiativeStageActionDetail]
           ([InitiativeStageDetailId]
           ,[InitiativeId]
           ,[ActionType]
           ,[ActionBy])
     VALUES
           (402520
           ,73177
           ,'edit'
           ,'@owner/@creator/@projecteng')
GO

INSERT INTO [dbo].[InitiativeActions]
           ([ActionBy]
           ,[Action]
           ,[Position]
           ,[Status]
           ,[Stage]
           ,[InitiativeId]
           ,[ActionByName]
           ,[ConditionType]
           ,[Counter]
           ,[Indicator]
           ,[ActionResult]
           ,[FlowType]
           ,[InitiativeStageDetailId]
           ,[IsInactive]
           ,[ActionDate]
           ,[SwitchToProcess])
     VALUES
           ('UTHAI.PO@PTTGCGROUP.COM'
           ,'edit'
           ,'@owner/@creator/@projecteng'
           ,'wait for update'
           ,'Update Progress'
           ,73177
           ,'UTHAI.PO <A-P2-AU/3032>'
           ,NULL
           ,13
           ,'@owner/@creator/@projecteng'
           ,NULL
           ,'initiative'
           ,402519
           ,NULL
           ,NULL
           ,NULL)
GO

INSERT INTO [dbo].[InitiativeActions]
           ([ActionBy]
           ,[Action]
           ,[Position]
           ,[Status]
           ,[Stage]
           ,[InitiativeId]
           ,[ActionByName]
           ,[ConditionType]
           ,[Counter]
           ,[Indicator]
           ,[ActionResult]
           ,[FlowType]
           ,[InitiativeStageDetailId]
           ,[IsInactive]
           ,[ActionDate]
           ,[SwitchToProcess])
     VALUES
           ('PARINYA.K@PTTGCGROUP.COM'
           ,'edit'
           ,'@owner/@creator/@projecteng'
           ,'wait for update'
           ,'Update Progress'
           ,73177
           ,'PARINYA.K <TP-PQ-CE/1360>'
           ,NULL
           ,13
           ,'@owner/@creator/@projecteng'
           ,NULL
           ,'initiative'
           ,402519
           ,NULL
           ,NULL
           ,NULL)
GO

UPDATE [dbo].[InitiativeStatusTrackings]
   SET [ApprovedBy] = NULL
 WHERE Id = 459499
GO

INSERT INTO [dbo].[InitiativeStatusTrackings]
           ([Status]
           ,[Stage]
           ,[ApprovedBy]
           ,[ApprovedDate]
           ,[Sequence]
           ,[ProcessType]
           ,[HistoryId]
           ,[InitiativeId]
           ,[RunningSequence]
           ,[SubType]
           ,[FlowType])
     VALUES
           ('In Progress'
           ,'Update Progress'
           ,NULL
           ,NULL
           ,22
           ,'directCapex'
           ,0
           ,73177
           ,21
           ,'normal'
           ,'initiative')
GO

INSERT INTO [dbo].[InitiativeStatusTrackings]
           ([Status]
           ,[Stage]
           ,[ApprovedBy]
           ,[ApprovedDate]
           ,[Sequence]
           ,[ProcessType]
           ,[HistoryId]
           ,[InitiativeId]
           ,[RunningSequence]
           ,[SubType]
           ,[FlowType])
     VALUES
           ('Not Start'
           ,'Completed'
           ,NULL
           ,NULL
           ,24
           ,'directCapex'
           ,0
           ,73177
           ,23
           ,'normal'
           ,'initiative')
GO

UPDATE [dbo].[Initiatives]
   SET Stage = 'Update Progress'
 WHERE Id = 73177
GO

UPDATE [dbo].[Initiatives]
   SET Status = 'wait for update'
 WHERE Id = 73177
GO
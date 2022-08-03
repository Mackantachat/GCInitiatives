UPDATE [InitiativeStatusTrackings] SET [Status] = 'In Progress' WHERE Id =531683
UPDATE [InitiativeStatusTrackings] SET [ApprovedBy] = NULL WHERE Id =531683
UPDATE [InitiativeStatusTrackings] SET [ApprovedDate] = NULL WHERE Id =531683

UPDATE [InitiativeActions] SET [ActionResult] = NULL WHERE [Id] = 293819;
UPDATE [InitiativeActions] SET [ActionDate] = NULL WHERE [Id] = 293819;
UPDATE [InitiativeActions] SET [IsInactive] = NULL WHERE [Id] = 128752;

UPDATE [dbo].[Initiatives]
   SET Stage = 'Update Progress'
 WHERE Id = 79092
GO

UPDATE [dbo].[Initiatives]
   SET Status = 'wait for update'
 WHERE Id = 79092
GO
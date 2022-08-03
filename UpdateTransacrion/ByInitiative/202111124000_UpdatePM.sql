UPDATE DetailInformations 
set ProjectManager = 'KRIENGKRAI.B <TP-PQ-CE/1550>' 
  , ProjectEngineer = NULL 
  , DivMgrOfProcessEngineer = NULL
  , ProcessEngineer = NULL
where InitiativeId = 91572

UPDATE InitiativeActions
set ActionBy = 'KRIENGKRAI.B@PTTGCGROUP.COM'
  , ActionByName = 'KRIENGKRAI.B <TP-PQ-CE/1550>'
  , ActionResult = NULL
  , ActionDate = NULL
where Id =  255625

delete from InitiativeActions
where Id in (
  '262164'
, '288323'
, '288324'
, '288325')

UPDATE Initiatives
set Stage = 'Assign Project Eng.' where Id = 91572

UPDATE InitiativeStatusTrackings
set Status = 'Not Start' where Id = 757041

UPDATE InitiativeStatusTrackings
set Status = 'In Progress' 
  , ApprovedBy = NULL
  , ApprovedDate = NULL
where Id = 757042
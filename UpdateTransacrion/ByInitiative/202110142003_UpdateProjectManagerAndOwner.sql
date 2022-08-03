UPDATE DetailInformations
set ProjectManager = 'SUWATANANON.Y <O-MN2-CS/->'
  , ProjectEngineer = 'SUWATANANON.Y <O-MN2-CS/->'
where InitiativeId in ( 52543
  , 52756
  , 52990
  , 52989
  , 52984
  , 52988)

UPDATE Initiatives
set OwnerName = 'SUWATANANON.Y <O-MN2-CS/->' where Id = 52983
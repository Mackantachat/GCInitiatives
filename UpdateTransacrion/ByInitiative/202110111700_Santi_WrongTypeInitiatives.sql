--Check script for Update Direct Capex
--select top 100 DirectCapex,* from v_Initiatives
--where InitiativeCode = '2020-003836'



-- Script Update for wrong flag data
begin tran
update Initiatives set DirectCapex = '1' where Id = '61654'


--commit
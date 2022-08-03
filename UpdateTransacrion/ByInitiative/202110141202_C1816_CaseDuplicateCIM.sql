select top 100 Cim,* from v_Initiatives
where InitiativeCode in ('DRAFT2020-00272','DRAFT2020-00274')



begin tran

update Initiatives set Cim = '1' where Id in ('61050','61052') -- effect 2 rows


commit



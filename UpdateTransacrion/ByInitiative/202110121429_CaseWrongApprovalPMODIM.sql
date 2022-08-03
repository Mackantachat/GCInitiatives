

--check script for table InitiativeActions
select top 100 stage,status,* from InitiativeActions
where Id in ('303744','303959')
--check script for table InitiativeStatusTracking
select top 100 * from InitiativeStatusTrackings
where Id in ('840870','840346')



--delete script
begin tran
delete InitiativeStatusTrackings where Id in ('840870','840346')  --effect 2 rows
delete InitiativeActions where Id in ('303744','303959') -- effect 2 rows


commit

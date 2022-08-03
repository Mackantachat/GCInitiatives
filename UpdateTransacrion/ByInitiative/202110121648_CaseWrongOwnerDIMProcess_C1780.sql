
--script select for checking
select top 100 * from InitiativeActions
where InitiativeId = '48767'

select top 100 * from InitiativeStatusTrackings
where InitiativeId = '48767'

select top 100 stage,status,IsReviseFlow,* from Initiatives
where Id = '48767'


-- Step 
-- 1)Delete InitiativeActions and InitiativeStatusTracking
begin tran
delete InitiativeActions where Id = '310958' -- effect 1 rows
delete InitiativeStatusTrackings where Id = '912548' -- effect 1 rows
commit



-- 2) Update Initiative for display status
begin tran
update Initiatives set IsReviseFlow = 0 where Id = '48767' -- 1 rows effect
commit
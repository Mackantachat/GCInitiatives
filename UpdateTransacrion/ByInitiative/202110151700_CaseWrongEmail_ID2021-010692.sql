
--check script
select top 100 * from InitiativeActions
where Id = '311008'




--update script effect 1 rows
update InitiativeActions set ActionBy = 'WAROPHAT.K@PTTGCGROUP.COM', ActionByName = 'WAROPHAT.K <MD-SEC/8688>' where Id = '311008'

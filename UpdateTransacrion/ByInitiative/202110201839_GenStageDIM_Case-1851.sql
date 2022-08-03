
---1. update Table Initiatives
update Initiatives set Stage = 'Implement IL2 - DIM approved',Status = 'wait for CAPEX info'
where Id = 81000

---2. delete Table InitiativeStageDetail & Table InitiativeStageActionDetail
delete InitiativeStageDetail where InitiativeId = 81000
delete InitiativeStageActionDetail where InitiativeId = 81000


---3. EXEC [SP_GenEditFlow_Pim]
DECLARE	@return_value int

EXEC	@return_value = [dbo].[SP_GenEditFlow_Pim]
		@iniid = 81000,
		@stage = N'Implement IL2 - DIM approved',
		@status = N'wait for CAPEX info'

SELECT	'Return Value' = @return_value

GO

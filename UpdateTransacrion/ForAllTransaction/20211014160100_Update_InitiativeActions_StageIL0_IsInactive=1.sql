/****** Script for SelectTopNRows command from SSMS  ******/

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	DECLARE @Id int
	DECLARE	@stage nvarchar(255)
	DECLARE	@status nvarchar(255)

		SELECT Id,Stage,Status into #tmpInitiatives FROM [dbo].v_Initiatives where InitiativeType = 'max' and ISNULL(HistoryFlag,0) = 0  and Stage in ('IL0') and Status in ('approved') --and Id in (65194)
		DECLARE db_cursor CURSOR FOR 
		select Id,Stage,Status from #tmpInitiatives
		OPEN db_cursor
		FETCH NEXT FROM db_cursor INTO @Id ,@stage ,@status
		WHILE @@FETCH_STATUS = 0
		BEGIN
			if @stage = 'IL0' and @status = 'approved'
				begin
					
					DECLARE @CounterMax int = (select max(Counter) as 'Counter' from InitiativeActions where InitiativeId = @Id)
					--select @CounterMax
					select Id into #tmpidActions from InitiativeActions  where Counter = @CounterMax and InitiativeId = @Id --and Stage != 'IL0'
					--select * from #tmpidActions
					select Id into #tmpIDInitiativeActions from InitiativeActions where id not in (select * from #tmpidActions) and InitiativeId = @Id and ActionResult is null and IsInactive is null
				
					update InitiativeActions 
					set IsInactive = 1
					where Id in (select id from #tmpIDInitiativeActions)
					
					drop table #tmpidActions
					drop table #tmpIDInitiativeActions
				end
			FETCH NEXT FROM db_cursor INTO @Id ,@stage ,@status
		END
		CLOSE db_cursor  
		drop table #tmpInitiatives
		DEALLOCATE db_cursor 
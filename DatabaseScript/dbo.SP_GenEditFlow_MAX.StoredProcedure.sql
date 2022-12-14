/****** Object:  StoredProcedure [dbo].[SP_GenEditFlow_MAX]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[SP_GenEditFlow_MAX]
(
    -- Add the parameters for the stored procedure here
    @iniid int ,
	@stage nvarchar(255),
	@status nvarchar(255)
	
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON
-- Step 0 : Scope of Initiative to Generate --------------------------------------------------------------

DECLARE @initiativeIdList Table ( InitiativeId INT,counter int ,counterstatus int)
INSERT INTO @initiativeIdList (InitiativeId,counter,counterstatus)
SELECT 
ini.Id as InitiativeId,
max(isnull(ac.counter,'')),
max(isnull(st.sequence,0))
FROM Initiatives  ini
left join initiativeactions ac on ini.id = ac.initiativeid
left join InitiativeStatusTrackings st on ini.id = st.InitiativeId
WHERE ini.id in (@iniid)
group by ini.id

--select * from @initiativeIdList
select distinct divestment from initiatives
----------------------------------------------------------------------------------------------------------
-- Step 0 : Update Subflow /  --------------------------------------------------------------

--select stage,status,InitiativeSubType,*
update  ini set ini.stage = @stage , ini.status = @status , 
ini.InitiativeSubType  = 
case    when (isnull(ini.initiativetype,'') = 'pim' and isnull(ini.TypeOfInvestment,'') = 'Environment') then  'environment' 
		when (isnull(ini.initiativetype,'') = 'pim' and isnull(ini.TypeOfInvestment,'') <> 'Environment') then  'performance' 
		when (isnull(ini.initiativetype,'') = 'dim' and isnull(ini.typebenefit,'NON-FINANCIAL') = 'FINANCIAL') then  'normal'
		when (isnull(ini.initiativetype,'') = 'cim' and (isnull(ini.TypeOfInvestment,'') <> 'Divestment' or isnull(ini.divestment,'0') = '1')) then 'bigproject' --'divest'  'm&a,cvc' 		
		else 'normal' end

from Initiatives ini
inner join @initiativeIdList on InitiativeId = ini.Id 

select stage,status,InitiativeSubType,*
from Initiatives ini
inner join @initiativeIdList on InitiativeId = ini.Id 
----------------------------------------------------------------------------------------------------------
-- Step 2 : Insert InitiativestageDetail    --------------------------------------------------------------

DECLARE @maxInitiativeStageDetailId INT = (SELECT MAX(InitiativeStageDetailId) FROM InitiativeStageDetail)

INSERT INTO InitiativeStageDetail(InitiativeStageDetailId, InitiativeId, Event, Process, FlowType, Subtype, CurrentStage, CurrentStatus, NextStage, NextStatus, ReviseStage, ReviseStatus, RejectStage, RejectStatus, BackwardStage, BackwardStatus, CancelStage, CancelStatus, Sequence, NextCondition, HistoryId, IsCreateType, IsSwitchProcess, PostStageStoredProcedure, PreStageStoredProcedure, CurrentStageDisplay)
SELECT

ISNULL(@maxInitiativeStageDetailId, 0) + ROW_NUMBER() OVER (ORDER BY sm.Sequence)      AS InitiativeStageDetailId, 
ini.Id                 AS InitiativeId, 
sm.Event                        AS Event, 
ini.InitiativeType              AS Process, 
sm.FlowType                     AS FlowType, 
ini.InitiativeSubType           AS Subtype, 
sm.CurrentStage                 AS CurrentStage, 
sm.CurrentStatus                AS CurrentStatus, 
sm.NextStage                    AS NextStage, 
sm.NextStatus                   AS NextStatus, 
sm.ReviseStage                  AS ReviseStage, 
sm.ReviseStatus                 AS ReviseStatus, 
sm.RejectStage                  AS RejectStage, 
sm.RejectStatus                 AS RejectStatus, 
sm.BackwardStage                AS BackwardStage, 
sm.BackwardStatus               AS BackwardStatus, 
sm.CancelStage                  AS CancelStage, 
sm.CancelStatus                 AS CancelStatus, 
ROW_NUMBER() OVER (PARTITION BY ini.Id ORDER BY sm.Sequence) AS Sequence, 
sm.NextCondition                AS NextCondition, 
(SELECT ISNULL(MAX(HistoryId) + 1, 0) FROM InitiativeStageDetail WHERE InitiativeID = ini.Id)                    AS HistoryId, 
sm.IsCreateType                 AS IsCreateType, 
sm.IsSwitchProcess              AS IsSwitchProcess, 
sm.PostStageStoredProcedure     AS PostStageStoredProcedure, 
sm.PreStageStoredProcedure      AS PreStageStoredProcedure,
sm.CurrentStageDisplay as CurrentStageDisplay
FROM v_Initiatives ini
INNER JOIN StageMaster sm ON 
sm.Process =  ini.InitiativeType 
AND (sm.FlowType = 'initiative' or sm.FlowType = 'requestcapex')
and sm.Subtype = ini.InitiativeSubType
inner join @initiativeIdList on InitiativeId = ini.Id 
ORDER BY ini.ID,sm.Sequence 

-------------------------------------------------------------------------------------------------------------
-- Step 3 : Insert InitiativeStageActionDetail --------------------------------------------------------------   


INSERT INTO InitiativeStageActionDetail(InitiativeStageDetailId, InitiativeId, ActionType, ActionBy)
SELECT

det.InitiativeStageDetailId,
det.InitiativeId,
sam.ActionType,
sam.ActionBy

FROM InitiativeStageDetail det
INNER JOIN StageMaster sm ON        det.Event =               sm.Event  
                                AND det.Process  =             sm.Process  
                                AND det.FlowType =            sm.FlowType  
                                AND det.Subtype =             sm.Subtype 
                                AND det.CurrentStage =        sm.CurrentStage 
                                AND det.CurrentStatus =       sm.CurrentStatus 
                                AND det.NextStage =           sm.NextStage  
                                AND det.NextStatus =          sm.NextStatus 
INNER JOIN StageActionMaster sam ON sam.StageMasterId = sm.StageMasterId
INNER JOIN Initiatives ini on det.initiativeid = ini.id
inner join @initiativeIdList inilist on inilist.InitiativeId = ini.Id 
WHERE ini.initiativetype = sm.process



-------------------------------------------------------------------------------------------------------------
-- Step 4 : Insert Initiativeactions           --------------------------------------------------------------   

DECLARE @LastestPosition_noemail NVARCHAR(255)
DECLARE @Initiativeid int = 0

WHILE @Initiativeid is not null
BEGIN  
	SELECT top 1
	@Initiativeid = ini.id ,
	@LastestPosition_noemail = staaction.actionby
	FROM Initiatives ini
	inner join @initiativeIdList inilist on ini.id  = inilist.initiativeid
	--inner join owners own1 on own1.email = (select top 1 email FROM dbo.fn_GetOrgChartApproverByPosition(ini.Id, 'VP')) 
	inner join initiativestagedetail stade on ini.id = stade.initiativeid and ini.stage = stade.currentstage and ini.status = stade.currentstatus
	inner join initiativestageactiondetail staaction on stade.initiativestagedetailid = staaction.initiativestagedetailid
	WHERE  ini.id > @Initiativeid order by ini.id 

	--print @initiativeid
	--Exit loop if no more customers
	IF @@ROWCOUNT = 0 BREAK;

	SELECT * INTO #tmpOwnerTable2 FROM dbo.fn_GetStructureOwnerTable()
	INSERT INTO #tmpOwnerTable2 
	EXEC sp_GetActionByFromActionByCode @Initiativeid,@LastestPosition_noemail



		INSERT INTO InitiativeActions (ActionBy,[Action],[Position],Status,Stage,InitiativeId,ActionByName,conditiontype,counter,indicator,actionresult,FlowType,initiativestagedetailid,isinactive)
		SELECT 
		distinct
		tmp.email  AS ActionBy,
		staaction.ActionType as [Action],
		staaction.actionby as Position,
		ini.Status AS Status,
		ini.Stage AS Stage,
		ini.Id AS InitiativeId,	
		own.OwnerName  as Actionbyname,
		null as conditiontype,
		inilist.counter + 1 as counter,
		staaction.ActionBy as Indicator,
		null as actionresult,
		'initiative' AS FlowType,
		stade.initiativestagedetailid as initiativestagedetailid,
		null as isinactive
		FROM Initiatives ini
		LEFT JOIN InitiativeActions ac ON ac.InitiativeId = ini.Id
		--inner join owners own1 on own1.email = (select top 1 email FROM dbo.fn_GetOrgChartApproverByPosition(ini.Id, 'VP')) 
		cross join #tmpOwnerTable2 tmp
		inner join owners own on tmp.Email = own.email
		inner join initiativestagedetail stade on ini.id = stade.initiativeid and ini.stage = stade.currentstage and ini.status = stade.currentstatus
		inner join initiativestageactiondetail staaction on stade.initiativestagedetailid = staaction.initiativestagedetailid
		inner join @initiativeIdList inilist on ini.id = inilist.initiativeid
		WHERE inilist.initiativeid = @Initiativeid

		DROP TABLE #tmpOwnerTable2



END

---------------------------------------------------------------------------------------------------------------------
-- Step 5 : Insert Initiativestatustrackings           --------------------------------------------------------------  
--select max(RunningSequence) as RunningSequence into #TmpSequence from InitiativeStatusTrackings where initiativeid = @iniid and Stage = @stage
--delete from InitiativeStatusTrackings  where initiativeid = @iniid and RunningSequence > (select RunningSequence from #TmpSequence)
delete from InitiativeStatusTrackings  where initiativeid = @iniid and status <> 'Complete'
----delete from InitiativeStatusTrackings  where initiativeid = @iniid and ApprovedBy is null
select distinct Stage into #tmpStage from InitiativeStatusTrackings where initiativeid = @iniid

INSERT InitiativeStatusTrackings(Status,Stage,[Sequence], ProcessType, HistoryId, InitiativeId, RunningSequence, SubType, FlowType )
SELECT
'Not Start' AS Status,
sm.CurrentStage AS Stage,
counterstatus + ROW_NUMBER() OVER (PARTITION BY ini.Id ORDER BY sm.Sequence) AS Sequence,
sm.Process AS ProcessType,
0 AS HistoryId,
ini.Id,
counterstatus + ROW_NUMBER() OVER (PARTITION BY ini.Id ORDER BY sm.Sequence) AS RunningSequence,
sm.SubType AS SubType,
sm.FlowType AS FlowType

FROM v_Initiatives ini
INNER JOIN InitiativeStageDetail sm ON sm.Process = ini.InitiativeType AND sm.Subtype = ini.InitiativeSubType AND (sm.FlowType = 'initiative' or sm.FlowType = 'requestcapex') AND sm.Event = 'createnew' AND sm.CurrentStage IS NOT NULL AND sm.InitiativeId = ini.Id
inner join @initiativeIdList inilist on inilist.InitiativeId = ini.Id 
where sm.CurrentStage not in(select Stage from #tmpStage)
ORDER BY ini.ID,sm.Sequence

DROP TABLE #tmpStage
--DROP TABLE #TmpSequence
---------------------------------------------------------------------------
			--DECLARE @IdS decimal(18,2)
			--DECLARE	@stageIS nvarchar(255)
			--DECLARE	@FlowType nvarchar(255)

			--	select Id,Stage,FlowType into #tmpInitiativeStatusTrackings2 from InitiativeStatusTrackings where InitiativeId = @iniid   
			--	DECLARE db_Trackings2 CURSOR FOR 
			--		select id,Stage,FlowType from #tmpInitiativeStatusTrackings2
			--		OPEN db_Trackings2
			--		FETCH NEXT FROM db_Trackings2 INTO @IdS, @stageIS ,@FlowType
			--		WHILE @@FETCH_STATUS = 0
			--		BEGIN  

			--			--DECLARE @Sequence int
					
			--				update InitiativeStatusTrackings set RunningSequence = (select [Sequence] from StageMaster where CurrentStage = @stageIS and FlowType = @FlowType and Subtype = 'bigproject' and Process = 'cim' and [Event] = 'createnew')
			--				where Id = @IdS and Stage = @stageIS and FlowType = @FlowType
			--				update InitiativeStatusTrackings set [Sequence] = (select [Sequence] from StageMaster where CurrentStage = @stageIS and FlowType = @FlowType and Subtype = 'bigproject' and Process = 'cim' and [Event] = 'createnew')
			--				where Id = @IdS and Stage = @stageIS and FlowType = @FlowType
			
			--			-- 5 - Fetch the next record from the cursor
 		--				FETCH NEXT FROM db_Trackings2 INTO @IdS, @stageIS, @FlowType
			--		END 

			--		-- 6 - Close the cursor
			--		CLOSE db_Trackings2  
			--		-- 7 - Deallocate the cursor
			--		DROP TABLE #tmpInitiativeStatusTrackings2
			--		DEALLOCATE db_Trackings2

-- Step 6 : Update In Progress  Status-------------------------------------------

   --select sta.* 
   update sta set sta.status = 'In Progress', sta.ApprovedBy = (select max(ActionByName) from InitiativeActions where InitiativeId = @iniid and Stage = @stage)
   from v_initiatives ini
   inner join initiativestatustrackings sta on ini.id = sta.initiativeid and ini.stage = sta.stage
   inner join @initiativeIdList inilist on inilist.InitiativeId = ini.Id ;

-- Step 6 : Update Complete Status

	update InitiativeStatusTrackings set [Status] = 'Complete'
	where RunningSequence < (select max(RunningSequence) as RunningSequence from InitiativeStatusTrackings where InitiativeId = @iniid and Stage = @stage) and InitiativeId = @iniid and [Status] = 'Not Start' 



	--update InitiativeStatusTrackings set [Status] = 'Not Start'
	--where RunningSequence > (select max(RunningSequence) as RunningSequence from InitiativeStatusTrackings where InitiativeId = @iniid and Stage = @stage) and InitiativeId = @iniid and [Status] = 'Not Start' 
	
	
	--with cte as
	--(select sta.initiativeid ,sta.runningsequence	
	--from v_initiatives ini
	--inner  join initiativestatustrackings sta on ini.id = sta.initiativeid and ini.stage = sta.stage
	--inner join @initiativeIdList inilist on inilist.InitiativeId = ini.Id )
	----select distinct * 
	--update sta set sta.status = 'Complete'
	--from initiativestatustrackings sta
	--left join cte on sta.initiativeid = cte.initiativeid 
	--where sta.runningsequence < cte.runningsequence


	
	--------- Step 7 : Insert Initiativestatustrackings ------------- ApprovedBy ----------------------------------------------------------------
	DECLARE @pLimitRow int
	select distinct ActionByName into #tmpCount
	from InitiativeActions where InitiativeId = @iniid and Stage = @stage and ActionByName is not null
	set @pLimitRow = (select count(ActionByName) from #tmpCount)
		if @pLimitRow >= 2
		begin
		DECLARE @i INT
			SET @i = 2
			select * into #tmpStatusTrackings from InitiativeStatusTrackings where InitiativeId = @iniid and Stage = @stage
			WHILE (@i <= @pLimitRow)
			  BEGIN 
				
		
				INSERT INTO InitiativeStatusTrackings ([Status],[Stage] ,[Sequence], ProcessType, HistoryId, InitiativeId, RunningSequence, SubType, FlowType)
				SELECT 
				#tmpStatusTrackings.Status,
				#tmpStatusTrackings.Stage,
				#tmpStatusTrackings.[Sequence], 
				#tmpStatusTrackings.ProcessType, 
				#tmpStatusTrackings.HistoryId, 
				#tmpStatusTrackings.InitiativeId, 
				#tmpStatusTrackings.RunningSequence, 
				#tmpStatusTrackings.SubType, 
				#tmpStatusTrackings.FlowType
				FROM #tmpStatusTrackings
				
				select ApprovedBy into #tmpApprovedBy from InitiativeStatusTrackings where InitiativeId = @iniid and Stage = @stage and ApprovedBy is not null
				select distinct ActionByName into #tmpActionByName from InitiativeActions where InitiativeId = @iniid and Stage = @stage and ActionByName is not null
				and ActionByName not in (select ApprovedBy from #tmpApprovedBy)

				update InitiativeStatusTrackings 
				set ApprovedBy = (select max(ActionByName)from #tmpActionByName) 
				where InitiativeId = @iniid and Stage = @stage and ApprovedBy is null
				PRINT + ' Row : ' + CONVERT(VARCHAR,@i)
				drop table #tmpApprovedBy
				SET @i = @i + 1 
				drop table #tmpActionByName
			  END -- WHILE
			  DROP TABLE #tmpStatusTrackings
			select * from InitiativeStatusTrackings where InitiativeId = @iniid --and Stage = 'IL2'
		END
	DROP TABLE #tmpCount

	update InitiativeStatusTrackings set [Status] = 'In Progress', ApprovedDate = null
	where  InitiativeId = @iniid and Stage like @stage + '%'
	

END
GO

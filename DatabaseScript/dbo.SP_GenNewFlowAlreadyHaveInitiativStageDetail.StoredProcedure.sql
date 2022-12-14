/****** Object:  StoredProcedure [dbo].[SP_GenNewFlowAlreadyHaveInitiativStageDetail]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[SP_GenNewFlowAlreadyHaveInitiativStageDetail]
(
    -- Add the parameters for the stored procedure here
    @iniid int ,
	@stage nvarchar(255),
	@status nvarchar(255)

)
AS
BEGIN
    
----------------------------------------------------------------------------------------------------------
-- Step 0 : Scope of Initiative to Generate --------------------------------------------------------------
DECLARE @initiativeIdList Table ( InitiativeId INT,counter int )

INSERT INTO @initiativeIdList (InitiativeId,counter)
SELECT 
ini.Id as InitiativeId,
max(isnull(ac.counter,''))
FROM Initiatives  ini
left join initiativeactions ac on ini.id = ac.initiativeid
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
		when (isnull(ini.initiativetype,'') = 'dim' and isnull(ini.typebenefit,'NON-FINANCIAL') = 'FINANCIAL') then  'financialbenefit'
		when (isnull(ini.initiativetype,'') = 'cim' and (isnull(ini.TypeOfInvestment,'') <> 'Divestment' or isnull(ini.divestment,'0') = '1')) then  'divest'
		else 'normal' end

--, ini.CreatedBy = 'thammatad.a@frontiscompany.com'
from Initiatives ini
inner join @initiativeIdList on InitiativeId = ini.Id 

select stage,status,InitiativeSubType,*
from Initiatives ini
inner join @initiativeIdList on InitiativeId = ini.Id 
----------------------------------------------------------------------------------------------------------

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
		--CASE 
		--WHEN ini.Status = 'wait for final plan' then tmp.email
		--WHEN ini.Status = 'revised' THEN tmp.email
		--WHEN ini.Status = 'wait for update' THEN tmp.email
		--WHEN ini.Status = 'approved' THEN tmp.email
		--WHEN ini.Status = 'draft' THEN tmp.email
		--WHEN ini.Status = 'wait for approval' THEN tmp.email
		tmp.email  AS ActionBy,
		
		staaction.ActionType as [Action],
		--CASE 
		--WHEN ini.Status = 'wait for final plan' THEN 'edit'
		--WHEN ini.Status = 'revised' THEN 'edit'
		--WHEN ini.Status = 'approved' THEN 'edit'
		--WHEN ini.Status = 'wait for update' THEN 'edit'
		--WHEN ini.Status = 'draft' THEN 'edit'
		--WHEN ini.Status = 'wait for approval' THEN 'approve'
		--END AS Action,
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


---------------------------------------------------------------------------
-- Step 6 : Update In Progress  Status-------------------------------------------

   --select sta.* 
   update sta set sta.status = 'Not Start'
   from v_initiatives ini
   inner join initiativestatustrackings sta on ini.id = sta.initiativeid 
   inner join @initiativeIdList inilist on inilist.InitiativeId = ini.Id ;

   update sta set sta.status = 'In Progress'
   from v_initiatives ini
   inner join initiativestatustrackings sta on ini.id = sta.initiativeid and ini.stage = sta.stage
   inner join @initiativeIdList inilist on inilist.InitiativeId = ini.Id ;

-- Step 6 : Update Complete Status
	with cte as
	(select sta.initiativeid ,sta.runningsequence	
	from v_initiatives ini
	inner  join initiativestatustrackings sta on ini.id = sta.initiativeid and ini.stage = sta.stage
	inner join @initiativeIdList inilist on inilist.InitiativeId = ini.Id )
	--select distinct * 
	update sta set sta.status = 'Complete'
	from initiativestatustrackings sta
	left join cte on sta.initiativeid = cte.initiativeid 
	where sta.runningsequence < cte.runningsequence
	




END
GO

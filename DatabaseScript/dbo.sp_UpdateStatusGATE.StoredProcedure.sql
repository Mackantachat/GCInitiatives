/****** Object:  StoredProcedure [dbo].[sp_UpdateStatusGATE]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO









CREATE PROCEDURE [dbo].[sp_UpdateStatusGATE]
(
    @initiativeId INT,
    @flowType NVARCHAR(150)
)
AS
BEGIN
	

	--DECLARE @VACGate1 NVARCHAR(255) = 
	--(select top 1 actionresult from initiativeactions where initiativeid = 76245 and stage = 'GATE0 : VAC GATE1' and actionresult is not null order by id desc)
	--DECLARE @PICGate1 NVARCHAR(255) =
	--(select top 1 actionresult from initiativeactions where initiativeid = 76245 and stage = 'GATE0 : VAC GATE1' and actionresult is not null order by id desc)
	--DECLARE @VACGate2 NVARCHAR(255) =
	--(select top 1 actionresult from initiativeactions where initiativeid = 76245 and stage = 'GATE1 : VAC GATE2' and actionresult is not null order by id desc)
	--DECLARE @PICGate2 NVARCHAR(255) = 
	--(select top 1 actionresult from initiativeactions where initiativeid = 76245 and stage = 'GATE1 : PIC GATE2' and actionresult is not null order by id desc)
	--DECLARE @VACGate3 NVARCHAR(255) 
	--DECLARE @PICGate3 NVARCHAR(255)
	--DECLARE @VACGate4 NVARCHAR(255) 
	--DECLARE @PICGate4 NVARCHAR(255)
	


	--update pim1 set  
	--pim1.vacstatus = @VACGate1 , pim1.gatestatus = @PICGate1
 --	from PimGate where gate = 1 and initiativeid = @initiativeId

	--update pim2 set  
	--pim1.vacstatus = @VACGate2 , pim1.gatestatus = @PICGate2
 --	from PimGate where gate = 2 and initiativeid = @initiativeId

	--update pim3 set  
	--pim1.vacstatus = @VACGate3 , pim1.gatestatus = @PICGate3
 --	from PimGate where gate = 3 and initiativeid = @initiativeId

	--update pim4 set  
	--pim1.vacstatus = @VACGate4 , pim1.gatestatus = @PICGate4
 --	from PimGate where gate = 4 and initiativeid = @initiativeId
	DECLARE @LastestAction nvarchar(255)
	DECLARE @LatestStage nvarchar(255)
	DECLARE @maxLastestActionByCount INT = 0;
	SET @maxLastestActionByCount = 
		(
			SELECT TOP 1 [Counter]
			FROM [dbo].[InitiativeActions]
			WHERE InitiativeId = @initiativeId
			
            AND ISNULL(IsInactive, 'false') = 'false'
			AND (STAGE LIKE '%VAC%' OR STAGE LIKE '%PIC%')
            ORDER BY ID DESC
        ) 
 	
	SELECT TOP 1 
			@LastestAction = [Actionresult],
			@LatestStage = Stage
			FROM [dbo].[InitiativeActions]
			WHERE InitiativeId = @initiativeId
			AND ActionResult IS NOT NULL
            AND ISNULL(IsInactive, 'false') = 'false'
            AND Counter = @maxLastestActionByCount --add by oat
            ORDER BY ID DESC
		
	IF(@LatestStage like '%VAC%')
	BEGIN		
		UPDATE PIM SET PIM.vacstatus = 
		(CASE 
			  when @LastestAction = 'approve' then 'Pass' 
			  when @LastestAction = 'revise'  then 'Not Pass'
			  else '' end)
		from pimgate PIM where initiativeid = @initiativeId and Gate = (right(@LatestStage,1))
	END
	IF(@LatestStage like '%PIC%')
	BEGIN		
		UPDATE PIM SET PIM.GateStatus = 
		(CASE when @LastestAction = 'approve' then 'Pass' 
			  when @LastestAction = 'revise'  then 'Leave'
			  when @LastestAction = 'reject'  then 'Move Back'
			  when @LastestAction = 'cancelled'  then 'Cancelled'
			  else '' end)
		from pimgate PIM 
		where initiativeid = @initiativeId and Gate = (right(@LatestStage,1))
------------------------Update Benefit , CAPEX , OPEX ,IRR	
		UPDATE INI SET
		INI.CostEstCapex       = isnull(PIM.CostEstimate,0) - (isnull(PIM.RequestOpex,0) + isnull(ReceivedOpexBudget,0) + isnull(AdditionalOpexBudget,0)),      
		INI.CostEstOpex        = isnull(PIM.RequestOpex,0) + isnull(ReceivedOpexBudget,0) + isnull(AdditionalOpexBudget,0),
		INI.BenefitAmount      = isnull(PIM.Benefit,0),
		INI.Irr				   = isnull(PIM.Irr,0),

		-- krit add update PayBackPeriod from SimplePayback 02/08/2021
		INI.PayBackPeriod	   = isnull(PIM.SimplePayback,0)
		-- end edit

		from pimgate PIM 
		inner join initiatives INI on ini.Id = pim.InitiativeId
		where initiativeid = @initiativeId and Gate = (right(@LatestStage,1))
	END
	
END;
GO

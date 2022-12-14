/****** Object:  UserDefinedFunction [dbo].[fn_GetSkipCondition]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
















-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_GetSkipCondition]
(
    -- Add the parameters for the function here
    @initiativeId INT,
    @skipCondition NVARCHAR(150),
    @flowType NVARCHAR(150)
)
RETURNS NVARCHAR(150)
AS

BEGIN
   

   DECLARE @isPass NVARCHAR(50) = 'false'
    

   IF(@skipCondition = '#skipbod')
       BEGIN
            SELECT @isPass = CASE WHEN  (BudgetPeriod = 'Current year' )
			--and  ISNULL(BetweenYear, '') = 'Pool Budget' )
			--and (PoolBudgetForm = 'ER'OR ISNULL(cap.PoolBudgetForm, '') = 'ER' OR ISNULL(ini.PoolType, '') = 'ER'))  
			THEN 'true' 
			ELSE 'false' END FROM CapexInformations cap LEFT JOIN v_Initiatives ini on ini.id = cap.InitiativeId
			WHERE InitiativeId = @initiativeId AND ISNULL(Sequent, 0 ) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = @initiativeId)
       END   

    ELSE IF (@skipCondition = '#skipfixedasset')
	BEGIN
	 
	          SELECT @isPass = (SELECT  CASE WHEN FixedAsset = 1 THEN 'true'  ELSE 'false' END FROM DetailInformations  WHERE InitiativeId = @initiativeId )
			  
	 END 
   ELSE IF (@skipCondition = '#skipvac')
       BEGIN
       --Pass กรณี Process MAX and ( (0 MB <= Request OPEX (Estimate) <  2MB ) or ไม่ Request CAPEX)
            SELECT @isPass = (SELECT TOP 1
			-- เพิ่ม กรณี No CAPEX & No OPEX by Nok @21-Nov-20
									CASE WHEN ISNULL(RequestCapex, 'false') LIKE 'false%' THEN 'true' 
									WHEN ISNULL(RequestOpex, 'false') LIKE 'false%' THEN 'true' 
									--WHEN (isnull(TypeOfInvestment, '') = 'Engineering Request ER' and 
									--isnull(initiativetype,'') = 'directCapex')
                                    --THEN 'true' 
									WHEN ISNULL(CostEstOpex,0) * (CASE WHEN CostEstOpexType = 'THB' THEN 1 ELSE ISNULL(FxExchange, 1) END)
                                    --WHEN CostEstOpex * (CASE WHEN CostEstOpexType = 'THB' THEN 1 ELSE ISNULL(FxExchange, 1) END)
                                              < 2 AND 
                                              ISNULL(CostEstOpex,0) * (CASE WHEN CostEstOpexType = 'THB' THEN 1 ELSE ISNULL(FxExchange, 1) END) >= 0
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives
                                WHERE Id = @initiativeId
                                      AND InitiativeType = 'max'
                                );
       END   
   ELSE IF (@skipCondition = '#skipopex')
       BEGIN
        --Pass กรณี Process MAX and ไม่ Request OPEX
           SELECT @isPass = (SELECT TOP 1
									CASE WHEN ISNULL(RequestCapex, 'false') LIKE 'false%' THEN 'true' 
                                    WHEN ISNULL(RequestOpex, 'false') LIKE 'false%' THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives 
                                WHERE Id = @initiativeId
                                      AND InitiativeType = 'max'
                                );
       END
   ELSE IF (@skipCondition = '#costestcapex<=10')
       BEGIN
        --Pass กรณี Request Capex <=10 ล้าน 
            SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN (ISNULL(CostEstCapex,0) * (CASE WHEN CostEstCapexType = 'THB' THEN 1 ELSE ISNULL(FxExchange, 1) END))
                                              <= 10
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives 
                                WHERE Id = @initiativeId
                                );
       END   
   ELSE IF (@skipCondition = '#indirectbenefit')
       BEGIN
       --Pass กรณี (Direct benefit = No or Payback period < 3 Years)
            SELECT @isPass = (SELECT TOP 1 
                                    CASE WHEN 
                                         ISNULL(ini.PayBackPeriod, 0) < 3
                                         and ISNULL(det.requireDirectBenefit, 'false') = 'true'
                                         THEN 'false' 
                                         ELSE 'true'
                                    END
                                FROM v_Initiatives ini 
                                LEFT JOIN DetailInformations det ON det.InitiativeId = ini.Id
                                WHERE ini.Id = @initiativeId
                                );
       END   
   ELSE IF (@skipCondition = '#costestopex<=10')
       BEGIN
       --Pass กรณี Request OPEX <=10 ล้าน 
            SELECT @isPass = (SELECT TOP 1
                                 -- แก้ไข Nok Increase CAPEX to CAPEX + OPEX 
                                    --CASE WHEN (CostEstCapex * (CASE WHEN CostEstCapexType = 'THB' THEN 1 ELSE ISNULL(FxExchange, 1) END))

									CASE WHEN (ISNULL(CostEstCapex,0) * (CASE WHEN CostEstCapexType = 'THB' THEN 1 ELSE ISNULL(FxExchange, 1) END)) +
									 (ISNULL(CostEstOpex,0) * (CASE WHEN CostEstOpexType = 'THB' THEN 1 ELSE ISNULL(FxExchange, 1) END))
                                              < 10
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives 
                                WHERE Id = @initiativeId
                                );
       END   
   ELSE IF (@skipCondition = '#endindirect')
       BEGIN
       --Pass กรณี direct benefit = No
           SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN 
                                         ISNULL(det.requireDirectBenefit, 'false') = 'false'
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives ini
                                LEFT JOIN DetailInformations det ON det.InitiativeId = ini.Id
                                WHERE ini.Id = @initiativeId
                                );

            DECLARE @cntActionByActive2 INT = (
                SELECT COUNT(*) 
                FROM InitiativeActions 
                WHERE InitiativeId = @initiativeId AND ISNULL(ActionResult, '') = '' AND ISNULL(IsInactive, 'false') = 'false' AND FlowType = @flowType
                )

                IF(@cntActionByActive2 > 0)
                    SELECT @isPass = 'true'

                IF(@cntActionByActive2 <= 0)
                    SELECT @isPass = 'false'

       END   
   ELSE IF (@skipCondition = '#skipgate2')
       BEGIN
       --ถ้า ติ๊ก Simplified Project (Request to skip Gate2)  จะ Skip
            SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN 
                                         ISNULL(det.SimProjectSkipGate2, 'false') = 'true'
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives ini
                                LEFT JOIN DetailInformations det ON det.InitiativeId = ini.Id
                                WHERE ini.Id = @initiativeId
                                );
       END   
   ELSE IF (@skipCondition = '#notskipgate2')
       BEGIN
       --ถ้า ไม่ติ๊ก Simplified Project (Request to skip Gate2) จะ Skip
            SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN 
                                         ISNULL(prog.WbsNo, '') <> ''
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives ini
                                LEFT JOIN DetailInformations det ON det.InitiativeId = ini.Id
								left join ProgressHeader prog on ini.id = prog.InitiativeId 
                                WHERE ini.Id = @initiativeId
                                );
       END   
   ELSE IF (@skipCondition = '#nosustain')
       BEGIN
       --ถ้า typeofinvestment ไม่ใช่ sustain ให้ skip ไปเลย
            SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN 
                                         ISNULL(ini.TypeOfInvestment, '') NOT LIKE 'sustain%'
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives ini
                                WHERE ini.Id = @initiativeId
                                );
       END   
   ELSE IF (@skipCondition = '#endflow')
       BEGIN       
           DECLARE @cntActionByActive INT = (
                SELECT COUNT(*) 
                FROM InitiativeActions 
                WHERE InitiativeId = @initiativeId AND ISNULL(ActionResult, '') = '' AND ISNULL(IsInactive, 'false') = 'false' AND FlowType = @flowType
                )

                IF(@cntActionByActive > 0)
                    SELECT @isPass = 'true'

                IF(@cntActionByActive <= 0)
                    SELECT @isPass = 'false'
       END   
   ELSE IF (@skipCondition = '#skipifrequestedcapex')
       BEGIN
            DECLARE @cntRec INT = (SELECT COUNT(*) FROM InitiativeStage WHERE FlowType = 'requestcapex' AND InitiativeId = @initiativeId)
            --check ถ้าเคยขอ capex มาแล้ว ให้ skip
            IF(ISNULL(@cntRec, 0) > 0)
                SELECT @isPass = 'true'
       END
    
	-- NOk แก้ไข เพิ่ม กรณี skip app No & WbS No @28-Nov-20


   ELSE IF (@skipCondition = '#skipapp')
       BEGIN
       -- skip ถ้า AppNo. ใน table initiative = 1
            SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN isnull(ini.IsCreatedApp, 0) = 1 
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives ini
                               
                                WHERE ini.Id = @initiativeId);
       END   
								
  ELSE IF (@skipCondition = '#skipwbs')
       BEGIN
       -- skip ถ้า WBSNo. ใน table initiative = 1
            SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN isnull(ini.IsCreatedWbs, 0) = 1 
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives ini
                               
                                WHERE ini.Id = @initiativeId
                                ) END 

	-- NOk แก้ไข เพิ่ม กรณี skip กรณี ER Process
	ELSE IF (@skipCondition = '#skiperprocess')
       BEGIN
       -- skip ถ้า typeofinvestment = erprocess
            SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN ((isnull(ini.TypeOfInvestment, '') = 'Engineering Request ER' or isnull(ini.BudgetSource,'')= 'er')and 
									isnull(ini.initiativetype,'') = 'directCapex')
                                         THEN 'true' 
										 when (isnull(ini.initiativetype,'') = 'Request Pool' and
										 isnull(ini.pooltype,'') <> 'ER') then 'true'
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives ini
                               
                                WHERE ini.Id = @initiativeId
                                )
       
       END   
	   -- NOk แก้ไข เพิ่ม กรณี skip กรณี ไม่ Request Project En
	     ELSE IF (@skipCondition = '#skipnotpx')
       BEGIN
       -- skip กรณี ไม่ใช้ Project engineer
            SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN isnull(ini.RequestProjectEngineer, 0) = 1 
                                         THEN 'false' 
                                         ELSE 'true'
                                    END
                                FROM v_Initiatives ini
                               
                                WHERE ini.Id = @initiativeId
                                ) END 

        -- Oat เพิ่ม กรณี skip กรณี Not ER Process
	ELSE IF (@skipCondition = '#skipnoterprocess')
       BEGIN
       -- skip ถ้า typeofinvestment = erprocess
            SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN ((isnull(ini.TypeOfInvestment, '') = 'Engineering Request ER' or isnull(ini.BudgetSource,'')= 'er')and 
									isnull(ini.initiativetype,'') = 'directCapex')
                                         THEN 'false' 
										 when (isnull(ini.initiativetype,'') = 'Request Pool' and
										 isnull(ini.pooltype,'') <> 'ER') then 'false'
                                         ELSE 'true'
                                    END
                                FROM v_Initiatives ini
                               
                                WHERE ini.Id = @initiativeId
                                )
       
       END   
	ELSE IF (@skipCondition = '#skipnocapex')
       BEGIN
       -- Skip No CAPEX
            SELECT @isPass = (SELECT TOP 1 
                                 -- แก้ไข Nok Increase CAPEX to CAPEX + OPEX 
                                    --CASE WHEN (CostEstCapex * (CASE WHEN CostEstCapexType = 'THB' THEN 1 ELSE ISNULL(FxExchange, 1) END))

									CASE WHEN isnull(RequestCapex,'') = 'false' 
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM Initiatives 
                                WHERE Id = @initiativeId
                                );
		END
--Krit add @28-06-2021 for skip vacpic when requestpim process
ELSE IF (@skipCondition = '#requestPimAndCapex')
       BEGIN

             SELECT @isPass = (SELECT TOP 1
                                    CASE WHEN 
                                         ISNULL(det.RequestSubPic, 0) = 1 
										 AND ISNULL(ini.IsRequestCapex,0) = 1
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives ini
                                LEFT JOIN DetailInformations det ON det.InitiativeId = ini.Id
                                WHERE ini.Id = @initiativeId
                                );
       END   

 ELSE IF (@skipCondition = '#passnocondition')
       BEGIN
       -- skip ทุกเงื่อนไข
            SELECT @isPass = 'true'
       END 

	   --Krit เพิ่ม Condition request pim process
	   ELSE IF (@skipCondition = '#skipnorequestpim')
       BEGIN
        --Pass กรณี Process MAX and ไม่ Request OPEX
           SELECT @isPass = (SELECT TOP 1
									CASE 
									--WHEN ISNULL(vi.RequestCapex, 'false') LIKE 'false%' THEN 'true' 
                                    --WHEN ISNULL(vi.RequestOpex, 'false') LIKE 'false%' THEN 'true'
									WHEN ISNULL(ds.RequestSubPic,0) = 0 THEN 'true' 									
                                    ELSE 'false'
                                    END
                                FROM v_Initiatives vi
								INNER JOIN DetailInformations ds
								ON ds.InitiativeId = vi.Id
                                WHERE vi.Id = @initiativeId
                                      AND vi.InitiativeType = 'max'
                                );
       END

	   --Krit เพิ่ม Condition request pim process
	   ELSE IF (@skipCondition = '#skipNoOpexOrNoRequestPim')
       BEGIN
        --Pass กรณี Process MAX and ไม่ Request OPEX
           SELECT @isPass = (SELECT TOP 1
									CASE 
									--WHEN ISNULL(vi.RequestCapex, 'false') LIKE 'false%' THEN 'true' 
                                    WHEN ISNULL(vi.RequestOpex, 'false') LIKE 'true%' and ISNULL(ds.RequestSubPic,0) = 1 THEN 'false'
									--WHEN ISNULL(ds.RequestSubPic,0) = 0 THEN 'true' 									
                                    ELSE 'true'
                                    END
                                FROM v_Initiatives vi
								INNER JOIN DetailInformations ds
								ON ds.InitiativeId = vi.Id
                                WHERE vi.Id = @initiativeId
                                      AND vi.InitiativeType = 'max'
                                );
       END

	ELSE IF (@skipCondition = '#skipFixedAssetOrNoRequestPim')
	BEGIN
	 
	          SELECT @isPass = (SELECT  
			  CASE 
			  WHEN FixedAsset = 1 THEN 'true' 
			  WHEN ISNULL(RequestSubPic,0) = 0 THEN 'true' 
			  WHEN ISNULL(RequestCapex, 'false') LIKE 'false%' THEN 'true'
			  WHEN ISNULL(IsRequestCapex, 0) = 0 THEN 'true'
			  ELSE 'false' END 
			  FROM v_Initiatives vi
								INNER JOIN DetailInformations ds
								ON ds.InitiativeId = vi.Id
                                WHERE vi.Id = @initiativeId
                                      AND vi.InitiativeType = 'max'
                                );
			  
	 END 

	 ELSE IF (@skipCondition = '#skipIsCapexLess50')
	BEGIN
	 
	          --Pass กรณี Request OPEX <50 ล้าน Krit 29-07-2021
            SELECT @isPass = (SELECT TOP 1

									CASE WHEN (ISNULL(CostEstCapex,0) * (CASE WHEN CostEstCapexType = 'THB' THEN 1 ELSE ISNULL(FxExchange, 1) END)) 
                                              < 50
                                         THEN 'true' 
                                         ELSE 'false'
                                    END
                                FROM v_Initiatives 
                                WHERE Id = @initiativeId
                                );
			  
	 END 



    RETURN (SELECT CASE WHEN @isPass = 'true' THEN 'true' ELSE 'false' END)
END


GO

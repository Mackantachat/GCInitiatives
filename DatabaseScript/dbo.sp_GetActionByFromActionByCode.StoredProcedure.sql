/****** Object:  StoredProcedure [dbo].[sp_GetActionByFromActionByCode]    Script Date: 10/4/2021 1:59:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


































-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetActionByFromActionByCode]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT,
    @ActionByCode NVARCHAR(300)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    DECLARE @tmpEmailTable TABLE(
    Email NVARCHAR(300)
    );
    --max 
    --@owner/@creator
    --@owner
    --@creator
    --@to team
    --@workstream lead
    --@to finacne
    --@tf-bt-to
    --@sponsor
    --@cto
    SELECT TOP 1 * INTO #tmpInitiative FROM v_Initiatives WHERE Id = @initiativeId
    SELECT TOP 1 * INTO #tmpDetailInformation FROM DetailInformations WHERE InitiativeID = @initiativeId
	SELECT TOP 1 * INTO #tmpCPIDetailInformation FROM NewDetailInformations WHERE InitiativeID = @initiativeId
    SELECT TOP 1 * INTO #tmpInitiativeDetail FROM InitiativeDetails WHERE InitiativeID = @initiativeId
    SELECT TOP 1 * INTO #tmpCapexInformation FROM CapexInformations WHERE InitiativeId = @initiativeId AND ISNULL(Sequent, 0 ) = (SELECT MAX(ISNULL(Sequent, 0)) FROM CapexInformations WHERE InitiativeId = @initiativeId)
    DECLARE @initiativeType NVARCHAR(100) = ''
	DECLARE @MAXRequestPIMProcess BIT = 'false'
    DECLARE @requireDirectBenefit BIT = 'false' 
    DECLARE @requireIndirectBenefit BIT = 'false'
	DECLARE @MAXSubWorkstream nvarchar(255) = ''
	DECLARE @OPEXCOST DECIMAL(18,6)
	DECLARE @CAPEXPEXCOST DECIMAL(18,6)
    DECLARE @poolId INT = NULL
    DECLARE @subType NVARCHAR(150) = (SELECT InitiativeSubType FROM #tmpInitiative)
    DECLARE @nowStage NVARCHAR(150) = (SELECT TOP 1 Stage FROM #tmpInitiative)
	DECLARE @company NVARCHAR(150) = (SELECT TOP 1 Company FROM #tmpInitiative)
    SELECT @initiativeType = InitiativeType ,
	@OPEXCOST = CostEstOpex ,
	@CAPEXPEXCOST = CostEstCapex
	FROM #tmpInitiative
    SELECT @requireDirectBenefit = requireDirectBenefit, @requireIndirectBenefit = requireIndirectBenefit FROM #tmpDetailInformation
	select @MAXRequestPIMProcess = RequestSubPic from #tmpDetailInformation
	select @MAXSubWorkstream = SubWorkstream2 from #tmpDetailInformation

	-- เมื่อสร้าง Initiative ขึ้นมาและสามารถ Owner และตัวเองจะกลายเป็น Creator 
    IF(@ActionByCode = '@owner/@creator')
	
        BEGIN
            INSERT INTO @tmpEmailTable(Email) 
            SELECT TOP 1 own.Email FROM v_Initiatives ini LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName WHERE ini.Id = @initiativeId
            UNION
            SELECT TOP 1 CreatedBy FROM v_Initiatives WHERE Id = @initiativeId
        END
    ELSE IF(@ActionByCode = '@owner')
        BEGIN
            INSERT INTO @tmpEmailTable(Email) 
            SELECT TOP 1 own.Email FROM v_Initiatives ini LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName WHERE ini.Id = @initiativeId
        END
    ELSE IF(@ActionByCode = '@creator')
        BEGIN
            INSERT INTO @tmpEmailTable(Email) 
            SELECT TOP 1 CreatedBy FROM v_Initiatives WHERE Id = @initiativeId
        END
    -- Approver ของ Process MAX,DIM ซึ่งมีชื่ออยู่ใน MaxApprovers Table (ON-THE-FLY เพราะ UI จะคอยเปลี่ยนคนให้ และ Power Automate)
    ELSE IF(@ActionByCode = '@to team' OR @ActionByCode = '@toteam')
        BEGIN            
            INSERT INTO @tmpEmailTable(Email) 
            SELECT ApproverEmail FROM MaxApprovers WHERE InitiativeId = @initiativeId AND ApproverType = 'TOTeam'
        END
	-- Approver ของ Process MAX ซึ่งมีชื่ออยู่ใน MaxApprovers Table (ON-THE-FLY เพราะ UI จะคอยเปลี่ยนคนให้ และ Power Automate)
    ELSE IF(@ActionByCode = '@workstream lead' OR @ActionByCode = '@workstreamlead')
        BEGIN
		    -- เป็น Skip ไม่เอาใคร ถ้าเป็น Process DIM และไม่ Require Direct Benefit
            IF(ISNULL(@initiativeType, '') = 'dim' AND ISNULL(@requireDirectBenefit, 'false') = 'false') 
            BEGIN
            SELECT * FROM Owners WHERE 1=0
            RETURN; -- case dim and no require indirect exit stored  //  prevent subtype 'normal'
            END

            INSERT INTO @tmpEmailTable(Email) 
            SELECT ApproverEmail FROM MaxApprovers WHERE InitiativeId = @initiativeId AND ApproverType = 'WorkstreamLead'
        END
	-- Approver ของ Process MAX,DIM ซึ่งมีชื่ออยู่ใน MaxApprovers Table (ON-THE-FLY เพราะ UI จะคอยเปลี่ยนคนให้ และ Power Automate)
    ELSE IF(@ActionByCode = '@to finacne' OR @ActionByCode = '@tofinance')
        BEGIN
            -- เป็น Skip ไม่เอาใคร ถ้าเป็น Process DIM และไม่ Require Direct Benefit
            IF(ISNULL(@initiativeType, '') = 'dim' AND ISNULL(@requireDirectBenefit, 'false') = 'false') 
            BEGIN
            SELECT * FROM Owners WHERE 1=0
            RETURN; -- case dim and no require indirect exit stored  //  prevent subtype 'normal'
            END
--------------------------------------- Nok Edit for No TO Finance for MTPI 2021-03-10
			--else IF(ISNULL(@initiativeType, '') = 'max' AND isnull(@MAXSubWorkstream,'') not like '%- Direct%' 
			--and isnull(@MAXSubWorkstream,'') like '%MTPI%'
			--)
            --BEGIN
            --SELECT * FROM Owners WHERE 1=0
            --RETURN; 
            --END
-------------------------------------------------------- Nok Edit for Change No TO Finance @SIL2 (PIM Process) 2021-02-26
			--else IF(ISNULL(@initiativeType, '') = 'max' AND isnull(@nowstage,'') = 'SIL2' AND isnull(@MAXRequestPIMProcess,'false') = 'true')
            --BEGIN
            --SELECT * FROM Owners WHERE 1=0
            --RETURN; -- case dim and no require indirect exit stored  //  prevent subtype 'normal'
            --END


            INSERT INTO @tmpEmailTable(Email) 
            SELECT ApproverEmail FROM MaxApprovers WHERE InitiativeId = @initiativeId AND ApproverType = 'TO Finance'
            
			-------------------------------- Ta from QA 2021-08-09 -----------------

			--INSERT INTO @tmpEmailTable(Email) 
   --         SELECT ApproverEmail FROM MaxApprovers WHERE InitiativeId = @initiativeId AND ApproverType = 'TO Finance'
            -------------------------------- Ta from QA 2021-08-09 -----------------

        END
    -- Approver ของ Process MAX,DIM ซึ่งมีชื่ออยู่ใน MaxApprovers Table (ON-THE-FLY เพราะ UI จะคอยเปลี่ยนคนให้ และ Power Automate)
    ELSE IF(@ActionByCode = '@tf-bt-to')
        BEGIN
			-- เป็น Skip ไม่เอาใคร ถ้าเป็น Process DIM และไม่ Require Direct Benefit
            IF(ISNULL(@initiativeType, '') = 'dim' AND ISNULL(@requireDirectBenefit, 'false') = 'false') 
            BEGIN
            SELECT * FROM Owners WHERE 1=0
            RETURN; -- case dim and no require indirect exit stored  //  prevent subtype 'normal'
            END

            INSERT INTO @tmpEmailTable(Email) 
            SELECT ApproverEmail FROM MaxApprovers WHERE InitiativeId = @initiativeId AND ApproverType = 'TF-BT-TO'
        END
    -- Approver ของ Process MAX,DIM ซึ่งมีชื่ออยู่ใน MaxApprovers Table (ON-THE-FLY เพราะ UI จะคอยเปลี่ยนคนให้ และ Power Automate)
    ELSE IF(@ActionByCode = '@sponsor')
        BEGIN
			-- เป็น Skip ไม่เอาใคร ถ้าเป็น Process DIM และไม่ Require Direct Benefit
            IF(ISNULL(@initiativeType, '') = 'dim' AND ISNULL(@requireDirectBenefit, 'false') = 'false') 
            BEGIN
            SELECT * FROM Owners WHERE 1=0
            RETURN; -- case dim and no require indirect exit stored  //  prevent subtype 'normal'
            END

            INSERT INTO @tmpEmailTable(Email) 
            SELECT ApproverEmail FROM MaxApprovers WHERE InitiativeId = @initiativeId AND ApproverType = 'Sponsor'
        END
    -- Approver ของ Process MAX,DIM ซึ่งมีชื่ออยู่ใน MaxApprovers Table (ON-THE-FLY เพราะ UI จะคอยเปลี่ยนคนให้ และ Power Automate)
    ELSE IF(@ActionByCode = '@cto')
        BEGIN
			-- เป็น Skip ไม่เอาใคร ถ้าเป็น Process DIM และไม่ Require Direct Benefit
            IF(ISNULL(@initiativeType, '') = 'dim' AND ISNULL(@requireDirectBenefit, 'false') = 'false') 
            BEGIN
            SELECT * FROM Owners WHERE 1=0
            RETURN; -- case dim and no require indirect exit stored  //  prevent subtype 'normal'
            END

            INSERT INTO @tmpEmailTable(Email) 
            SELECT ApproverEmail FROM MaxApprovers WHERE InitiativeId = @initiativeId AND ApproverType = 'CTO'
        END
    -- เลิกใช้งาน
    ELSE IF(@ActionByCode = '@DM_MAX')
        BEGIN
            INSERT INTO @tmpEmailTable(Email) 
            SELECT 'z0007155@vpttgcgroup.corp'
        END
    -- เลิกใช้งาน
    ELSE IF(@ActionByCode = '@VP_MAX')
        BEGIN
            INSERT INTO @tmpEmailTable(Email) 
            SELECT 'z0007142@vpttgcgroup.corp'
        END
	-- Approver ของ Process Direct CAPEX
    ELSE IF(@ActionByCode = '@DM')  -- directCapex
        BEGIN
            INSERT INTO @tmpEmailTable(Email)
			-- ไต่ Organize Chart
            SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@initiativeId, 'DM')
        END
	-- Approver ของ Process Direct CAPEX
    ELSE IF(@ActionByCode = '@VP')  -- directCapex
        BEGIN
            INSERT INTO @tmpEmailTable(Email) 
			-- ไต่ Organize Chart
            SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@initiativeId, 'VP')
        END
    -- Approver ของ Process Direct CAPEX
	ELSE IF(@ActionByCode = '@EVP')  -- directCapex
        BEGIN
			IF (@company = 'PTTGC')
			BEGIN
            INSERT INTO @tmpEmailTable(Email) 
			-- ไต่ Organize Chart
            SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@initiativeId, 'EVP')
			END
			ELSE 
			BEGIN
			INSERT INTO @tmpEmailTable(Email) 
			-- ไต่ Organize Chart จาก Company ที่ไม่ใช่ GC
            SELECT [dbo].[fn_GetMDEmailfromCompanyNotGC] (@initiativeId)
			END
        END
    -- Approver ของ Process Direct CAPEX
    ELSE IF(@ActionByCode = '@BudgetTeam' OR @ActionByCode = '@Budget')  -- directCapex
        BEGIN
            INSERT INTO @tmpEmailTable(Email)
			-- ไต่ Organize Chart
            SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@initiativeId, 'BudgetTeam')
        END

    -- Admin ของ Process CIM ควรไป Query จาก Role Permission ถามพี่อ้น
    ELSE IF(@ActionByCode = '@admincim')
        BEGIN
		
		-- userrole หา Admin CIM

            INSERT INTO @tmpEmailTable(Email) 
            SELECT 'Poramade.C@pttgcgroup.com'
			union select 'Jirakrid.T@pttgcgroup.com'--  Temporaly
        END
	-- Admin ของ Process PIM ควรไป Query จาก Role Permission ถามพี่อ้น
    ELSE IF(@ActionByCode = '@adminPIM')
        BEGIN
		
		-- userrole หา Admin PIM

            INSERT INTO @tmpEmailTable(Email) 
            SELECT 'Jakkrapong.A@pttgcgroup.com'
			union select 'RATTHANEE.I@PTTGCGROUP.COM'
			-- union select 'thammatad.a@frontiscompany.com' -- add by oat 2021-02-01 for test
			-- Temporaly
        END
    -- Approver ของ Process MAX, PIM, Direct CAPEX
    ELSE IF(@ActionByCode = '@PMO')
        BEGIN
		
		-- userrole หา PMO

            INSERT INTO @tmpEmailTable(Email) 
            SELECT * FROM [dbo].[fn_GetPositionfromPlantowner](@initiativeId, 'PMO')
			
			
        END
    -- Approver ของ Process MAX,DIM ซึ่งมีชื่ออยู่ใน MaxApprovers Table (ON-THE-FLY เพราะ UI จะคอยเปลี่ยนคนให้ และ Power Automate)
    ELSE IF(@ActionByCode = '@tofinanceil4')
        BEGIN
			-- เป็น Skip ไม่เอาใคร ถ้าเป็น Process DIM และไม่ Require Direct Benefit
            IF(ISNULL(@initiativeType, '') = 'dim' AND ISNULL(@requireDirectBenefit, 'false') = 'false') 
            BEGIN
            SELECT * FROM Owners WHERE 1=0
            RETURN; -- case dim and no require indirect exit stored  //  prevent subtype 'normal'
            END
--------------------------------------- Nok Edit for No TO Finance for MTPI 2021-03-10
			--else IF exists (select * from #tmpCapexInformation) and (ISNULL(@initiativeType, '') = 'max' AND isnull(@MAXSubWorkstream,'') like '%Non financial benefit%' 
			--and isnull(@MAXSubWorkstream,'') like '%MTPI%'
			--)
            --BEGIN
            --SELECT * FROM Owners WHERE 1=0
            --RETURN; 
            --END
			--else IF not exists (select * from #tmpCapexInformation) and (ISNULL(@initiativeType, '') = 'max' AND isnull(@MAXSubWorkstream,'') not like '%- Direct%' 
			--and isnull(@MAXSubWorkstream,'') like '%MTPI%'
			--)
            --BEGIN
            --SELECT * FROM Owners WHERE 1=0
            --RETURN; 
            --END
-------------------------------------------------------------------------------------------------------
            INSERT INTO @tmpEmailTable(Email) 
            SELECT ApproverEmail FROM MaxApprovers WHERE InitiativeId = @initiativeId AND ApproverType = 'TOFinanceIL4'
        END
	-- Approver ของ Process MAX,DIM ซึ่งมีชื่ออยู่ใน MaxApprovers Table (ON-THE-FLY เพราะ UI จะคอยเปลี่ยนคนให้ และ Power Automate)
    ELSE IF(@ActionByCode = '@tofinanceil5')
        BEGIN
			-- เป็น Skip ไม่เอาใคร ถ้าเป็น Process DIM และไม่ Require Direct Benefit
			IF(ISNULL(@initiativeType, '') = 'dim' AND ISNULL(@requireDirectBenefit, 'false') = 'false') 
            BEGIN
            SELECT * FROM Owners WHERE 1=0
            RETURN; -- case dim and no require indirect exit stored  //  prevent subtype 'normal'
            END
--------------------------------------- Nok Edit for No TO Finance for MTPI 2021-03-10
			--else IF exists (select * from #tmpCapexInformation) and (ISNULL(@initiativeType, '') = 'max' AND isnull(@MAXSubWorkstream,'') like '%Non financial benefit%' 
			--and isnull(@MAXSubWorkstream,'') like '%MTPI%'
			--)
            --BEGIN
            --SELECT * FROM Owners WHERE 1=0
            --RETURN; 
            --END
			--else IF not exists (select * from #tmpCapexInformation) and (ISNULL(@initiativeType, '') = 'max' AND isnull(@MAXSubWorkstream,'') not like '%- Direct%' 
			--and isnull(@MAXSubWorkstream,'') like '%MTPI%'
			--)
            --BEGIN
            --SELECT * FROM Owners WHERE 1=0
            --RETURN; 
            --END
-------------------------------------------------------------------------------------------------------
            INSERT INTO @tmpEmailTable(Email) 
            SELECT ApproverEmail FROM MaxApprovers WHERE InitiativeId = @initiativeId AND ApproverType = 'TOFinanceIL5'
        END
    -- Approver ของ Process DIM, Direct CAPEX, Request Pool
    ELSE IF(@ActionByCode = '@VPBudget')
        BEGIN
		-- VP ของ Owner pool
            SET @poolId = (SELECT PoolId FROM #tmpCapexInformation)

            IF(ISNULL(@poolId, 0) <> 0)
            BEGIN
                INSERT INTO @tmpEmailTable(Email)
				-- ไต่ Organize Chart
                SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@poolId, 'VP')
            END
            ELSE
		BEGIN
			 -- President คือ Vice President จาก CIM (อาจจะเขียนเผื่อใช้งาน)
             DECLARE @President1 NVARCHAR(300) = (SELECT  top 1  President FROM #tmpInitiativeDetail)
			 -- President คือ Vice President จาก DIM, Direct CAPEX
             DECLARE @President2 NVARCHAR(300) = (SELECT  top 1 President FROM #tmpDetailInformation)
			 -- President คือ Vice President(ช่องให้เลือก VP ในหน้า CAPEX Information) จาก DIM, Direct CAPEX
			 Declare @president3 NVARCHAR(300) = (SELECT  top 1 CostCenterOfVP FROM #tmpCapexInformation)

            INSERT INTO @tmpEmailTable(Email) 
			SELECT Email FROM Owners WHERE OwnerName = CASE WHEN ISNULL(@President3, '') <> '' THEN @President3
			when ISNULL(@President2, '') <> '' THEN @President2
			ELSE @President1 END;
            --BEGIN
            --    INSERT INTO @tmpEmailTable(Email) 
            --    SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@initiativeId, 'VP')    --  Temporaly
            --END
			
			end

        END
    -- Approver ของ Process MAX, DIM, Direct CAPEX, Request Pool
    ELSE IF(@ActionByCode = '@EVPBudget' OR @ActionByCode = '@TFEMAX')
        BEGIN
            SET @poolId = (SELECT PoolId FROM #tmpCapexInformation)

            IF(ISNULL(@poolId, 0) <> 0)
            BEGIN
                INSERT INTO @tmpEmailTable(Email) 
				-- ไต่ Organize Chart
                SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@poolId, 'EVP')
            END

            -- Nok แก้ จาก manager -> president 23-Nov-20
            -- SELECT Email FROM Owners WHERE OwnerName = CASE WHEN ISNULL(@President1, '') = '' THEN @President2 ELSE @Manager1 END;
			--            Begin
			--			INSERT INTO @tmpEmailTable(Email) 
   --         SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@initiativeId, 'EVP')
			--END
			-- select * from initiativedetail // select * from detailinformation
			Else IF (@company = 'PTTGC')
            
			BEGIN
            INSERT INTO @tmpEmailTable(Email)
			-- ไต่ Organize Chart
            SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@initiativeId, 'EVP')
			END
			ELSE 
			BEGIN
			INSERT INTO @tmpEmailTable(Email)
			-- ไต่ Organize Chart จาก Company ที่ไม่ใช่ GC
            SELECT [dbo].[fn_GetMDEmailfromCompanyNotGC] (@initiativeId)
			END

		--------------------------------------------------
        END
	-- Admin ของ Process DIM ควรไป Query จาก Role Permission ถามพี่อ้น
    ELSE IF(@ActionByCode = '@adminDIM')
        BEGIN
		-- userrole หา Admin DIM
            
           -- IF(ISNULL(@initiativeType, '') = 'dim' AND ISNULL(@requireIndirectBenefit, 'false') = 'false' AND ISNULL(@subType, '') <> 'normal' AND ISNULL(@nowStage, '') LIKE '%SIL%'  )  
           -- BEGIN
           -- SELECT * FROM Owners WHERE 1=0
           -- RETURN; -- case dim and no require indirect exit stored  //  prevent subtype 'normal'
           -- END

		   --krit edit 04-Oct-2021
            INSERT INTO @tmpEmailTable(Email) 
			SELECT DISTINCT EMAIL FROM UserRoles ro 
			INNER JOIN RolePermission rp
			ON ro.RoleId = CONVERT(NVARCHAR(255),rp.RoleId)
			INNER JOIN RoleSettingDetail rs
			on rs.PermissionMasterId = rp.PermissionMasterId
			INNER JOIN RoleDetailSetting rd
			ON rd.Id = rp.RoleId
			WHERE rd.RoleName = 'PMO DIM' and ISNULL(ro.Email,'') <> ''
			--krit edit 04-Oct-2021

        END
    -- Approver ของ Process DIM, CIM
    ELSE IF(@ActionByCode = '@dmchoose')
        BEGIN
			 -- หาจาก CIM
             DECLARE @Manager1 NVARCHAR(300) = (SELECT Manager FROM #tmpInitiativeDetail WHERE InitiativeId = @initiativeId)
             -- หาจาก DIM
			 DECLARE @Manager2 NVARCHAR(300) = (SELECT Manager FROM #tmpDetailInformation WHERE InitiativeId = @initiativeId)

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = CASE WHEN ISNULL(@Manager1, '') = '' THEN @Manager2 ELSE @Manager1 END;

			-- select * from initiativedetail // select * from detailinformation
        END
    -- Approver ของ Process DIM, CIM, Strategy, Request Pool
    ELSE IF(@ActionByCode = '@Vpchoose')
        BEGIN
		     -- หาจาก CIM, Strategy
             DECLARE @President4 NVARCHAR(300) = (SELECT President FROM #tmpInitiativeDetail WHERE InitiativeId = @initiativeId)
             -- หาจาก DIM
			 DECLARE @President5 NVARCHAR(300) = (SELECT President FROM #tmpDetailInformation WHERE InitiativeId = @initiativeId)
			 -- หาจาก CAPEX Information
			 Declare @president6 NVARCHAR(300) = (SELECT CostCenterOfVP FROM #tmpCapexInformation WHERE InitiativeId = @initiativeId)

            INSERT INTO @tmpEmailTable(Email) 
			SELECT Email FROM Owners WHERE OwnerName = CASE WHEN ISNULL(@President4, '') <> '' THEN @President4
			when ISNULL(@President5, '') <> '' THEN @President5
			ELSE @President6 END;
            -- Nok แก้ จาก manager -> president 23-Nov-20
            -- SELECT Email FROM Owners WHERE OwnerName = CASE WHEN ISNULL(@President1, '') = '' THEN @President2 ELSE @Manager1 END;

			-- select * from initiativedetail // select * from detailinformation
        END
    -- Approver ของ Process DIM
	ELSE IF(@ActionByCode = '@EVPchoose')
        BEGIN
            -- หาจาก DIM
            DECLARE @SponsorEVP NVARCHAR(300) = (SELECT SponsorEvp FROM #tmpDetailInformation WHERE InitiativeId = @initiativeId)
			
            
			if  ISNULL(@SponsorEVP, '') <> ''
			begin
			INSERT INTO @tmpEmailTable(Email) 
			SELECT Email FROM Owners WHERE OwnerName =  ISNULL(@SponsorEVP, '') 
			end
			ELSE
            BEGIN
                INSERT INTO @tmpEmailTable(Email) 
				-- ไต่ Organize Chart
                SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@initiativeId, 'EVP')    --  Temporaly
            END
			
            
            -- Nok แก้ จาก manager -> president 23-Nov-20
            -- SELECT Email FROM Owners WHERE OwnerName = CASE WHEN ISNULL(@President1, '') = '' THEN @President2 ELSE @Manager1 END;

			-- select * from initiativedetail // select * from detailinformation
        END
    -- Approver ของ Process DIM
    ELSE IF(@ActionByCode = '@financialexprt' OR @ActionByCode = '@financialexpert')
        BEGIN

            IF(ISNULL(@initiativeType, '') = 'dim' AND ISNULL(@requireIndirectBenefit, 'false') = 'false') 
            BEGIN
            SELECT * FROM Owners WHERE 1=0
            RETURN; -- case dim and no require indirect exit stored  //  prevent subtype 'normal'
            END

            INSERT INTO @tmpEmailTable(Email) 
            SELECT  Attribute01 FROM CommonData WHERE DataType = 'dimfinanceexpert'
        END
    -- Approver/Editor ของ Process CIM
    ELSE IF(@ActionByCode = '@sspim')
        BEGIN
             DECLARE @sspim NVARCHAR(300) = (SELECT SSPIM FROM #tmpInitiative)

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @sspim;

            --IF(@sspim IS NULL)
            --BEGIN
            --    INSERT INTO @tmpEmailTable(Email) 
            --    SELECT 'thammatad.a@frontiscompany.com';
            --END

			-- select * from initiativedetail // select * from detailinformation
        END
    -- Approver ของ Process CIM
    ELSE IF(@ActionByCode = '@projectdirector' )
        BEGIN
			 -- น่าจะไม่มีข้อมูลในนี้เพราะเป็น Process CIM
             DECLARE @projectdirector NVARCHAR(300) = (SELECT ProjectDirector FROM #tmpDetailInformation)


			 IF(isnull(@projectdirector,'') = '') SET @projectdirector = (SELECT ProjectDirector FROM #tmpInitiativeDetail)
             --IF(@projectdirector IS NULL) SET @projectdirector = (SELECT ProjectDirector FROM #tmpInitiativeDetail)
                

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @projectdirector;

            --IF(isnull(@projectdirector,'') = '')
            --BEGIN
            --    INSERT INTO @tmpEmailTable(Email) 
            --    SELECT 'thammatad.a@frontiscompany.com';
            --END

			-- select * from initiativedetail // select * from detailinformation
        END
		
	-- Approver/Editor ของ Process CIM, PIM, MAX, Direct CAPEX
	ELSE IF(@ActionByCode = '@projectmanager' or @ActionByCode = '@projectmanageredit' or @ActionByCode = '@projectmanagerapprove' )
        BEGIN
		    -- จาก MAX, PIM, Direct CAPEX
            DECLARE @projectmanager NVARCHAR(300) = (SELECT ProjectManager FROM #tmpDetailInformation)

            IF(isnull(@projectmanager,'') <> '')
            BEGIN
				INSERT INTO @tmpEmailTable(Email) 
                SELECT Email FROM Owners WHERE OwnerName = @projectmanager   
            END
			-- จาก DIM เอา Owner มาแทน
			ELSE IF(isnull(@initiativetype,'') = 'dim')
            BEGIN
                INSERT INTO @tmpEmailTable(Email) 
                SELECT TOP 1 own.Email FROM v_Initiatives ini LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName WHERE ini.Id = @initiativeId
            END
			ELSE 
			-- จาก CIM ไป MAP ProjectManager จาก
            BEGIN
                INSERT INTO @tmpEmailTable(Email) 
				-- ไป lookup คนของ plant จาก cammon data 
                select * from fn_GetPositionfromPlantOwner (@initiativeId,'ProjectManager')
            END

			-- select * from initiativedetail // select * from detailinformation
        END

    --ELSE IF(@ActionByCode = '@projectmanagerapprove')
    --    BEGIN
    --         DECLARE @projectmanagerapprove NVARCHAR(300) = (SELECT ProjectManager FROM #tmpDetailInformation)
	--
    --         IF(isnull(@projectmanagerapprove,'') = '')SET @projectmanagerapprove = (SELECT ProjectManager FROM #tmpInitiativeDetail)
	--
    --         IF(ISNULL(@projectmanagerapprove, '') <> '')
    --         BEGIN
    --            INSERT INTO @tmpEmailTable(Email) 
    --            SELECT Email FROM Owners WHERE OwnerName = @projectmanagerapprove
    --         END
    --         ELSE
    --         BEGIN
    --            INSERT INTO @tmpEmailTable(Email) 
    --            SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@initiativeId, 'DM')
    --         END
	--
    --        
	--		-- select * from initiativedetail // select * from detailinformation
     --   END
   --ELSE IF(@ActionByCode = '@projectmanageredit')
   --    BEGIN
   --         DECLARE @projectmanageredit NVARCHAR(300) = (SELECT ProjectManager FROM #tmpDetailInformation)
   --
   --         IF(@projectmanageredit IS NULL) SET @projectmanageredit = (SELECT ProjectManager FROM #tmpInitiativeDetail)
   --
   --        IF(ISNULL(@projectmanageredit, '') <> '')
   --         BEGIN
   --            INSERT INTO @tmpEmailTable(Email) 
   --            SELECT Email FROM Owners WHERE OwnerName = @projectmanageredit
   --         END
   --         ELSE
   --         BEGIN
   --            INSERT INTO @tmpEmailTable(Email) 
   --            SELECT TOP 1 own.Email FROM v_Initiatives ini LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName WHERE ini.Id = @initiativeId
   --         END
    --    END
	-- เลิกใช้งาน
    ELSE IF(@ActionByCode = '@projecteng')
        BEGIN
             DECLARE @projecteng1 NVARCHAR(300) = (SELECT ProjectEngineer FROM #tmpDetailInformation)

             IF(@projecteng1 IS NULL) SET @projecteng1 = (SELECT ProjectEngineer FROM #tmpInitiativeDetail)

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @projecteng1
			UNION
            SELECT TOP 1 CreatedBy FROM v_Initiatives WHERE Id = @initiativeId

			-- select * from initiativedetail // select * from detailinformation
        END
	-- Editor ของ All Process
    ELSE IF(@ActionByCode = '@owner/@creator/@projecteng')
        BEGIN
             DECLARE @projecteng2 NVARCHAR(300) = (SELECT ProjectEngineer FROM #tmpDetailInformation)

             IF(@projecteng2 IS NULL) SET @projecteng2 = (SELECT ProjectEngineer FROM #tmpInitiativeDetail)

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @projecteng2;

            INSERT INTO @tmpEmailTable(Email) 
            SELECT TOP 1 own.Email FROM v_Initiatives ini LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName WHERE ini.Id = @initiativeId
            UNION
            SELECT TOP 1 CreatedBy FROM v_Initiatives WHERE Id = @initiativeId

			-- select * from initiativedetail // select * from detailinformation
        END
    -- Approver ของ Process CIM
    ELSE IF(@ActionByCode = '@vpplant')
        BEGIN
             DECLARE @vpplant NVARCHAR(300) = (SELECT VPPlantOwner FROM #tmpInitiative)

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @vpplant;

            --IF(@vpplant IS NULL)
            --BEGIN
            --    INSERT INTO @tmpEmailTable(Email) 
            --    SELECT 'thammatad.a@frontiscompany.com';
            --END

			-- select * from initiativedetail // select * from detailinformation
        END
    -- Approver ของ Process CIM
    ELSE IF(@ActionByCode = '@dmplant')
        BEGIN
             DECLARE @dmplant NVARCHAR(300) = (SELECT DMPlantOwner FROM #tmpInitiative)

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @dmplant;


            --IF(@dmplant IS NULL)
            --BEGIN
            --    INSERT INTO @tmpEmailTable(Email) 
            --    SELECT 'thammatad.a@frontiscompany.com';
            --END
			-- select * from initiativedetail // select * from detailinformation
        END
    -- Editor ของ Process PIM
    ELSE IF(@ActionByCode = '@processen')
        BEGIN
             DECLARE @processen NVARCHAR(300) = (SELECT ProcessEngineer FROM #tmpDetailInformation)

             IF(@processen IS NULL) SET @processen = (SELECT ProcessEngineer FROM #tmpInitiativeDetail)

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @processen;

            --IF(@processen IS NULL)
            --BEGIN
            --    INSERT INTO @tmpEmailTable(Email) 
            --    SELECT 'thammatad.a@frontiscompany.com';
            --END
			-- select * from initiativedetail // select * from detailinformation
        END

    -- Approver ของ Process PIM
	 ELSE IF(@ActionByCode = '@dmprocessen')
          BEGIN
             DECLARE @dmprocessen NVARCHAR(300) = (SELECT DivMgrOfPlantProcessEngineer FROM #tmpDetailInformation)

             --IF(@dmprocessen IS NULL) SET @processen = (SELECT ProcessEngineer FROM #tmpInitiativeDetail)

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @dmprocessen;

            IF(@dmprocessen IS NULL)
            BEGIN
                INSERT INTO @tmpEmailTable(Email) 
                SELECT 'teerasak.t@pttgcgroup.com';
		END
		END
    -- Editor ของ Process PIM
	ELSE IF(@ActionByCode = '@localenvi')
        BEGIN

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE Indicator = 'Q-sh-sec' AND PositionLevel = 60

        END
    -- Approver ของ Process PIM
    ELSE IF(@ActionByCode = '@localenvidm')
        BEGIN

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE Indicator = 'Q-sh-sec' AND PositionLevel = 50

        END
    -- Approver ของ Process PIM ทำเพื่อเทสอาจมีการเปลี่ยนแปลงในอนาคต
    ELSE IF(@ActionByCode = '@tteptdm')
        BEGIN

            INSERT INTO @tmpEmailTable(Email) 
            SELECT TOP 1 Email FROM Owners WHERE EmployeeID = '26001658'

        END
   -- ELSE IF(@ActionByCode = '@qteev')  --wait fix
    --    BEGIN

            --INSERT INTO @tmpEmailTable(Email) 
            --SELECT 'thammatad.a@frontiscompany.com'    --  Temporaly

    --    END
	-- Editor ของ Process PIM ชั่วคราว
    ELSE IF(@ActionByCode = '@qteev')  -- wait fix
        BEGIN

            INSERT INTO @tmpEmailTable(Email) 
            SELECT 'thammatad.a@frontiscompany.com'    --  Temporaly

        END

	-- Approver ของ Process PIM ชั่วคราว
    ELSE IF(@ActionByCode = '@qteevdm')  -- wait fix
        BEGIN

            INSERT INTO @tmpEmailTable(Email) 
            SELECT 'thammatad.a@frontiscompany.com'    --  Temporaly

        END
	-- Approver ของ Process CIM
    ELSE IF(@ActionByCode = '@sspimdm')  -- wait fix
        BEGIN            

            INSERT INTO @tmpEmailTable(Email) 
            SELECT TOP 1 Email FROM Owners WHERE Indicator = 'S-SP-IM' AND PositionLevel = 40

        END
	-- Approver ของ Process CIM ยังไม่ Config อาจจะไม่ได้ใช้แล้ว
    ELSE IF(@ActionByCode = '@sspimvp')  
        BEGIN            

            INSERT INTO @tmpEmailTable(Email) 
            SELECT TOP 1 Email FROM Owners WHERE Indicator = 'S-SP' 

        END
    -- Approver Stage อัตโนมัติ ที่ทำงานผ่าน Microsoft Flow
    ELSE IF(@ActionByCode = '@system') 
        BEGIN            

            INSERT INTO @tmpEmailTable(Email) 
            SELECT 'NOREPLY-FROM-IDEAMANISYSTEM@PTTGCGROUP.COM';

        END

    --ELSE IF(@ActionByCode = '@PMO')  -- directCapex
    --    BEGIN
    --        INSERT INTO @tmpEmailTable(Email) 
    --        SELECT 'thammatad.a@frontiscompany.com'
    --    END
    -- Approver ของ Process CPI    
    ELSE IF(@ActionByCode = '@CPIApprover')  -- directCapex
        BEGIN
		    -- มาจาก NewDetailInformation
			declare @ApproveforCPI NVARCHAR(300)  = (select cpiapprover from #tmpCPIDetailInformation)
			if (isnull(@ApproveforCPI,'') <> '')
			begin 
            INSERT INTO @tmpEmailTable(Email) 
            SELECT TOP 1 own.Email FROM NewDetailInformations nd LEFT JOIN Owners own ON own.OwnerName = nd.CpiApprover WHERE nd.InitiativeId = @initiativeId
			end
			
			else 
			begin
            INSERT INTO @tmpEmailTable(Email) 
			-- ไต่จาก Organize Chart
            SELECT * FROM dbo.fn_GetOrgChartApproverByPosition(@initiativeId, 'DM')
        END

        END
     -- Approver ของ Process PIM
	 ELSE IF(@ActionByCode = '@PMOReview')  
        BEGIN            

            INSERT INTO @tmpEmailTable(Email) 
			-- มาจาก roledetailsetting
            SELECT * FROM dbo.fn_GetEmailfromPermission('PMO Review')

        END
	-- Approver ของ Process PIM
	ELSE IF(@ActionByCode = '@VACGate1')  
        BEGIN            
			IF(isnull(@OPEXCOST,0) <= 2)
				BEGIN		
					INSERT INTO @tmpEmailTable(Email) 
					-- มาจาก Plant
					select * from fn_GetPositionfromPlantOwner (@initiativeId,'ProjectManager')
				END	

			ELSE 
				BEGIN
					INSERT INTO @tmpEmailTable(Email)
					-- มาจาก Plant
					SELECT * FROM dbo.fn_GetEmailfromPermission('VAC Integrator Gate  1')

				END
		END
    -- Approver ของ Process PIM
	ELSE IF(@ActionByCode = '@SubPICGate1')  
        BEGIN            
			INSERT INTO @tmpEmailTable(Email)
			-- มาจาก Plant
			select * from fn_GetPositionfromPlantOwner (@initiativeId,'ProjectManager')
		END	
    -- Approver ของ Process PIM
	ELSE IF(@ActionByCode = '@VACGate23')  
        BEGIN            

            INSERT INTO @tmpEmailTable(Email) 
			-- มาจาก Plant
            SELECT * FROM dbo.fn_GetEmailfromPermission('VAC Integrator Gate 2,3')

        END
    -- Approver ของ Process PIM
	ELSE IF(@ActionByCode = '@PICGate23')  
        BEGIN            
			IF(isnull(@CAPEXPEXCOST,0) > 1 and @initiativeType = 'PIM')
				BEGIN		
					INSERT INTO @tmpEmailTable(Email) 
					-- มาจาก Plant
					SELECT * FROM dbo.fn_GetEmailfromPermission('PIC facilitator  Gate 2,3')
				END	

			ELSE IF(isnull(@CAPEXPEXCOST,0) > 50 and @initiativeType = 'MAX')
				BEGIN
					INSERT INTO @tmpEmailTable(Email) 
					-- มาจาก Plant
					SELECT * FROM dbo.fn_GetEmailfromPermission('PIC facilitator  Gate 3')
				END
			ELSE
				BEGIN		
					INSERT INTO @tmpEmailTable(Email) 
					-- มาจาก Plant
					select * from fn_GetPositionfromPlantOwner (@initiativeId,'ProjectManager')
				END	
		END

	--krit add new position for pim lookback

	--lookback environment
	ELSE IF(@ActionByCode = '@localEnviEng')
    BEGIN

		INSERT INTO @tmpEmailTable(Email) 
        SELECT Email FROM Owners own
		INNER JOIN ProjectLookback lookback
		ON own.EmployeeID = lookback.LocalEnvironmentEngineer		
		WHERE lookback.InitiativeId = @initiativeId
        --INSERT INTO @tmpEmailTable(Email) 
        --SELECT Email FROM Owners WHERE Indicator = 'Q-sh-sec' AND PositionLevel = 60

    END

    ELSE IF(@ActionByCode = '@localEnviEngDM')
    BEGIN
			
		INSERT INTO @tmpEmailTable(Email) 
        SELECT 'teerasak.t@pttgcgroup.com';
    END

	--lookback environment  and performance
	ELSE IF(@ActionByCode = '@lookbackFocalPoint')
    BEGIN
			
		INSERT INTO @tmpEmailTable(Email) 
        SELECT Email FROM Owners own
		INNER JOIN ProjectLookback lookback
		ON own.EmployeeID = lookback.LookbackFocalPointPerson		
		WHERE lookback.InitiativeId = @initiativeId
    END

	--lookback environment  and performance
	ELSE IF(@ActionByCode = '@lookbackPerson')
    BEGIN
			
		INSERT INTO @tmpEmailTable(Email) 
        SELECT Email FROM Owners own
		INNER JOIN ProjectLookback lookback
		ON own.EmployeeID = lookback.PerformanceLookbackPerson		
		WHERE lookback.InitiativeId = @initiativeId
    END

	ELSE IF(@ActionByCode = '@lookbackPersonDM')
    BEGIN
			
		INSERT INTO @tmpEmailTable(Email) 
        SELECT 'teerasak.t@pttgcgroup.com';
    END

	--krit 21-07-2021
	ELSE IF(@ActionByCode = '@processeng/@projecteng')
        BEGIN
             DECLARE @processen2 NVARCHAR(300) = (SELECT ProcessEngineer FROM #tmpDetailInformation)

             IF(@processen2 IS NULL) SET @processen = (SELECT ProcessEngineer FROM #tmpInitiativeDetail)

            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @processen2;

            IF(@processen2 IS NULL)
            BEGIN
                INSERT INTO @tmpEmailTable(Email) 
                SELECT 'thammatad.a@frontiscompany.com';
            END
			-- select * from initiativedetail // select * from detailinformation
        END
		--end if

		--krit 05-08-2021
		ELSE IF(@ActionByCode = '@owner/@creator/@projectmanager')
        BEGIN
             
			 DECLARE @RequestProjectEngineer BIT = (SELECT RequestProjectEngineer FROM #tmpInitiative)
			IF(ISNULL(@RequestProjectEngineer, 0) = 1)			
				BEGIN
					DECLARE @projectmanager2 NVARCHAR(300) = (SELECT ProjectManager FROM #tmpDetailInformation)
					IF(isnull(@projectmanager2,'') <> '')
					BEGIN
						INSERT INTO @tmpEmailTable(Email) 
						SELECT Email FROM Owners WHERE OwnerName = @projectmanager2  
					END
					ELSE 
					BEGIN
						INSERT INTO @tmpEmailTable(Email) 
						select * from fn_GetPositionfromPlantOwner (@initiativeId,'ProjectManager')
					END
				END
			ELSE
				BEGIN
					INSERT INTO @tmpEmailTable(Email) 
					SELECT TOP 1 own.Email FROM v_Initiatives ini LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName WHERE ini.Id = @initiativeId
					UNION
					SELECT TOP 1 CreatedBy FROM v_Initiatives WHERE Id = @initiativeId
				END	
			-- select * from initiativedetail // select * from detailinformation
        END
		--end if

		--krit 05-08-2021  for new pim flow
		ELSE IF(@ActionByCode = '@projectengOnly')
        BEGIN
             DECLARE @projectengOnly NVARCHAR(300) = (SELECT ProjectEngineer FROM #tmpDetailInformation)
            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @projectengOnly	
        END

		--end  if

		--krit 03-09-2021  for new Permission MAX
		ELSE IF(@ActionByCode = '@spocAllWorkstream')
        BEGIN
             DECLARE @spocAllWorkstream NVARCHAR(300) = (
			 SELECT TOP 1 ActionBy FROM InitiativeActions where InitiativeId = @initiativeId
			 AND Position = @ActionByCode
			 ORDER BY Counter DESC
			 )
            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @spocAllWorkstream	
        END

		--end  if

		--krit 03-09-2021  for new Permission MAX
		ELSE IF(@ActionByCode = '@youngLeaderAllWorkstream')
        BEGIN
            DECLARE @youngLeaderAllWorkstream NVARCHAR(300) = (
			 SELECT TOP 1 ActionBy FROM InitiativeActions where InitiativeId = @initiativeId
			 AND Position = @ActionByCode
			 ORDER BY Counter DESC
			 )
            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @youngLeaderAllWorkstream		
        END

		--end  if

		--krit 03-09-2021  for new Permission MAX
		ELSE IF(@ActionByCode = '@youngLeaderByWorkstream')
        BEGIN
             DECLARE @youngLeaderByWorkstream NVARCHAR(300) = (
			 SELECT TOP 1 ActionBy FROM InitiativeActions where InitiativeId = @initiativeId
			 AND Position = @ActionByCode
			 ORDER BY Counter DESC
			 )
            INSERT INTO @tmpEmailTable(Email) 
            SELECT Email FROM Owners WHERE OwnerName = @youngLeaderByWorkstream	
        END

		--end  if



    SELECT * INTO #tmpOwnerTable FROM dbo.fn_GetStructureOwnerTable()  --temp for remove duplicate email

    INSERT INTO #tmpOwnerTable(Id,Email)
    SELECT DISTINCT 0,Email FROM Owners WHERE Email IN (SELECT Email FROM @tmpEmailTable)

    SELECT * FROM #tmpOwnerTable


END
GO

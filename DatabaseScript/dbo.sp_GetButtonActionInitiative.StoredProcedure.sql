/****** Object:  StoredProcedure [dbo].[sp_GetButtonActionInitiative]    Script Date: 9/27/2021 5:41:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






































-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetButtonActionInitiative]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT,
    @email NVARCHAR(300),
    @flowType NVARCHAR(300) = 'initiative'
)
AS
BEGIN
	DECLARE @MAXApproverRole int
	DECLARE @LastestAction nvarchar(255)
	DECLARE @SPOC nvarchar(255)
	DECLARE @PIMSpecialadmin nvarchar(255)
	DECLARE @LastestOtherAction nvarchar(255)
	DECLARE @InitiativeStage nvarchar(255)
	DECLARE @Result nvarchar(255)
    DECLARE @LastestPosition_noemail NVARCHAR(255)  --add by oat
    DECLARE @LastestAction_noemail NVARCHAR(255)  --add by oat
    DECLARE @isEmailInPosition BIT = 'false'      --add by oat
    DECLARE @maxLastestActionByCount INT = 0;     --add by oat
    DECLARE @maxLastestActionByCountwithoutWhere INT = 0;     --add by oat
    DECLARE @InitiativeType NVARCHAR(150) -- add by oat
    DECLARE @IsOwnerAndCreator BIT = 'false'
	DECLARE @IsProjecteng BIT = 'false'
    DECLARE @isOnEditParallelFLow BIT = 'false';

	DECLARE @DIMSpecialadmin nvarchar(255)

	DECLARE @ITEditProgress nvarchar(255)

	DECLARE @IsProjectManager BIT = 'false'

	DECLARE @CIMSpecialadmin nvarchar(255)--- add from QA by Ta 2021/08/07 

	DECLARE @InitiativeStatus nvarchar(100)-- add from QA by Ta 2021/08/07 

	DECLARE @YoungLeaderAll nvarchar(255)
	DECLARE @EditInitiativeTypeMAX nvarchar(255)

	DECLARE @EditByWorkstream nvarchar(255)
	DECLARE @Workstream nvarchar(255)


    
    ---------------------------------------------------------

    SET @maxLastestActionByCount = (SELECT TOP 1 [Counter]
			FROM [dbo].[InitiativeActions]
			WHERE InitiativeId = @initiativeId
			AND ActionResult IS NULL
            AND ISNULL(IsInactive, 'false') = 'false'
            ORDER BY ID DESC
        )

    SELECT * INTO #tmpOwnerTable FROM dbo.fn_GetStructureOwnerTable()
    --check now who can edit without check action by
	SELECT TOP 1 @LastestPosition_noemail = [Position], @LastestAction_noemail = [Action]
	FROM [dbo].[InitiativeActions]
	WHERE InitiativeId = @initiativeId
	AND ActionResult IS NULL
    AND ISNULL(IsInactive, 'false') = 'false'
    AND Counter = @maxLastestActionByCount --add by oat
    ORDER BY ID DESC

    INSERT INTO #tmpOwnerTable
    EXEC sp_GetActionByFromActionByCode @initiativeId, @LastestPosition_noemail
	------------------
		INSERT INTO #tmpOwnerTable (id,Email)
		VALUES (0,'Teerasak.t@pttgcgroup.com')

	-- krit edit 27-sep-2021

    IF ( EXISTS( SELECT * FROM #tmpOwnerTable WHERE Email = @email ) AND @LastestAction_noemail IN ('edit','add detail' )  AND @email = 'Teerasak.t@pttgcgroup.com' )
    BEGIN
        SET @isEmailInPosition = 'true'

        IF (NOT EXISTS(
        SELECT TOP 1 [Position], [Action]
	    FROM [dbo].[InitiativeActions]
	    WHERE InitiativeId = @initiativeId
	    AND ActionResult IS NULL
        AND ISNULL(IsInactive, 'false') = 'false'
        AND Counter = @maxLastestActionByCount --add by oat
        AND Action IN ('edit','add detail','draft')
        AND ActionBy = @email))
        BEGIN
            INSERT INTO InitiativeActions(ActionBy,[Action],[Position],Status,Stage,InitiativeId,ActionByName,Counter,[Indicator],FlowType,ConditionType)
                            SELECT TOP 1         
                                @email AS ActionBy,
                                [Action] AS [Action],
                                Position AS Position,
                                Status AS Status,
                                Stage AS Stage,
                                InitiativeId AS InitiativeId,
                                (SELECT TOP 1 OwnerName FROM Owners WHERE Email = @email) AS ActionByName,
                                Counter AS Counter,
                                [Indicator] AS [Indicator],
                                FlowType AS FlowType,
                                'emailinposition' AS ConditionType
		                    FROM [dbo].[InitiativeActions]
		                    WHERE InitiativeId = @initiativeId
		                    AND ActionResult IS NULL
                            AND ISNULL(IsInactive, 'false') = 'false'
                            AND Counter = @maxLastestActionByCount --add by oat
                            AND Action IN ('edit','add detail','draft')
                            ORDER BY ID DESC
        END
    END

	-- krit edit 27-sep-2021

    ---------------------------------------------------------



    /* insert action by if have permission  for max   -- add by oat 2020-12-21 */
    IF EXISTS(SELECT * FROM v_Initiatives WHERE InitiativeType = 'max' AND Id = @initiativeId)
    BEGIN

        /* fix owner/creator cannot edit if stage IL5 */
        IF EXISTS(SELECT Id FROM v_Initiatives WHERE Id = @initiativeId AND Stage = 'IL5')
        BEGIN
            SET @maxLastestActionByCountwithoutWhere = (SELECT TOP 1 [Counter]
			                                            FROM [dbo].[InitiativeActions]
			                                            WHERE InitiativeId = @initiativeId
                                                        ORDER BY ID DESC
                                                        );            
            /* update inactive = false if il5  */
                UPDATE iniac SET
                iniac.IsInactive = 'false'
		        FROM [dbo].[InitiativeActions] iniac
		        WHERE InitiativeId = @initiativeId
		        AND ActionResult IS NULL
                AND ISNULL(IsInactive, 'false') = 'true'
                AND Counter = @maxLastestActionByCountwithoutWhere --add by oat
                AND Action IN ('edit','add detail')
                AND Stage = 'IL5';
        END

        SET @maxLastestActionByCount = (SELECT TOP 1 [Counter]
			FROM [dbo].[InitiativeActions]
			WHERE InitiativeId = @initiativeId
			AND ActionResult IS NULL
            AND ISNULL(IsInactive, 'false') = 'false'
            ORDER BY ID DESC
        )

		

        
        /* check permission */

		-- krit comment 12-Sep-2021

        --IF EXISTS(
        --SELECT
        --um.EMail,
        --uw.WorkstreamTitle,
        --rm.RoleId,
        --SectionId
        --FROM 
        --    UserManagements um
        --    INNER JOIN UserRoles ur ON ur.UserId = um.Id
        --    INNER JOIN RoleManagements rm ON rm.RoleId = ur.RoleId
        --    INNER JOIN UserWorkstreams uw ON uw.UserId = um.Id
        --    INNER JOIN DetailInformations det ON det.Workstream = uw.WorkstreamTitle
        --WHERE rm.SectionId = 'S00001'  AND det.InitiativeID = @initiativeId AND um.Email = @email
        --)
        --BEGIN
        --    IF NOT EXISTS( 
        --        SELECT TOP 1         
        --            @email AS ActionBy,
        --            [Action] AS [Action],
        --            Position AS Position,
        --            Status AS Status,
        --            Stage AS Stage,
        --            InitiativeId AS InitiativeId,
        --            Counter AS Counter,
        --            [Indicator] AS [Indicator],
        --            FlowType AS FlowType
		      --  FROM [dbo].[InitiativeActions]
		      --  WHERE InitiativeId = @initiativeId
		      --  AND ActionResult IS NULL
        --        AND ISNULL(IsInactive, 'false') = 'false'
        --        AND Counter = @maxLastestActionByCount --add by oat
        --        AND Action IN ('edit','add detail','draft')
        --        AND ActionBy = @email
        --        ORDER BY ID DESC
        --        )
        --        BEGIN
        --                    INSERT INTO InitiativeActions(ActionBy,[Action],[Position],Status,Stage,InitiativeId,ActionByName,Counter,[Indicator],FlowType,ConditionType)
        --                    SELECT TOP 1         
        --                        @email AS ActionBy,
        --                        [Action] AS [Action],
        --                        Position AS Position,
        --                        Status AS Status,
        --                        Stage AS Stage,
        --                        InitiativeId AS InitiativeId,
        --                        --(SELECT TOP 1 OwnerName FROM Owners WHERE Email = @email) AS ActionByName,   -- Set to NULL to prevent assign to
        --                        NULL AS ActionByName,
        --                        Counter AS Counter,
        --                        [Indicator] AS [Indicator],
        --                        FlowType AS FlowType,
        --                        'permissionedit' AS ConditionType
		      --              FROM [dbo].[InitiativeActions]
		      --              WHERE InitiativeId = @initiativeId
		      --              AND ActionResult IS NULL
        --                    AND ISNULL(IsInactive, 'false') = 'false'
        --                    AND Counter = @maxLastestActionByCount --add by oat
        --                    AND Action IN ('edit','add detail','draft')
        --                    ORDER BY ID DESC
        --        END
        --END
		-- krit comment 12-Sep-2021

    END


   
    
    -- oat add 11-28  for edit case parallel flow
    IF(@flowType NOT IN ('initiative', '') 
       AND NOT EXISTS(SELECT Status    FROM         InitiativeStage inis    WHERE         InitiativeId = @initiativeId        AND FLowType = @flowType))
    BEGIN --on click edit subflow
        SET @isOnEditParallelFLow = 'true';
    END
    ELSE IF( 
        @flowType NOT IN ('initiative', '') 
        AND ISNULL((SELECT Status    FROM         InitiativeStage inis    WHERE         InitiativeId = @initiativeId        AND FLowType = @flowType        AND ISNULL(Status, '') NOT IN ('finish','rejected','cancelled','wait for approval','wait for review')), 'finish') <> 'finish' )
              --case กำลังขอ ทำ parallel approve flow รันอยู่ ห้ามกดเพิ่ม
    BEGIN
        SET @isOnEditParallelFLow = 'true';
    END


	SET @MAXApproverRole = 
	(
			SELECT	COUNT(*)
			FROM	[dbo].[MaxApprovers]
			WHERE UPPER(ApproverEmail) = UPPER(@email)
			AND InitiativeId = @initiativeId
			AND ApproverType IN ('TF-BT-TO','TOTeam','TO Finance')
	)

	SET @LastestAction = 
	(
			SELECT TOP 1 [Action]
			FROM [dbo].[InitiativeActions]
			WHERE InitiativeId = @initiativeId
			AND UPPER(ActionBy) = UPPER(@email)
			AND ActionResult IS NULL
            AND ISNULL(IsInactive, 'false') = 'false'
            AND Counter = @maxLastestActionByCount --add by oat
            ORDER BY ID DESC
	)

	SET @LastestOtherAction = 
	(
			SELECT TOP 1 [Action]
			FROM [dbo].[InitiativeActions]
			WHERE InitiativeId = @initiativeId
			AND UPPER(ActionBy) <> UPPER(@email)
			AND ActionResult IS NULL
            AND ISNULL(IsInactive, 'false') = 'false'
            AND Counter = @maxLastestActionByCount --add by oat
            ORDER BY ID DESC
	)

	print '@LastestOtherAction ==' + @LastestOtherAction 


	 
	 SET @InitiativeStage = 
	 (
		 SELECT TOP 1 Stage 
		 FROM [dbo].[v_Initiatives] 
		 --INNER JOIN  [dbo].[Owners] ON [dbo].[Owners].OwnerName = [dbo].[Owners].OwnerName  --edit By Krit 01-Sep-2021
		 WHERE [dbo].[v_Initiatives].Id = @initiativeId
		 --AND UPPER([dbo].[Owners].Email) = UPPER(@email) --edit By Krit 01-Sep-2021
	 )

	 --add by man for checking workstream 17/08/2021
	 SET @Workstream  = 
	 (
		 SELECT TOP 1 SubWorkstream1 
		 FROM [dbo].[DetailInformations] 
		 WHERE InitiativeId = @initiativeId
	 )

	 -- add from QA by Ta 2021/08/07 
	  SET @InitiativeStatus = 
	 (
		SELECT TOP 1 Status 
		 FROM [dbo].[v_Initiatives] 
		 --INNER JOIN  [dbo].[Owners] ON [dbo].[Owners].OwnerName = [dbo].[Owners].OwnerName  --edit By Krit 01-Sep-2021
		 WHERE [dbo].[v_Initiatives].Id = @initiativeId
		 --AND UPPER([dbo].[Owners].Email) = UPPER(@email) --edit By Krit 01-Sep-2021
	 )
	 -- add from QA by Ta 2021/08/07 

	 

     SET @IsOwnerAndCreator = 
     (
        SELECT TOP 1 'true'
        FROM v_Initiatives ini
        LEFT JOIN  Owners own ON ini.OwnerName = own.OwnerName
        WHERE (ini.CreatedBy = @email OR ISNULL(own.Email, '') = @email)
        AND ini.Id = @initiativeId
     )

	 ------------------- NOk edit Change Project En. Could Edit (2021_03_23)--------------
	  SET @IsProjecteng = 
     (
        SELECT TOP 1 'true'
        FROM DetailInformations det
        LEFT JOIN  Owners own ON det.ProjectEngineer = own.OwnerName
        WHERE ISNULL(own.Email, '') = @email
        AND det.InitiativeId = @initiativeId
     )

	 SET @IsProjectManager = 
	 (
        SELECT TOP 1 'true'
        FROM DetailInformations det
        LEFT JOIN  Owners own ON det.ProjectManager = own.OwnerName
        WHERE ISNULL(own.Email, '') = @email
        AND det.InitiativeId = @initiativeId
     )

     SET @InitiativeType = 
     (
        SELECT TOP 1 InitiativeType
        FROM v_Initiatives ini
        LEFT JOIN  Owners own ON ini.OwnerName = own.OwnerName
        WHERE ini.Id = @initiativeId
     )

	 SET @SPOC =
	 (
		SELECT TOP 1  EMAIL FROM UserRoles ro 
		WHERE ro.RoleId = '105'
		AND UPPER(email) = UPPER(@email)
	 )

	 SET @YoungLeaderAll = 
	 (
		SELECT TOP 1  EMAIL FROM UserRoles ro 
		WHERE ro.RoleId = '236'
		AND UPPER(email) = UPPER(@email)
	 )

	 --krit add for return edit action type max 17-08-2021
	 SET @EditInitiativeTypeMAX = 
	 (
		SELECT TOP 1  EMAIL FROM UserRoles ro 
		INNER JOIN RolePermission rp
		ON ro.RoleId = CONVERT(NVARCHAR(255),rp.RoleId)
		WHERE rp.PermissionMasterId = '26'
		AND UPPER(email) = UPPER(@email)
	 )

	  --add by man for return edit workstream type max type max 17-08-2021
	 SET @EditByWorkstream = 
	 (
		SELECT TOP 1  EMAIL FROM UserRoles ro 
		INNER JOIN RolePermission rp
		ON ro.RoleId = CONVERT(NVARCHAR(255),rp.RoleId)
		INNER JOIN RoleSettingDetail rs
		on rs.PermissionMasterId = rp.PermissionMasterId
		where rs.PageId = 'EDITBYWORKSTREAM' 
		AND rs.Parameter01 = @Workstream
		AND UPPER(email) = UPPER(@email)
	 )


	 SET @PIMSpecialadmin =
	 (
		SELECT TOP 1 EMAIL FROM UserRoles ro 
		WHERE ro.RoleId = '1576'
		AND UPPER(email) = UPPER(@email)
	 )

	 SET @DIMSpecialadmin =
	 (
		SELECT TOP 1  EMAIL FROM UserRoles ro 
		WHERE ro.RoleId = '1352'
		AND UPPER(email) = UPPER(@email)
	 )

	  SET @ITEditProgress =
	 (
		SELECT TOP 1  EMAIL FROM UserRoles ro 
		WHERE ro.RoleId = '1590'
		AND UPPER(email) = UPPER(@email)
	 )

	 -- add from QA by Ta 2021/08/07 
	  SET @CIMSpecialadmin =
	 (
		SELECT EMAIL FROM UserRoles ro 
		WHERE ro.RoleId = '1588'
		AND UPPER(email) = UPPER(@email)
	 )
	 -- add from QA by Ta 2021/08/07 

	SET @Result = (
                        CASE
						--Nok Increase for Test
						--when @initiativeId = 65658 and @email = 'teerasak.t@pttgcgroup.com' then 'edit'
						--when  @email = 'thammatad.a@frontiscompany.com' then 'edit'
						
						

						-- ************* add from QA by Ta 2021/08/07 **************
						WHEN ISNULL(@InitiativeStage,'') = '' then 'edit'
						WHEN @InitiativeStage in  ('Cancelled') then 'view' -- krit add 16-06-2021 for return view when stage cancel
						WHEN @InitiativeStage in  ('Admin Check') AND @EMAIL IN (@CIMSpecialadmin) and isnull(@InitiativeType,'') in ('cim')  then 'approveEdit'
						WHEN @email = 'thammatad.a@frontiscompany.com' AND isnull(@InitiativeType,'') = 'pim' then 'edit'  --aon 2021-06-14
						--WHEN (@EMAIL IN (@DIMSpecialadmin) and isnull(@InitiativeType,'') in ('IT','Digital') AND isnull(@InitiativeStage,'') in ('DM','VP') AND isnull(@InitiativeStatus,'') = 'wait for approval') then 'approve'   -- aon 2021-05-07 for k.Wan
						--WHEN (@EMAIL IN (@DIMSpecialadmin) and isnull(@InitiativeType,'') in ('IT','Digital') AND isnull(@InitiativeStage,'') in ('admin') AND isnull(@InitiativeStatus,'') = 'wait for approval') then 'approveEdit'   -- Krit 2021-09-01 for k.Wan

						WHEN (@EMAIL IN (@CIMSpecialadmin) and isnull(@InitiativeType,'') in ('cim') ) then 'edit'
						-- ************* add from QA by Ta 2021/08/07 **************


						

						WHEN ISNULL(@isOnEditParallelFLow, 'false') = 'true' THEN 'edit'
                        --WHEN @LastestAction_noemail in ('edit','add detail' ) AND ISNULL(@IsOwnerAndCreator, 'false') = 'true' AND @email = 'thammatad.a@frontiscompany.com' THEN 'edit' -- for test new approve env Dev by OAT
                        --WHEN @InitiativeType = 'strategy' AND ISNULL(@IsOwnerAndCreator, 'false') = 'true' THEN 'edit' --temporary for strategy update by oat
                        WHEN isnull(@InitiativeStage,'null')  in  ('draft','null','IL5') THEN 'edit'
                        WHEN @isEmailInPosition = 'true' THEN 'edit'
					    WHEN @LastestAction in ('edit','add detail','draft' ) THEN 'edit'
						WHEN @LastestAction = 'approve' THEN 'approve'
						WHEN @LastestAction = 'approveEdit' THEN 'approveEdit'

						WHEN (@EMAIL IN (@SPOC) and isnull(@InitiativeType,'') = 'max') then 'edit'  -- For SPOC All
						WHEN (@EMAIL IN (@YoungLeaderAll) and isnull(@InitiativeType,'') = 'max') then 'edit' -- For Young Leader All
						
						-- krit add 17-08-2021
						WHEN (@EMAIL IN (@EditInitiativeTypeMAX) and isnull(@InitiativeType,'') = 'max') then 'edit' -- For Have Permission edit MAX
						-- krit add 17-08-2021

						--add by man for edit type CPI for testing 19/08/2021 
						WHEN (@email = 'thammatad.a@frontiscompany.com' and isnull(@InitiativeType,'') = 'cpi') then 'edit'

						--man add 17-08-2021
						WHEN (@EMAIL IN (@EditByWorkstream) and isnull(@InitiativeType,'') = 'max') then 'edit' -- For Have Permission edit MAX by workstream

						--WHEN (@EMAIL IN (@SPOC) and isnull(@InitiativeType,'') = 'max' and @LastestOtherAction = 'approve') then 'edit'

						WHEN (@EMAIL IN (@PIMSpecialadmin) and isnull(@InitiativeType,'') in ('pim','directcapex','max','cim') ) then 'edit'
						WHEN (@EMAIL IN (@DIMSpecialadmin) and isnull(@InitiativeType,'') in ('dim') ) then 'edit'   -- aon 2021-05-07 for k.Wan
						
						WHEN (@EMAIL IN (@ITEditProgress) and isnull(@InitiativeType,'') in ('pim','directcapex','max','cim','dim') ) then 'edit'
						
						WHEN @LastestOtherAction = 'approve' THEN 'view'
						WHEN @MAXApproverRole >0 THEN  'edit'
						---------------------------- Nok edit increase Project Eng & Project Manager can Edit @BudgetDistribute 2021_03_23 --------------------------------------
						--when @InitiativeStage in  ('Budget Distributed','Budget Distribute') and (  isnull(@IsProjecteng,'false') = 'true' or isnull(@IsProjectManager,'false') = 'true' or ISNULL(@IsOwnerAndCreator, 'false') = 'true')   then 'edit'
						
						-- ************* add from QA by Ta 2021/08/07 **************
						when @InitiativeStage in  ('Budget Distributed','Budget Distribute') and (isnull(@IsProjecteng,'false') = 'true' or ISNULL(@IsOwnerAndCreator, 'false') = 'true')   then 'edit'
						-- ************* add from QA by Ta 2021/08/07 **************

					    ELSE 'view' END)
	 
--Check SPOC Permission (Please Change Initiative ID and Test Before Exec)
----edit 
--exec [dbo].[sp_GetButtonActionInitiative]  74410,'kewalin.k@pttgcgroup.com'

----approve
--exec [dbo].[sp_GetButtonActionInitiative]  50801,'kewalin.k@pttgcgroup.com'

----edit / (wait for approve)
--exec [dbo].[sp_GetButtonActionInitiative]  72681,'kewalin.k@pttgcgroup.com'

----approve 
--exec [dbo].[sp_GetButtonActionInitiative]  62648,'kewalin.k@pttgcgroup.com'


--exec [dbo].[sp_GetButtonActionInitiative]  73052,'kewalin.k@pttgcgroup.com'

----Check PIM Permission
----view
--exec [dbo].[sp_GetButtonActionInitiative]  74410,'teerasak.t@pttgcgroup.com'

----approve
--exec [dbo].[sp_GetButtonActionInitiative]  50801,'teerasak.t@pttgcgroup.com'

----edit
--exec [dbo].[sp_GetButtonActionInitiative]  72258,'teerasak.t@pttgcgroup.com'

----approve
--exec [dbo].[sp_GetButtonActionInitiative]  72681,'teerasak.t@pttgcgroup.com'
	  
	SELECT @Result
END
GO

/****** Object:  StoredProcedure [dbo].[sp_List_Overview]    Script Date: 9/22/2021 6:14:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






















 

 
 CREATE PROCEDURE [dbo].[sp_List_Overview]
(
    @InitiativeCode  NVARCHAR(1024),
	@InitiativeName  NVARCHAR(1024),
	@Status  NVARCHAR(1024),
	@InitiativeType  NVARCHAR(1024),
	@OwnerName  NVARCHAR(1024),
	@Plant  NVARCHAR(1024),
	@Organization  NVARCHAR(1024),
	@TypeofInvestment  NVARCHAR(1024),
	@RegisteringDateSince  NVARCHAR(1024),
	@RegisteringDateTo  NVARCHAR(1024),
	@WorkStream  NVARCHAR(1024),
	@SubWorkStream1  NVARCHAR(1024), 
	@Stage  NVARCHAR(1024),
	@emocNo  NVARCHAR(1024),
	@WBS  NVARCHAR(1024),
	@AppNo  NVARCHAR(1024),
	@Company  NVARCHAR(1024), 
	 
	@Onprogress  NVARCHAR(1024),
	@Complete  NVARCHAR(1024),
	@Cancel  NVARCHAR(1024), 
	 
	@KeyWord  NVARCHAR(1024), 

	@SortField NVARCHAR(1024), 
	@OrderBy  NVARCHAR(1024),  -- asc, desc

	@PageNo  int,
	@RowPerPage  int,


    @email NVARCHAR(1024)

	
)
AS
BEGIN



	
	DECLARE @count int 
	exec [sp_List_Overview_count]
	@InitiativeCode,@InitiativeName,@Status,@InitiativeType,@OwnerName,@Plant,@Organization,@TypeofInvestment,@RegisteringDateSince,@RegisteringDateTo,
	@WorkStream,@SubWorkStream1,@Stage,@emocNo,@WBS,@AppNo,@Company,@Onprogress,@Complete,@Cancel,@KeyWord,@SortField,@OrderBy
	-- ,1,50
	,@email, @count output 

 
 
    
	
	DECLARE @QueryString NVARCHAR(MAX);


	IF OBJECT_ID('tempdb..#Temp_Owner') IS NOT NULL DROP TABLE #Temp_Owner
	IF OBJECT_ID('tempdb..#Temp_DetEngineer') IS NOT NULL DROP TABLE #Temp_Manager
	IF OBJECT_ID('tempdb..#Temp_DimMerbers') IS NOT NULL DROP TABLE #Temp_DimMerbers
	IF OBJECT_ID('tempdb..#Temp_CimMerbers') IS NOT NULL DROP TABLE #Temp_CimMerbers
	IF OBJECT_ID('tempdb..#Temp_InitiativeActions') IS NOT NULL DROP TABLE #Temp_InitiativeActions

	DECLARE @LoginName NVARCHAR(255);

	--SET @LoginName = (SELECT TOP 1 OwnerName FROM Owners WHERE Email = @email) --SELECT EmployeeID,OwnerName,Email INTO #Temp_Owner FROM Owners WHERE Email = @email
	--Select InitiativeId,@email as Email INTO #Temp_DetEngineer From DetailInformations
	--Where Manager = @LoginName OR President =  @LoginName OR ProjectManager =  @LoginName 
	--OR ProjectEngineer =  @LoginName OR ProjectDirector =  @LoginName OR ProcessEngineer =  @LoginName 
	--OR DivMgrOfProcessEngineer = @LoginName OR SponsorEvp = @LoginName

	SET @LoginName = (SELECT TOP 1 left(OwnerName, charindex('/', OwnerName) - 1) AS OwnerName FROM Owners WHERE Email = @email)
	--SET @LoginName = (SELECT TOP 1 SUBSTRING(OwnerName, 1 ,case when  CHARINDEX('/', OwnerName ) = 0 then LEN(OwnerName) else CHARINDEX('/', OwnerName) -1 end) AS OwnerName FROM Owners WHERE Email = @email)
	Select InitiativeId,@email as Email INTO #Temp_DetEngineer From DetailInformations TDET
	Inner join v_Initiatives TINI ON TINI.Id = TDET.InitiativeId
	Where ISNULL(SUBSTRING(Manager, 1 ,case when  CHARINDEX('/', Manager ) = 0 then LEN(Manager) else CHARINDEX('/', Manager) -1 end),'') = @LoginName 
	OR  SUBSTRING(President, 1 ,case when  CHARINDEX('/', President ) = 0 then LEN(President) else CHARINDEX('/', President) -1 end)   =  @LoginName 
	OR  SUBSTRING(ProjectManager, 1 ,case when  CHARINDEX('/', ProjectManager ) = 0 then LEN(ProjectManager) else CHARINDEX('/', ProjectManager) -1 end) =  @LoginName 
	OR  SUBSTRING(ProjectEngineer, 1 ,case when  CHARINDEX('/', ProjectEngineer ) = 0 then LEN(ProjectEngineer) else CHARINDEX('/', ProjectEngineer) -1 end)  =  @LoginName 
	OR  SUBSTRING(ProjectDirector, 1 ,case when  CHARINDEX('/', ProjectDirector ) = 0 then LEN(ProjectDirector) else CHARINDEX('/', ProjectDirector) -1 end)  =  @LoginName 
	OR  SUBSTRING(ProcessEngineer, 1 ,case when  CHARINDEX('/', ProcessEngineer ) = 0 then LEN(ProcessEngineer) else CHARINDEX('/', ProcessEngineer) -1 end) =  @LoginName 
	OR  SUBSTRING(DivMgrOfProcessEngineer, 1 ,case when  CHARINDEX('/', DivMgrOfProcessEngineer ) = 0 then LEN(DivMgrOfProcessEngineer) else CHARINDEX('/', DivMgrOfProcessEngineer) -1 end)  = @LoginName 
	OR  SUBSTRING(SponsorEvp, 1 ,case when  CHARINDEX('/', SponsorEvp ) = 0 then LEN(SponsorEvp) else CHARINDEX('/', SponsorEvp) -1 end)  = @LoginName
	
	Select InitiativeId,@email as Email INTO #Temp_DimMerbers from DimMembers Where MemberName IS NOT NULL
	AND MemberType IN ('DigitalFocalPoint','TeamMember','ImpactedParties','ProjectSponsor','ITFocalPoint')
	AND SUBSTRING(MemberName, 1 ,case when  CHARINDEX('/', MemberName ) = 0 then LEN(MemberName) else CHARINDEX('/', MemberName) -1 end) = @LoginName
	
	select TINI.Id as InitiativeId,@email as Email INTO #Temp_CimMerbers from Owners TOWN
	LEFT JOIN Owners TOWN2 ON TOWN2.DepOrgID = TOWN.DepOrgID AND TOWN2.DivOrgID = TOWN.DivOrgID
	Left Join v_Initiatives TINI ON (TINI.OwnerName = TOWN2.OwnerName OR TINI.CreatedBy = TOWN2.Email) AND TINI.InitiativeType in ('cim','strategy','max','pim','directCapex')
	where TOWN.Email= @email AND TINI.Name is not null

	select ActionBy,InitiativeId INTO #Temp_InitiativeActions from InitiativeActions 
	where ActionBy = @email
	Group by ActionBy,InitiativeId 
	 

	SET @QueryString = '
	 
	
		SELECT * FROM
		(
			SELECT 
			 ROW_NUMBER() OVER(ORDER BY @SortField @OrderBy ) AS rowNumber  
			 ,*
			FROM
			( 
					SELECT 
					  DISTINCT
					  INI.ID AS ID
					,INI.InitiativeCode AS InitiativeCode
					,INI.[Name] AS Name
					,INI.OwnerName AS [OwnerName]
					,UPPER(ACT.ActionByName) AS AssignTo
					,INI.RegisteringDate AS RegisteringDate
					,INI.UpdatedDate AS UpdatedDate
					,INI.Organization AS Organization
					,INI.InitiativeType AS InitiativeType
					,INI.Company AS Company
					,ProgressHeader.AppropriationNo AS AppropriationNo
					,ProgressHeader.WBSNo AS WbsNo
					--, [dbo].[fn_MAP_Initiative_Stage](INI.Stage) AS Stage
					, INI.Stage AS Stage
					, (INI.[Status]) AS [Status]  
					, @count AS Counter  
					FROM v_Initiatives INI
                    LEFT JOIN CapexInformations CAP ON CAP.InitiativeId = INI.Id
                    LEFT JOIN DetailInformations DET ON DET.InitiativeId = INI.Id
                    LEFT JOIN v_FirstNextAction_Overview  ACT ON ACT.InitiativeId = INI.Id AND ACT.ActionResult IS NULL
                    LEFT JOIN RequestEmoc ON RequestEmoc.InitiativeId = INI.ID
                    LEFT JOIN ProgressHeader ON ProgressHeader.InitiativeId = INI.ID
                    LEFT JOIN DetailInformations DET_ProjectEn on ini.Id = DET_ProjectEn.InitiativeId
                    LEFT JOIN InitiativeDetails IDET_President on ini.Id = IDET_President.InitiativeId
                    LEFT JOIN InitiativeCoDevelopers co on ini.Id = co.InitiativeId
                    LEFT JOIN Owners ProjectEn on DET_ProjectEn.ProjectEngineer = ProjectEn.OwnerName
                    LEFT JOIN Owners CimPresident on IDET_President.President = CimPresident.OwnerName
                    LEFT JOIN Owners coon on co.CoDeveloperName = coon.OwnerName
                    LEFT JOIN OWNERS ON UPPER(OWNERS.OwnerName) = UPPER(INI.OwnerName)
                    LEFT JOIN InitiativeCoDevelopers CODEV ON CODEV.InitiativeId = INI.ID AND OWNERS.OwnerName = CODEV.CoDeveloperName

					LEFT JOIN #Temp_DetEngineer TPJ ON TPJ.InitiativeId = INI.Id
					LEFT JOIN #Temp_DimMerbers TDM ON TDM.InitiativeId = INI.Id
					LEFT JOIN #Temp_CimMerbers TCM ON TCM.InitiativeId = INI.Id
					LEFT JOIN #Temp_InitiativeActions TIA ON TIA.InitiativeId = INI.Id

					WHERE  (INI.HistoryFlag IS NULL OR INI.HistoryFlag  = 0 )
					AND (INI.InitiativeCode  like ''%@InitiativeCode%'' OR ''@InitiativeCode'' = '''' ) 
					AND (INI.[Name]  like ''%@InitiativeName%'' OR ''@InitiativeName'' = '''' ) 
					AND (INI.[Status]  IN  (''@Status_clause'') OR ''@Status'' = '''' ) 
					AND (INI.InitiativeType  IN  (''@InitiativeType_clause'') OR ''@InitiativeType'' = '''' ) 
					AND (INI.OwnerName  IN  (''@OwnerName_clause'') OR ''@OwnerName'' = '''' ) 
					AND (INI.Plant  IN  (''@Plant_clause'') OR ''@Plant'' = '''' ) 
					AND (INI.Organization   IN  (''@Organization_clause'') OR ''@Organization'' = '''' ) 
					AND (INI.TypeofInvestment   IN  (''@TypeofInvestment_clause'') OR ''@TypeofInvestment'' = '''' ) 
					AND (INI.RegisteringDate   >=  ''@RegisteringDateSince'' OR ''@RegisteringDateSince'' = '''' ) 
					AND (INI.RegisteringDate   <=  ''@RegisteringDateTo'' OR ''@RegisteringDateTo'' = '''' ) 
					AND (DET.WorkStream =  ''@WorkStream'' OR ''@WorkStream'' = ''''   )  
					AND (INI.Stage like ''%@Stage%'' OR ''@Stage'' = '''' )  
					AND (RequestEmoc.emocNO  like ''%@emocNo%'' OR ''@emocNo'' = '''' ) 
					AND (ProgressHeader.AppropriationNo  like ''%@AppNo%'' OR ''@AppNo'' = '''' ) 
					AND (ProgressHeader.WBSNo  like ''%@WBS%'' OR ''@WBS'' = '''' ) 
					AND (INI.Company   IN  (''@Company_clause'') OR ''@Company'' = '''' )  
					AND ( 
								INI.InitiativeCode  like ''%\@KeyWord%'' ESCAPE ''\''
							OR	INI.[Name]  like ''%\@KeyWord%'' ESCAPE ''\''
							OR	INI.OwnerName  like ''%\@KeyWord%'' ESCAPE ''\''
							OR	ACT.ActionByName   like ''%\@KeyWord%'' ESCAPE ''\''
							OR	INI.Organization   like ''%\@KeyWord%'' ESCAPE ''\''
							OR	INI.InitiativeType   like ''%\@KeyWord%'' ESCAPE ''\''
							OR	INI.Company  like ''%\@KeyWord%'' ESCAPE ''\''
							OR	INI.Stage   like ''%\@KeyWord%'' ESCAPE ''\''
							OR	INI.[Status]  like ''%\@KeyWord%''  ESCAPE ''\''
							OR	ProgressHeader.WBSNo  like ''%\@KeyWord%''  ESCAPE ''\''
							OR	ProgressHeader.AppropriationNo  like ''%\@KeyWord%'' ESCAPE ''\''
							OR  ''@KeyWord'' = ''''
	
	
						
					)

					AND ( @PermissionCondition  )  
					 
					AND (@OnprogressCondition)
					AND (@CompleteCondition)
					AND (@CancelCondition)




					

			) AS INI
			--) AS T_01
	 
		 ) AS T
		 WHERE  T.rowNumber Between  @StartRow AND @EndRow
		 ORDER BY T.rowNumber 
	'
	 
	 
	SET @QueryString = REPLACE(@QueryString,'@InitiativeType_clause', dbo.fn_MultipleSearchKeyword(@InitiativeType)) 
	SET @QueryString = REPLACE(@QueryString,'@OwnerName_clause', dbo.fn_MultipleSearchKeyword(@OwnerName)) 
	SET @QueryString = REPLACE(@QueryString,'@Plant_clause', dbo.fn_MultipleSearchKeyword(@Plant))  
	SET @QueryString = REPLACE(@QueryString,'@TypeofInvestment_clause', dbo.fn_MultipleSearchKeyword(@TypeofInvestment))   
	SET @QueryString = REPLACE(@QueryString,'@Company_clause', dbo.fn_MultipleSearchKeyword(@Company))  
	SET @QueryString = REPLACE(@QueryString,'@Organization_clause', dbo.fn_MultipleSearchKeyword(@Organization))  
	SET @QueryString = REPLACE(@QueryString,'@Status_clause', dbo.fn_MultipleSearchKeyword(@Status))  
	

 
	SET @QueryString = REPLACE(@QueryString,'@InitiativeCode',@InitiativeCode) 
	SET @QueryString = REPLACE(@QueryString,'@InitiativeName',@InitiativeName)
	SET @QueryString = REPLACE(@QueryString,'@Status', @Status) 
	SET @QueryString = REPLACE(@QueryString,'@InitiativeType', @InitiativeType) 
	SET @QueryString = REPLACE(@QueryString,'@OwnerName', @OwnerName) 
	SET @QueryString = REPLACE(@QueryString,'@Plant', @Plant)  
	SET @QueryString = REPLACE(@QueryString,'@TypeofInvestment', @TypeofInvestment) 
    SET @QueryString = REPLACE(@QueryString,'@RegisteringDateSince',@RegisteringDateSince) 
	SET @QueryString = REPLACE(@QueryString,'@RegisteringDateTo',@RegisteringDateTo)  
	SET @QueryString = REPLACE(@QueryString,'@WorkStream',@WorkStream) 
	SET @QueryString = REPLACE(@QueryString,'@SubWorkStream1',@SubWorkStream1)  
	SET @QueryString = REPLACE(@QueryString,'@Stage', @Stage)  
	SET @QueryString = REPLACE(@QueryString,'@Status', @Status)  

	SET @QueryString = REPLACE(@QueryString,'@emocNo',@emocNo) 
	SET @QueryString = REPLACE(@QueryString,'@WBS',@WBS) 
	SET @QueryString = REPLACE(@QueryString,'@AppNo',@AppNo) 
	SET @QueryString = REPLACE(@QueryString,'@Company',@Company) 
	SET @QueryString = REPLACE(@QueryString,'@Organization',@Organization) 
	SET @QueryString = REPLACE(@QueryString,'@KeyWord',@KeyWord) 
  

   IF @SortField IS NULL BEGIN SET @SortField = '' END 
   IF @SortField  = '' BEGIN SET @SortField = 'RegisteringDate' ; SET @OrderBy = 'desc' END 
   IF @SortField  = 'InitiativeCode' BEGIN SET @SortField = 'INI.InitiativeCode'  END 
    
	 
	SET @QueryString = REPLACE(@QueryString,'@SortField',@SortField) 
	SET @QueryString = REPLACE(@QueryString,'@OrderBy',@OrderBy) 
	 
	--------------------------------------------------------------------------------------------------------------------------------------------------

  ------------ Multipage  -------------------------------------------------------------------------
	DECLARE @StartRow INT = (@PageNo - 1) * @RowPerPage    +   1 
	DECLARE @EndRow INT  = @PageNo * @RowPerPage 

	SET @QueryString = REPLACE(@QueryString,'@StartRow',convert(nvarchar(255),@StartRow)) 
	SET @QueryString = REPLACE(@QueryString,'@EndRow',convert(nvarchar(255),@EndRow)) 
	-------------------------------------------------------------------------------------------------------------------------------------------------- 


	------------ Count  -------------------------------------------------------------------------
	SET @QueryString = REPLACE(@QueryString,'@Count',@Count) 
	--------------------------------------------------------------------------------------------------------------------------------------------------



	------------ Permission -------------------------------------------------------------------------------------------------------------------------- 
	DECLARE @PermissionCondition NVARCHAR(MAX)
	DECLARE @ActualPermissionCondition NVARCHAR(MAX)

	DECLARE @EditTypeMax NVARCHAR(MAX)
	DECLARE @ViewMCS NVARCHAR(MAX)

	

	 --SET @PermissionCondition = '( (NOT CODEV.CoDeveloperName IS NULL) OR (@ActualPermissionCondition))'
	 --OR  ( INI.Max = 1 AND DET.Workstream NOT IN (''Supply Chain (Upstream)'' ,''M&S (Upstream)'')  )  

	 --EDITALLTYPEMAX
	 SET @EditTypeMax = 
	 ISNULL((
		SELECT TOP 1 rs.Id
		FROM UserRoles ro 
		INNER JOIN RolePermission rp
		ON ro.RoleId = CONVERT(NVARCHAR(255),rp.RoleId)
		INNER JOIN RoleSettingDetail rs
		on rs.PermissionMasterId = rp.PermissionMasterId
		where rs.PageId = 'EDITALLTYPEMAX' 
		AND UPPER(ro.Email) = UPPER(@email)
	 ),'')
	 --EDITBYWORKSTREAM
	 SET @ViewMCS = 
	 ISNULL((
		SELECT TOP 1 Parameter01
		FROM UserRoles ro 
		INNER JOIN RolePermission rp
		ON ro.RoleId = CONVERT(NVARCHAR(255),rp.RoleId)
		INNER JOIN RoleSettingDetail rs
		on rs.PermissionMasterId = rp.PermissionMasterId
		where rs.PageId = 'EDITBYWORKSTREAM' 
		AND rs.Parameter01 = @Workstream
		AND UPPER(ro.Email) = UPPER(@email)
	 ),'')

	print '@ViewMCS === ' + @ViewMCS + '  @Workstream ===' + @Workstream
	IF(ISNULL(@EditTypeMax,0) > 0)
	BEGIN
				-- all is max
			print '@EditTypeMax case'
			SET @PermissionCondition = '((UPPER(OWNERS.email) = UPPER(''@email'')  OR (INI.CreatedBy  IN  (''@Creator_clause'') or (coon.email = (''@email'')))  
										OR ( INI.Max = 1)  
										OR ( ISNULL(TCM.InitiativeId,'''') = INI.Id ) 
										OR (ISNULL(TIA.InitiativeId,'''') = INI.Id )
										OR (INI.cpi = 1 ) OR ( ISNULL(TPJ.InitiativeId,'''') = INI.Id OR ISNULL(TDM.InitiativeId,'''') = ISNULL(INI.Id,'''')    )   )
	                             OR (@ActualPermissionCondition))'
	END
	ELSE IF(ISNULL(@ViewMCS,'') = 'Supply Chain (Upstream)')
	BEGIN
			print 'Supply Chain (Upstream) case'
			-- union workstream Supply Chain (Upstream)
			SET @PermissionCondition = '((UPPER(OWNERS.email) = UPPER(''@email'') OR (INI.CreatedBy  IN (''@Creator_clause'') or (coon.email = (''@email'')))  
										OR ( INI.Max = 1 AND DET.Workstream NOT IN (''M&S (Upstream)''))  
										OR ( ISNULL(TCM.InitiativeId,'''') = INI.Id ) OR (ISNULL(TIA.InitiativeId,'''') = INI.Id )
										OR  (INI.cpi = 1 ) OR ( ISNULL(TPJ.InitiativeId,'''') = INI.Id OR ISNULL(TDM.InitiativeId,'''') = ISNULL(INI.Id,'''')))
										OR (@ActualPermissionCondition))'
	END
	ELSE IF(ISNULL(@ViewMCS,'') = 'M&S (Upstream)')
	BEGIN
			print 'M&S (Upstream)'
			-- union workstream M&S (Upstream)
			SET @PermissionCondition = '((UPPER(OWNERS.email) = UPPER(''@email'')  OR (INI.CreatedBy  IN  (''@Creator_clause'') or (coon.email = (''@email'')))  
										OR ( INI.Max = 1 AND DET.Workstream NOT IN (''Supply Chain (Upstream)''))  
										OR ( ISNULL(TCM.InitiativeId,'''') = INI.Id ) OR (ISNULL(TIA.InitiativeId,'''') = INI.Id )
										OR (INI.cpi = 1 ) OR ( ISNULL(TPJ.InitiativeId,'''') = INI.Id OR ISNULL(TDM.InitiativeId,'''') = ISNULL(INI.Id,'''')))
										OR (@ActualPermissionCondition))'
	END
	ELSE
	BEGIN
		print 'normal case'
			--is normal people and all type
			SET @PermissionCondition = '((UPPER(OWNERS.email) = UPPER(''@email'') OR (INI.CreatedBy  IN  (''@Creator_clause'') or (coon.email = (''@email'')))  
										OR (INI.Max = 1 AND DET.Workstream NOT IN (''Supply Chain (Upstream)'' ,''M&S (Upstream)''))  
										OR (ISNULL(TCM.InitiativeId,'''') = INI.Id ) OR (ISNULL(TIA.InitiativeId,'''') = INI.Id )
										OR (INI.cpi = 1 ) OR ( ISNULL(TPJ.InitiativeId,'''') = INI.Id OR ISNULL(TDM.InitiativeId,'''') = ISNULL(INI.Id,'''')))
										OR (@ActualPermissionCondition))'
	END
	
	
	 


	 SET @ActualPermissionCondition = 
		(
		SELECT STRING_AGG('(' + Parameter01 + ')',' OR ') 
		FROM RoleSettingDetail 
		INNER JOIN RoleDetailSetting ON CONVERT(nvarchar(255),RoleDetailSetting.Id ) = CONVERT(nvarchar(255),RoleSettingDetail.RoleId)
		INNER JOIN UserRoles ON  CONVERT(nvarchar(255),UserRoles.RoleId) =   CONVERT(nvarchar(255),RoleDetailSetting.Id ) 
		WHERE
		RoleSettingDetail.PageID = 'OVERVIEW'
		AND RoleSettingDetail.SectionId = 'DATA'
		AND UPPER(UserRoles.Email) = UPPER(@email)
		)

		

	IF @ActualPermissionCondition IS NULL BEGIN SET @ActualPermissionCondition = '' END 
	IF @ActualPermissionCondition = ''  BEGIN SET @ActualPermissionCondition = '1=2' END 
	 

	SET @QueryString = REPLACE(@QueryString,'@PermissionCondition',@PermissionCondition)
	SET @QueryString = REPLACE(@QueryString,'@ViewMCS',@ViewMCS) 
	SET @QueryString = REPLACE(@QueryString,'@ActualPermissionCondition',@ActualPermissionCondition) 
	SET @QueryString = REPLACE(@QueryString,'@Creator_clause', dbo.fn_MultipleSearchKeyword(@email)) 


	SET @QueryString = REPLACE(@QueryString,'@email',@email) 

	--------------------------------------------------------------------------------------------------------------------------------------------------

	------------ Onprogress, Complete, Cancel -------------------------------------------------------------------------------------------------------------------------- 



	--@Onprogress  NVARCHAR(1024),
	--@Complete  NVARCHAR(1024),
	--@Cancel  NVARCHAR(1024), 
	 

	IF (@Onprogress IS NULL OR @Onprogress = '' OR @Onprogress = 'false' OR @Onprogress = '0')
	BEGIN 		
			SET @QueryString = REPLACE(@QueryString,'@OnprogressCondition', '  INI.Stage   IN   (''Lookback-6'',''Lookback-6'',''Lookback-6'',''Initiative-2'',''IL5'',''Completed'',''Budget Distribute'',''IL5'',''GATE4 : envi-5'',''GATE4 : Performance-6'',''Budget Pool'',''Initiative-2'' ,''Cancelled'' )      ') 	 
	END
	ELSE
	BEGIN 
			SET @QueryString = REPLACE(@QueryString,'@OnprogressCondition', ' 1=1 ')  
	END  


	IF (@Complete IS NULL OR @Complete = '' OR @Complete = 'false' OR @Complete = '0')
	BEGIN 		
			SET @QueryString = REPLACE(@QueryString,'@CompleteCondition', '  INI.Stage NOT IN   (''Lookback-6'',''Lookback-6'',''Lookback-6'',''Initiative-2'',''IL5'',''Completed'',''Budget Distribute'',''IL5'',''GATE4 : envi-5'',''GATE4 : Performance-6'',''Budget Pool'',''Initiative-2'' )        ') 	 
	END 
	ELSE
	BEGIN 
			SET @QueryString = REPLACE(@QueryString,'@CompleteCondition', ' 1=1 ')  
	END 

	
	IF (@Cancel IS NULL OR @Cancel = ''  OR @Cancel = 'false' OR @Cancel = '0')
	BEGIN 		
			SET @QueryString = REPLACE(@QueryString,'@CancelCondition', '   INI.Stage NOT IN  (''Cancelled'')') 	 
	END 
	ELSE
	BEGIN 
			SET @QueryString = REPLACE(@QueryString,'@CancelCondition', ' 1=1 ')  
	END 

	 

	---------------------------------------------------------------------------------------------------------------------------------------------------
	

	--PRINT CAST(@QueryString AS NTEXT)


	EXEC(@QueryString)
	

END
GO
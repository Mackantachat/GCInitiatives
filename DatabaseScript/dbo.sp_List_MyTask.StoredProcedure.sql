/****** Object:  StoredProcedure [dbo].[sp_List_MyTask]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


















 
CREATE PROCEDURE [dbo].[sp_List_MyTask]
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
	exec   [dbo].[sp_List_MyTask_Count]
	@InitiativeCode,@InitiativeName,@Status,@InitiativeType,@OwnerName,@Plant,@Organization,@TypeofInvestment,@RegisteringDateSince,@RegisteringDateTo,
	@WorkStream,@SubWorkStream1,@Stage,@emocNo,@WBS,@AppNo,@Company,@Onprogress,@Complete,@Cancel,@KeyWord,@SortField,@OrderBy
	-- ,1,50
	,@email, @count output 

	
	DECLARE @QueryString NVARCHAR(MAX);


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
					,OwnerAssignTo.OwnerName AS AssignTo
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
					, @Count AS Counter  
					FROM v_Initiatives INI 
					LEFT JOIN OWNERS ON UPPER(OWNERS.OwnerName) = UPPER(INI.OwnerName)  
					LEFT JOIN CapexInformations CAP ON CAP.InitiativeId = INI.Id
					LEFT JOIN DetailInformations DET ON DET.InitiativeId = INI.Id 
					LEFT JOIN v_FirstNextAction  ACT ON ACT.InitiativeId = INI.Id AND ACT.ActionResult IS NULL   AND  UPPER(ACT.ActionBy) = UPPER(''@email'') 
					LEFT JOIN OWNERS OwnerAssignTo ON OwnerAssignTo.Email = ACT.ActionBy
					LEFT JOIN InitiativeCoDevelopers CODEV ON CODEV.InitiativeId = INI.ID AND OWNERS.OwnerName = CODEV.CoDeveloperName 
					LEFT JOIN RequestEmoc ON RequestEmoc.InitiativeId = INI.ID
					LEFT JOIN ProgressHeader ON ProgressHeader.InitiativeId = INI.ID
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
								INI.InitiativeCode  like ''%@KeyWord%''
							OR	INI.[Name]  like ''%@KeyWord%''
							OR	INI.OwnerName  like ''%@KeyWord%''
							OR	OwnerAssignTo.OwnerName   like ''%@KeyWord%'' 
							OR	INI.Organization   like ''%@KeyWord%''
							OR	INI.InitiativeType   like ''%@KeyWord%''
							OR	INI.Company  like ''%@KeyWord%''
							OR	INI.Stage   like ''%@KeyWord%''
							OR	INI.[Status]  like ''%@KeyWord%'' 
							OR	ProgressHeader.WBSNo  like ''%@KeyWord%'' 
							OR	ProgressHeader.AppropriationNo  like ''%@KeyWord%'' 
					)


					AND ( NOT ACT.ActionBy IS NULL )

					
					--AND (@OnprogressCondition)
					--AND (@CompleteCondition)
					--AND (@CancelCondition)
 
				  

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
  
  	SET @QueryString = REPLACE(@QueryString,'@email',@email) 
	 

	------------ SortField  -------------------------------------------------------------------------
	IF @SortField IS NULL BEGIN SET @SortField = '' END 
	IF @SortField  = '' BEGIN SET @SortField = 'RegisteringDate' END 
	IF @SortField  = 'InitiativeCode' BEGIN SET @SortField = 'INI.InitiativeCode' END 

    

	SET @QueryString = REPLACE(@QueryString,'@SortField',@SortField) 
	SET @QueryString = REPLACE(@QueryString,'@OrderBy',@OrderBy)  
	------------------------------------------------------------------------------------------------------ 
	 
	------------ Count  -------------------------------------------------------------------------
	SET @QueryString = REPLACE(@QueryString,'@Count',@Count) 
	--------------------------------------------------------------------------------------------------------------------------------------------------

	 

	------------ Multipage  -------------------------------------------------------------------------
	DECLARE @StartRow INT = (@PageNo - 1) * @RowPerPage    +   1 
	DECLARE @EndRow INT  = @PageNo * @RowPerPage 

	SET @QueryString = REPLACE(@QueryString,'@StartRow',convert(nvarchar(255),@StartRow)) 
	SET @QueryString = REPLACE(@QueryString,'@EndRow',convert(nvarchar(255),@EndRow)) 
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


	PRINT (@QueryString)

	EXEC(@QueryString)
	

END
GO

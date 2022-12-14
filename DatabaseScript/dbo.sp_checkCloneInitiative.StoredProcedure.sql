/****** Object:  StoredProcedure [dbo].[sp_checkCloneInitiative]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_checkCloneInitiative]
(
    -- Add the parameters for the stored procedure here
     @initiativeId INT
	,@HistoryFlag INT
    ,@cloneInitiativeId INT
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    

    --table initiative move to full log
	
	DECLARE @newInitiativeId INT
	SET @newInitiativeId =   @cloneInitiativeId;

	SELECT  Id   From [dbo].v_Initiatives 
	WHERE Id =  @newInitiativeId 
	; 
	;
	-- *** End of LEVEL1 
	--Table	Initiatives       start process CIM 
 	SELECT COUNT(1) as Initiatives  From [dbo].v_Initiatives 
	WHERE Id =  @newInitiativeId 
	; 

	--Table	InitiativeCoDevelopers
	SELECT COUNT(1) as [InitiativeCoDevelopers]  FROM [dbo].[InitiativeCoDevelopers]
	WHERE InitiativeId = @newInitiativeId
	;

	--Table	InitiativeDetails
	SELECT COUNT(1) as [InitiativeDetails] FROM [dbo].[InitiativeDetails]
	WHERE InitiativeId = @newInitiativeId
	;

	--Table	CapexInformations
	SELECT COUNT(1) as [CapexInformations]  FROM [dbo].[CapexInformations] 
	WHERE InitiativeId =  @newInitiativeId  
	;
	--Table	AnnualInvestmentPlans
	SELECT COUNT(1) as [AnnualInvestmentPlans]  From [dbo].[AnnualInvestmentPlans] 
	WHERE InitiativeId =  @newInitiativeId 
	;
	--Table	MonthlyInvestmentPlans
	SELECT COUNT(1) as [MonthlyInvestmentPlans] FROM [dbo].[MonthlyInvestmentPlans]
	WHERE  InitiativeId = @newInitiativeId
	;
	-------------------------- End Process CIM -------------------------------------------------------------------
	
	-- *** LEVEL2   
	
  
	--Table	BestPracticeKnowledgeContributors
	SELECT COUNT(1) as [BestPracticeKnowledgeContributors] FROM [dbo].[BestPracticeKnowledgeContributors] 
	WHERE InitiativeId =  @newInitiativeId 
	; 

	--Table	BestPracticeOrganizations
	SELECT COUNT(1) as [BestPracticeOrganizations] FROM [dbo].[BestPracticeOrganizations]
	WHERE InitiativeId =  @newInitiativeId  
	;
	  
	--Table	BestPracticePlants
	SELECT COUNT(1) as [BestPracticePlants] FROM [dbo].[BestPracticePlants]
	WHERE InitiativeId =  @newInitiativeId  
	;
  
	--Table	BestPractices
	SELECT COUNT(1) as [BestPractices] FROM [dbo].[BestPractices] 
	WHERE InitiativeId =  @newInitiativeId  
	;
	 
	--Table	CapexBudgetSurveys
	 SELECT COUNT(1) as [CapexBudgetSurveys] FROM [dbo].[CapexBudgetSurveys]
	 WHERE InitiativeId =  @newInitiativeId  
	;
	 
	
	--Table	Contact
	 SELECT COUNT(1) as [Contact] FROM [dbo].[Contact] 
	 WHERE InitiativeId =  @newInitiativeId  
	 ;
	 
	--Table	CpiKpiMonitor
	 SELECT COUNT(1) as [CpiKpiMonitor] FROM [dbo].[CpiKpiMonitor] 
	 WHERE InitiativeId =  @newInitiativeId  
	 ;
	 
	--Table	CpiKpis
	 SELECT COUNT(1) as [CpiKpis] FROM [dbo].[CpiKpis]
	 WHERE InitiativeId =  @newInitiativeId  
	 ;
	 	 
	--Table	CpiStepExplaination
	 SELECT COUNT(1) as [CpiStepExplaination] FROM [dbo].[CpiStepExplaination]
	 WHERE InitiativeId =  @newInitiativeId  
	 ;
	 
	--Table	DetailCapexs
	 SELECT COUNT(1) as [DetailCapexs] FROM [dbo].[DetailCapexs]
	 WHERE InitiativeId =  @newInitiativeId  
	 ;

	--Table	DetailInformations
	 SELECT COUNT(1) as [DetailInformations] FROM [dbo].[DetailInformations]
	 WHERE InitiativeId =  @newInitiativeId  
	 ;
	 
	--Table	DimMaxHandsover
	 SELECT COUNT(1) as [DimMaxHandsover] FROM [dbo].[DimMaxHandsover]
	 WHERE InitiativeId =  @newInitiativeId  
	 ;
	  
	--Table	DimMembers
	 SELECT COUNT(1) as [DimMembers] FROM [dbo].[DimMembers]
	 WHERE InitiativeId =  @newInitiativeId  
	 ;
	   
	--Table	FinancialIndicators
	 SELECT COUNT(1) as [FinancialIndicators] FROM [dbo].[FinancialIndicators]
	 WHERE InitiativeId =  @newInitiativeId  
	 ;
	   
	--Table	Financials
	 SELECT COUNT(1) as [Financials] FROM [dbo].[Financials]
	 WHERE InitiativeId =  @newInitiativeId  
	 ;

	--Table	ImpactTrackings  ///// start task 2
	SELECT COUNT(1) as [ImpactTrackings] FROM [dbo].[ImpactTrackings]
	 WHERE InitiativeId =  @newInitiativeId
	 ;

	--Table	ImpactTypeOfBenefits  
	SELECT COUNT(1) as [ImpactTypeOfBenefits] FROM [dbo].[ImpactTypeOfBenefits]
	WHERE InitiativeId =  @newInitiativeId
	;

	--Table	InitiativeActions
	SELECT COUNT(1) as [InitiativeActions] FROM [dbo].[InitiativeActions] 
	WHERE InitiativeId = @newInitiativeId
	;
	
	
	--Table	InitiativeStatusHistory
	SELECT COUNT(1) as [InitiativeStatusHistory] FROM [dbo].[InitiativeStatusHistory]
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	InitiativeStatusTrackings
	SELECT COUNT(1) as [InitiativeStatusTrackings] FROM [dbo].[InitiativeStatusTrackings] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	InvestmentCost
	SELECT COUNT(1) as [InvestmentCost] FROM [dbo].[InvestmentCost]
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	ITBudgetSurveys
	SELECT COUNT(1) as [ITBudgetSurveys] FROM [dbo].[ITBudgetSurveys]
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	KpiDetailInformations
	SELECT COUNT(1) as [KpiDetailInformations] FROM [dbo].[KpiDetailInformations]
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	Kri
	SELECT COUNT(1) as [Kri] FROM [dbo].[Kri] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	KriData
	SELECT COUNT(1) as [KriData] FROM [dbo].[KriData] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	KriMitigations
	SELECT COUNT(1) as [KriMitigations] FROM [dbo].[KriMitigations] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	KriProgressDetails
	SELECT COUNT(1) as [KriProgressDetails] FROM [dbo].[KriProgressDetails]
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	LessonsLearned
	SELECT COUNT(1) as [LessonsLearned] FROM [dbo].[LessonsLearned] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	MaxApprovers
	SELECT COUNT(1) as [MaxApprovers] FROM [dbo].[MaxApprovers]
	WHERE  InitiativeId = @newInitiativeId
	;
	--Table	Milestones
	SELECT COUNT(1) as [Milestones] FROM [dbo].[Milestones] 
	WHERE InitiativeId = @newInitiativeId
	;
	
	--Table	NewDetailInformations
	SELECT COUNT(1) as [NewDetailInformations] FROM [dbo].[NewDetailInformations] 
	WHERE  InitiativeId = @newInitiativeId
	;
	--Table	OutstandingData
	SELECT COUNT(1) as [OutstandingData] FROM [dbo].[OutstandingData] 
	WHERE  InitiativeId = @newInitiativeId
	;
	--Table	Outstandings
	SELECT COUNT(1) as [Outstandings] FROM [dbo].[Outstandings] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	PimGate
	SELECT COUNT(1) as [PimGate] FROM [dbo].[PimGate] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	Products
	SELECT COUNT(1) as [Products] FROM [dbo].[Products] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	ProgressDetails
	SELECT COUNT(1) as [ProgressDetails] FROM [dbo].[ProgressDetails] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	ProgressHeader
	SELECT COUNT(1) as [ProgressHeader] FROM [dbo].[ProgressHeader] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	ProgressPlan
	SELECT COUNT(1) as [ProgressPlan] FROM [dbo].[ProgressPlan] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	ProgressPlanDate
	SELECT COUNT(1) as [ProgressPlanDate] FROM [dbo].[ProgressPlanDate] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	ProgressPlanMontly
	SELECT COUNT(1) as [ProgressPlanMontly] FROM [dbo].[ProgressPlanMontly] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	ProjectReference
	SELECT COUNT(1) as [ProjectReference] FROM [dbo].[ProjectReference] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	RequestEmoc
	SELECT COUNT(1) as [RequestEmoc] FROM [dbo].[RequestEmoc] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	RequestEmocQuestion
	SELECT COUNT(1) as [RequestEmocQuestion] FROM [dbo].[RequestEmocQuestion] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	ResourceNeededs
	SELECT COUNT(1) as [ResourceNeededs] FROM [dbo].[ResourceNeededs] 
	WHERE InitiativeId = @newInitiativeId
	;
	--Table	Risk
	SELECT COUNT(1) as [Risk] FROM [dbo].[Risk] 
	Where InitiativeId = @newInitiativeId
	;
	--Table	ShareBenefitWorkstreams
	SELECT COUNT(1) as [ShareBenefitWorkstreams] FROM [dbo].[ShareBenefitWorkstreams] 
	WHERE InitiativeId = @newInitiativeId
	;
	-- *** End of LEVEL2 

	-- Level3
	--Level3.1 CAPEX Information
    
END
GO

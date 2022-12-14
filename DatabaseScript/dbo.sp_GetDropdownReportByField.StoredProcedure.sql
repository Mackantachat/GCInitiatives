/****** Object:  StoredProcedure [dbo].[sp_GetDropdownReportByField]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetDropdownReportByField]
(
    -- Add the parameters for the stored procedure here
    @fieldName NVARCHAR(300)
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    IF(LOWER(ISNULL(@fieldName, '')) in ('Company Name','company'))
    BEGIN
        SELECT DISTINCT Company AS ItemName, Company AS ItemValue FROM v_Initiatives
    END

    IF(LOWER(ISNULL(@fieldName, '')) in ('Budget Year','budgetyear'))
    BEGIN
        SELECT DISTINCT BudgetYear AS ItemName, BudgetYear AS ItemValue FROM CapexInformations
    END

    
    IF(LOWER(ISNULL(@fieldName, '')) = 'typeofinvestment')
    BEGIN
        SELECT DISTINCT TypeOfInvestment AS ItemName, TypeOfInvestment AS ItemValue FROM v_Initiatives
    END
    
	IF(LOWER(ISNULL(@fieldName, '')) in ('Initiative_Type','Initiative Type','Initiative Type MAX'))
    BEGIN
        SELECT DISTINCT InitiativeTypeMax AS ItemName, InitiativeTypeMax AS ItemValue FROM DetailInformations order by InitiativeTypeMax
    END

    IF(LOWER(ISNULL(@fieldName, '')) in ('subworkstream','Sub-Workstream_1','Sub-Workstream 1',' SubWorkstream1','SubWorkstream1'))
    BEGIN
        SELECT DISTINCT subworkstream1 AS ItemName, subworkstream1 AS ItemValue FROM DetailInformations order by SubWorkstream1
    END

	IF(LOWER(ISNULL(@fieldName, '')) in ('Workstream','Workstream'))
    BEGIN
        SELECT DISTINCT workstream AS ItemName, Workstream AS ItemValue FROM DetailInformations order by Workstream
    END

	IF(LOWER(ISNULL(@fieldName, '')) in ('Stage_Gate','Stage'))
    BEGIN
        --SELECT DISTINCT Stage AS ItemName, Stage AS ItemValue FROM v_Initiatives order by Stage
		-- krit edit 21-05-2021
		--SELECT DISTINCT [dbo].[fn_ConvertStage](Stage) AS ItemName, Stage AS ItemValue FROM v_Initiatives where ISNULL(Stage,'') <> '' order by Stage
		-- Nok edit 2021_05_2021
		SELECT distinct [dbo].[fn_ConvertStage](Stage) AS ItemName, 
		case when isnull(Stage,'') in ('IL3-1','IL3-2') then 'IL3'
		else Stage end AS ItemValue FROM v_Initiatives v where ISNULL(Stage,'') <> ''
		order by 1
    END

	IF(LOWER(ISNULL(@fieldName, '')) = 'Sub-Workstream 2')
    BEGIN
        SELECT DISTINCT SubWorkstream2 AS ItemName, SubWorkstream2 AS ItemValue FROM DetailInformations order by SubWorkstream2
    END

	IF(LOWER(ISNULL(@fieldName, '')) = 'Pending CFO Approvers')  
	BEGIN 
	SELECT DISTINCT  ApproverEmail AS ItemName, ApproverEmail AS ItemValue FROM MaxApproverSettings  where indicator in ('TOFinanceIL4','TOFinanceIL5') order by ApproverEmail
    END
	IF(LOWER(ISNULL(@fieldName, '')) = 'Pending CTO Approvers')  
	BEGIN 
	SELECT DISTINCT  ApproverEmail AS ItemName, ApproverEmail AS ItemValue FROM MaxApproverSettings  where indicator in ('CTO','CTO') order by ApproverEmail
    END
	IF(LOWER(ISNULL(@fieldName, '')) = 'Pending Finance Approvers')  
	BEGIN 
	SELECT DISTINCT ApproverEmail AS ItemName, ApproverEmail AS ItemValue FROM MaxApproverSettings  where indicator in ('TO Finance','TO Finance') order by ApproverEmail
    END
	IF(LOWER(ISNULL(@fieldName, '')) = 'Pending Sponsor Approvers')  
	BEGIN 
	SELECT DISTINCT  ApproverEmail AS ItemName, ApproverEmail AS ItemValue FROM MaxApproverSettings  where indicator in ('Sponsor','Sponsor') order by ApproverEmail
    END
	IF(LOWER(ISNULL(@fieldName, '')) = 'Pending TF-BT-TO Approvers')  
	BEGIN 
	SELECT DISTINCT  ApproverEmail AS ItemName, ApproverEmail AS ItemValue FROM MaxApproverSettings  where indicator in ('TF-BT-TO','TF-BT-TO') order by ApproverEmail
    END
	IF(LOWER(ISNULL(@fieldName, '')) = 'Pending TO Team Approvers')  
	BEGIN 
	SELECT DISTINCT  ApproverEmail AS ItemName, ApproverEmail AS ItemValue FROM MaxApproverSettings  where indicator in ('TOTeam','TOTeam') order by ApproverEmail
    END

	IF(LOWER(ISNULL(@fieldName, '')) = 'Pending Workstream Lead Approvers')  
	BEGIN 
	SELECT DISTINCT  ApproverEmail AS ItemName, ApproverEmail AS ItemValue FROM MaxApproverSettings  where indicator in ('WorkstreamLead','WorkstreamLead') order by ApproverEmail
    END

	IF(LOWER(ISNULL(@fieldName, '')) = 'Type')  
	BEGIN 
	SELECT DISTINCT  'Request Pool' AS ItemName, 'Request Pool' AS ItemValue
	UNION
	SELECT DISTINCT  'Use Pool' AS ItemName, 'Use Pool' AS ItemValue
    END
	
	IF(LOWER(ISNULL(@fieldName, '')) in ('PoolType','Pool Type') )  
	BEGIN 
	SELECT DISTINCT  PoolType AS ItemName, PoolType AS ItemValue FROM v_Initiatives  where isnull(InitiativeType,'') = 'Request Pool'
    END
	
	IF(LOWER(ISNULL(@fieldName, '')) = 'Track Change')  
	BEGIN 
	SELECT DISTINCT  'Benefitamout' AS ItemName , 'Benefitamout' AS ItemValue 
	UNION
	SELECT DISTINCT  'TotalOnetime' AS ItemName , 'TotalOnetime' AS ItemValue 
	UNION
	SELECT DISTINCT  'TotalRecurring' AS ItemName , 'TotalRecurring' AS ItemValue 
	UNION
	SELECT DISTINCT  'IL4RunRateOnetime'  AS ItemName , 'IL4RunRateOnetime' AS ItemValue 
	UNION
	SELECT DISTINCT  'IL4RunRateRecurring'  AS ItemName , 'IL4RunRateRecurring' AS ItemValue 
	UNION
	SELECT DISTINCT  'Stage'  AS ItemName , 'Stage'AS ItemValue 
	UNION
	SELECT DISTINCT  'IL4Date'  AS ItemName , 'IL4Date' AS ItemValue 
	UNION
	SELECT DISTINCT  'InitiativeType'  AS ItemName , 'InitiativeType' AS ItemValue 
	UNION
	SELECT DISTINCT  'Workstream'  AS ItemName , 'Workstream' AS ItemValue 
	UNION
	SELECT DISTINCT  'CostEstCapex'  AS ItemName , 'CostEstCapex' AS ItemValue 
	UNION
	SELECT DISTINCT  'CostEstOpex'  AS ItemName , 'CostEstOpex' AS ItemValue 
	UNION
	SELECT DISTINCT  'PayBackPeriod'  AS ItemName , 'PayBackPeriod' AS ItemValue 
	END
	END
GO

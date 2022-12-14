/****** Object:  StoredProcedure [dbo].[sp_IF_POC_20210712_1726]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[sp_IF_POC_20210712_1726]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

 if exists (select initiativetype from v_Initiatives where id = @initiativeId and InitiativeType =  'Request Pool')
 Begin select * from v_Initiatives where 1 = 0

 end
 else
 begin
IF (SELECT COUNT(1) FROM [dbo].[v_if_POC] WHERE [InitiativesID] = @initiativeId) > 0
	BEGIN
		SELECT
	[WBS Element],
	[POC Weight],
	[Plan/Actual],
	[Year],
	[Period1],
	[Period2],
	[Period3],
	[Period4],
	[Period5],
	[Period6],
	[Period7],
	[Period8],
	[Period9],
	[Period10],
	[Period11],
	[Period12]
FROM	
	(
		SELECT
			[LineNo],
			[WBS Element],
			[POC Weight],
			[Plan/Actual],
			[Year],
			[Period1],
			[Period2],
			[Period3],
			[Period4],
			[Period5],
			[Period6],
			[Period7],
			[Period8],
			[Period9],
			[Period10],
			[Period11],
			[Period12]
		FROM 
			[v_if_POC] POC 
		WHERE
			[LineNo] < 2
		UNION
		SELECT 
			[LineNo],
			[WBS Element]
			,[POC Weight]
			,[Plan/Actual]
			,[Year]
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 1) THEN [Period1] ELSE NULL END AS [Period1] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 2) THEN [Period2] ELSE NULL END AS [Period2] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 3) THEN [Period3] ELSE NULL END AS [Period3] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 4) THEN [Period4] ELSE NULL END AS [Period4] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 5) THEN [Period5] ELSE NULL END AS [Period5] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 6) THEN [Period6] ELSE NULL END AS [Period6] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 7) THEN [Period7] ELSE NULL END AS [Period7] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 8) THEN [Period8] ELSE NULL END AS [Period8] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 9) THEN [Period9] ELSE NULL END AS [Period9] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 10) THEN [Period10] ELSE NULL END AS [Period10] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 11) THEN [Period11] ELSE NULL END AS [Period11] 
			,CASE WHEN ([BasicFinishYear] > [Year]) OR ([BasicFinishYear] = [Year] AND [BasicFinishMonth] >= 12) THEN [Period12] ELSE NULL END AS [Period12]
		FROM 
			[v_if_POC] POC 
		JOIN
			(
				SELECT 
					CASE
						WHEN 
							([ProgressPlanDate].ProgressPlanDateType = 'Overall' OR [ProgressPlanDate].ProgressPlanDateType = 'Over All') AND 
							((SELECT COUNT(1) FROM ProgressPlanDate WHERE ProgressPlanDateType IN ('Engineering','Procurement','Construction','Commissioning') AND InitiativeId = @initiativeId) = 0) THEN ''
						WHEN [ProgressPlanDate].ProgressPlanDateType = 'Engineering' THEN '-W'
						WHEN [ProgressPlanDate].ProgressPlanDateType = 'Procurement' THEN '-X'
						WHEN [ProgressPlanDate].ProgressPlanDateType = 'Construction' THEN '-Y'
						WHEN [ProgressPlanDate].ProgressPlanDateType = 'Commissioning' THEN '-Z'
						ELSE 'NONE'
					END AS WbsNo,
					YEAR([ProgressPlanDate].BasicFinishDate) AS BasicFinishYear,
					MONTH([ProgressPlanDate].BasicFinishDate) AS BasicFinishMonth
				FROM 
					[dbo].[ProgressPlanDate] [ProgressPlanDate] 
				JOIN 
					[dbo].[ProgressHeader] [ProgressHeader]  
				ON 
					[ProgressPlanDate].[InitiativeId] = [ProgressHeader].[InitiativeId]
				WHERE 
					[ProgressPlanDate].[InitiativeId] = @initiativeId
			) FinishDate
		ON 
			[WBS Element] like '%' + [FinishDate].[WbsNo]
		WHERE 
			([InitiativesID] = @initiativeId)
			AND [Year] <= [BasicFinishYear]
		) IF_POC
	ORDER BY
		[LineNo]
	END
ELSE
	BEGIN
		INSERT INTO 
			[dbo].[DevLog] (LogDateTime, ProcessName, Details, InitiativeId) 
		VALUES 
			(GETDATE(), 'POC', 'Blank file is generated.', @initiativeId)
	END
end
END
GO

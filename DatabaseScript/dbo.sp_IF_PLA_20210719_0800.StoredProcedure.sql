/****** Object:  StoredProcedure [dbo].[sp_IF_PLA_20210719_0800]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE PROCEDURE [dbo].[sp_IF_PLA_20210719_0800]
(
    -- Add the parameters for the stored procedure here
    @initiativeId INT
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
 if exists (select initiativetype from v_Initiatives where id = @initiativeId and InitiativeType =  'Request Pool')
 Begin select * from v_Initiatives where 1 = 0
 end
 else
 begin  
 -- START: Revise by Ken 2021-07-05
 -- 1) When initiatives is not found in [v_if_PLA], return blank and write log into DevLog
 -- 2) Add sum and group by for multiple value in same year
IF ((SELECT COUNT(1) FROM [dbo].[v_if_PLA] WHERE [InitiativesID] = @initiativeId) > 0) AND
	((SELECT COUNT(1) FROM [dbo].[v_if_PLA] WHERE [InitiativesID] = @initiativeId
		AND COALESCE([Period1], [Period2], [Period3], [Period4], [Period5], [Period6], [Period7], [Period8], [Period9], [Period10], [Period11], [Period12]) is not null) > 0)
	BEGIN
		SELECT 
			[WBS Element],
			[Plan Version],
			[Cost element],
			[Year],
			CASE WHEN [Period1] <> '0.00' THEN [Period1] ELSE NULL End AS 'Period1', 
			CASE WHEN [Period2] <> '0.00' THEN [Period2] ELSE NULL End AS 'Period2', 
			CASE WHEN [Period3] <> '0.00' THEN [Period3] ELSE NULL End AS 'Period3', 
			CASE WHEN [Period4] <> '0.00' THEN [Period4] ELSE NULL End AS 'Period4', 
			CASE WHEN [Period5] <> '0.00' THEN [Period5] ELSE NULL End AS 'Period5', 
			CASE WHEN [Period6] <> '0.00' THEN [Period6] ELSE NULL End AS 'Period6', 
			CASE WHEN [Period7] <> '0.00' THEN [Period7] ELSE NULL End AS 'Period7', 
			CASE WHEN [Period8] <> '0.00' THEN [Period8] ELSE NULL End AS 'Period8', 
			CASE WHEN [Period9] <> '0.00' THEN [Period9] ELSE NULL End AS 'Period9', 
			CASE WHEN [Period10] <> '0.00' THEN [Period10] ELSE NULL End AS 'Period10', 
			CASE WHEN [Period11] <> '0.00' THEN [Period11] ELSE NULL End AS 'Period11', 
			CASE WHEN [Period12] <> '0.00' THEN [Period12] ELSE NULL End AS 'Period12'
			FROM
				(SELECT
					[LineNo],
					[WBS Element],
					[Plan Version],
					[Cost element],
					[Year],
					[Period1], [Period2], [Period3], [Period4],
					[Period5], [Period6], [Period7], [Period8],
					[Period9], [Period10], [Period11], [Period12]
					FROM 
						[v_if_PLA]
					WHERE 
						[LineNo] < 2
				UNION
				SELECT
					[LineNo],
					[WBS Element],
					[Plan Version],
					[Cost element],
					[Year],
					REPLACE(FORMAT(SUM(CAST([Period1] AS NUMERIC)), 'N2'), ',', '') AS [Period1],
					REPLACE(FORMAT(SUM(CAST([Period2] AS NUMERIC)), 'N2'), ',', '') AS [Period2],
					REPLACE(FORMAT(SUM(CAST([Period3] AS NUMERIC)), 'N2'), ',', '') AS [Period3],
					REPLACE(FORMAT(SUM(CAST([Period4] AS NUMERIC)), 'N2'), ',', '') AS [Period4],
					REPLACE(FORMAT(SUM(CAST([Period5] AS NUMERIC)), 'N2'), ',', '') AS [Period5],
					REPLACE(FORMAT(SUM(CAST([Period6] AS NUMERIC)), 'N2'), ',', '') AS [Period6],
					REPLACE(FORMAT(SUM(CAST([Period7] AS NUMERIC)), 'N2'), ',', '') AS [Period7],
					REPLACE(FORMAT(SUM(CAST([Period8] AS NUMERIC)), 'N2'), ',', '') AS [Period8],
					REPLACE(FORMAT(SUM(CAST([Period9] AS NUMERIC)), 'N2'), ',', '') AS [Period9],
					REPLACE(FORMAT(SUM(CAST([Period10] AS NUMERIC)), 'N2'), ',', '') AS [Period10],
					REPLACE(FORMAT(SUM(CAST([Period11] AS NUMERIC)), 'N2'), ',', '') AS [Period11],
					REPLACE(FORMAT(SUM(CAST([Period12] AS NUMERIC)), 'N2'), ',', '') AS [Period12]
				FROM 
					[v_if_PLA]
				WHERE 
					[InitiativesID] = @initiativeId
				GROUP BY
					[LineNo],
					[WBS Element],
					[Plan Version],
					[Cost element],
					[Year]
				) A
			ORDER BY
				A.[LineNo]
		-- END: Revise by Ken 2021-07-05
	END
ELSE
	BEGIN
		INSERT INTO 
				[dbo].[DevLog] (LogDateTime, ProcessName, Details, InitiativeId) 
			VALUES 
				(GETDATE(), 'PLA', 'Blank file is generated.', @initiativeId)
		/*
		UPDATE 
			OutgoingFile
		SET 
			Status = 'X'
		WHERE 
			FileName LIKE '%' + (SELECT InitiativeCode FROM Initiatives WHERE id = @initiativeId) + '%'
			*/
	END

end

END
GO

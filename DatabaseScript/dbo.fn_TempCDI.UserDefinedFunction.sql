/****** Object:  UserDefinedFunction [dbo].[fn_TempCDI]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION [dbo].[fn_TempCDI]
(
    -- Add the parameters for the function here
    @ProjectID INT 
)
RETURNS INT
AS
BEGIN
    
	DECLARE @Count INT

	SET @Count =
	(
	SELECT 
	
	CASE  WHEN[Idea MANI ER  NO] IS NULL THEN 0 ELSE 1 END  + 
	CASE  WHEN[Idea MANI CRO NO] IS NULL THEN 0 ELSE 1 END  + 
	CASE  WHEN[Idea MANI WAVE NO] IS NULL THEN 0 ELSE 1 END  + 
	CASE  WHEN[Idea MANI Web Input NO] IS NULL THEN 0 ELSE 1 END  + 
	CASE  WHEN[Idea MANI Web Input NO B] IS NULL THEN 0 ELSE 1 END  + 
	CASE  WHEN[Idea MANI E-INI No] IS NULL THEN 0 ELSE 1 END  + 
	CASE  WHEN[Idea MANI Urgent Migration] IS NULL THEN 0 ELSE 1 END  + 
	CASE  WHEN[Idea MANI User Create No] IS NULL THEN 0 ELSE 1 END    

	 

	FROM  Temp_WPMigration
	WHERE Temp_WPMigration.[Project Id] = @ProjectID
	)

	RETURN @Count

END
GO

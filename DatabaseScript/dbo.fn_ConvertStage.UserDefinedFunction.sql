/****** Object:  UserDefinedFunction [dbo].[fn_ConvertStage]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






 
 
CREATE FUNCTION [dbo].[fn_ConvertStage]
( 
    @stage nvarchar(255)
 
)
RETURNS  nvarchar(255)
AS
BEGIN

--Declare @ReturnStage nvarchar(255)
--IF(len(@stage) >= 3)
--BEGIN
--Declare @subStr nvarchar(255) =  (SELECT SUBSTRING(@stage, len(@stage) - 1, len(@stage) - 2 ) AS ExtractString)

--Declare @subStr2 nvarchar(255) = (SELECT SUBSTRING(@subStr, 1, len(@subStr) - 1 ) AS ExtractString)


--IF(@subStr2 = '-')
--BEGIN
--SET @ReturnStage = (SELECT SUBSTRING(@stage, 1, len(@stage) - 2 ) AS ExtractString)
--END
--ELSE
--BEGIN
--SET @ReturnStage = @stage
--END

--END
--ELSE
--BEGIN
--SET @ReturnStage = @stage
--END




Declare @ReturnStage nvarchar(255)
Declare @DataType nvarchar(255) = 'convertStageParameter'

IF EXISTS (SELECT Attribute02 FROM CommonData WHERE dataType = @DataType and Attribute01 = @stage) 

BEGIN
Declare @subStr nvarchar(255) = (SELECT Attribute02 FROM CommonData WHERE dataType = @DataType and Attribute01 = @stage);
SET @ReturnStage = @subStr
END
ELSE
BEGIN
SET @ReturnStage = @stage
END


RETURN @ReturnStage;

END
GO

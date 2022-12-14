/****** Object:  StoredProcedure [dbo].[SP_SAPPI_GETFILE]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SAPPI_GETFILE]
AS
BEGIN
	
	SET NOCOUNT ON;

	DECLARE @PK TABLE (Id INT NULL)
	UPDATE OutgoingFile SET Status = 'X', UpdateUser='SAP PI',UpdateDate=REPLACE(convert(varchar, getdate(), 120),'-','/') OUTPUT INSERTED.Id INTO @PK WHERE Status is null 
	SELECT [Id]
      ,[DirectoryPath]
      ,[FileName]
      ,[Data] FROM OutgoingFile WHERE Id in (SELECT * FROM @PK)


END
GO

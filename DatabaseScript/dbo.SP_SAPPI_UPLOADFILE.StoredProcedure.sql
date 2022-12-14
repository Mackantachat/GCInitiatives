/****** Object:  StoredProcedure [dbo].[SP_SAPPI_UPLOADFILE]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Panita Yongyuth
-- Create Date: 25 May 2020
-- Description: Using For SAP PI For Upload File to IncomingFile Table
-- =============================================
CREATE PROCEDURE [dbo].[SP_SAPPI_UPLOADFILE]
		@FileName			NVARCHAR(255),
		@DirectoryPath		NVARCHAR(255),
		@Data				VARBINARY(MAX),
		@CreateUser			NVARCHAR(255),
		@CreateDate			NVARCHAR(255)
    
AS

BEGIN 
  
			INSERT
			INTO IncomingFile
			  (
				FileName,
				DirectoryPath,
				Data,
				CreateUser,
				CreateDate
			  )
			  VALUES
			  (
				@FileName,
				@DirectoryPath,
				@Data,
				@CreateUser,
				@CreateDate
			  );
		
	END;
 
GO

/****** Object:  StoredProcedure [dbo].[ZPOC_UPLOADFILE]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[ZPOC_UPLOADFILE]
    @FileName NVARCHAR(255),
    @Data   VARBINARY(MAX),
		@CreateUser NVARCHAR(255),
		@CreateDate NVARCHAR(255)
    
AS

BEGIN 
  
			INSERT
			INTO TestUploadFile
			  (
				FileName,
				Data,
				CreateUser,
				CreateDate
			  )
			  VALUES
			  (
				@FileName,
				@Data,
				@CreateUser,
				@CreateDate
			  );
		
	END;
  
	

GO

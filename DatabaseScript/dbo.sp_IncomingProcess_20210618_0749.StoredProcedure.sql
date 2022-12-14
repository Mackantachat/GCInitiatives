/****** Object:  StoredProcedure [dbo].[sp_IncomingProcess_20210618_0749]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_IncomingProcess_20210618_0749]
AS
BEGIN
 

		-- UPDATE AppropriationNo and WBS ------------------------------------------------------------- 
		UPDATE P
		SET P.WbsNo = CASE WHEN F.Column6 = '' OR F.Column6 IS NULL THEN P.WbsNo ELSE F.Column6 END
		, P.AppropriationNo = CASE WHEN F.Column4 = '' OR F.Column4 IS NULL THEN P.AppropriationNo ELSE F.Column4 END 
		FROM [dbo].[IncomingFileData] F 
		INNER JOIN  v_Initiatives I ON RIGHT(F.Column2,11)  = I.InitiativeCode    --F.Column2 = dbo.fn_FullFillInitiativeCode(I.InitiativeCode)
		INNER JOIN ProgressHeader P ON P.InitiativeId = i.ID
		WHERE F.[FileName] = 'IM-CPO-MappingCapexAppWbs.txt'
		AND ((Mark <> 'Y') OR (Mark IS NULL))

		 
		UPDATE [IncomingFileData] 
		SET Mark = 'Y'
		WHERE [FileName] = 'IM-CPO-MappingCapexAppWbs.txt' 

		--- UPDATE Actual Date of Progress ------------------------------------------------------------- 
			   		 
		UPDATE progressplandate 
		SET progressplandate.ActualStartDate = IncomingFileData.Column2
		FROM  IncomingFileData
			INNER JOIN ProgressHeader ON LEFT(IncomingFileData.Column1,13) = ProgressHeader.WbsNo
			INNER JOIN progressplandate ON ProgressHeader.WbsNo +  [dbo].[GetWBSElementSuffix](progressplandate.ProgressPlanDateType)  = IncomingFileData.Column1 
			                                AND progressplandate.InitiativeId = ProgressHeader.InitiativeId
											AND IncomingFileData.[FileName] = 'OUT_ACTDATE.csv' AND ((IncomingFileData.Mark <> 'Y') OR (IncomingFileData.Mark IS NULL))
   
		UPDATE [IncomingFileData] 
		SET Mark = 'Y'
		WHERE [FileName] = 'OUT_ACTDATE.csv'

		-----------------------------------------------------------------------------------------


END
GO

/****** Object:  View [dbo].[v_Initiatives]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE VIEW [dbo].[v_Initiatives]
AS


SELECT * 
FROM Initiatives 
WHERE ISNULL(HistoryFlag, 0) = 0
--AND UPPER(status) <> UPPER('cancelled') 
AND UPPER(status) <> UPPER('deleted')   
-- AND ISNULL(UPPER(status),'') <> UPPER('deleted')   --aon add 2021-05-07
GO

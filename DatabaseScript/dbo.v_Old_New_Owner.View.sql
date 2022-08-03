/****** Object:  View [dbo].[v_Old_New_Owner]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE view [dbo].[v_Old_New_Owner] AS
 
  
 SELECT  
 UPPER(O.email) AS email
, O.OwnerName AS Old_OwnerName
, T.OwnerName AS New_OwnerName
 FROM 
 OWNERS O
 LEFT JOIN v_DistinctTempOwners T ON  UPPER(T.email) = UPPER(O.email)
 WHERE NOT T.OwnerName IS NULL



  
-- SELECT  
-- UPPER(O.email) AS email
--, O.OwnerName AS Old_OwnerName
--, T.OwnerName AS New_OwnerName
-- FROM 
-- TEMP_OWNERS O
-- LEFT JOIN OWNERS T ON  UPPER(T.email) = UPPER(O.email)
-- WHERE NOT T.OwnerName IS NULL

 

 

--SELECT		DISTINCT 
--' ' AS email
--,OwnerName  AS Old_OwnerName
--,REPLACE(OwnerName, '/>', '/->') AS New_OwnerName
--FROM		Initiatives
--WHERE		OwnerName NOT IN (SELECT OwnerName FROM OWNERS )
--AND			OwnerName LIKE '%/>'
 
 



GO

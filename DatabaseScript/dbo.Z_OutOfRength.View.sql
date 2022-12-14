/****** Object:  View [dbo].[Z_OutOfRength]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 
 
 
 
CREATE view [dbo].[Z_OutOfRength] AS
 



select
I.InitiativeCode
from 
Temp_Plan AS P
LEFT JOIN v_Initiatives I ON  I.InitiativeCode =  P.Initiative_NO  
LEFT JOIN CapexInformations cap ON cap.InitiativeId = I.Id  

WHERE  
   (cap.RequestIniNoDate  >   Convert(nvarchar(255),P.Year ) + '-1-31'    AND NOT (P.JAN = '0' OR P.JAN IS NULL) )
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-2-28'    AND NOT (P.FEB = '0' OR P.FEB IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-3-31'    AND NOT (P.MAR = '0' OR P.MAR IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-4-30'    AND NOT (P.APR = '0' OR P.APR IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-5-31'    AND NOT (P.MAY = '0' OR P.MAY IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-6-30'    AND NOT (P.JUN = '0' OR P.JUN IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-7-31'    AND NOT (P.JUL = '0' OR P.JUL IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-8-31'    AND NOT (P.AUG = '0' OR P.AUG IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-9-30'    AND NOT (P.SEP = '0' OR P.SEP IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-10-31'    AND NOT (P.OCT = '0' OR P.OCT IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-11-30'    AND NOT (P.NOV = '0' OR P.NOV IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-12-31'    AND NOT (P.DEC = '0' OR P.DEC IS NULL) ) 
 

--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-1-1'    AND NOT (P.JAN = '0' OR P.JAN IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-2-1'    AND NOT (P.FEB = '0' OR P.FEB IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-3-1'    AND NOT (P.MAR = '0' OR P.MAR IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-4-1'    AND NOT (P.APR = '0' OR P.APR IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-5-1'    AND NOT (P.MAY = '0' OR P.MAY IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-6-1'    AND NOT (P.JUN = '0' OR P.JUN IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-7-1'    AND NOT (P.JUL = '0' OR P.JUL IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-8-1'    AND NOT (P.AUG = '0' OR P.AUG IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-9-1'    AND NOT (P.SEP = '0' OR P.SEP IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-10-1'    AND NOT (P.OCT = '0' OR P.OCT IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-11-1'    AND NOT (P.NOV = '0' OR P.NOV IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-12-1'    AND NOT (P.DEC = '0' OR P.DEC IS NULL) ) 
 
 OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-1-1'    AND NOT (P.JAN = '0' OR P.JAN IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-2-1'    AND NOT (P.FEB = '0' OR P.FEB IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-3-1'    AND NOT (P.MAR = '0' OR P.MAR IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-4-1'    AND NOT (P.APR = '0' OR P.APR IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-5-1'    AND NOT (P.MAY = '0' OR P.MAY IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-6-1'    AND NOT (P.JUN = '0' OR P.JUN IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-7-1'    AND NOT (P.JUL = '0' OR P.JUL IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-8-1'    AND NOT (P.AUG = '0' OR P.AUG IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-9-1'    AND NOT (P.SEP = '0' OR P.SEP IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-10-1'    AND NOT (P.OCT = '0' OR P.OCT IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-11-1'    AND NOT (P.NOV = '0' OR P.NOV IS NULL) ) 
OR  (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-12-1'    AND NOT (P.DEC = '0' OR P.DEC IS NULL) ) 
 

 UNION

select
I.InitiativeCode
from 
Temp_EPCC AS P
LEFT JOIN v_Initiatives I ON  I.InitiativeCode =  P.Initiative_NO  
LEFT JOIN CapexInformations cap ON cap.InitiativeId = I.Id  

WHERE  
   (cap.RequestIniNoDate  >   Convert(nvarchar(255),P.Year ) + '-1-31'    AND NOT (P.JAN = '0' OR P.JAN IS NULL) )
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-2-28'    AND NOT (P.FEB = '0' OR P.FEB IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-3-31'    AND NOT (P.MAR = '0' OR P.MAR IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-4-30'    AND NOT (P.APR = '0' OR P.APR IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-5-31'    AND NOT (P.MAY = '0' OR P.MAY IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-6-30'    AND NOT (P.JUN = '0' OR P.JUN IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-7-31'    AND NOT (P.JUL = '0' OR P.JUL IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-8-31'    AND NOT (P.AUG = '0' OR P.AUG IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-9-30'    AND NOT (P.SEP = '0' OR P.SEP IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-10-31'    AND NOT (P.OCT = '0' OR P.OCT IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-11-30'    AND NOT (P.NOV = '0' OR P.NOV IS NULL) ) 
OR (cap.RequestIniNoDate  >    Convert(nvarchar(255),P.Year ) + '-12-31'    AND NOT (P.DEC = '0' OR P.DEC IS NULL) ) 
 

--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-1-1'    AND NOT (P.JAN = '0' OR P.JAN IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-2-1'    AND NOT (P.FEB = '0' OR P.FEB IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-3-1'    AND NOT (P.MAR = '0' OR P.MAR IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-4-1'    AND NOT (P.APR = '0' OR P.APR IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-5-1'    AND NOT (P.MAY = '0' OR P.MAY IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-6-1'    AND NOT (P.JUN = '0' OR P.JUN IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-7-1'    AND NOT (P.JUL = '0' OR P.JUL IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-8-1'    AND NOT (P.AUG = '0' OR P.AUG IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-9-1'    AND NOT (P.SEP = '0' OR P.SEP IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-10-1'    AND NOT (P.OCT = '0' OR P.OCT IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-11-1'    AND NOT (P.NOV = '0' OR P.NOV IS NULL) ) 
--OR (I.FinishingDate  <    Convert(nvarchar(255),P.Year ) + '-12-1'    AND NOT (P.DEC = '0' OR P.DEC IS NULL) ) 
 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-1-1'    AND NOT (P.JAN = '0' OR P.JAN IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-2-1'    AND NOT (P.FEB = '0' OR P.FEB IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-3-1'    AND NOT (P.MAR = '0' OR P.MAR IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-4-1'    AND NOT (P.APR = '0' OR P.APR IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-5-1'    AND NOT (P.MAY = '0' OR P.MAY IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-6-1'    AND NOT (P.JUN = '0' OR P.JUN IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-7-1'    AND NOT (P.JUL = '0' OR P.JUL IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-8-1'    AND NOT (P.AUG = '0' OR P.AUG IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-9-1'    AND NOT (P.SEP = '0' OR P.SEP IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-10-1'    AND NOT (P.OCT = '0' OR P.OCT IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-11-1'    AND NOT (P.NOV = '0' OR P.NOV IS NULL) ) 
OR (cap.ProjecctComRun  <    Convert(nvarchar(255),P.Year ) + '-12-1'    AND NOT (P.DEC = '0' OR P.DEC IS NULL) ) 
 
 





GO

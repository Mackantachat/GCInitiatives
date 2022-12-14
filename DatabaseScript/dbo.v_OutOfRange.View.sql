/****** Object:  View [dbo].[v_OutOfRange]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







 
 
CREATE view [dbo].[v_OutOfRange] AS
 
 
 
SELECT
I.InitiativeCode
FROM 
ProgressPlan AS P
LEFT JOIN v_Initiatives I ON  I.Id =  P.InitiativeId  
LEFT JOIN ProgressPlanDate ppd ON ppd.InitiativeId = I.Id  AND (ppd.ProgressPlanDateType = P.ProgressPlanType)

WHERE  
(P.PlanActual = 'Plan' and NOT P.ProgressPlanType in ('Over All','Overall') ) AND 


(   
	(ppd.BasicStartDate  >   Convert(nvarchar(255),P.Year ) + '-1-31'    AND NOT (P.JAN = '0' OR P.JAN IS NULL) )
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-2-28'    AND NOT (P.FEB = '0' OR P.FEB IS NULL) ) 
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-3-31'    AND NOT (P.MAR = '0' OR P.MAR IS NULL) ) 
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-4-30'    AND NOT (P.APR = '0' OR P.APR IS NULL) ) 
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-5-31'    AND NOT (P.MAY = '0' OR P.MAY IS NULL) ) 
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-6-30'    AND NOT (P.JUN = '0' OR P.JUN IS NULL) ) 
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-7-31'    AND NOT (P.JUL = '0' OR P.JUL IS NULL) ) 
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-8-31'    AND NOT (P.AUG = '0' OR P.AUG IS NULL) ) 
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-9-30'    AND NOT (P.SEP = '0' OR P.SEP IS NULL) ) 
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-10-31'    AND NOT (P.OCT = '0' OR P.OCT IS NULL) ) 
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-11-30'    AND NOT (P.NOV = '0' OR P.NOV IS NULL) ) 
OR (ppd.BasicStartDate  >    Convert(nvarchar(255),P.Year ) + '-12-31'    AND NOT (P.DEC = '0' OR P.DEC IS NULL) ) 
 
 
 OR (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-1-1'    AND NOT (P.JAN = '0' OR P.JAN IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-2-1'    AND NOT (P.FEB = '0' OR P.FEB IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-3-1'    AND NOT (P.MAR = '0' OR P.MAR IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-4-1'    AND NOT (P.APR = '0' OR P.APR IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-5-1'    AND NOT (P.MAY = '0' OR P.MAY IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-6-1'    AND NOT (P.JUN = '0' OR P.JUN IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-7-1'    AND NOT (P.JUL = '0' OR P.JUL IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-8-1'    AND NOT (P.AUG = '0' OR P.AUG IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-9-1'    AND NOT (P.SEP = '0' OR P.SEP IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-10-1'    AND NOT (P.OCT = '0' OR P.OCT IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-11-1'    AND NOT (P.NOV = '0' OR P.NOV IS NULL) ) 
OR  (ppd.BasicFinishDate  <    Convert(nvarchar(255),P.Year ) + '-12-1'    AND NOT (P.DEC = '0' OR P.DEC IS NULL) ) 
 ) 



GO

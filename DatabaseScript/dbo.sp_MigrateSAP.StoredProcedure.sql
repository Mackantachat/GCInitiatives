/****** Object:  StoredProcedure [dbo].[sp_MigrateSAP]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





 
 

CREATE PROCEDURE [dbo].[sp_MigrateSAP]
(
    -- Add the parameters for the stored procedure here
    @InitiativeID int
)
AS
BEGIN
 
 INSERT INTO [dbo].[ProgressHeader]
([InitiativeId] )
SELECT ID 
FROM v_Initiatives Initiatives 
WHERE Initiatives.ID IN  (@InitiativeID) 
AND (NOT Initiatives.ID IN (SELECT [InitiativeId] FROM  [ProgressHeader]) )
   
 

  

UPDATE ProgressHeader
SET 
ProgressHeader.InitiativeId = Initiatives.ID
,ProgressHeader.WbsNo = [dbo].fn_FirstSplitColon(Temp_Proj_cat.WBS)
,ProgressHeader.StandardProjectDef = [dbo].fn_FirstSplitColon(Temp_Proj_cat.Standard_Project)
,ProgressHeader.Responsible = [dbo].fn_FirstSplitColon(Temp_Proj_cat.Responsible_Person )
,ProgressHeader.SolomonCategory   = [dbo].fn_FirstSplitColon(Temp_Proj_cat.Solomon_Category)
,ProgressHeader.PhysicalBu  = [dbo].fn_FirstSplitColon(Temp_Proj_cat.Business_Unit)
,ProgressHeader.AreaPlant   = [dbo].fn_FirstSplitColon(Temp_Proj_cat.AreaPanel_No)
,ProgressHeader.PhysicalUnit = [dbo].fn_FirstSplitColon(Temp_Proj_cat.Physical_Unit)   
FROM Initiatives
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeID = Initiatives.ID 
INNER JOIN Temp_Proj_cat ON Temp_Proj_cat.Initiative_NO = Initiatives.InitiativeCode
WHERE Initiatives.ID IN (@InitiativeID) 
AND (LEFT([dbo].fn_FirstSplitColon(Temp_Proj_cat.Standard_Project),2) IN ('CA','CE','CM','CP'))  -- Cleansing ** ProgressHeader.StandardProjectDef
AND ([dbo].fn_FirstSplitColon(Temp_Proj_cat.Responsible_Person ) > 0) 
AND ([dbo].fn_FirstSplitColon(Temp_Proj_cat.Responsible_Person ) <> '') 
AND ([dbo].fn_FirstSplitColon(Temp_Proj_cat.Business_Unit ) <> '') 
AND ([dbo].fn_FirstSplitColon(Temp_Proj_cat.AreaPanel_No ) <> '') 
AND ([dbo].fn_FirstSplitColon(Temp_Proj_cat.Physical_Unit ) <> '') 
    
----------------------------------------------------------------------------------------------------------------------------------------------------

  
 -- CLEAR ProgressPlan
 DELETE ProgressPLAN
 WHERE InitiativeId = @InitiativeID 
  
 
---- SIMPLE
INSERT INTO [dbo].[ProgressPlan]
([InitiativeId] 
,[PlanActual]
,[ProgressPlanType]
,[Year]) 

 SELECT 
  i.ID AS [InitiativeId] 
 ,P.Code AS [PlanActual]
 ,T.Code AS [ProgressPlanType]
 ,Y.Code AS [Year] 
 FROM 
Initiatives i
INNER JOIN ProgressHeader PH ON PH.InitiativeId = i.ID
INNER JOIN [V_Temp_Date] TD ON TD.Project_Definition = PH.WBSNO   
INNER JOIN TempCode_Year Y ON Y.Data1 = 'Y' 
INNER JOIN	 TempCode_Year T ON T.Data1 = 'U' 
INNER JOIN	 TempCode_Year P ON P.Data1 = 'P'  
WHERE i.ID= @InitiativeID
AND Convert(INT,Y.Code) >= Year(TD.Basic_Start_Date)
AND Convert(INT,Y.Code) <= Year(TD.Basic_Finish_Date) 
AND  PH.WBSNO  IN (SELECT LEFT(WBS_Element,13) FROM Temp_Plan )
ORDER BY   
Y.Code 
,T.Data2
,P.Data2



 ------------- EPCC
INSERT INTO [dbo].[ProgressPlan]
([InitiativeId] 
,[PlanActual]
,[ProgressPlanType]
,[Year]) 

 SELECT 
  i.ID AS [InitiativeId] 
 ,P.Code AS [PlanActual]
 ,T.Code AS [ProgressPlanType]
 ,Y.Code AS [Year] 
 FROM 
Initiatives i
INNER JOIN ProgressHeader PH ON PH.InitiativeId = i.ID
INNER JOIN [V_Temp_Date] TD ON TD.Project_Definition = PH.WBSNO  
INNER JOIN TempCode_Year Y ON Y.Data1 = 'Y' 
INNER JOIN	 TempCode_Year T ON T.Data1 = 'T' 
INNER JOIN	 TempCode_Year P ON P.Data1 = 'P'  
WHERE i.Id= @InitiativeID
AND Convert(INT,Y.Code) >= Year(TD.Basic_Start_Date)
AND Convert(INT,Y.Code) <= Year(TD.Basic_Finish_Date)  
AND  PH.WBSNO  IN (SELECT LEFT(WBS_Element,13) FROM Temp_EPCC )
ORDER BY   
Y.Code 
,T.Data2
,P.Data2

 


------ SIMPLE
 UPDATE [ProgressPlan] 
SET 
 [ProgressPlan].Jan = Temp_Plan.Jan
,[ProgressPlan].Feb = Temp_Plan.Feb
,[ProgressPlan].Mar = Temp_Plan.Mar
,[ProgressPlan].Apr = Temp_Plan.Apr
,[ProgressPlan].May = Temp_Plan.May
,[ProgressPlan].Jun = Temp_Plan.Jun
,[ProgressPlan].Jul = Temp_Plan.Jul
,[ProgressPlan].Aug = Temp_Plan.Aug
,[ProgressPlan].Sep = Temp_Plan.Sep
,[ProgressPlan].Oct = Temp_Plan.Oct
,[ProgressPlan].Nov = Temp_Plan.Nov
,[ProgressPlan].Dec = Temp_Plan.Dec
 
FROM Initiatives
INNER JOIN [ProgressPlan] ON [ProgressPlan].InitiativeID = Initiatives.ID 
INNER JOIN ProgressHeader  ON ProgressHeader.InitiativeId = Initiatives.ID
INNER JOIN Temp_Plan ON  ProgressHeader.WBSNO =  LEFT(Temp_Plan.WBS_Element,13)  AND Temp_Plan.[Year] =  [ProgressPlan].[Year] AND LEFT([ProgressPlan].PlanActual,1) = Temp_Plan.PlanActual_PA
WHERE [ProgressPlan].ProgressPlanType = '-'  
AND  [ProgressPlan].InitiativeID = @InitiativeID
 
 
 

  ------------- EPCC
UPDATE [ProgressPlan] 
SET 
 [ProgressPlan].Jan = Temp_EPCC.Jan
,[ProgressPlan].Feb = Temp_EPCC.Feb
,[ProgressPlan].Mar = Temp_EPCC.Mar
,[ProgressPlan].Apr = Temp_EPCC.Apr
,[ProgressPlan].May = Temp_EPCC.May
,[ProgressPlan].Jun = Temp_EPCC.Jun
,[ProgressPlan].Jul = Temp_EPCC.Jul
,[ProgressPlan].Aug = Temp_EPCC.Aug
,[ProgressPlan].Sep = Temp_EPCC.Sep
,[ProgressPlan].Oct = Temp_EPCC.Oct
,[ProgressPlan].Nov = Temp_EPCC.Nov
,[ProgressPlan].Dec = Temp_EPCC.Dec
 FROM Initiatives
INNER JOIN [ProgressPlan] ON [ProgressPlan].InitiativeID = Initiatives.ID 
INNER JOIN ProgressHeader  ON ProgressHeader.InitiativeId = Initiatives.ID
INNER JOIN  Temp_EPCC ON  ProgressHeader.WBSNO =  LEFT(Temp_EPCC.WBS_Element,13) and Temp_EPCC.Phase_EPCC = [ProgressPlan].ProgressPlanType  AND Temp_EPCC.[Year] =  [ProgressPlan].[Year] AND LEFT([ProgressPlan].PlanActual,1) = Temp_EPCC.PlanActual_PA
WHERE Initiatives.ID = @InitiativeID

 
 --------------------------------------------------------------------------------------------



DECLARE @BasicStartDate DATETIME 
DECLARE @BasicFinishDate DATETIME 
DECLARE @ActualStartDate DATETIME 
DECLARE @ActualFinishDate DATETIME


---- CLEAR ProgressPlanDate
DELETE ProgressPlanDate
WHERE InitiativeId = @InitiativeID 
   

------------- SIMPLE
INSERT INTO [dbo].[ProgressPlanDate]
( [ProgressPlanDateType]
,[InitiativeId])  
SELECT  
T.Code AS [ProgressPlanType]
,i.ID AS [InitiativeId] 
FROM 
Initiatives i
INNER JOIN ProgressHeader PH ON PH.InitiativeId = i.ID 
INNER JOIN	 TempCode_Year T ON T.Data1 = 'U'  
WHERE i.Id= @InitiativeID  
AND  PH.WBSNO  IN (SELECT LEFT(WBS_Element,13) FROM Temp_Plan )
ORDER BY    
T.Data2


--- SIMPLE
UPDATE ProgressPlanDate
SET 
ProgressPlanDate.BasicStartDate = Temp_Plan.Basic_Start_Date
,ProgressPlanDate.BasicFinishDate = Temp_Plan.Basic_Finish_Date
,ProgressPlanDate.ActualStartDate = Temp_Plan.Actual_Start_Date
,ProgressPlanDate.[PocWeightPercent] =  100
FROM Initiatives
INNER JOIN ProgressHeader  ON ProgressHeader.InitiativeId = Initiatives.ID
INNER JOIN ProgressPlanDate ON ProgressPlanDate.InitiativeID = Initiatives.ID 
INNER JOIN Temp_Plan ON  ProgressHeader.WBSNO =  LEFT(Temp_Plan.WBS_Element,13)
AND Initiatives.ID = @InitiativeID


  

------------- EPCC
INSERT INTO [dbo].[ProgressPlanDate]
( [ProgressPlanDateType]
,[InitiativeId])  
SELECT  
T.Code AS [ProgressPlanType]
,i.ID AS [InitiativeId] 
FROM 
Initiatives i
INNER JOIN ProgressHeader PH ON PH.InitiativeId = i.ID 
INNER JOIN	 TempCode_Year T ON T.Data1 = 'T'  
WHERE i.Id= @InitiativeID 
AND  PH.WBSNO  IN (SELECT LEFT(WBS_Element,13) FROM Temp_EPCC )
ORDER BY    
T.Data2
 
  

--- EPCC 
UPDATE ProgressPlanDate
SET 
ProgressPlanDate.BasicStartDate =Temp_EPCC.Basic_Start_Date
,ProgressPlanDate.BasicFinishDate = Temp_EPCC.Basic_Finish_Date
,ProgressPlanDate.ActualStartDate = Temp_EPCC.Actual_Start_Date
,ProgressPlanDate.[PocWeightPercent] = Temp_EPCC.POC_Weight
FROM Initiatives
INNER JOIN ProgressHeader  ON ProgressHeader.InitiativeId = Initiatives.ID
INNER JOIN ProgressPlanDate ON ProgressPlanDate.InitiativeID = Initiatives.ID 
INNER JOIN Temp_EPCC ON ProgressHeader.WBSNO =  LEFT(Temp_EPCC.WBS_Element,13) and Temp_EPCC.Phase_EPCC = ProgressPlanDate.ProgressPlanDateType
AND Initiatives.ID = @InitiativeID
  
SELECT
  @BasicStartDate = MIN(BasicStartDate)
, @BasicFinishDate = MAX(BasicFinishDate)
, @ActualStartDate = MIN(ActualStartDate)
, @ActualFinishDate = MAX(ActualFinishDate) 
FROM ProgressPlanDate
WHERE ProgressPlanDate.InitiativeID = @InitiativeID 


UPDATE ProgressPlanDate
SET BasicStartDate = @BasicStartDate
,BasicFinishDate = @BasicFinishDate
,ActualStartDate = @ActualStartDate
,ActualFinishDate = @ActualFinishDate
WHERE ProgressPlanDate.InitiativeID = @InitiativeID AND ProgressPlanDateType = 'Overall'



  

 

 
 ---------------------------------------------------------------------------------------------------------
  


  
 --------------------------------------------------------------------------

 -----Cleansing Here
  --------------------------------------------------------------------------
 

---------------------------------------------------------------------------------------
--- *******************************************************************************
---------------------------------------------------------------------------------------

DECLARE @cnt INT = 0; 
WHILE @cnt < 4
BEGIN 

			UPDATE [ProgressPlan] 
			SET [ProgressPlan].JAN = PreviousYear.DEC
			FROM [ProgressPlan] 
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			INNER JOIN [ProgressPlan] PreviousYear ON    PreviousYear.InitiativeId =  Initiatives.Id    AND   Convert(INT,PreviousYear.Year)  = Convert(INT,[ProgressPlan].Year) - 1 
			AND   PreviousYear.PlanActual = [ProgressPlan].PlanActual  AND  PreviousYear.ProgressPlanType = [ProgressPlan].ProgressPlanType
			WHERE ([ProgressPlan].JAN IS NULL  OR [ProgressPlan].JAN = 0) AND (PreviousYear.[DEC]<=100) AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 
  
			UPDATE [ProgressPlan] 
			SET   [FEB] = [JAN]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([FEB] IS NULL  OR [FEB] = 0)AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-2-1'   )  AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 

			UPDATE [ProgressPlan] 
			SET   [MAR] = [FEB]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([MAR] IS NULL  OR [MAR] = 0) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-2-28'   )  AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 

			UPDATE [ProgressPlan] 
			SET   [APR] = [MAR]
			FROM [ProgressPlan]
				INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([APR] IS NULL  OR [APR] = 0) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-3-31'   ) AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 

			UPDATE [ProgressPlan] 
			SET   [MAY] = [APR]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([MAY] IS NULL  OR [MAY] = 0) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-4-30'   ) AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 

			UPDATE [ProgressPlan] 
			SET   [JUN] = [MAY]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([JUN] IS NULL  OR [JUN] = 0)  AND (Initiatives.FinishingDate >   [ProgressPlan].Year + '-5-31'   ) AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 
   
			UPDATE [ProgressPlan] 
			SET   [JUL] = [JUN]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([JUL] IS NULL  OR [JUL] = 0)  AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-6-30'   ) AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 

			UPDATE [ProgressPlan] 
			SET   [AUG] = [JUL]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([AUG] IS NULL  OR [AUG] = 0) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-7-31'   )  AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			  

			UPDATE [ProgressPlan] 
			SET   [SEP] = [AUG]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([SEP] IS NULL OR [SEP] = 0 ) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-8-31'   )  AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 

			UPDATE [ProgressPlan] 
			SET   [OCT] = [SEP]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([OCT] IS NULL OR [OCT] = 0 ) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-9-30'   )  AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 

			UPDATE [ProgressPlan] 
			SET   [NOV] = [OCT]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([NOV] IS NULL OR [NOV] = 0) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-10-31'   )  AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 

			UPDATE [ProgressPlan] 
			SET [DEC] = [NOV]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([DEC] IS NULL OR [DEC] = 0) AND (Initiatives.FinishingDate < >   [ProgressPlan].Year + '-11-30'   )  AND  [ProgressPlan].InitiativeID = @InitiativeID ;
			 
			  SET @cnt = @cnt + 1;
END 

  






END
GO

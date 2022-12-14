/****** Object:  StoredProcedure [dbo].[sp_MigrateSAP_ALL]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO










 
 

CREATE PROCEDURE [dbo].[sp_MigrateSAP_ALL]
 
AS
BEGIN
 
 INSERT INTO [dbo].[ProgressHeader]
([InitiativeId] )
SELECT ID 
FROM v_Initiatives Initiatives 
WHERE  (NOT Initiatives.ID IN (SELECT [InitiativeId] FROM  [ProgressHeader]) )
   
 

  
PRINT('UPDATE ProgressHeader')
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
WHERE (LEFT([dbo].fn_FirstSplitColon(Temp_Proj_cat.Standard_Project),2) IN ('CA','CE','CM','CP'))  -- Cleansing ** ProgressHeader.StandardProjectDef
AND ([dbo].fn_FirstSplitColon(Temp_Proj_cat.Responsible_Person ) > 0) 
AND ([dbo].fn_FirstSplitColon(Temp_Proj_cat.Responsible_Person ) <> '') 
AND ([dbo].fn_FirstSplitColon(Temp_Proj_cat.Business_Unit ) <> '') 
AND ([dbo].fn_FirstSplitColon(Temp_Proj_cat.AreaPanel_No ) <> '') 
AND ([dbo].fn_FirstSplitColon(Temp_Proj_cat.Physical_Unit ) <> '') 
    
----------------------------------------------------------------------------------------------------------------------------------------------------

    
PRINT('Progress')
 -- CLEAR ProgressPlan
 DELETE ProgressPLAN
 
  
 
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
WHERE   Convert(INT,Y.Code) >= Year(TD.Basic_Start_Date)
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
WHERE Convert(INT,Y.Code) >= Year(TD.Basic_Start_Date)
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
 
   ------------- EPCC OverAll
 
UPDATE [ProgressPlan] 
SET 
 [ProgressPlan].Jan = ZZZ_999POC_OverAll.Period_1
,[ProgressPlan].Feb = ZZZ_999POC_OverAll.Period_2
,[ProgressPlan].Mar = ZZZ_999POC_OverAll.Period_3
,[ProgressPlan].Apr = ZZZ_999POC_OverAll.Period_4
,[ProgressPlan].May = ZZZ_999POC_OverAll.Period_5
,[ProgressPlan].Jun = ZZZ_999POC_OverAll.Period_6
,[ProgressPlan].Jul = ZZZ_999POC_OverAll.Period_7
,[ProgressPlan].Aug = ZZZ_999POC_OverAll.Period_8
,[ProgressPlan].Sep = ZZZ_999POC_OverAll.Period_9
,[ProgressPlan].Oct = ZZZ_999POC_OverAll.Period_10
,[ProgressPlan].Nov = ZZZ_999POC_OverAll.Period_11
,[ProgressPlan].Dec = ZZZ_999POC_OverAll.Period_12
 FROM Initiatives
INNER JOIN [ProgressPlan] ON [ProgressPlan].InitiativeID = Initiatives.ID 
INNER JOIN ProgressHeader  ON ProgressHeader.InitiativeId = Initiatives.ID
INNER JOIN  ZZZ_999POC_OverAll ON  ProgressHeader.WBSNO =  LEFT(ZZZ_999POC_OverAll.WBS_Element,13)    AND ZZZ_999POC_OverAll.[Year] =  [ProgressPlan].[Year] AND LEFT([ProgressPlan].PlanActual,1) = ZZZ_999POC_OverAll.PlanActual_PA
 WHERE ProgressPlanType = 'Overall'
  
 --------------------------------------------------------------------------------------------



--DECLARE @BasicStartDate DATETIME 
--DECLARE @BasicFinishDate DATETIME 
--DECLARE @ActualStartDate DATETIME 
--DECLARE @ActualFinishDate DATETIME
PRINT('ProgressPlanDate')

---- CLEAR ProgressPlanDate
DELETE ProgressPlanDate
 
   

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
WHERE   PH.WBSNO  IN (SELECT LEFT(WBS_Element,13) FROM Temp_Plan )
ORDER BY    
T.Data2


--- SIMPLE
UPDATE ProgressPlanDate
SET 
ProgressPlanDate.BasicStartDate = Convert(DateTime,ZZZ_999Date.[Basic_Start_Date],104)
,ProgressPlanDate.BasicFinishDate = Convert(DateTime,ZZZ_999Date.Basic_Finish_Date,104)
,ProgressPlanDate.ActualStartDate = CASE WHEN ( ZZZ_999Date.Actual_Start_Date) <> '' THEN Convert(DateTime,ZZZ_999Date.Actual_Start_Date,104) ELSE NULL END
,ProgressPlanDate.[PocWeightPercent] =  100
FROM Initiatives
INNER JOIN ProgressHeader  ON ProgressHeader.InitiativeId = Initiatives.ID
INNER JOIN ProgressPlanDate ON ProgressPlanDate.InitiativeID = Initiatives.ID 
INNER JOIN ZZZ_999Date ON  ProgressHeader.WBSNO =  LEFT(ZZZ_999Date.WBS,13)
 


  

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
WHERE  PH.WBSNO  IN (SELECT LEFT(WBS_Element,13) FROM Temp_EPCC )
ORDER BY    
T.Data2
 
  

--- EPCC 
UPDATE ProgressPlanDate
SET 
ProgressPlanDate.BasicStartDate = Convert(DateTime,ZZZ_999Date.[Basic_Start_Date],104)
,ProgressPlanDate.BasicFinishDate = Convert(DateTime,ZZZ_999Date.Basic_Finish_Date,104)
,ProgressPlanDate.ActualStartDate = CASE WHEN ( ZZZ_999Date.Actual_Start_Date) <> '' THEN Convert(DateTime,ZZZ_999Date.Actual_Start_Date,104) ELSE NULL END
,ProgressPlanDate.[PocWeightPercent] = Temp_EPCC.POC_Weight
FROM Initiatives
INNER JOIN ProgressHeader  ON ProgressHeader.InitiativeId = Initiatives.ID
INNER JOIN ProgressPlanDate ON ProgressPlanDate.InitiativeID = Initiatives.ID 
INNER JOIN Temp_EPCC ON ProgressHeader.WBSNO =  LEFT(Temp_EPCC.WBS_Element,13) and Temp_EPCC.Phase_EPCC = ProgressPlanDate.ProgressPlanDateType
INNER JOIN ZZZ_999Date ON  ProgressHeader.WBSNO +  [dbo].[GetWBSElementSuffix](ProgressPlanDate.ProgressPlanDateType) =   ZZZ_999Date.WBS
  
--SELECT
--  @BasicStartDate = MIN(BasicStartDate)
--, @BasicFinishDate = MAX(BasicFinishDate)
--, @ActualStartDate = MIN(ActualStartDate)
--, @ActualFinishDate = MAX(ActualFinishDate) 
--FROM ProgressPlanDate
 


--UPDATE ProgressPlanDate
--SET BasicStartDate = @BasicStartDate
--,BasicFinishDate = @BasicFinishDate
--,ActualStartDate = @ActualStartDate
--,ActualFinishDate = @ActualFinishDate
--WHERE  ProgressPlanDateType = 'Overall'



  

 

 
 ---------------------------------------------------------------------------------------------------------
  


  PRINT('Cleansing Here')
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
			WHERE ([ProgressPlan].JAN IS NULL  OR [ProgressPlan].JAN = 0) AND (PreviousYear.[DEC]<=100) ;
			 
  
			UPDATE [ProgressPlan] 
			SET   [FEB] = [JAN]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([FEB] IS NULL  OR [FEB] = 0)AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-2-1'   ) ;
			 

			UPDATE [ProgressPlan] 
			SET   [MAR] = [FEB]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([MAR] IS NULL  OR [MAR] = 0) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-2-28'   )  ;
			 

			UPDATE [ProgressPlan] 
			SET   [APR] = [MAR]
			FROM [ProgressPlan]
				INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([APR] IS NULL  OR [APR] = 0) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-3-31'   ) ;
			 

			UPDATE [ProgressPlan] 
			SET   [MAY] = [APR]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([MAY] IS NULL  OR [MAY] = 0) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-4-30'   ) ;
			 

			UPDATE [ProgressPlan] 
			SET   [JUN] = [MAY]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([JUN] IS NULL  OR [JUN] = 0)  AND (Initiatives.FinishingDate >   [ProgressPlan].Year + '-5-31'   ) ;
			 
   
			UPDATE [ProgressPlan] 
			SET   [JUL] = [JUN]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([JUL] IS NULL  OR [JUL] = 0)  AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-6-30'   );
			 

			UPDATE [ProgressPlan] 
			SET   [AUG] = [JUL]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([AUG] IS NULL  OR [AUG] = 0) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-7-31'   )  ;
			  

			UPDATE [ProgressPlan] 
			SET   [SEP] = [AUG]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([SEP] IS NULL OR [SEP] = 0 ) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-8-31'   )  ;
			 

			UPDATE [ProgressPlan] 
			SET   [OCT] = [SEP]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([OCT] IS NULL OR [OCT] = 0 ) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-9-30'   )  ;
			 

			UPDATE [ProgressPlan] 
			SET   [NOV] = [OCT]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([NOV] IS NULL OR [NOV] = 0) AND (Initiatives.FinishingDate >    [ProgressPlan].Year + '-10-31'   ) ;
			 

			UPDATE [ProgressPlan] 
			SET [DEC] = [NOV]
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE ([DEC] IS NULL OR [DEC] = 0) AND (Initiatives.FinishingDate < >   [ProgressPlan].Year + '-11-30'   ) ;
			 
			  SET @cnt = @cnt + 1;


END 

  --------------------------------------------------------------------------------------------


  
			UPDATE [ProgressPlan] 
			SET   [FEB] = NULL
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE   (Initiatives.FinishingDate <    [ProgressPlan].Year + '-2-1'   ) and [ProgressPlan].PlanActual = 'Plan'
			 


			UPDATE [ProgressPlan] 
			SET   [MAR] = NULL
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE   (Initiatives.FinishingDate <    [ProgressPlan].Year + '-3-1'   )  and [ProgressPlan].PlanActual = 'Plan'
			  and [ProgressPlan].PlanActual = 'Plan'

			UPDATE [ProgressPlan] 
			SET   [APR] = NULL
			FROM [ProgressPlan]
				INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE  (Initiatives.FinishingDate <    [ProgressPlan].Year + '-4-1'   ) and [ProgressPlan].PlanActual = 'Plan'
			 

			UPDATE [ProgressPlan] 
			SET   [MAY] = NULL
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE   (Initiatives.FinishingDate <    [ProgressPlan].Year + '-5-1'   ) and [ProgressPlan].PlanActual = 'Plan'
			 

			UPDATE [ProgressPlan] 
			SET   [JUN] = NULL
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE  (Initiatives.FinishingDate <   [ProgressPlan].Year + '-6-1'   ) and [ProgressPlan].PlanActual = 'Plan'
			 
   
			UPDATE [ProgressPlan] 
			SET   [JUL] = NULL
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE (Initiatives.FinishingDate <    [ProgressPlan].Year + '-7-1'   )and [ProgressPlan].PlanActual = 'Plan'
			 

			UPDATE [ProgressPlan] 
			SET   [AUG] = NULL
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE    (Initiatives.FinishingDate <    [ProgressPlan].Year + '-8-1'   )  and [ProgressPlan].PlanActual = 'Plan'
			  

			UPDATE [ProgressPlan] 
			SET   [SEP] = NULL
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE   (Initiatives.FinishingDate <    [ProgressPlan].Year + '-9-1'   )  and [ProgressPlan].PlanActual = 'Plan'
			 

			UPDATE [ProgressPlan] 
			SET   [OCT] = NULL
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE   (Initiatives.FinishingDate <    [ProgressPlan].Year + '-10-1'   )  ;
			 

			UPDATE [ProgressPlan] 
			SET   [NOV] = NULL
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE   (Initiatives.FinishingDate <    [ProgressPlan].Year + '-11-1'   ) ;
			 

			UPDATE [ProgressPlan] 
			SET [DEC] = NULL
			FROM [ProgressPlan]
			INNER JOIN v_Initiatives Initiatives ON Initiatives.Id = [ProgressPlan].InitiativeId
			WHERE  (Initiatives.FinishingDate <    [ProgressPlan].Year + '-12-1'   ) ;


			--------------------------------------------------------------------------------------------




END
GO

/****** Object:  StoredProcedure [dbo].[sp_FixCAPEX]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 
 
CREATE PROCEDURE [dbo].[sp_FixCAPEX]
(
    -- Add the parameters for the stored procedure here
    @InitiativeId int
)
AS
BEGIN
  


  
-- JAN
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Jan = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE 
  Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '01'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId
 
 -- FEB
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Feb = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE   Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '02'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId

 -- MAR
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Mar = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE  Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '03'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId


-- APR
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Apr = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE   Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '04'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId
 
 -- MAY
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.May = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE   Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '05'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId

 -- JUN
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Jun = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE  Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '06'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId


-- JUL
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Jul = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE   Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '07'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId
 
 -- AUG
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Aug = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE   Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '08'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId

 -- SEP
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Sep = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE  Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '09'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId

-- OCT
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Oct = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE   Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '10'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId
 
 -- NOV
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Nov = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '11'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId

 -- DEC
UPDATE MonthlyInvestmentPlans
SET
MonthlyInvestmentPlans.Dec = IF_Actual_PRPO.Plan_Amount
FROM 
MonthlyInvestmentPlans
INNER JOIN ProgressHeader ON ProgressHeader.InitiativeId = MonthlyInvestmentPlans.InitiativeId
INNER JOIN IF_Actual_PRPO ON IF_Actual_PRPO.Project_Definition_Key = ProgressHeader.WbsNo
WHERE   Convert(nvarchar(255),MonthlyInvestmentPlans.YearOfMonth) = RIGHT(IF_Actual_PRPO.Period,4)
AND LEFT(IF_Actual_PRPO.Period,2) = '12'
AND  MonthlyInvestmentPlans.InitiativeId = @InitiativeId 


UPDATE MonthlyInvestmentPlans
SET MonthlyOverall = 
IsNULL(JAN,0)	+
IsNULL(FEB,0)	+
IsNULL(MAR,0)	+
IsNULL(APR,0)	+
IsNULL(MAY,0)	+
IsNULL(JUN,0)	+
IsNULL(JUL,0)	+
IsNULL(AUG,0)	+
IsNULL(SEP,0)	+
IsNULL(OCT,0)	+
IsNULL(NOV,0)	+
IsNULL(DEC,0)	 
WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId 


DECLARE @MINYEAR INT = (SELECT MIN(YearOfMonth) FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId)


 

UPDATE AnnualInvestmentPlans
SET Year1 = (SELECT MonthlyOverall FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId AND YearOfMonth = @MINYEAR   ) /1000000
,   Year2 = (SELECT MonthlyOverall FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId AND YearOfMonth = @MINYEAR +1  ) /1000000
,   Year3 = (SELECT MonthlyOverall FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId AND YearOfMonth = @MINYEAR +2  ) /1000000
,   Year4 = (SELECT MonthlyOverall FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId AND YearOfMonth = @MINYEAR +3  ) /1000000
,   Year5 = (SELECT MonthlyOverall FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId AND YearOfMonth = @MINYEAR +4  ) /1000000
,   Year6 = (SELECT MonthlyOverall FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId AND YearOfMonth = @MINYEAR +5  ) /1000000
,   Year7 = (SELECT MonthlyOverall FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId AND YearOfMonth = @MINYEAR +6  ) /1000000
,   Year8 = (SELECT MonthlyOverall FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId AND YearOfMonth = @MINYEAR +7  ) /1000000
,   Year9 = (SELECT MonthlyOverall FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId AND YearOfMonth = @MINYEAR +8  ) /1000000
,   Year10 = (SELECT MonthlyOverall FROM MonthlyInvestmentPlans WHERE  MonthlyInvestmentPlans.InitiativeId = @InitiativeId AND YearOfMonth = @MINYEAR +9 ) /1000000
 
 WHERE  AnnualInvestmentPlans.InitiativeId = @InitiativeId


  
  
UPDATE AnnualInvestmentPlans
SET YearOverall = 
    IsNULL(Year1 ,0)
+   IsNULL(Year2 ,0)
+   IsNULL(Year3 ,0)
+   IsNULL(Year4 ,0)
+   IsNULL(Year5 ,0)
+   IsNULL(Year6 ,0)
+   IsNULL(Year7 ,0)
+   IsNULL(Year8  ,0) 
+   IsNULL(Year9 ,0)  
+   IsNULL(Year10 ,0) 
 
 WHERE  AnnualInvestmentPlans.InitiativeId = @InitiativeId


UPDATE cap
SET cap.ProjectCost = ann.YearOverall
FROM
CapexInformations cap 
INNER JOIN AnnualInvestmentPlans ann ON  ann.CapexInformationId = cap.CapexInformationId
WHERE cap.InitiativeId = @InitiativeId
AND cap.Revistion = 0 




UPDATE cap
SET cap.AdditionalCost = ann.YearOverall
FROM
CapexInformations cap 
INNER JOIN AnnualInvestmentPlans ann ON  ann.CapexInformationId = cap.CapexInformationId
WHERE cap.InitiativeId = @InitiativeId
AND cap.Revistion > 0 



END
GO

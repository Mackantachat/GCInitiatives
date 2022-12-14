/****** Object:  View [dbo].[v_Report_GC_BG_2]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[v_Report_GC_BG_2] AS
Select 
INI.InitiativeCode
,CAP.Revistion
,INI.Name
,INI.TypeOfInvestment
,INI.Stage
,INI.Status
,INI.Company
,CAP.BudgetPeriod as [Budget Form]
,CASE WHEN ISNULL(INI.Company,'') = 'PTTGC' THEN 'GC Only' ELSE 'Subsidiary' END as [Company Type]
,CAP.CodeCostCenterOfVP
,INI.Organization
,INI.Plant
,CAP.CostCenterOfVP as [Cost Center]
,ownCostCenter.Indicator AS VP
,INI.InitiativeType
, Convert(NVARCHAR(255),CAST(DET.UsefulYear AS int)) +' Year(s)  ' + Convert(NVARCHAR(255),CAST(DET.UsefulMonth AS int)) + ' Month(s) ' as [Useful life]
,PRO.AppropriationNo
,PRO.WbsNo
 , MON1.Jul AS CurYear1_07, MON1.Aug AS CurYear1_08, MON1.Sep AS CurYear1_09, MON1.Oct AS CurYear1_10, MON1.Nov AS CurYear1_11, MON1.Dec AS CurYear1_12, ANN.Year1 AS CurYear1, MON2.Jan AS CurYear2_01, 
                         MON2.Feb AS CurYear2_02, MON2.Mar AS CurYear2_03, MON2.Apr AS CurYear2_04, MON2.May AS CurYear2_05, MON2.Jun AS CurYear2_06, MON2.Jul AS CurYear2_07, MON2.Aug AS CurYear2_08, 
                         MON2.Sep AS CurYear2_09, MON2.Oct AS CurYear2_10, MON2.Nov AS CurYear2_11, MON2.Dec AS CurYear2_12, ANN.Year2 AS CurYear2, MON3.Jan AS CurYear3_01, MON3.Feb AS CurYear3_02, MON3.Mar AS CurYear3_03, 
                         MON3.Apr AS CurYear3_04, MON3.May AS CurYear3_05, MON3.Jun AS CurYear3_06, MON3.Jul AS CurYear3_07, MON3.Aug AS CurYear3_08, MON3.Sep AS CurYear3_09, MON3.Oct AS CurYear3_10, 
                         MON3.Nov AS CurYear3_11, MON3.Dec AS CurYear3_12, ANN.Year3 AS CurYear3, MON4.Jan AS CurYear4_01, MON4.Feb AS CurYear4_02, MON4.Mar AS CurYear4_03, MON4.Apr AS CurYear4_04, MON4.May AS CurYear4_05, 
                         MON4.Jun AS CurYear4_06, MON4.Jul AS CurYear4_07, MON4.Aug AS CurYear4_08, MON4.Sep AS CurYear4_09, MON4.Oct AS CurYear4_10, MON4.Nov AS CurYear4_11, MON4.Dec AS CurYear4_12, ANN.Year4 AS CurYear4, 
                         MON5.Jan AS CurYear5_01, MON5.Feb AS CurYear5_02, MON5.Mar AS CurYear5_03, MON5.Apr AS CurYear5_04, MON5.May AS CurYear5_05, MON5.Jun AS CurYear5_06, MON5.Jul AS CurYear5_07, 
                         MON5.Aug AS CurYear5_08, MON5.Sep AS CurYear5_09, MON5.Oct AS CurYear5_10, MON5.Nov AS CurYear5_11, MON5.Dec AS CurYear5_12, ANN.Year5 AS CurYear5, MON6.Jan AS CurYear6_01, MON6.Feb AS CurYear6_02, 
                         MON6.Mar AS CurYear6_03, MON6.Apr AS CurYear6_04, MON6.May AS CurYear6_05, MON6.Jun AS CurYear6_06, MON6.Jul AS CurYear6_07, MON6.Aug AS CurYear6_08, MON6.Sep AS CurYear6_09, 
                         MON6.Oct AS CurYear6_10, MON6.Nov AS CurYear6_11, MON6.Dec AS CurYear6_12, ANN.Year6 AS CurYear6, MON7.Jan AS CurYear7_01, MON7.Feb AS CurYear7_02, MON7.Mar AS CurYear7_03, MON7.Apr AS CurYear7_04, 
                         MON7.May AS CurYear7_05, MON7.Jun AS CurYear7_06, MON7.Jul AS CurYear7_07, MON7.Aug AS CurYear7_08, MON7.Sep AS CurYear7_09, MON7.Oct AS CurYear7_10, MON7.Nov AS CurYear7_11, 
                         MON7.Dec AS CurYear7_12, ANN.Year7 AS CurYear7, MON8.Jan AS CurYear8_01, MON8.Feb AS CurYear8_02, MON8.Mar AS CurYear8_03, MON8.Apr AS CurYear8_04, MON8.May AS CurYear8_05, MON8.Jun AS CurYear8_06, 
                         MON8.Jul AS CurYear8_07, MON8.Aug AS CurYear8_08, MON8.Sep AS CurYear8_09, MON8.Oct AS CurYear8_10, MON8.Nov AS CurYear8_11, MON8.Dec AS CurYear8_12, ANN.Year8 AS CurYear8, MON9.Jan AS CurYear9_01, 
                         MON9.Feb AS CurYear9_02, MON9.Mar AS CurYear9_03, MON9.Apr AS CurYear9_04, MON9.May AS CurYear9_05, MON9.Jun AS CurYear9_06, MON9.Jul AS CurYear9_07, MON9.Aug AS CurYear9_08, 
                         MON9.Sep AS CurYear9_09, MON9.Oct AS CurYear9_10, MON9.Nov AS CurYear9_11, MON9.Dec AS CurYear9_12, ANN.Year9 AS CurYear9, MON10.Jan AS CurYear10_01, MON10.Feb AS CurYear10_02, 
                         MON10.Mar AS CurYear10_03, MON10.Apr AS CurYear10_04, MON10.May AS CurYear10_05, MON10.Jun AS CurYear10_06, MON10.Jul AS CurYear10_07, MON10.Aug AS CurYear10_08, MON10.Sep AS CurYear10_09, 
                         MON10.Oct AS CurYear10_10, MON10.Nov AS CurYear10_11, MON10.Dec AS CurYear10_12, ANN.Year10 AS CurYear10, CAP.BudgetYear AS [Budget Year]
From v_Initiatives INI
LEFT JOIN DetailInformations DET on DET.InitiativeId = INI.Id
Left JOIN CapexInformations CAP on CAP.initiativeID = INI.ID
LEft JOIN ProgressHeader PRO on PRO.InitiativeId = INI.ID
LEFT JOIN Owners ownCostCenter ON ownCostCenter.OwnerName = cap.CostCenterOfVP


LEFT OUTER JOIN dbo.AnnualInvestmentPlans AS ANN ON ANN.CapexInformationId = CAP.CapexInformationId AND ANN.PlanType IN ('SumTotalBaht') AND ANN.InitiativeId = INI.Id 
LEFT OUTER JOIN dbo.MonthlyInvestmentPlans AS MON1 ON MON1.CapexInformationId = CAP.CapexInformationId AND MON1.YearOfMonth = '2021' AND MON1.InitiativeId = INI.id 
LEFT OUTER JOIN dbo.MonthlyInvestmentPlans AS MON2 ON MON2.CapexInformationId = CAP.CapexInformationId AND MON2.YearOfMonth = '2022' AND MON2.InitiativeId = INI.id 
LEFT OUTER JOIN dbo.MonthlyInvestmentPlans AS MON3 ON MON3.CapexInformationId = CAP.CapexInformationId AND MON3.YearOfMonth = '2023' AND MON3.InitiativeId = INI.id 
LEFT OUTER JOIN dbo.MonthlyInvestmentPlans AS MON4 ON MON4.CapexInformationId = CAP.CapexInformationId AND MON4.YearOfMonth = '2024' AND MON4.InitiativeId = INI.id 
LEFT OUTER JOIN dbo.MonthlyInvestmentPlans AS MON5 ON MON5.CapexInformationId = CAP.CapexInformationId AND MON5.YearOfMonth = '2025' AND MON5.InitiativeId = INI.id
LEFT OUTER JOIN dbo.MonthlyInvestmentPlans AS MON6 ON MON6.CapexInformationId = CAP.CapexInformationId AND MON6.YearOfMonth = '2026' AND MON6.InitiativeId = INI.id 
LEFT OUTER JOIN dbo.MonthlyInvestmentPlans AS MON7 ON MON7.CapexInformationId = CAP.CapexInformationId AND MON7.YearOfMonth = '2027' AND MON7.InitiativeId = INI.id 
LEFT OUTER JOIN dbo.MonthlyInvestmentPlans AS MON8 ON MON8.CapexInformationId = CAP.CapexInformationId AND MON8.YearOfMonth = '2028' AND MON8.InitiativeId = INI.id 
LEFT OUTER JOIN dbo.MonthlyInvestmentPlans AS MON9 ON MON9.CapexInformationId = CAP.CapexInformationId AND MON9.YearOfMonth = '2029' AND MON9.InitiativeId = INI.id 
LEFT OUTER JOIN dbo.MonthlyInvestmentPlans AS MON10 ON MON10.CapexInformationId = CAP.CapexInformationId AND MON10.YearOfMonth = '2030'  AND MON10.InitiativeId = INI.id 

Where CAP.BudgetYear='2021'
--Order by INI.InitiativeCode,CAP.Revistion
GO

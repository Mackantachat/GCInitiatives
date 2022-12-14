/****** Object:  View [dbo].[v_CashIn]    Script Date: 9/23/2021 10:57:26 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO









/*ORDER BY InitiativeId, WorkStreamTitle, ImpactTypeOfBenefitTable, VersionPrice DESC
ORDER BY InitiativeId, WorkStreamTitle, ImpactTypeOfBenefitTable, TypeOfBenefitGroup, VersionPrice DESC
ORDER BY InitiativeId, WorkStreamTitle, ImpactTypeOfBenefitTable, TypeOfBenefitGroup, VersionPrice DESC*/
CREATE view [dbo].[v_CashIn]
AS
SELECT DISTINCT 
                         (ini.Id) AS InitiativeId, ISNULL(ini.Name, N'') AS NAME, ISNULL(ini.Stage, N'') AS Stage, ISNULL(tr.FinancialImpactArea, N'') AS FinancialImpactArea, 
                         CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN 100 ELSE Isnull(sh.[percent], 100) END AS [Percent], CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN Isnull(de.workstream, N'') ELSE Isnull(sub.workstreamtitle, '') END AS WorkStreamTitle, 
                         CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN Isnull(de.subworkstream1, N'') ELSE Isnull(sh.workstream, N'') END AS SubWorkstream, 
						 CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN MAX(tr.il5runraterecurring) ELSE MAX(tr.il5runraterecurring) * (Isnull(sh.[percent], 100) / 100) END AS IL5RunRateRecurring,
						 CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN MAX(tr.il5runraterecurring) ELSE ISNULL(MAX(sh.IL5RRRecurring), 0) END AS [IL5RunRateRecurring New], --fame edit
						 CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN MAX(tr.il5runrateonetime) ELSE MAX(tr.il5runrateonetime) * (Isnull(sh.[percent], 100) / 100) END AS IL5RunRateOnetime,
						 CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN MAX(tr.il5runrateonetime) ELSE ISNULL(MAX(sh.IL5RROneTime), 0) END AS [IL5RunRateOnetime New], --fame edit
						 CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN MAX(tr.il4runraterecurring) ELSE MAX(tr.il4runraterecurring) * (Isnull(sh.[percent], 100) / 100) END AS IL4RunRateRecurring, 
						 CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN MAX(tr.il4runraterecurring) ELSE ISNULL(MAX(sh.IL4RRRecurring), 0) END AS [IL4RunRateRecurring New], --fame edit
                         CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN MAX(tr.il4runrateonetime) ELSE MAX(tr.il4runrateonetime) * (Isnull(sh.[percent], 100) / 100) END AS IL4RunRateOnetime, 
						 CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN MAX(tr.il4runrateonetime) ELSE ISNULL(MAX(sh.IL4RROneTime), 0) END AS [IL4RunRateOnetime New], -- fame edit
						 MAX(tr.FirstRunRateMonth) AS FirstRunRateMonth, 
                         MAX(CONVERT(VARCHAR(10), tr.FirstRunRateMonth, 120)) AS month_Year, ISNULL(be.ImpactTypeOfBenefitTable, N'') AS ImpactTypeOfBenefitTable,
						 MAX(isnull(tb.TypeOfBenefitTitle, N'')) As [Type of Benefit],
						 ISNULL(tb.TypeOfBenefitGroup, N'') AS TypeOfBenefitGroup, 
                         ISNULL(be.VersionPrice, N'') AS VersionPrice, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN Isnull(be.runrate, 0) ELSE Isnull(be.runrate, 0) * (Isnull(sh.[percent], 100) / 100) END) AS RunRateSum, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month1) ELSE (be.month1) * (Isnull(sh.[percent], 100) / 100) END) AS Month1, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month2) ELSE (be.month2) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month2, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month3) ELSE (be.month3) * (Isnull(sh.[percent], 100) / 100) END) AS Month3, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month4) ELSE (be.month4) * (Isnull(sh.[percent], 100) / 100) END) AS Month4, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month5) ELSE (be.month5) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month5, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month6) ELSE (be.month6) * (Isnull(sh.[percent], 100) / 100) END) AS Month6, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month7) ELSE (be.month7) * (Isnull(sh.[percent], 100) / 100) END) AS Month7, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month8) ELSE (be.month8) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month8, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month9) ELSE (be.month9) * (Isnull(sh.[percent], 100) / 100) END) AS Month9, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month10) ELSE (be.month10) * (Isnull(sh.[percent], 100) / 100) END) AS Month10, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month11) ELSE (be.month11) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month11, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month12) ELSE (be.month12) * (Isnull(sh.[percent], 100) / 100) END) AS Month12, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month13) ELSE (be.month13) * (Isnull(sh.[percent], 100) / 100) END) AS Month13, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month14) ELSE (be.month14) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month14, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month15) ELSE (be.month15) * (Isnull(sh.[percent], 100) / 100) END) AS Month15, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month16) ELSE (be.month16) * (Isnull(sh.[percent], 100) / 100) END) AS Month16, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month17) ELSE (be.month17) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month17, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month18) ELSE (be.month18) * (Isnull(sh.[percent], 100) / 100) END) AS Month18, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month19) ELSE (be.month19) * (Isnull(sh.[percent], 100) / 100) END) AS Month19, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month20) ELSE (be.month20) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month20, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month21) ELSE (be.month21) * (Isnull(sh.[percent], 100) / 100) END) AS Month21, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month22) ELSE (be.month22) * (Isnull(sh.[percent], 100) / 100) END) AS Month22, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month23) ELSE (be.month23) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month23, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month24) ELSE (be.month24) * (Isnull(sh.[percent], 100) / 100) END) AS Month24, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month25) ELSE (be.month25) * (Isnull(sh.[percent], 100) / 100) END) AS Month25, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month26) ELSE (be.month26) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month26, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month27) ELSE (be.month27) * (Isnull(sh.[percent], 100) / 100) END) AS Month27, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month28) ELSE (be.month28) * (Isnull(sh.[percent], 100) / 100) END) AS Month28, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month29) ELSE (be.month29) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month29, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month30) ELSE (be.month30) * (Isnull(sh.[percent], 100) / 100) END) AS Month30, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month31) ELSE (be.month31) * (Isnull(sh.[percent], 100) / 100) END) AS Month31, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month32) ELSE (be.month32) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month32, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month33) ELSE (be.month33) * (Isnull(sh.[percent], 100) / 100) END) AS Month33, 
                         SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month34) ELSE (be.month34) * (Isnull(sh.[percent], 100) / 100) END) AS Month34, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month35) ELSE (be.month35) 
                         * (Isnull(sh.[percent], 100) / 100) END) AS Month35, SUM(CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN (be.month36) ELSE (be.month36) * (Isnull(sh.[percent], 100) / 100) END) AS Month36, MAX(de.IL4Date) AS IL4Date, 
                         MAX(ini.Organization) AS Organization, ini.InitiativeCode AS InitiativeCode
                         ,MAX(tr.LastApprovedIL4Date) AS LastApprovedIL4Date
FROM            dbo.ImpactTrackings AS tr LEFT JOIN
                         dbo.ImpactTypeOfBenefits AS be ON be.InitiativeId = tr.InitiativeId LEFT OUTER JOIN
                         dbo.v_Initiatives AS ini ON tr.InitiativeId = ini.Id LEFT OUTER JOIN
                         dbo.DetailInformations AS de ON tr.InitiativeId = de.InitiativeId LEFT OUTER JOIN
							 (SELECT DISTINCT * -- Fame Edit
                             --(SELECT DISTINCT Workstream, [Percent], Id, InitiativeId
                               FROM            dbo.ShareBenefitWorkstreams) AS sh ON sh.InitiativeId = tr.InitiativeId LEFT OUTER JOIN
                         dbo.TypeOfBenefits AS tb ON tb.TypeOfBenefitCode = be.TypeOfBenefit LEFT OUTER JOIN
                             (SELECT DISTINCT WorkStreamTitle, SubWorkstream1
                               FROM            dbo.SubWorkstreams) AS sub ON sh.Workstream = sub.SubWorkstream1
WHERE        
(ISNULL(be.ImpactTypeOfBenefitTable, N'') <> 'ImpiemantCost') 
AND (ini.Stage <> 'Cancelled') 
AND (tr.FirstRunRateMonth > '1970-01-01') 
AND (ISNULL(ini.Max, 0) = 1)
AND ISNULL(be.ImpactTypeOfBenefitTable, '') <> 'IndirectBenefit'

AND ISNULL(be.ImpactTypeOfBenefitTable, '') <> 'FirstRunRateTotal' -- Fame Edit
AND ISNULL(be.ImpactTypeOfBenefitTable, '') <> 'TypeBenefitTotal' -- Fame Edit

GROUP BY ISNULL(be.ImpactTypeOfBenefitTable, N''), ISNULL(tb.TypeOfBenefitGroup, N''),
--ISNULL(tb.TypeOfBenefitTitle, N''), 
ISNULL(be.VersionPrice, N''), ISNULL(sh.Workstream, N''), ISNULL(sh.[Percent], 100), sh.Id, ISNULL(ini.Name, N''), ISNULL(ini.Stage, N''), 
                         ISNULL(tr.FinancialImpactArea, N''), ISNULL(de.Workstream, N''), ISNULL(de.SubWorkstream1, N''), ISNULL(tr.havesharebenefit, 0), CASE WHEN ISNULL(tr.havesharebenefit, 0) = 0 THEN Isnull(de.workstream, N'') ELSE Isnull(sub.workstreamtitle, '') 
                         END,ini.InitiativeCode,ini.Id
GO



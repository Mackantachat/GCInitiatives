/****** Object:  View [dbo].[v_CashIn_bak]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*ORDER BY InitiativeId, WorkStreamTitle, ImpactTypeOfBenefitTable, VersionPrice DESC
ORDER BY InitiativeId, WorkStreamTitle, ImpactTypeOfBenefitTable, TypeOfBenefitGroup, VersionPrice DESC
ORDER BY InitiativeId, WorkStreamTitle, ImpactTypeOfBenefitTable, TypeOfBenefitGroup, VersionPrice DESC*/
CREATE view [dbo].[v_CashIn_bak]
AS
SELECT DISTINCT 
                         TOP (100) PERCENT MAX(tr.InitiativeId) AS InitiativeId, ISNULL(ini.Name, N'') AS NAME, ISNULL(ini.Stage, N'') AS Stage, ISNULL(tr.FinancialImpactArea, N'') AS FinancialImpactArea, 
                         CASE WHEN tr.havesharebenefit = 0 THEN 100 ELSE Isnull(sh.[percent], 100) END AS [Percent], CASE WHEN tr.HaveShareBenefit = 0 THEN Isnull(de.Workstream, N'') ELSE ISNULL(sub.WorkStreamTitle, '') 
                         END AS WorkStreamTitle, CASE WHEN tr.havesharebenefit = 0 THEN Isnull(de.subworkstream1, N'') ELSE Isnull(sh.workstream, N'') END AS SubWorkstream, CASE WHEN tr.havesharebenefit = 0 THEN MAX(tr.il5runraterecurring)
                          ELSE MAX(tr.il5runraterecurring) * (Isnull(sh.[percent], 100) / 100) END AS IL5RunRateRecurring, CASE WHEN tr.havesharebenefit = 0 THEN MAX(tr.il5runrateonetime) ELSE MAX(tr.il5runrateonetime) * (Isnull(sh.[percent], 100) 
                         / 100) END AS IL5RunRateOnetime, CASE WHEN tr.havesharebenefit = 0 THEN MAX(tr.il4runraterecurring) ELSE MAX(tr.il4runraterecurring) * (Isnull(sh.[percent], 100) / 100) END AS IL4RunRateRecurring, 
                         CASE WHEN tr.havesharebenefit = 0 THEN MAX(tr.il4runrateonetime) ELSE MAX(tr.il4runrateonetime) * (Isnull(sh.[percent], 100) / 100) END AS IL4RunRateOnetime, MAX(tr.FirstRunRateMonth) AS FirstRunRateMonth, 
                         MAX(CONVERT(VARCHAR(10), tr.FirstRunRateMonth, 120)) AS month_Year, ISNULL(be.ImpactTypeOfBenefitTable, N'') AS ImpactTypeOfBenefitTable, ISNULL(tb.TypeOfBenefitGroup, N'') AS TypeOfBenefitGroup, 
                         ISNULL(be.VersionPrice, N'') AS VersionPrice, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.runrate, 0) ELSE Isnull(be.runrate, 0) * (Isnull(sh.[percent], 100) / 100) END) AS RunRateSum, 
                         SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month1, 0) ELSE Isnull(be.month1, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month1, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month2, 0) 
                         ELSE Isnull(be.month2, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month2, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month3, 0) ELSE Isnull(be.month3, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month3, 
                         SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month4, 0) ELSE Isnull(be.month4, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month4, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month5, 0) 
                         ELSE Isnull(be.month5, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month5, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month6, 0) ELSE Isnull(be.month6, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month6, 
                         SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month7, 0) ELSE Isnull(be.month7, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month7, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month8, 0) 
                         ELSE Isnull(be.month8, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month8, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month9, 0) ELSE Isnull(be.month9, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month9, 
                         SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month10, 0) ELSE Isnull(be.month10, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month10, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month11, 0) 
                         ELSE Isnull(be.month11, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month11, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month12, 0) ELSE Isnull(be.month12, 0) * (Isnull(sh.[percent], 100) / 100) END) 
                         AS Month12, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month13, 0) ELSE Isnull(be.month13, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month13, 
                         SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month14, 0) ELSE Isnull(be.month14, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month14, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month15, 0) 
                         ELSE Isnull(be.month15, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month15, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month16, 0) ELSE Isnull(be.month16, 0) * (Isnull(sh.[percent], 100) / 100) END) 
                         AS Month16, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month17, 0) ELSE Isnull(be.month17, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month17, 
                         SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month18, 0) ELSE Isnull(be.month18, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month18, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month19, 0) 
                         ELSE Isnull(be.month19, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month19, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month20, 0) ELSE Isnull(be.month20, 0) * (Isnull(sh.[percent], 100) / 100) END) 
                         AS Month20, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month21, 0) ELSE Isnull(be.month21, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month21, 
                         SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month22, 0) ELSE Isnull(be.month22, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month22, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month23, 0) 
                         ELSE Isnull(be.month23, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month23, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month24, 0) ELSE Isnull(be.month24, 0) * (Isnull(sh.[percent], 100) / 100) END) 
                         AS Month24, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month25, 0) ELSE Isnull(be.month25, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month25, 
                         SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month26, 0) ELSE Isnull(be.month26, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month26, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month27, 0) 
                         ELSE Isnull(be.month27, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month27, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month28, 0) ELSE Isnull(be.month28, 0) * (Isnull(sh.[percent], 100) / 100) END) 
                         AS Month28, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month29, 0) ELSE Isnull(be.month29, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month29, 
                         SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month30, 0) ELSE Isnull(be.month30, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month30, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month31, 0) 
                         ELSE Isnull(be.month31, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month31, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month32, 0) ELSE Isnull(be.month32, 0) * (Isnull(sh.[percent], 100) / 100) END) 
                         AS Month32, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month33, 0) ELSE Isnull(be.month33, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month33, 
                         SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month34, 0) ELSE Isnull(be.month34, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month34, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month35, 0) 
                         ELSE Isnull(be.month35, 0) * (Isnull(sh.[percent], 100) / 100) END) AS Month35, SUM(CASE WHEN tr.havesharebenefit = 0 THEN Isnull(be.month36, 0) ELSE Isnull(be.month36, 0) * (Isnull(sh.[percent], 100) / 100) END) 
                         AS Month36
FROM            dbo.ImpactTrackings AS tr INNER JOIN
                         dbo.ImpactTypeOfBenefits AS be ON be.InitiativeId = tr.InitiativeId LEFT OUTER JOIN
                         dbo.v_Initiatives AS ini ON tr.InitiativeId = ini.Id LEFT OUTER JOIN
                         dbo.DetailInformations AS de ON tr.InitiativeId = de.InitiativeId LEFT OUTER JOIN
                             (SELECT DISTINCT Workstream, [Percent], InitiativeId
                               FROM            dbo.ShareBenefitWorkstreams) AS sh ON sh.InitiativeId = tr.InitiativeId LEFT OUTER JOIN
                         dbo.TypeOfBenefits AS tb ON tb.TypeOfBenefitCode = be.TypeOfBenefit LEFT OUTER JOIN
                             (SELECT DISTINCT WorkStreamTitle, SubWorkstream1
                               FROM            dbo.SubWorkstreams) AS sub ON sh.Workstream = sub.SubWorkstream1
WHERE        (ISNULL(be.ImpactTypeOfBenefitTable, N'') <> 'ImpiemantCost')
GROUP BY ISNULL(be.ImpactTypeOfBenefitTable, N''), ISNULL(tb.TypeOfBenefitGroup, N''), ISNULL(be.VersionPrice, N''), ISNULL(sh.Workstream, N''), ISNULL(sh.[Percent], 100), ISNULL(ini.Name, N''), ISNULL(ini.Stage, N''), 
                         ISNULL(tr.FinancialImpactArea, N''), ISNULL(de.Workstream, N''), ISNULL(de.SubWorkstream1, N''), tr.HaveShareBenefit, CASE WHEN tr.HaveShareBenefit = 0 THEN Isnull(de.Workstream, N'') 
                         ELSE ISNULL(sub.WorkStreamTitle, '') END
GO

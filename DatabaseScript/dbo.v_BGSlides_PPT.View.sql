/****** Object:  View [dbo].[v_BGSlides_PPT]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[v_BGSlides_PPT] AS SELECT DISTINCT ini.initiativecode AS InitiativeNo, 
       ini.typeofinvestment                                  AS F1, 
       own.DepShortTextEN                                   AS F2, 
       ini.organization                             AS F3, 
       ini.NAME                                              AS F4, 
       ini.background                                        AS F5, 
       ini.scopeofwork                                       AS F6, 
       det.basecase                                          AS F7, 
       Cast(Isnull(cap.projectcost, 0) AS VARCHAR(50))       AS F8, 
       Cast(Cast(Isnull(det.npvbasecase, 0) + (Isnull(det.npvbasecase, 0) * 
       Isnull(det.projectirrbasecase, 0) / 100 ) AS DECIMAL(20, 2)) AS VARCHAR(50) 
       ) AS F9,
       Cast(Isnull(det.npvbasecase, 0)  AS DECIMAL(20, 2)) AS F9_1,

       Cast(Isnull(det.projectirrbasecase, 0) AS VARCHAR(50)) AS F10, 
       
       Cast(Isnull(det.paybackbasecase, 0) AS VARCHAR(50))  AS F11, 
       Cast(Isnull(det.ebitdabasecase, 0) AS VARCHAR(50))  AS F12, 
       Isnull(det.keysuccessfactor, '')                    AS F13, 
        
       + CONVERT(VARCHAR(10), cap.startingdate, 103) 
       + ' - ' 
       + CONVERT(VARCHAR(10), cap.projecctcomrun, 103)       AS F14_F15, 
       Cast(Year(cap.ActionYear) AS VARCHAR(50))   AS F16_1, 
       Cast(Year(cap.ActionYear) + 1 AS VARCHAR(50))   AS F16_2, 
       Cast(Year(cap.ActionYear) + 2 AS VARCHAR(50))   AS F16_3, 
       Cast(Year(cap.ActionYear) + 3 AS VARCHAR(50))   AS F16_4, 
       Cast(Year(cap.ActionYear) + 4 AS VARCHAR(50))   AS F16_5, 
       'After ' 
       + Cast(Year(cap.ActionYear) + 4 AS VARCHAR(50)) AS F16_6, 
       Cast(Isnull(an.year1, 0) AS VARCHAR(50))              AS F17_1, 
       Cast(Isnull(an.year2, 0) AS VARCHAR(50))              AS F17_2, 
       Cast(Isnull(an.year3, 0) AS VARCHAR(50))              AS F17_3, 
       Cast(Isnull(an.year4, 0) AS VARCHAR(50))              AS F17_4, 
       Cast(Isnull(an.year5, 0) AS VARCHAR(50))              AS F17_5, 
       Cast(Isnull(an.year6, 0) + Isnull(an.year7, 0) 
            + Isnull(an.year8, 0) + Isnull(an.year9, 0) 
            + Isnull(an.year10, 0) AS VARCHAR(50))           AS F17_6, 
       ini.initiativecode                                    AS F20, 
       ''                                                    AS F21 ,
       ISNULL(ini.JFactor, 0)                                           AS F22,
       ini.TypeOfInvestment AS TypeOfInvestment,
       ini.Company AS Company,
       cap.BudgetYear AS BudgetYear,
       ini.Status AS Status
FROM   dbo.v_Initiatives AS ini 
        LEFT JOIN Owners own ON own.OwnerName = ini.OwnerName
       LEFT OUTER JOIN dbo.detailinformations AS det 
                    ON ini.id = det.initiativeid 
       INNER JOIN dbo.capexinformations AS cap 
                    ON ini.id = cap.initiativeid AND cap.Sequent = (SELECT MAX(Sequent) FROM CapexInformations WHERE InitiativeId = ini.Id)
       LEFT OUTER JOIN dbo.AnnualInvestmentPlans AS an 
                    ON cap.CapexInformationId = an.CapexInformationId
GO

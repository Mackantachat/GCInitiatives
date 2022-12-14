/****** Object:  View [dbo].[v_ApproverDashboard]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO













CREATE view [dbo].[v_ApproverDashboard]
AS
SELECT        
(ini.Id) AS InitiativeIdParam,
MAX(ini.InitiativeCode) AS [ Id],
MAX([Name]) AS [ Name],
MAX(det.SubWorkstream1) AS [ SubWorkstream1],
MAX(ini.Stage) AS [ Stage],

-- Nok เพิ่ม Isnull 2020-09-03
MAX(isnull(TotalRecurring,0)) AS [ Recurring Benefit (MTHB)],
MAX(isnull(TotalOnetime,0)) AS [ One-Time Benefit (MTHB)],
--
ISNULL(MAX(CostEstCapex), 0) + ISNULL(MAX(CostEstOpex), 0) AS [ CAPEX + OPEX], 

-- Nok เพิ่ม Isnull 2020-09-03
MAX(isnull(PayBackPeriod,0)) AS [ Simple Payback],
--
DATEDIFF( DAY , MAX(ini.LastSubmittedDate) , GETDATE() )   AS [ Days In Current Stage],




----------- นำออก 24/3/2021 แม็ก
--ISNULL(MAX(IL4RunRateOnetime), 0)    AS [IL4 Total One-Time Benefit (MTHB)],
--ISNULL(MAX(IL4RunRateRecurring), 0)  AS [IL4 Total Recurring Benefit (MTHB)],
--ISNULL(MAX(IL5RunRateOnetime), 0)    AS [IL5 Total One-Time Benefit (MTHB)],
--ISNULL(MAX(IL5RunRateRecurring), 0)  AS [IL5 Total Recurring Benefit (MTHB)],
--MAX(c.ApproverEmail) AS [Pending CFO Approvers],

------------ นำออก 26/4/2021 แม็ก
--case 
--when ini.Stage like 'SIL4%' then MAX(c.ApproverEmail) 
--when ini.Stage like 'SIL5%' then MAX(h.ApproverEmail) 
--ELSE ''
--end AS [Pending CFO Approvers], -- นำเข้ามาแก้ไข Approver Email ซ้ำ 
--MAX(b.ApproverEmail) AS [Pending Finance Approvers],
--MAX(a.ApproverEmail) AS [Pending Sponsor Approvers],
--MAX(e.ApproverEmail) AS [Pending Workstream Lead Approvers],
--MAX(d.ApproverEmail) AS [Pending CTO Approvers],
--MAX(f.ApproverEmail) AS [Pending TO Team Approvers],
--MAX(g.ApproverEmail) AS [Pending TF-BT-TO Approvers],
--STRING_AGG(tofinan.ApproverEmail, ',') AS [ TO Finance],

-- แม็กปรับแก้ Logic ตามคุณนกดังนี้
--SIL1 : TOTeam , WorkstreamLeader
--SIL2 : TF-BT-TO , WorkstreamLeader , TOFinance
--SIL3 : CTO , Sponsor , Pending Finance Approvers
--SIL4 : CTO , Sponsor , CFO
--SIL5 : CTO , Sponsor , CFO
---------------------------------------------------------- แม็กแก้ 26/4/2021



--- SIL1 : TOTeam , WorkstreamLeader
case 
	when ini.stage in ('SIL1') 
		then  
			MAX(f.ApproverEmail) 
		else '' 
end AS [Pending TO Team Approvers], 
case 
	when ini.stage in ('SIL1', 'SIL2')  
		then  
			MAX(e.ApproverEmail) 
		else '' 
end AS [Pending Workstream Lead Approvers],
case 
	when ini.stage in ('SIL4', 'SIL5')  
		then case 
			when ini.Stage like 'SIL4%' then MAX(c.ApproverEmail) 
			when ini.Stage like 'SIL5%' then MAX(h.ApproverEmail) 
		else ''
		end
end AS [Pending CFO Approvers], 
case 
	when ini.stage in ('SIL2','SIL3')  
		then  
			MAX(b.ApproverEmail) 
		else '' 
end AS [Pending Finance Approvers],
case 
	when ini.stage in ('SIL3', 'SIL4', 'SIL5')  
		then  
			MAX(a.ApproverEmail) 
		else '' 
end AS [Pending Sponsor Approvers],
case 
	when ini.stage in ('SIL3', 'SIL4', 'SIL5')  
		then  
			MAX(d.ApproverEmail) 
		else '' 
end AS [Pending CTO Approvers],
case 
	when ini.stage in ('SIL2')  
		then  
			MAX(g.ApproverEmail) 
		else '' 
end AS [Pending TF-BT-TO Approvers],

STRING_AGG(tofinan.ApproverEmail, ',')  AS [ TO Finance]






FROM            v_Initiatives ini 
LEFT JOIN DetailInformations det ON ini.Id = det.InitiativeId 
LEFT JOIN ImpactTrackings imt ON ini.Id = imt.InitiativeId 
--LEFT JOIN  (SELECT        CASE WHEN imtb1.RunRate IS NOT NULL THEN imtb1.VersionPrice ELSE imtb2.VersionPrice END AS VersionPrice, CASE WHEN imtb1.RunRate IS NOT NULL 
--                                                         THEN imtb1.RunRate ELSE imtb2.RunRate END AS RunRate, imtb1.InitiativeId
--                               FROM            ImpactTypeOfBenefits imtb1 LEFT JOIN
--                                                         ImpactTypeOfBenefits imtb2 ON imtb1.InitiativeId = imtb2.InitiativeId AND imtb2.VersionPrice = 'Estimate cost'
--                               WHERE        imtb1.ImpactTypeOfBenefitTable = 'ImpiemantCost' AND imtb1.VersionPrice = 'Actual') impCost ON ini.Id = impCost.InitiativeId 
     LEFT JOIN (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId1
          FROM            InitiativeActions a1
          INNER JOIN MaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'Sponsor'
          WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM [dbo].[InitiativeActions]
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
          GROUP BY a1.InitiativeId) a ON a.InitiativeId1 = ini.id
      
      
      LEFT JOIN  (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId2
                    FROM            InitiativeActions a1
                    INNER JOIN MaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'TO Finance'
                    WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM [dbo].[InitiativeActions]
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                    GROUP BY a1.InitiativeId) b ON ini.id = b.InitiativeId2

		-- Nok Comment แก้ไขจาก CFO to TOFInanceIL4,TOFInanceIL5 2020-09-11
       --LEFT JOIN (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId3
       --          FROM            InitiativeActions a1
       --          INNER JOIN MaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'CFO'
       --          WHERE        a1.Stage LIKE 'SIL%'
       --          GROUP BY a1.InitiativeId) c ON ini.id = c.InitiativeId3
	   -- ตัวเก่า Dupplcate Email แม็กเอาออก
	     --LEFT JOIN (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId3
      --           FROM            InitiativeActions a1
      --           INNER JOIN MaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType in ('TOFinanceIL5','TOFinanceIL4')
      --           WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			   --                                 FROM [dbo].[InitiativeActions]
			   --                                 WHERE InitiativeId = a1.InitiativeId
			   --                                 AND ActionResult IS NULL
      --                                          AND ISNULL(IsInactive, 'false') = 'false'
      --                                          ORDER BY ID DESC
      --                                      )
      --           GROUP BY a1.InitiativeId) c ON ini.id = c.InitiativeId3

	  LEFT JOIN (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId3
                 FROM            InitiativeActions a1
                 INNER JOIN MaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'TOFinanceIL4'
                 WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM [dbo].[InitiativeActions]
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                 GROUP BY a1.InitiativeId) c ON ini.id = c.InitiativeId3

      --

     LEFT JOIN    (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId4
                     FROM            InitiativeActions a1
                     INNER JOIN MaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'CTO'
                     WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM [dbo].[InitiativeActions]
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                     GROUP BY a1.InitiativeId) d 
                     ON ini.id = d.InitiativeId4

     LEFT JOIN    (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId5
                     FROM            InitiativeActions a1
                     INNER JOIN MaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'WorkstreamLead'
                     WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM [dbo].[InitiativeActions]
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                     GROUP BY a1.InitiativeId) e 
                     ON ini.id = e.InitiativeId5
     LEFT JOIN    (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId6
                     FROM            InitiativeActions a1
                     INNER JOIN MaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'TOTeam'
                     WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM [dbo].[InitiativeActions]
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                     GROUP BY a1.InitiativeId) f 
                     ON ini.id = f.InitiativeId6
     LEFT JOIN    (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId7
                     FROM            InitiativeActions a1
                     INNER JOIN MaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'TF-BT-TO'
                     WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM [dbo].[InitiativeActions]
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                     GROUP BY a1.InitiativeId) g 
                     ON ini.id = g.InitiativeId7 
					 --

					 	LEFT JOIN (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId8
                 FROM            InitiativeActions a1
                 INNER JOIN MaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'TOFinanceIL5'
                 WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM [dbo].[InitiativeActions]
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                 GROUP BY a1.InitiativeId) h ON ini.id = h.InitiativeId8

					 --
LEFT JOIN MaxApprovers tofinan ON tofinan.InitiativeId = ini.Id AND tofinan.ApproverType = 'TO Finance'
WHERE        ini.Stage LIKE 'SIL%'
GROUP BY ini.Id,Stage
GO

/****** Object:  View [dbo].[v_CustomExcel1]    Script Date: 9/23/2021 10:54:24 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



















CREATE view [dbo].[v_CustomExcel1]
AS


WITH
ownerTable AS (
SELECT MAX(OwnerName) AS OwnerName, EmployeeID, MAX(DivManagerEmpID) AS DivManagerEmpID, MAX(DepManagerEmpID) AS DepManagerEmpID, MAX(Email) AS Email FROM Owners GROUP BY EmployeeID
),
countImpact AS (
SELECT COUNT(*) AS cnt, InitiativeId FROM ImpactTypeOfBenefits WHERE ImpactTypeOfBenefitTable = 'FirstRunRate' AND RunRate IS NOT NULL GROUP BY InitiativeId
),
tmpMaxApprovers AS (
SELECT * FROM MaxApprovers
),
tmpInitiativeActions AS(
SELECT * FROM InitiativeActions
)


SELECT DISTINCT
-- change ID to Running No by Nok 14-Aug-20
       (ini.id) AS id, 
       MAX(ini.initiativecode)               AS [Initiative ID], 


       MAX(ini.initiativecode) + '-' + CONVERT(NVARCHAR(4), Dense_rank() OVER ( 
       partition BY 
       (ini.id) 
       
       ORDER BY 
       --MAX(sh.Id)  -- sub id ตาม share benefit workstream ที่เลือก ตามลำดับ 
       CASE WHEN MAX(de.SubWorkstream1) = MAX(sh.workstream) THEN 1 ELSE 2 END
       ,MAX(ini.initiativecode),
       CASE WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 
       THEN 
       Isnull(MAX(de.workstream), N'') ELSE Isnull(MAX(sub.workstreamtitle), '') END,
       
       CASE 
       WHEN 
       ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN Isnull(MAX(de.subworkstream1), N'') ELSE 
       Isnull(MAX(sh.workstream) , N'') END)) [Sub-initiative ID], 


       MAX(ini.NAME)                         AS [Initiative Name], 
	    
       case 
	when ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = '1' then 'Yes'
else 'No' end as [Share Benefit],
       MAX(ini.year                           ) AS   [Strategic Year]                       ,
       MAX(ini.ownername                      ) AS   [Owner Name]                  ,
	   -- Increase Email
	   max(own.email)                           as   [Owner Name Email],
	   max(own2.email)                      as   [DM Email],
	   max(own3.email)                      as   [VP Email],
	   -- Increase Email

       MAX(ini.plant                          ) AS   plant                      ,
       MAX(ini.location                       ) AS   location                   ,
       MAX(ini.specifylocation                ) AS   specifylocation            ,
       MAX(ini.registeringdate                ) AS   registeringdate            ,
       MAX(ini.finishingdate                  ) AS   finishingdate              ,
       MAX(ini.scopeofwork                    ) AS   [Scope of Work]                ,
       MAX(ini.resultobjective                ) AS   resultobjective            ,
       MAX(ini.remark                         ) AS   remark                     ,
	   -- แก้จาก initiativetype เป็น Process
       MAX(ini.initiativetype                 ) AS   Process                    ,
       MAX(ini.requestcapex                   ) AS   requestcapex               ,
       MAX(ini.costestcapex                   ) AS   costestcapex               ,
       MAX(ini.costestcapextype               ) AS   costestcapextype           ,
       MAX(ini.typeofinvestment               ) AS   typeofinvestment           ,
       MAX(ini.budgettype                     ) AS   budgettype                 ,
       MAX(ini.ram                            ) AS   ram                        ,
       MAX(ini.jfactor                        ) AS   jfactor                    ,
       MAX(ini.typebenefit                    ) AS   typebenefit                ,
       MAX(ini.benefitamount                  ) AS   benefitamount              ,
       MAX(ini.benefitamounttype              ) AS   benefitamounttype          ,
       MAX(ini.paybackperiod                  ) AS   paybackperiod              ,
       MAX(ini.irr                            ) AS   irr                        ,
       MAX(ini.fxexchange                     ) AS   fxexchange                 ,
       MAX(CAST(ini.cim          AS INT )                  ) AS   cim                        ,
       MAX(CAST(ini.pim          AS INT )                  ) AS   pim                        ,
       MAX(CAST(ini.dim          AS INT )                  ) AS   dim                        ,
       MAX(CAST(ini.max          AS INT )                  ) AS   max                        ,
       MAX(CAST(ini.directcapex  AS INT )                  ) AS   directcapex                ,
       MAX(CAST(ini.cpi          AS INT )                  ) AS   cpi                        ,
       --MAX(CAST(ini.strategy     AS INT )                  ) AS   strategy                   ,
       MAX(CAST(ini.randd        AS INT )                  ) AS   randd                      ,
       MAX(CAST(ini.other        AS INT )                  ) AS   other                      ,
       MAX(ini.approveddate                   ) AS   approveddate               ,
       MAX(ini.createddate                    ) AS   [Created date]                ,
       MAX(ini.createdby                      ) AS   [Created by]                  ,
       MAX(ini.updateddate                    ) AS   [Updated date]                ,
       MAX(ini.updatedby                      ) AS   [Updated by]                  ,
       MAX(ini.lastactivity                   ) AS   lastactivity               ,
       MAX(CAST(ini.deletedflag AS INT)                    ) AS   deletedflag                ,
       MAX(ini.status                         ) AS   status                     ,
       MAX(ini.startingdate                   ) AS   startingdate               ,
       MAX(ini.wacc                           ) AS   wacc                       ,
       
	  
	   --MAX(ini.stage                          ) AS   Stage                      ,
	   Case 
	   when MAX(ini.stage) in  ('Gate0 : VAC Gate1','Gate0 : Sub-PIC Gate1','Gate2 : VAC Gate3','IL3-2','IL3-1') and max(ini.InitiativeType) = 'max' then 'IL3'
	   else MAX(ini.stage)  end as Stage  ,

       MAX(ini.background                     ) AS   Background                 ,
       MAX(ini.budgetsource                   ) AS   Budgetsource               ,
       MAX(ini.company                        ) AS   Company                    ,
       MAX(ini.costestopex                    ) AS   Costestopex                ,
       MAX(CAST(ini.integration AS INT)                    ) AS   integration                ,
       MAX(CAST(ini.involveitdigital AS INT)              ) AS   involveitdigital           ,
       MAX(ini.organization                   ) AS   Organization               ,
       MAX(ini.requestopex                    ) AS   requestopex                ,
       MAX(CAST(ini.requestprojectengineer AS INT)         ) AS   requestprojectengineer     ,
       MAX(ini.specifycompany                 ) AS   specifycompany             ,
       MAX(ini.specifyplant                   ) AS   specifyplant               ,
       --MAX(CAST(ini.trackmax AS INT)                       ) AS   trackmax                   ,
       MAX(ini.costestopextype                ) AS   costestopextype            ,
       --MAX(im.id)                AS InitiativeIdParam     ,      
       MAX(im.financialimpactarea)  [Financial Impact Area],
       /*MAX(im.il5runrateonetime), */ 
       MAX(im.firstrunratemonth )  firstrunratemonth    ,

	   --Nok 12 jul
       --MAX(CAST(im.autocalculate AS INT)     )  autocalculate        ,
       --MAX(CAST(im.impiemantcost AS INT)     )  impiemantcost        ,
       --MAX(im.remark1           )  remark1              ,
       --MAX(im.remark2           )  remark2              ,
       --MAX(im.remark3           )  remark3              ,
       --MAX(im.remark4           )  remark4              ,
       --MAX(im.remark5           )  remark5              ,
       MAX(im.explanation       )  Explanation          ,
       MAX(im.tocomment         )  [To Comment]            ,
	   -- SIL4
	   max(im.SIL4Achievement) SIL4Achievement          ,

	-- SIL5
	   max(im.SIL5Achievement) SIL5Achievement          ,
       /*MAX(im.il5fixedfxrecurring), */ 
       --MAX(de.initiativeyear) AS initiativeyear        , 
       MAX(ini_de.FirstBudgetYear) AS FirstBudgetYear        , 
       MAX(straObj.StrategicObjectiveTitle) AS strategicObjective, 
       MAX(stragic.StrategyTitle)                      AS Strategy, 
       MAX(de.strategy)                      AS DetailStrategy, 
       MAX(de.initiativetypemax) AS [Initiative Type MAX], 
       CASE 
         WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN Isnull(MAX(de.subworkstream1), N'') 
         ELSE Isnull(MAX(sh.workstream) , N'') 
       END                              AS [Sub-Workstream 1], 
       CASE 
         WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN Isnull(MAX(de.workstream), N'') 
         ELSE Isnull(MAX(sub.workstreamtitle), '') 
       END                              AS Workstream, 
	   CONVERT(VARCHAR(10), MAX(de.IL0date), 120 ) AS [IL0 Date], 
       CONVERT(VARCHAR(10), MAX(de.il3date), 120 ) AS [Target IL3 Date], 
       CONVERT(VARCHAR(10), MAX(de.il4date), 120 ) AS [Target IL4 Date], 
       CONVERT(VARCHAR(10), MAX(de.il5date), 120 ) AS [Target IL5 Date], 
       --de.sponsorevp, 
       --MAX(de.workstream)lead, 
       --de.tofinance, 
       --de.cto, 
       --de.cfo, 

	   --Nok 12 jul
       --MAX(de.productionprocess                  ) AS productionprocess         ,
       --MAX(de.comparisonwithother                ) AS comparisonwithother       ,
       --MAX(de.otherinvestment                    ) AS otherinvestment           ,
       --MAX(de.keysuccessfactor                   ) AS keysuccessfactor          ,
       --MAX(de.synergybenefit                     ) AS synergybenefit            ,
       --MAX(de.otherstrategic                     ) AS otherstrategic            ,
       --MAX(de.marketoverview                     ) AS marketoverview            ,
       --MAX(de.potentialcustomer                  ) AS potentialcustomer         ,
       --MAX(de.salesplan                          ) AS salesplan                 ,
       --MAX(de.otherbusiness                      ) AS otherbusiness             ,
       --MAX(de.corporateimageindex                ) AS corporateimageindex       ,
       --MAX(de.otherquality                       ) AS otherquality              ,
       --MAX(de.basecase                           ) AS basecase                  ,
       --MAX(de.projectirrbasecase                 ) AS projectirrbasecase        ,
       --MAX(de.npvbasecase                        ) AS npvbasecase               ,
       --MAX(de.paybackbasecase                    ) AS paybackbasecase           ,
       --MAX(de.ebitdabasecase                     ) AS ebitdabasecase            ,
       --MAX(de.optimisticcase                     ) AS optimisticcase            ,
       --MAX(de.projectirroptimisticcase           ) AS projectirroptimisticcase  ,
       --MAX(de.npvoptimisticcase                  ) AS npvoptimisticcase         ,
       --MAX(de.paybackoptimisticcase              ) AS paybackoptimisticcase     ,
       --MAX(de.ebitdaoptimisticcase               ) AS ebitdaoptimisticcase      ,
       --MAX(de.pessimisticcase                    ) AS pessimisticcase           ,
       --MAX(de.projectirrpessimisticcase          ) AS projectirrpessimisticcase ,
       --MAX(de.npvpessimisticcase                 ) AS npvpessimisticcase        ,
       --MAX(de.paybackpessimisticcase             ) AS paybackpessimisticcase    ,
       --MAX(de.ebitdapessimisticcase              ) AS ebitdapessimisticcase     ,
       --MAX(de.depreciationcost                   ) AS depreciationcost          ,
	   --MAX(de.safetyindex             ) AS safetyindex           ,

       MAX(de.remark)                        AS DetailRemark, 
       --de.id                            AS Expr5, 
       
       MAX(de.procategory             ) AS [Pro Category]           ,
       MAX(de.prolever                ) AS [Pro Lever]              ,
       MAX(de.prosubcategory          ) AS [Pro Sub-Category]        ,


       CASE WHEN CONVERT(NVARCHAR(4), Dense_rank() OVER ( 
       partition BY 
       (ini.id) 
       
       ORDER BY 
       --MAX(sh.Id)  -- sub id ตาม share benefit workstream ที่เลือก ตามลำดับ 
       CASE WHEN MAX(de.SubWorkstream1) = MAX(sh.workstream) THEN 1 ELSE 2 END
       ,MAX(ini.initiativecode),
       CASE WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 
       THEN 
       Isnull(MAX(de.workstream), N'') ELSE Isnull(MAX(sub.workstreamtitle), '') END,
       
       CASE 
       WHEN 
       ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN Isnull(MAX(de.subworkstream1), N'') ELSE 
       Isnull(MAX(sh.workstream) , N'') END)) > 1 THEN ''
       
       ELSE  MAX(de.subworkstream2          )
       END
       AS [Sub-Workstream 2]        ,



       MAX(de.baseline                ) AS Baseline              ,
       MAX(de.baselinehistorical      ) AS Baselinehistorical    ,
       MAX(de.baselinenonhistorical   ) AS Baselinenonhistorical ,
       MAX(de.saving                  ) AS Saving                ,
       MAX(de.savinghistorical        ) AS Savinghistorical      ,
       MAX(de.savingnonhistorical     ) AS Savingnonhistorical   ,

	   --Nok 12 jul
       --MAX(de.boi                     ) AS boi                   ,
       --MAX(de.boino                   ) AS boino                 ,
	   --MAX(CAST(de.capital AS INT)                 ) AS capital               ,
       --MAX(CAST(de.catalyst   AS INT)              ) AS catalyst              ,
       --MAX(de.coordinate              ) AS coordinate            ,
       --MAX(de.cutfeeddate             ) AS cutfeeddate           ,
       --MAX(de.equipmentname           ) AS equipmentname         ,
       --MAX(de.equipmentorasset        ) AS equipmentorasset      ,
       --MAX(de.expectedtarget          ) AS expectedtarget        ,
       --MAX(de.forenvironment          ) AS forenvironment        ,
       --MAX(de.forturnaround           ) AS forturnaround         ,
       --MAX(de.manager                 ) AS manager               ,
       --MAX(de.milestoneschedule       ) AS milestoneschedule     ,
       --MAX(de.oldassetcondition       ) AS oldassetcondition     ,
       --MAX(de.oldassetno              ) AS oldassetno            ,
       --MAX(de.parties                 ) AS parties               ,
       --MAX(de.president               ) AS president             ,
       --MAX(de.projectmanager          ) AS projectmanager        ,
       --MAX(de.replaceequipment        ) AS replaceequipment      ,
       --MAX(de.replacementdate         ) AS replacementdate       ,
       --MAX(CAST(de.rightofuse  AS INT )            ) AS rightofuse            ,
       --MAX(CAST(de.software AS INT)               ) AS software              ,
       --MAX(de.sourceoffeedback        ) AS sourceoffeedback      ,
       --MAX(de.startupdate             ) AS startupdate           ,
       --MAX(de.otherresources          ) AS otherresources        ,

       /*+ ISNULL( MAX(im.il4runraterecurring), 0 )             AS IL4Blended, */ 
		--CASE 
		--when max(ini.stage) in  ('Gate0 : VAC Gate1','Gate0 : Sub-PIC Gate1','Gate2 : VAC Gate3','IL3-2','IL3-1') then 0
  --       WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN ISNULL(MAX(im.il4runrateonetime), 0)  
  --                                         + ISNULL( MAX(im.il4runraterecurring), 0 )  
  --       ELSE ( ISNULL(MAX(im.il4runrateonetime), 0)  
  --              + ISNULL( MAX(im.il4runraterecurring), 0 )  ) * ( Isnull(sh.[percent], 100) / 100 ) 
  --     END                              AS [IL4 RR Blended], --IL4Blended, 

	   CASE
		When max(ini.stage) in  ('SIL4','IL4','SIL5','IL5') then ISNULL(MAX(sh.IL4RRBlended), 0)
		ELSE 0
	   END AS [IL4 RR Blended], -- Fame Edit

    --   CASE 
	   --when max(ini.stage) = 'IL4' then 0
    --     WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN ISNULL( MAX(im.il5runrateonetime) , 0 )  
    --                                       + ISNULL( MAX(im.il5runraterecurring) , 0 )  
    --     ELSE ( ISNULL( MAX(im.il5runrateonetime) , 0 )  
    --            + ISNULL( MAX(im.il5runraterecurring) , 0 )  ) * ( Isnull(sh.[percent], 100) / 100 ) 
    --   END                              AS [IL5 RR Blended],--IL5Blended, 

	   CASE
		When max(ini.stage) in  ('SIL5','IL5') then ISNULL(MAX(sh.IL5RRBlended), 0)
		ELSE 0
	   END AS [IL5 RR Blended], -- Fame Edit

       --/*   ISNULL( MAX(im.il5fixedfxrecurring) , 0 ) ,*/ CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN ISNULL( MAX(im.il5fixedfxonetime) , 0 )  
       --  ELSE ISNULL( MAX(im.il5fixedfxonetime) , 0 )  * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5FixedFXOnetime, 

	   CASE
		When max(ini.stage) in  ('SIL5','IL5') then ISNULL(MAX(sh.IL5FixedFXOnetime), 0)
		ELSE 0
	   END AS [IL5FixedFXOnetime], -- Fame Edit

       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN ISNULL( MAX(im.il5fixedfxrecurring) , 0 )  
       --  ELSE ISNULL( MAX(im.il5fixedfxrecurring) , 0 )  * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5FixedFxRecurring, 

	   CASE
		When max(ini.stage) in  ('SIL5','IL5') then ISNULL(MAX(sh.IL5FixedFxRecurring), 0) 
		ELSE 0
	   END AS [IL5FixedFxRecurring], -- Fame Edit

       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN ISNULL( MAX(im.il5floatfxonetime) , 0 )  
       --  ELSE ISNULL( MAX(im.il5floatfxonetime) , 0 )  * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5FloatFxOnetime, 

	   CASE
		When max(ini.stage) in  ('SIL5','IL5') then ISNULL(MAX(sh.IL5FloatFxOnetime), 0) 
		ELSE 0
	   END AS [IL5FloatFxOnetime], -- Fame Edit

       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN ISNULL( MAX(im.il5floatfxrecurring)  , 0 )  
       --  ELSE ISNULL( MAX(im.il5floatfxrecurring)  , 0 )  * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5FloatFxRecurring, 

	   CASE
		When max(ini.stage) in  ('SIL5','IL5') then ISNULL(MAX(sh.IL5FloatFxRecurring), 0) 
		ELSE 0
	   END AS [IL5FloatFxRecurring], -- Fame Edit

    --   CASE 
	   --when max(ini.stage) in  ('Gate0 : VAC Gate1','Gate0 : Sub-PIC Gate1','Gate2 : VAC Gate3','IL3-2','IL3-1') then 0
    --     WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN (ISNULL(MAX(im.il4runrateonetime)*10, 0)  )
    --     ELSE (ISNULL(MAX(im.il4runrateonetime)*10, 0) )  * ( Isnull(sh.[percent], 100) / 100 ) 
    --   END                              AS [IL4 RR OneTime], 

	   CASE
		When max(ini.stage) in  ('SIL4','IL4','SIL5','IL5') then ISNULL(MAX(sh.IL4RROneTime), 0) 
		ELSE 0
	   END AS [IL4 RR OneTime], -- Fame Edit

    --   CASE 
	   --when max(ini.stage) in  ('Gate0 : VAC Gate1','Gate0 : Sub-PIC Gate1','Gate2 : VAC Gate3','IL3-2','IL3-1') then 0
    --     WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN ISNULL( MAX(im.il4runraterecurring), 0 )  
    --     ELSE ISNULL( MAX(im.il4runraterecurring), 0 )  * ( Isnull(sh.[percent], 100) / 100 ) 
    --   END                              AS [IL4 RR Recurring], 

	   CASE
		When max(ini.stage) in  ('SIL4','IL4','SIL5','IL5') then ISNULL(MAX(sh.IL4RRRecurring), 0) 
		ELSE 0
	   END AS [IL4 RR Recurring], -- Fame Edit

    --   CASE 
	   --when max(ini.stage) = 'IL4' then 0
    --     WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN ISNULL( MAX(im.il5runraterecurring) , 0 )  
    --     ELSE ISNULL( MAX(im.il5runraterecurring) , 0 )  * ( Isnull(sh.[percent], 100) / 100 ) 
    --   END                              AS --IL5RunRateRecurring, 
	   --[IL5 RR Recurring],

	   CASE
		When max(ini.stage) in  ('SIL5','IL5') then ISNULL(MAX(sh.IL5RRRecurring), 0) 
		ELSE 0
	   END AS [IL5 RR Recurring], -- Fame Edit

    --   CASE 
	   --when max(ini.stage) = 'IL4' then 0
    --     WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN (ISNULL( MAX(im.il5runrateonetime)*10 , 0 ) )  
    --     ELSE (ISNULL( MAX(im.il5runrateonetime)*10 , 0 ) )  * ( Isnull(sh.[percent], 100) / 100 ) 
    --   END                              AS [IL5 RR OneTime], 

	   CASE
		When max(ini.stage) in  ('SIL5','IL5') then ISNULL(MAX(sh.IL5RROneTime), 0) 
		ELSE 0
	   END AS [IL5 RR OneTime], -- Fame Edit

       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN (ISNULL( MAX(im.totalonetime)*10  , 0 )   )
       --  ELSE (ISNULL( MAX(im.totalonetime)*10  , 0 ))  * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS [Total One-time], 

	   ISNULL(MAX(sh.TotalRROnetime), 0) AS [Total One-time], -- Fame Edit

       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN ISNULL( MAX(im.totalrecurring)  , 0 )  
       --  ELSE ISNULL( MAX(im.totalrecurring)  , 0 )  * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS [Total Recurring], 

	   ISNULL(MAX(sh.TotalRRRecurring), 0) AS [Total Recurring], -- Fame Edit
       
       --CASE WHEN ISNULL(MAX(recordOfImpactBenefit.cnt), 0) = 0 THEN ISNULL(MAX(ini.BenefitAmount), 0)
       -- ELSE       
       --    CASE 
       --      WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN ISNULL( MAX(im.totalonetime)  , 0 )  + ISNULL( MAX(im.totalrecurring)  , 0 )  
       --      ELSE ( ISNULL( MAX(im.totalonetime)  , 0 )  + ISNULL( MAX(im.totalrecurring)  , 0 )  ) * ( 
       --           Isnull(sh.[percent], 100) / 100 ) 
       --    END  
       --END
       --AS [Total Blended], 

	   ISNULL(MAX(sh.TotalRRBlended), 0) AS [Total Blended], -- Fame Edit

       /*ISNULL( MAX(im.totalonetime)  , 0 )  + ISNULL( MAX(im.totalrecurring)  , 0 )  AS TotalBlended, */ 
       --CASE 
       --  WHEN MAX(Impa.runrate) IS NOT NULL THEN MAX(Impa.runrate) 
       --  ELSE ISNULL( MAX(Impe.runrate)  , 0 )  
       --END  
       --ISNULL(MAX(CostEstCapex), 0) * CASE WHEN ISNULL(MAX(CostEstCapexType), '') = 'USD' THEN MAX(FxExchange) ELSE 1 END  -- Multiply ExchangeRate if USD
       --+ ISNULL(MAX(CostEstOpex), 0) * CASE WHEN ISNULL(MAX(CostEstOpexType), '') = 'USD' THEN MAX(FxExchange) ELSE 1 END  -- Multiply ExchangeRate if USD
       --AS [One-time Implementation Cost] ,

	   ISNULL(MAX(sh.OnetimeImplementationCost), 0) AS [One-time Implementation Cost], -- Fame Edit

       --/*+ MAX(im.il4runraterecurring)            AS IL4Blended, */ CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.il4runrateonetime) 
       --                                    + MAX(im.il4runraterecurring) 
       --  ELSE ( MAX(im.il4runrateonetime) 
       --         + MAX(im.il4runraterecurring) ) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL4Blended, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.il5runrateonetime) 
       --                                    + MAX(im.il5runraterecurring) 
       --  ELSE ( MAX(im.il5runrateonetime) 
       --         + MAX(im.il5runraterecurring) ) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5Blended, 
       --/*   MAX(im.il5fixedfxrecurring),*/ CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.il5fixedfxonetime) 
       --  ELSE MAX(im.il5fixedfxonetime) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5FixedFXOnetime, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.il5fixedfxrecurring) 
       --  ELSE MAX(im.il5fixedfxrecurring) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5FixedFxRecurring, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.il5floatfxonetime) 
       --  ELSE MAX(im.il5floatfxonetime) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5FloatFxOnetime, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.il5floatfxrecurring) 
       --  ELSE MAX(im.il5floatfxrecurring) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5FloatFxRecurring, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.il4runrateonetime) 
       --  ELSE MAX(im.il4runrateonetime) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL4RunRateOneTime, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.il4runraterecurring) 
       --  ELSE MAX(im.il4runraterecurring) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL4RunRateRecurring, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.il5runraterecurring) 
       --  ELSE MAX(im.il5runraterecurring) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5RunRateRecurring, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.il5runrateonetime) 
       --  ELSE MAX(im.il5runrateonetime) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS IL5RunRateOnetime, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.totalonetime) 
       --  ELSE MAX(im.totalonetime) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS TotalOnetime, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.totalrecurring) 
       --  ELSE MAX(im.totalrecurring) * ( Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS TotalRecurring, 
       --CASE 
       --  WHEN ISNULL(MAX(CAST(im.havesharebenefit AS INT)), 0) = 0 THEN MAX(im.totalonetime) + MAX(im.totalrecurring) 
       --  ELSE ( MAX(im.totalonetime) + MAX(im.totalrecurring) ) * ( 
       --       Isnull(sh.[percent], 100) / 100 ) 
       --END                              AS TotalBlended, 
       --/*MAX(im.totalonetime) + MAX(im.totalrecurring) AS TotalBlended, */ CASE 
       --  WHEN MAX(Impa.runrate) IS NOT NULL THEN MAX(Impa.runrate) 
       --  ELSE MAX(Impe.runrate) 
       --END                              AS 'ImplementationCost' ,
	   MAX(im.FirstApprovedIL4Date) AS [1st Approved IL4 Date],
	   MAX(im.LastApprovedIL4Date) AS [Latest Approved IL4 Date],
	   MAX(im.LastApprovedIL5Date) AS [Latest Approved IL5 Date],
	   -- เพิ่ม APprover
	   --maxapprovers.Sponsor,
	   --maxapprovers.[TO Finance],
	   --maxapprovers.[Workstream Leader]
       STRING_AGG(sponsor.ApproverEmail, ',') AS [Sponsor],
	   STRING_AGG(tofinan.ApproverEmail, ',') AS [TO Finance],
	   STRING_AGG(workstreamlead.ApproverEmail, ',') AS [Workstream Leader],
       STRING_AGG(cto.ApproverEmail, ',') AS [CTO],   
       STRING_AGG(cfo.ApproverEmail, ',') AS [CFO],
       STRING_AGG(toteam.ApproverEmail, ',') AS [TO Team],
       STRING_AGG(tfbtto.ApproverEmail, ',') AS [TF-BT-TO],
        DATEDIFF( DAY , MAX(ini.LastSubmittedDate) , GETDATE() )   AS [Days In Current Stage],

        MAX(iniCo.CoDeveloperName) AS CoDeveloperNames,

		

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
		
		


        --MAX(c.ApproverEmail) AS [Pending CFO Approvers],
        --MAX(b.ApproverEmail) AS [Pending Finance Approvers],
        --MAX(a.ApproverEmail) AS [Pending Sponsor Approvers],
        --MAX(e.ApproverEmail) AS [Pending Workstream Lead Approvers],
        --MAX(d.ApproverEmail) AS [Pending CTO Approvers],
        --MAX(f.ApproverEmail) AS [Pending TO Team Approvers],
        --MAX(g.ApproverEmail) AS [Pending TF-BT-TO Approvers],
		-- เพิ่ม Software detail by NOk @ 2020-09-01
		STRING_AGG(itass.AssetName,';') AS [Software Name] ,count(itas.assetid) As [No. of Software],STRING_AGG(itas.othername ,';') as [Other Software] 
    --    sponsormax.ApproverEmails AS [Sponsor],
	   --tofinanmax.ApproverEmails AS [TO Finance],
	   --workstreamleadmax.ApproverEmails AS [Workstream Leader]
       
FROM   dbo.v_Initiatives AS ini 
       LEFT OUTER JOIN dbo.impacttrackings AS im 
                    ON ini.id = im.initiativeid 
       LEFT OUTER JOIN dbo.detailinformations AS de 
                    ON ini.id = de.initiativeid 
       LEFT OUTER JOIN dbo.InitiativeDetails AS ini_de 
                    ON ini.id = ini_de.initiativeid 
       LEFT JOIN StrategicObjectives straObj ON ini_de.StrategicObjective = straObj.Id
       LEFT JOIN Strategies stragic ON ini_de.StrategyDetail = stragic.StrategyId
       --LEFT OUTER JOIN (SELECT initiativeid, 
       --                        impacttypeofbenefittable, 
       --                        versionprice, 
       --                        runrate 
       --                 FROM   [dbo].[impacttypeofbenefits] 
       --                 WHERE  impacttypeofbenefittable = 'ImpiemantCost' 
       --                        AND versionprice = 'Actual') AS Impa 
       --             ON Ini.id = Impa.initiativeid 
       --LEFT JOIN (SELECT initiativeid, 
       --                  impacttypeofbenefittable, 
       --                  versionprice, 
       --                  runrate 
       --           FROM   [dbo].[impacttypeofbenefits] 
       --           WHERE  impacttypeofbenefittable = 'ImpiemantCost' 
       --                  AND versionprice = 'Estimate cost') AS Impe 
       --       ON Ini.id = Impe.initiativeid 
       LEFT OUTER JOIN (SELECT * 
                        FROM   [dbo].[sharebenefitworkstreams] 
                        --WHERE  (workstream IS NOT NULL 
                        --       OR workstream <> '' ) and [percent] is not null) 
						Where [percent] is not null)
							   AS sh 
                    ON ini.id = sh.initiativeid 
       LEFT JOIN (SELECT DISTINCT workstreamtitle, 
                                  subworkstream1 
                  FROM   dbo.subworkstreams) AS sub 
				              ON sh.workstream = sub.subworkstream1 
       LEFT JOIN (SELECT STRING_AGG(CoDeveloperName, ',') AS CoDeveloperName , InitiativeId AS InitiativeId FROM InitiativeCoDevelopers GROUP BY InitiativeId) iniCo ON iniCo.InitiativeId = ini.Id
							  -- เพิ่ม APprover
       --LEFT JOIN MaxApprovers sponsor ON ini.Id = sponsor.InitiativeId AND sponsor.ApproverType = 'Sponsor'
       --LEFT JOIN MaxApprovers tofinan ON ini.Id = tofinan.InitiativeId AND tofinan.ApproverType = 'TO Finance'
       --LEFT JOIN MaxApprovers workstreamlead ON ini.Id = workstreamlead.InitiativeId AND workstreamlead.ApproverType = 'WorkstreamLead'
       LEFT JOIN (SELECT STRING_AGG(ApproverEmail, ',') AS ApproverEmail , InitiativeId FROM tmpMaxApprovers WHERE ApproverType = 'Sponsor' GROUP BY InitiativeId) sponsor ON ini.Id = sponsor.InitiativeId
       LEFT JOIN (SELECT STRING_AGG(ApproverEmail, ',') AS ApproverEmail , InitiativeId FROM tmpMaxApprovers WHERE ApproverType = 'TO Finance' GROUP BY InitiativeId) tofinan ON ini.Id = tofinan.InitiativeId
       LEFT JOIN (SELECT STRING_AGG(ApproverEmail, ',') AS ApproverEmail , InitiativeId FROM tmpMaxApprovers WHERE ApproverType = 'WorkstreamLead' GROUP BY InitiativeId) workstreamlead ON ini.Id = workstreamlead.InitiativeId
       LEFT JOIN (SELECT STRING_AGG(ApproverEmail, ',') AS ApproverEmail , InitiativeId FROM tmpMaxApprovers WHERE ApproverType = 'CTO' GROUP BY InitiativeId) cto ON ini.Id = cto.InitiativeId
       LEFT JOIN (SELECT STRING_AGG(ApproverEmail, ',') AS ApproverEmail , InitiativeId FROM tmpMaxApprovers WHERE ApproverType = 'CFO' GROUP BY InitiativeId) cfo ON ini.Id = cfo.InitiativeId
       LEFT JOIN (SELECT STRING_AGG(ApproverEmail, ',') AS ApproverEmail , InitiativeId FROM tmpMaxApprovers WHERE ApproverType = 'TOTeam' GROUP BY InitiativeId) toteam ON ini.Id = toteam.InitiativeId
       LEFT JOIN (SELECT STRING_AGG(ApproverEmail, ',') AS ApproverEmail , InitiativeId FROM tmpMaxApprovers WHERE ApproverType = 'TF-BT-TO' GROUP BY InitiativeId) tfbtto ON ini.Id = tfbtto.InitiativeId

        LEFT JOIN (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId1
          FROM            tmpInitiativeActions a1
          INNER JOIN tmpMaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'Sponsor'
          WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM tmpInitiativeActions
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
          GROUP BY a1.InitiativeId) a ON a.InitiativeId1 = ini.id
      
      
      LEFT JOIN  (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId2
                    FROM            tmpInitiativeActions a1
                    INNER JOIN tmpMaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'TO Finance'
                    WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM tmpInitiativeActions
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                    GROUP BY a1.InitiativeId) b ON ini.id = b.InitiativeId2


       LEFT JOIN (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId3
                 FROM            tmpInitiativeActions a1
				 -- Nok แก้ไข CFO To TOFinance IL4 , TO FinacneIL5 2020-09-17
                 INNER JOIN tmpMaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy and ( maxap.ApproverType = 'TOFinanceIL4')
                 WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM tmpInitiativeActions
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                 GROUP BY a1.InitiativeId) c ON ini.id = c.InitiativeId3


     LEFT JOIN    (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId4
                     FROM            tmpInitiativeActions a1
                     INNER JOIN tmpMaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'CTO'
                     WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM tmpInitiativeActions
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                     GROUP BY a1.InitiativeId) d 
                     ON ini.id = d.InitiativeId4

     LEFT JOIN    (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId5
                     FROM            tmpInitiativeActions a1
                     INNER JOIN tmpMaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'WorkstreamLead'
                     WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM tmpInitiativeActions
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                     GROUP BY a1.InitiativeId) e 
                     ON ini.id = e.InitiativeId5
     LEFT JOIN    (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId6
                     FROM            InitiativeActions a1
                     INNER JOIN tmpMaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'TOTeam'
                     WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM tmpInitiativeActions
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                     GROUP BY a1.InitiativeId) f 
                     ON ini.id = f.InitiativeId6
     LEFT JOIN    (SELECT        STRING_AGG(ActionBy, ',') AS ApproverEmail, a1.InitiativeId AS InitiativeId7
                     FROM            InitiativeActions a1
                     INNER JOIN tmpMaxApprovers maxap ON maxap.InitiativeId = a1.InitiativeId AND maxap.ApproverEmail = a1.ActionBy AND maxap.ApproverType = 'TF-BT-TO'
                     WHERE        a1.Stage LIKE 'SIL%' AND ActionResult IS NULL AND ISNULL(IsInactive, 'false') = 'false' AND a1.Counter = (SELECT TOP 1 [Counter]
			                                    FROM tmpInitiativeActions
			                                    WHERE InitiativeId = a1.InitiativeId
			                                    AND ActionResult IS NULL
                                                AND ISNULL(IsInactive, 'false') = 'false'
                                                ORDER BY ID DESC
                                            )
                     GROUP BY a1.InitiativeId) g 
                     ON ini.id = g.InitiativeId7 
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
	-- เพิ่ม Software detail by NOk @ 2020-09-01
  left join ITBudgetSurveys its
  on ini.id = its.InitiativeId
  left join ITBudgetSurveyAssets itas
  on its.id = itas.ITBudgetSurveyId
  left join ITAssets itass
  on itas.AssetId = itass.AssetId

  -- Increase Email
  left join ownerTable own
  on ini.OwnerName = own.OwnerName
  left join ownerTable own2
  on   CONVERT (NVARCHAR(255), own.DivManagerEmpID)  = own2.EmployeeID
  left join ownerTable own3
  on  CONVERT (NVARCHAR(255), own.DepManagerEmpID) = own3.EmployeeID
	  --left join  v_maxApprovers 
   --         --(
   --               --select STRING_AGG(ApproverEmail, ',') as ApproverEmails
   --               --  ,ApproverType
   --               --  ,InitiativeId 
   --               --  from MaxApprovers
   --               --  where approverType = 'Sponsor'
   --               --  GROUP BY ApproverType, InitiativeId
                  
   --             --SELECT 
   --             --  STRING_AGG(max1.ApproverEmail,', ') as Sponsor,
   --             --  STRING_AGG(max2.ApproverEmail,', ') as [TO Finance],
   --             --  STRING_AGG(max3.ApproverEmail,', ') as [Workstream Learder],
   --             --  ini.id ,
   --             --  max1.ApproverType
   --             --  from v_Initiatives ini 
   --             --  inner join ( select ApproverEmail,ApproverType,InitiativeId from MaxApprovers
   --             --  where approverType = 'sponsor') max1
   --             --  on ini.id = max1.InitiativeId
   --             --   inner join ( select ApproverEmail,ApproverType,InitiativeId from MaxApprovers
   --             --  where approverType = 'TO Finance') max2
   --             --  on ini.id = max2.InitiativeId
   --             --  inner join ( select ApproverEmail,ApproverType,InitiativeId from MaxApprovers
   --             --  where approverType = 'WorkstreamLead') max3
   --             --  on ini.id = max3.InitiativeId
   --             --   group by ini.Id ,max1.ApproverType,max2.ApproverType,max3.ApproverType
   --              --) 
   --              maxapprovers on ini.id = maxapprovers.Id
   --on ini.id = sponsormax.InitiativeId
   --left join (
   --               select STRING_AGG(ApproverEmail, ',') as ApproverEmails
   --                 ,ApproverType
   --                 ,InitiativeId 
   --                 from MaxApprovers
   --                 where approverType = 'TO Finance'
   --                 GROUP BY ApproverType, InitiativeId ) tofinanmax
		 --       on ini.id = sponsormax.InitiativeId
   --left join (
   --               select STRING_AGG(ApproverEmail, ',') as ApproverEmails
   --                 ,ApproverType
   --                 ,InitiativeId 
   --                 from MaxApprovers
   --                 where approverType = 'WorkstreamLead'
   --                 GROUP BY ApproverType, InitiativeId ) workstreamleadmax
		 --       on ini.id = sponsormax.InitiativeId
     
     
     LEFT JOIN countImpact recordOfImpactBenefit ON recordOfImpactBenefit.InitiativeId = ini.Id

         GROUP BY Isnull(sh.[percent], 100) ,sh.Id , ini.id ,ini.Stage
GO



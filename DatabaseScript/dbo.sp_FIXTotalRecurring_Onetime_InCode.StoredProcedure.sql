/****** Object:  StoredProcedure [dbo].[sp_FIXTotalRecurring_Onetime_InCode]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIXTotalRecurring_Onetime_InCode]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.

    -- Insert statements for procedure here
   

IF OBJECT_ID('tempdb..#tmpInitiativeIdToFixONE') IS NOT NULL
    DROP TABLE #tmpInitiativeIdToFixONE

SELECT 
imp.InitiativeId
INTO #tmpInitiativeIdToFixONE
FROM ImpactTrackings imp
INNER JOIN
(
        select
        impact.initiativeid,
        case 
        when max(impac.runrate) is not null then max(impac.runrate)
        when max(impre.runrate) is not null then max(impre.runrate)
        else max(imptar.runrate) end as Runrate
        from ImpactTypeOfBenefits impact
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Actual' AND TypeOfBenefit LIKE 'ONE%' GROUP BY initiativeid) impac
        on impac.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'ONE%' GROUP BY initiativeid) impre
        on impre.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'ONE%' GROUP BY initiativeid) imptar
        on imptar.InitiativeId = Impact.InitiativeId
group by impact.InitiativeId
) b ON b.InitiativeId = imp.InitiativeId
INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
WHERE 
imp.TotalOneTIme IS NULL AND imp.TotalRecurring IS NULL
AND b.Runrate IS NOT NULL AND b.RunRate <> 0
AND ini.Stage IN ('IL0','SIL1','IL1','SIL2','IL2','IL3','SIL3')






IF OBJECT_ID('tempdb..#tmpInitiativeIdToFixRE') IS NOT NULL
    DROP TABLE #tmpInitiativeIdToFixRE

SELECT 
imp.InitiativeId
INTO #tmpInitiativeIdToFixRE
FROM ImpactTrackings imp
INNER JOIN
(
        select
        impact.initiativeid,
        case 
        when max(impac.runrate) is not null then max(impac.runrate)
        when max(impre.runrate) is not null then max(impre.runrate)
        else max(imptar.runrate) end as Runrate
        from ImpactTypeOfBenefits impact
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Actual' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) impac
        on impac.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) impre
        on impre.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) imptar
        on imptar.InitiativeId = Impact.InitiativeId
group by impact.InitiativeId
) b ON b.InitiativeId = imp.InitiativeId
INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
WHERE 
imp.TotalOneTIme IS NULL AND imp.TotalRecurring IS NULL
AND b.Runrate IS NOT NULL AND b.RunRate <> 0
AND ini.Stage IN ('IL0','SIL1','IL1','SIL2','IL2','IL3','SIL3')





--SELECT 
--imp.InitiativeId,
--TotalRecurring
--,TotalOneTIme,
--b.Runrate

UPDATE imp SET imp.TotalRecurring = b.Runrate
FROM ImpactTrackings imp
INNER JOIN
(
        select
        impact.initiativeid,
        case 
        when max(impac.runrate) is not null then max(impac.runrate)
        when max(impre.runrate) is not null then max(impre.runrate)
        else max(imptar.runrate) end as Runrate
        from ImpactTypeOfBenefits impact
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Actual' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) impac
        on impac.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) impre
        on impre.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) imptar
        on imptar.InitiativeId = Impact.InitiativeId
group by impact.InitiativeId
) b ON b.InitiativeId = imp.InitiativeId
INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
WHERE 
imp.InitiativeId IN (SELECT InitiativeId FROM #tmpInitiativeIdToFixRE)


--SELECT 
--imp.InitiativeId,
--TotalRecurring
--,TotalOneTIme,
--b.Runrate


UPDATE imp SET imp.TotalOnetime = b.Runrate * 0.1
FROM ImpactTrackings imp
INNER JOIN
(
        select
        impact.initiativeid,
        case 
        when max(impac.runrate) is not null then max(impac.runrate)
        when max(impre.runrate) is not null then max(impre.runrate)
        else max(imptar.runrate) end as Runrate
        from ImpactTypeOfBenefits impact
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Actual' AND TypeOfBenefit LIKE 'ONE%' GROUP BY initiativeid) impac
        on impac.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'ONE%' GROUP BY initiativeid) impre
        on impre.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'ONE%' GROUP BY initiativeid) imptar
        on imptar.InitiativeId = Impact.InitiativeId
group by impact.InitiativeId
) b ON b.InitiativeId = imp.InitiativeId
INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
WHERE 
imp.InitiativeId IN (SELECT InitiativeId FROM #tmpInitiativeIdToFixONE)

END
GO

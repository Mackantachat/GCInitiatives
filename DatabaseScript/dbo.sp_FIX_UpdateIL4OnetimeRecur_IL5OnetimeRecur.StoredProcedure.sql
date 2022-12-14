/****** Object:  StoredProcedure [dbo].[sp_FIX_UpdateIL4OnetimeRecur_IL5OnetimeRecur]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_UpdateIL4OnetimeRecur_IL5OnetimeRecur]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    
UPDATE imp SET imp.IL4RunRateOnetime = v.runrate
FROM (
SELECT 
ini.InitiativeCode,
imp.IL4RunRateOnetime,
CAST(b.Runrate * 0.1 AS decimal(18,3)) AS runrate,
imp.InitiativeId
--INTO #tmpInitiativeIdToFixONE
FROM ImpactTrackings imp
INNER JOIN
(
        select
        impact.initiativeid,
        case 
        when max(impre.runrate) is not null then max(impre.runrate)
        else max(imptar.runrate) end as Runrate
        from ImpactTypeOfBenefits impact
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'ONE%' GROUP BY initiativeid) impre
        on impre.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'ONE%' GROUP BY initiativeid) imptar
        on imptar.InitiativeId = Impact.InitiativeId
group by impact.InitiativeId
) b ON b.InitiativeId = imp.InitiativeId
INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
WHERE 
b.Runrate IS NOT NULL AND b.RunRate <> 0
AND ini.Stage IN ('IL4', 'SIL4')

GROUP BY ini.InitiativeCode,imp.InitiativeId, imp.IL4RunRateOnetime,CAST(b.Runrate * 0.1 AS decimal(18,3))
 
HAVING ISNULL(imp.IL4RunRateOnetime, -999) <>  CAST(b.Runrate * 0.1 AS decimal(18,3))
) v 
INNER JOIN ImpactTrackings imp ON imp.InitiativeId = v.InitiativeId



UPDATE imp SET imp.IL4RunRateRecurring = v.runrate
FROM (
SELECT 
ini.InitiativeCode,
imp.InitiativeId,
imp.IL4RunRateRecurring,
b.Runrate
FROM ImpactTrackings imp
INNER JOIN
(
        select
        impact.initiativeid,
        case 
        when max(impre.runrate) is not null then max(impre.runrate)
        else max(imptar.runrate) end as Runrate
        from ImpactTypeOfBenefits impact
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) impre
        on impre.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) imptar
        on imptar.InitiativeId = Impact.InitiativeId
group by impact.InitiativeId
) b ON b.InitiativeId = imp.InitiativeId
INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
WHERE 
b.Runrate IS NOT NULL AND b.RunRate <> 0
AND 
ini.Stage IN ('IL4','SIL4')

GROUP BY ini.InitiativeCode,imp.InitiativeId, imp.IL4RunRateRecurring, b.Runrate
 
HAVING ISNULL(imp.IL4RunRateRecurring, -999) <>  b.Runrate
) v 
INNER JOIN ImpactTrackings imp ON imp.InitiativeId = v.InitiativeId

-----------------------------------------------------------------------------



UPDATE imp SET imp.IL5RunRateOnetime = v.runrate
FROM (
SELECT 
ini.InitiativeCode,
imp.IL5RunRateOnetime,
CAST(b.Runrate * 0.1 AS decimal(18,3)) AS runrate,
imp.InitiativeId
--INTO #tmpInitiativeIdToFixONE
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
b.Runrate IS NOT NULL AND b.RunRate <> 0
AND ini.Stage IN ('IL5', 'SIL5')

GROUP BY ini.InitiativeCode,imp.InitiativeId, imp.IL5RunRateOnetime,CAST(b.Runrate * 0.1 AS decimal(18,3))
 
HAVING ISNULL(imp.IL5RunRateOnetime, -999) <>  CAST(b.Runrate * 0.1 AS decimal(18,3))
) v 
INNER JOIN ImpactTrackings imp ON imp.InitiativeId = v.InitiativeId




UPDATE imp SET imp.IL5RunRateRecurring = v.runrate
FROM (
SELECT 
ini.InitiativeCode,
imp.InitiativeId,
imp.IL5RunRateRecurring,
b.Runrate
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
b.Runrate IS NOT NULL AND b.RunRate <> 0
AND 
ini.Stage IN ('IL5','SIL5')

GROUP BY ini.InitiativeCode,imp.InitiativeId, imp.IL5RunRateRecurring, b.Runrate
 
HAVING ISNULL(imp.IL5RunRateRecurring, -999) <>  b.Runrate

) v 
INNER JOIN ImpactTrackings imp ON imp.InitiativeId = v.InitiativeId


END
GO

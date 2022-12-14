/****** Object:  StoredProcedure [dbo].[sp_FIX_CheckImpactTotal_And_IL4Data]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_CheckImpactTotal_And_IL4Data]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    ---------------------------------------------- Start Check Il4 Data

SELECT
ini.InitiativeCode,
ini.LastSubmittedDate,
ini.Stage,
imp.InitiativeId,
imp.TotalRecurring,
imp.IL4RunRateRecurring,
recur.Runrate
FROM ImpactTrackings imp
INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
LEFT JOIN
(
select
        impact.initiativeid,
        case 
        when max(impac.runrate) is not null AND max(impac.runrate) <> 0 then max(impac.runrate)
        when max(impre.runrate) is not null AND max(impre.runrate) <> 0 then max(impre.runrate)
        else max(imptar.runrate) end as Runrate
        from ImpactTypeOfBenefits impact
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Actual' AND TypeOfBenefit LIKE 'RE%') impac
        on impac.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'RE%') impre
        on impre.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'RE%') imptar
        on imptar.InitiativeId = Impact.InitiativeId
group by impact.InitiativeId
) recur ON recur.InitiativeId = imp.InitiativeId
WHERE 
ini.Stage IN ('SIL4')

AND 
(
imp.IL4RunRateRecurring <> imp.TotalRecurring
OR
imp.IL4RunRateRecurring <> recur.Runrate
)
AND ini.LastSubmittedDate IS NOT NULL






SELECT
ini.InitiativeCode,
ini.LastSubmittedDate,
ini.Stage,
imp.InitiativeId,
imp.TotalOnetime,
imp.IL4RunRateOnetime,
onetime.Runrate
FROM ImpactTrackings imp
INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
LEFT JOIN
(
select
        impact.initiativeid,
        ROUND((case 
        when max(impac.runrate) is not null AND max(impac.runrate) <> 0 then max(impac.runrate)
        when max(impre.runrate) is not null AND max(impre.runrate) <> 0 then max(impre.runrate)
        else max(imptar.runrate) end) * 0.1, 3) as Runrate
        from ImpactTypeOfBenefits impact
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Actual' AND TypeOfBenefit LIKE 'ONE%') impac
        on impac.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'ONE%') impre
        on impre.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'ONE%') imptar
        on imptar.InitiativeId = Impact.InitiativeId
group by impact.InitiativeId
) onetime  ON onetime.InitiativeId = imp.InitiativeId
WHERE 
ini.Stage IN ('SIL4')

AND 
(
imp.IL4RunRateOnetime <> imp.TotalOnetime
OR
imp.IL4RunRateOnetime <> onetime.Runrate
)
AND ini.LastSubmittedDate IS NOT NULL


---------------------------------------------- END Check Il4 Data




---------------------------------------------- Start Check Total Data


SELECT
ini.InitiativeCode,
ini.LastSubmittedDate,
ini.Stage,
imp.InitiativeId,
imp.TotalRecurring,
imp.IL4RunRateRecurring,
recur.Runrate
FROM ImpactTrackings imp
INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
LEFT JOIN
(
select
        impact.initiativeid,
        case 
        when max(impac.runrate) is not null AND max(impac.runrate) <> 0 then max(impac.runrate)
        when max(impre.runrate) is not null AND max(impre.runrate) <> 0 then max(impre.runrate)
        else max(imptar.runrate) end as Runrate
        from ImpactTypeOfBenefits impact
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Actual' AND TypeOfBenefit LIKE 'RE%') impac
        on impac.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'RE%') impre
        on impre.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'RE%') imptar
        on imptar.InitiativeId = Impact.InitiativeId
group by impact.InitiativeId
) recur ON recur.InitiativeId = imp.InitiativeId
WHERE 
ini.Stage IN ('SIL4')

AND 
(
imp.TotalRecurring <> recur.Runrate
)
AND ini.LastSubmittedDate IS NOT NULL






SELECT
ini.InitiativeCode,
ini.LastSubmittedDate,
ini.Stage,
imp.InitiativeId,
imp.TotalOnetime,
imp.IL4RunRateOnetime,
onetime.Runrate
FROM ImpactTrackings imp
INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
LEFT JOIN
(
select
        impact.initiativeid,
        ROUND((case 
        when max(impac.runrate) is not null AND max(impac.runrate) <> 0 then max(impac.runrate)
        when max(impre.runrate) is not null AND max(impre.runrate) <> 0 then max(impre.runrate)
        else max(imptar.runrate) end) * 0.1, 3) as Runrate
        from ImpactTypeOfBenefits impact
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Actual' AND TypeOfBenefit LIKE 'ONE%') impac
        on impac.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'ONE%') impre
        on impre.InitiativeId = Impact.InitiativeId
        inner join(select initiativeid,runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'ONE%') imptar
        on imptar.InitiativeId = Impact.InitiativeId
group by impact.InitiativeId
) onetime  ON onetime.InitiativeId = imp.InitiativeId
WHERE 
ini.Stage IN ('SIL4')

AND 
(
imp.TotalOnetime <> onetime.Runrate
)
AND ini.LastSubmittedDate IS NOT NULL


---------------------------------------------- End Check Total Data
END
GO

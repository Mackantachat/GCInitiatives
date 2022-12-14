/****** Object:  StoredProcedure [dbo].[sp_ForceUpdateTotalRecurring_Onetime]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_ForceUpdateTotalRecurring_Onetime]
(
@mode AS NVARCHAR(10) = 'find'
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.

    -- Insert statements for procedure here
   




IF (@mode = 'fix') 
    BEGIN
                --SELECT 
            --imp.InitiativeId
            ----INTO #tmpInitiativeIdToFixONE

            --,
            --ISNULL(imp.TotalOneTIme, 0),
            --ROUND((ISNULL(b.RunRate, 0) * 0.1), 3)
                    UPDATE imp SET imp.TotalOnetime = ROUND((ISNULL(b.RunRate, 0) * 0.1), 3)
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
                ISNULL(imp.TotalOneTIme, 0)  <>  ROUND((ISNULL(b.RunRate, 0) * 0.1), 3)
                --AND b.Runrate IS NOT NULL AND b.RunRate <> 0
                AND ini.Stage IN ('IL0','SIL1','IL1','SIL2','IL2','IL3','SIL3')







                --SELECT 
                --ini.Stage,
                --ini.InitiativeCode,
                --imp.InitiativeId
                ----INTO #tmpInitiativeIdToFixONE

                --,
                --ISNULL(imp.TotalRecurring, 0),
                --ISNULL(b.RunRate, 0)

                UPDATE imp SET imp.TotalRecurring = ISNULL(b.RunRate, 0)
                FROM ImpactTrackings imp
                INNER JOIN
                (
                        select
                        impact.initiativeid,
                        case 
                        when max(impac.runrate) is not null  then max(impac.runrate)
                        when max(impre.runrate) is not null  then max(impre.runrate)
                        else max(imptar.runrate) end as Runrate
                        from ImpactTypeOfBenefits impact
                        inner join(select initiativeid, SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Actual' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) impac
                        on impac.InitiativeId = Impact.InitiativeId
                        inner join(select initiativeid, SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) impre
                        on impre.InitiativeId = Impact.InitiativeId
                        inner join(select initiativeid, SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) imptar
                        on imptar.InitiativeId = Impact.InitiativeId
                group by impact.InitiativeId
                ) b ON b.InitiativeId = imp.InitiativeId
                INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
                WHERE 
                ISNULL(imp.TotalRecurring, 0)  <>  ISNULL(b.RunRate, 0)
                --AND b.Runrate IS NOT NULL AND b.RunRate <> 0
                AND ini.Stage IN ('IL0','SIL1','IL1','SIL2','IL2','IL3','SIL3')









                --SELECT
                ----*
                --ini.BenefitAmount,
                --ISNULL(imp.TotalOnetime, 0) +  ISNULL(imp.TotalRecurring, 0)

                UPDATE ini SET ini.BenefitAmount = ISNULL(imp.TotalOnetime, 0) +  ISNULL(imp.TotalRecurring, 0)
                FROM Initiatives ini
                INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
                WHERE 
                ini.Stage IN ('IL0','SIL1','IL1','SIL2','IL2','IL3','SIL3')
                AND
                ISNULL(ini.BenefitAmount, 0) <> ISNULL(imp.TotalOnetime, 0) +  ISNULL(imp.TotalRecurring, 0)


    END
ELSE
    BEGIN

                SELECT 
        imp.InitiativeId
        --INTO #tmpInitiativeIdToFixONE

        ,
        ISNULL(imp.TotalOneTIme, 0),
        ROUND((ISNULL(b.RunRate, 0) * 0.1), 3)
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
                ISNULL(imp.TotalOneTIme, 0)  <>  ROUND((ISNULL(b.RunRate, 0) * 0.1), 3)
                --AND b.Runrate IS NOT NULL AND b.RunRate <> 0
                AND ini.Stage IN ('IL0','SIL1','IL1','SIL2','IL2','IL3','SIL3')







                SELECT 
                ini.Stage,
                ini.InitiativeCode,
                imp.InitiativeId
                --INTO #tmpInitiativeIdToFixONE

                ,
                ISNULL(imp.TotalRecurring, 0),
                ISNULL(b.RunRate, 0)
                FROM ImpactTrackings imp
                INNER JOIN
                (
                        select
                        impact.initiativeid,
                        case 
                        when max(impac.runrate) is not null  then max(impac.runrate)
                        when max(impre.runrate) is not null  then max(impre.runrate)
                        else max(imptar.runrate) end as Runrate
                        from ImpactTypeOfBenefits impact
                        inner join(select initiativeid, SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Actual' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) impac
                        on impac.InitiativeId = Impact.InitiativeId
                        inner join(select initiativeid, SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Revise' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) impre
                        on impre.InitiativeId = Impact.InitiativeId
                        inner join(select initiativeid, SUM(runrate) AS runrate from ImpactTypeOfBenefits  where VersionPrice = 'Target' AND TypeOfBenefit LIKE 'RE%' GROUP BY initiativeid) imptar
                        on imptar.InitiativeId = Impact.InitiativeId
                group by impact.InitiativeId
                ) b ON b.InitiativeId = imp.InitiativeId
                INNER JOIN v_Initiatives ini ON ini.Id = imp.InitiativeId
                WHERE 
                ISNULL(imp.TotalRecurring, 0)  <>  ISNULL(b.RunRate, 0)
                --AND b.Runrate IS NOT NULL AND b.RunRate <> 0
                AND ini.Stage IN ('IL0','SIL1','IL1','SIL2','IL2','IL3','SIL3')









                SELECT
                --*
                ini.BenefitAmount,
                ISNULL(imp.TotalOnetime, 0) +  ISNULL(imp.TotalRecurring, 0)

                FROM v_Initiatives ini
                INNER JOIN ImpactTrackings imp ON imp.InitiativeId = ini.Id
                WHERE 
                ini.Stage IN ('IL0','SIL1','IL1','SIL2','IL2','IL3','SIL3')
                AND
                ISNULL(ini.BenefitAmount, 0) <> ISNULL(imp.TotalOnetime, 0) +  ISNULL(imp.TotalRecurring, 0)


    END




END
GO

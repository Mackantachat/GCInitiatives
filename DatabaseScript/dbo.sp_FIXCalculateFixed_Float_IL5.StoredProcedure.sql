/****** Object:  StoredProcedure [dbo].[sp_FIXCalculateFixed_Float_IL5]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIXCalculateFixed_Float_IL5]
(
    -- Add the parameters for the stored procedure here
    @mode NVARCHAR(150) = 'find'
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
IF (@mode = 'fix')
BEGIN

    /* float */

--SELECT a.* 
UPDATE imp SET imp.IL5FloatFxOnetime = a.newVal
FROM (
SELECT
ini.InitiativeCode,
ini.Id,
SUM(RunRate) AS runrate,
imp.IL5FloatFxOnetime,
SUM(RunRate) * 0.1 AS newVal,
VersionPrice,
SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1) AS TypeOfBenefit
FROM ImpactTypeOfBenefits it
INNER JOIN v_Initiatives ini ON ini.Id = it.InitiativeId
INNER JOIN ImpactTrackings imp ON imp.InitiativeId = it.InitiativeId
WHERE ImpactTypeOfBenefitTable = 'TypeBenefit' 
AND SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1) = 'ONE' AND VersionPrice = 'FloatFX'
AND ISNULL(RunRate, -9999) = ISNULL(imp.IL5FloatFxOnetime, -9998) AND RunRate <> 0 AND imp.IL5FloatFxOnetime <> 0


GROUP BY ini.InitiativeCode,ini.Id, VersionPrice, SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1), imp.IL5FloatFxOnetime
) a
INNER JOIN ImpactTrackings imp ON a.Id = imp.InitiativeId
WHERE ISNULL(RunRate, -9999) = ISNULL(a.IL5FloatFxOnetime, -9998) AND RunRate <> 0 AND a.IL5FloatFxOnetime <> 0


--ORDER BY Id


/*-------------------*/

/* fixed */

--SELECT a.* 
UPDATE imp SET imp.IL5FixedFxOnetime = a.newVal
FROM (
SELECT
ini.InitiativeCode,
ini.Id,
SUM(RunRate) AS runrate,
imp.IL5FixedFxOnetime,
SUM(RunRate) * 0.1 AS newVal,
VersionPrice,
SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1) AS TypeOfBenefit
FROM ImpactTypeOfBenefits it
INNER JOIN v_Initiatives ini ON ini.Id = it.InitiativeId
INNER JOIN ImpactTrackings imp ON imp.InitiativeId = it.InitiativeId
WHERE ImpactTypeOfBenefitTable = 'TypeBenefit' 
AND SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1) = 'ONE' AND VersionPrice = 'FixedFX'



GROUP BY ini.InitiativeCode,ini.Id, VersionPrice, SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1), imp.IL5FixedFxOnetime
) a
INNER JOIN ImpactTrackings imp ON a.Id = imp.InitiativeId
WHERE ISNULL(RunRate, -9999) = ISNULL(a.IL5FixedFxOnetime, -9998) AND RunRate <> 0 AND a.IL5FixedFxOnetime <> 0

--ORDER BY Id

/*-------------------*/

END

ELSE IF (@mode = 'find')
BEGIN

    /* float */

SELECT a.* 
--UPDATE imp SET imp.IL5FloatFxOnetime = a.newVal
FROM (
SELECT
ini.InitiativeCode,
ini.Id,
SUM(RunRate) AS runrate,
imp.IL5FloatFxOnetime,
SUM(RunRate) * 0.1 AS newVal,
VersionPrice,
SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1) AS TypeOfBenefit
FROM ImpactTypeOfBenefits it
INNER JOIN v_Initiatives ini ON ini.Id = it.InitiativeId
INNER JOIN ImpactTrackings imp ON imp.InitiativeId = it.InitiativeId
WHERE ImpactTypeOfBenefitTable = 'TypeBenefit' 
AND SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1) = 'ONE' AND VersionPrice = 'FloatFX'
AND ISNULL(RunRate, -9999) = ISNULL(imp.IL5FloatFxOnetime, -9998) AND RunRate <> 0 AND imp.IL5FloatFxOnetime <> 0


GROUP BY ini.InitiativeCode,ini.Id, VersionPrice, SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1), imp.IL5FloatFxOnetime
) a
INNER JOIN ImpactTrackings imp ON a.Id = imp.InitiativeId
WHERE ISNULL(RunRate, -9999) = ISNULL(a.IL5FloatFxOnetime, -9998) AND RunRate <> 0 AND a.IL5FloatFxOnetime <> 0


ORDER BY Id


/*-------------------*/

/* fixed */

SELECT a.* 
--UPDATE imp SET imp.IL5FixedFxOnetime = a.newVal
FROM (
SELECT
ini.InitiativeCode,
ini.Id,
SUM(RunRate) AS runrate,
imp.IL5FixedFxOnetime,
SUM(RunRate) * 0.1 AS newVal,
VersionPrice,
SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1) AS TypeOfBenefit
FROM ImpactTypeOfBenefits it
INNER JOIN v_Initiatives ini ON ini.Id = it.InitiativeId
INNER JOIN ImpactTrackings imp ON imp.InitiativeId = it.InitiativeId
WHERE ImpactTypeOfBenefitTable = 'TypeBenefit' 
AND SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1) = 'ONE' AND VersionPrice = 'FixedFX'



GROUP BY ini.InitiativeCode,ini.Id, VersionPrice, SUBSTRING(TypeOfBenefit, 1, CHARINDEX('_', TypeOfBenefit) -1), imp.IL5FixedFxOnetime
) a
INNER JOIN ImpactTrackings imp ON a.Id = imp.InitiativeId
WHERE ISNULL(RunRate, -9999) = ISNULL(a.IL5FixedFxOnetime, -9998) AND RunRate <> 0 AND a.IL5FixedFxOnetime <> 0

ORDER BY Id

/*-------------------*/

END



END
GO

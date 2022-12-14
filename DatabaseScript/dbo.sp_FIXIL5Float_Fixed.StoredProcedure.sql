/****** Object:  StoredProcedure [dbo].[sp_FIXIL5Float_Fixed]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIXIL5Float_Fixed]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.

    -- Insert statements for procedure here
  

SELECT
imt.InitiativeId,
tof.TypeOfBenefitGroup,
imt.VersionPrice,
SUM(imt.RunRate) AS  RunRate
INTO #tmpData
FROM ImpactTypeOfBenefits imt
INNER JOIN TypeOfBenefits tof ON tof.TypeOfBenefitCode = imt.TypeOfBenefit
WHERE tof.TypeOfBenefitGroup IN ('One time', 'Recurring') AND imt.ImpactTypeOfBenefitTable = 'TypeBenefit'

GROUP BY tof.TypeOfBenefitGroup, imt.InitiativeId, imt.VersionPrice
ORDER BY imt.InitiativeId,  tof.TypeOfBenefitGroup

--SELECT * FROM #tmpData

UPDATE im
SET 
 IL5FloatFxRecurring   = (SELECT TOP 1 t.RunRate FROM #tmpData t WHERE TypeOfbenefitGroup = 'Recurring' AND VersionPrice = 'FloatFX' AND t.InitiativeId = im.InitiativeId)
,IL5FloatFxOnetime     = (SELECT TOP 1 t.RunRate FROM #tmpData t WHERE TypeOfbenefitGroup = 'One time' AND VersionPrice = 'FloatFX' AND  t.InitiativeId = im.InitiativeId)
,IL5FixedFxOnetime     = (SELECT TOP 1 t.RunRate FROM #tmpData t WHERE TypeOfbenefitGroup = 'One time' AND VersionPrice = 'FixedFX' AND  t.InitiativeId = im.InitiativeId)
,IL5FixedFxRecurring   = (SELECT TOP 1 t.RunRate FROM #tmpData t WHERE TypeOfbenefitGroup = 'Recurring' AND VersionPrice = 'FixedFX' AND t.InitiativeId = im.InitiativeId)
FROM ImpactTrackings im

--SELECT
--im.InitiativeId,
--(SELECT TOP 1 t.RunRate FROM #tmpData t WHERE TypeOfbenefitGroup = 'Recurring' AND VersionPrice = 'FloatFX' AND  t.InitiativeId = im.InitiativeId) AS a
--,(SELECT TOP 1 t.RunRate FROM #tmpData t WHERE TypeOfbenefitGroup = 'One time' AND VersionPrice = 'FloatFX' AND  t.InitiativeId = im.InitiativeId)  AS a
--,(SELECT TOP 1 t.RunRate FROM #tmpData t WHERE TypeOfbenefitGroup = 'One time' AND VersionPrice = 'FixedFX' AND  t.InitiativeId = im.InitiativeId)  AS a
--,(SELECT TOP 1 t.RunRate FROM #tmpData t WHERE TypeOfbenefitGroup = 'Recurring' AND VersionPrice = 'FixedFX' AND t.InitiativeId = im.InitiativeId) AS a
--FROM ImpactTrackings im

END
GO

/****** Object:  StoredProcedure [dbo].[sp_CheckBenefitZero]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_CheckBenefitZero]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    
INSERT INTO tmp_compareBenefitZero(DateCheck, InitiativeId, InitiativeCode)
SELECT 
GETDATE(),
ini.Id,
ini.InitiativeCode
--,det.SubworkStream1,
--det.SubworkStream2,
--ini.BenefitAmount,
----o.BenefitAmount AS oldBanaefit,
--a.RunRate,
--ini.UpdatedDate,
--ini.CreatedDate,
--ini.STage,
--ini.Status
--,CASE WHEN ISNULL(o.BenefitAmount, -999) <> ISNULL(ini.BenefitAmount, -999) THEN o.BenefitAmount ELSE ini.BenefitAmount END
--UPDATE ini SET ini.BenefitAmount = CASE WHEN ISNULL(o.BenefitAmount, -999) <> ISNULL(ini.BenefitAmount, -999) THEN o.BenefitAmount ELSE ini.BenefitAmount END

FROM
(
            SELECT 
            InitiativeId, SUM(RunRate) AS RunRate
            FROM ImpactTypeOfBenefits 
            WHERE ImpactTypeOfBenefitTable = 'FirstRunRate'
            GROUP BY InitiativeId
) a 
INNER JOIN v_Initiatives ini ON ini.Id = a.InitiativeId
LEFT JOIN DetailInformations det ON det.InitiativeID = ini.Id
--INNER JOIN [Initiatives_oat] o ON o.Id = ini.Id AND o.DataFromDate = '2020-08-04'


WHERE RunRate IS NULL AND (ini.BenefitAmount = 0 OR ini.BenefitAmount IS NULL)
AND ini.Status NOT IN ('cancelled') AND ini.InitiativeType = 'max'
AND ini.InitiativeCode LIKE '2020-%'
--AND ini.Id NOT IN (53815,53816,53817,53818,53819,53820,53821,53842,62593,62594,62595,62596,62597,62598,62599,62624,62681,62700,62716,62802,62796,62791,62790,62789,62766,62816,64303,64308,64317,64321,64326,64338,64339,64367,64386)
--AND ISNULL(o.BenefitAmount, -999) <> ISNULL(ini.BenefitAmount, -999)


--ORDER BY CreatedDate
END
GO

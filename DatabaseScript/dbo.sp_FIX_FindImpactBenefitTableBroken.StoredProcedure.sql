/****** Object:  StoredProcedure [dbo].[sp_FIX_FindImpactBenefitTableBroken]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_FindImpactBenefitTableBroken]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    
            SELECT
            'FirstRunRate',
            InitiativeId,
            [TypeOfBenefit],
            COUNT(*)
            FROM ImpactTypeOfBenefits it
            INNER JOIN v_Initiatives ini ON it.InitiativeId = ini.Id
            WHERE [VersionPrice] IN ('Target','Revise','Actual')
            AND [ImpactTypeOfBenefitTable] IN ('FirstRunRate')
            AND ini.InitiativeCode LIKE '0000-%'
            AND ini.Stage NOT IN ('cancelled','IL5')
            --AND InitiativeId = 48845

            GROUP BY InitiativeId , [TypeOfBenefit]
            HAVING COUNT(*) % 3 <> 0
            ORDER BY InitiativeId




            SELECT
            'TypeBenefit',
            InitiativeId,
            [TypeOfBenefit],
            COUNT(*)
            FROM ImpactTypeOfBenefits it
            INNER JOIN v_Initiatives ini ON it.InitiativeId = ini.Id
            WHERE [VersionPrice] IN ('FixedFX','FloatFX')
            AND [ImpactTypeOfBenefitTable] IN ('TypeBenefit')
            AND ini.InitiativeCode LIKE '0000-%'
            AND ini.Stage NOT IN ('cancelled','IL5')
            --AND InitiativeId = 48845

            GROUP BY InitiativeId , [TypeOfBenefit]
            HAVING COUNT(*) % 2 <> 0 AND COUNT(*) <> 0
            ORDER BY InitiativeId

END
GO

/****** Object:  StoredProcedure [dbo].[sp_MAXUpdateVersionPrice]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_MAXUpdateVersionPrice]

AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
   	update [dbo].[ImpactTypeOfBenefits]
	set versionPrice = 'FixedFX'
	where impactTypeofBenefitTable = 'TypeBenefit' and VersionPrice = 'Revised'

	update [dbo].[ImpactTypeOfBenefits]
	set versionPrice = 'FloatFX'
	where impactTypeofBenefitTable = 'TypeBenefit' and VersionPrice = 'Actuals'
END
GO

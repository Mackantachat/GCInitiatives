/****** Object:  StoredProcedure [dbo].[sp_GetInitiativeIDfromIntiatitiveCode]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetInitiativeIDfromIntiatitiveCode]

AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON
	--UPDATE [dbo].[ImpactTrackings]
	--SET InitiativeCode = SUBSTRING(RIGHT('000000000000000' + InitiativeCode, 10),1,6) + '/' + SUBSTRING(RIGHT('000000000000000' + InitiativeCode, 10),7,4)
 --	WHERE InitiativeCode is not null


 --   UPDATE [dbo].[ImpactTrackings]
	--SET InitiativeId = [dbo].[GetInitiativeIDByCode](ImpactTrackings.InitiativeCode)
	--where initiativecode not like '%2020%'

	--UPDATE [dbo].[DetailInformations]
	--SET InitiativeCode = SUBSTRING(RIGHT('000000000000000' + InitiativeCode, 10),1,6) + '/' + SUBSTRING(RIGHT('000000000000000' + InitiativeCode, 10),7,4)
 --	WHERE InitiativeCode is not null


	--UPDATE [dbo].[DetailInformations]
	--SET InitiativeId = [dbo].[GetInitiativeIDByCode](DetailInformations.InitiativeCode)
	--where initiativecode not like '%2020%'
	--UPDATE [dbo].[ImpactTypeOfBenefits]
	--SET InitiativeCode = SUBSTRING(RIGHT('000000000000000' + InitiativeCode, 10),1,6) + '/' + SUBSTRING(RIGHT('000000000000000' + InitiativeCode, 10),7,4)
 --	WHERE InitiativeCode is not null


	--UPDATE [dbo].[ImpactTypeOfBenefits]
	--SET InitiativeId = [dbo].[GetInitiativeIDByCode](ImpactTypeOfBenefits.InitiativeCode)
	--where initiativecode not like '%2020%'
END
GO

/****** Object:  StoredProcedure [dbo].[sp_FIX_InCode]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_InCode]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON


	-- Pasuth 28/06/2021 Close for Obsolate Store
    --EXEC sp_FIX_ImpactTrackingsFirstRunRateBroken_InCode 'fix'
    --EXEC sp_FIXTotalRecurring_Onetime_InCode
    --EXEC sp_FIX_UpdateIL4OnetimeRecur_IL5OnetimeRecur
    --EXEC sp_FIX_IL4Recur_IL5Recur_InCode
    --EXEC sp_FixRegisteringDate_InCode
    --EXEC sp_FIX_CAPEX_AnnualSumTotalMissing
    --EXEC sp_FIX_PaybackPeriod 'fix'
    --EXEC sp_FIXCalculateFixed_Float_IL5 'fix'

    --EXEC sp_FIX_CalculatePoolAvailableBudget -1

END
GO

/****** Object:  StoredProcedure [dbo].[sp_FixRegisteringDate_InCode]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FixRegisteringDate_InCode]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
    UPDATE
    Initiatives 
    SET RegisteringDate = CONVERT(VARCHAR(10), CreatedDate, 120)
    WHERE CONVERT(VARCHAR(10), CreatedDate, 120) <> CONVERT(VARCHAR(10), RegisteringDate, 120) AND (InitiativeCode LIKE '2020-%' OR InitiativeCode LIKE '0000-%')





    EXEC sp_FIX_PaybackPeriod 'fix'





END
GO

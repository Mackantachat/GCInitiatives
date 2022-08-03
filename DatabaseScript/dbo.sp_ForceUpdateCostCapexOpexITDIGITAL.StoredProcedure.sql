/****** Object:  StoredProcedure [dbo].[sp_ForceUpdateCostCapexOpexITDIGITAL]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_ForceUpdateCostCapexOpexITDIGITAL]

AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    UPDATE it 
  SET it.[CapexSummary] = ini.CostEstCapex, it.[OpexSummary] = ini.CostEstOpex
  FROM [ITBudgetSurveys] it 
  INNER JOIN v_Initiatives ini ON it.InitiativeId = ini.Id 

END
GO

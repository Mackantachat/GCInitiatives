/****** Object:  StoredProcedure [dbo].[sp_FIX_IL4Recur_IL5Recur_InCode]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_IL4Recur_IL5Recur_InCode]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.

    -- Insert statements for procedure here
    --select * 
    UPDATE imp SET imp.TotalRecurring = imp.IL4RunRateRecurring
    from impacttrackings imp
    where initiativeid in (select id from v_Initiatives where stage in ('IL4','SIL4'))
    and IL4RunRateRecurring <> 0 and  TotalRecurring = 0

    --select * 
    UPDATE imp SET imp.TotalRecurring = imp.IL5RunRateRecurring
    from  impacttrackings imp
    where initiativeid in (select id from v_Initiatives where stage in ('IL5','SIL5'))
    and IL5RunRateRecurring <> 0 and  TotalRecurring = 0
END
GO

/****** Object:  StoredProcedure [dbo].[sp_FIX_IL4Recur_IL5Recur]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[sp_FIX_IL4Recur_IL5Recur]
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.

    -- Insert statements for procedure here
    --select * 
    UPDATE imp SET imp.TotalRecurring = imp.IL4RunRateRecurring
    from impacttrackings imp
    where initiativeid in (select id from v_Initiatives where stage in ('IL4','SIL4'))
    and ISNULL(IL4RunRateRecurring, -999) <> 0 and  ISNULL(TotalRecurring, -999) = 0

    --select * 
    UPDATE imp SET imp.TotalRecurring = imp.IL5RunRateRecurring
    from  impacttrackings imp
    where initiativeid in (select id from v_Initiatives where stage in ('IL5','SIL5'))
    and ISNULL(IL5RunRateRecurring, -999) <> 0 and  ISNULL(TotalRecurring, -999) = 0

    -------------------------------------------------------------------------------------

    UPDATE imp SET imp.TotalOnetime = imp.IL4RunRateOnetime
    from impacttrackings imp
    where initiativeid in (select id from v_Initiatives where stage in ('IL4','SIL4'))
    and ISNULL(IL4RunRateOnetime, -999) <> 0 and  ISNULL(TotalOnetime, -999) = 0

    --select * 
    UPDATE imp SET imp.TotalOnetime = imp.IL5RunRateOnetime
    from  impacttrackings imp
    where initiativeid in (select id from v_Initiatives where stage in ('IL5','SIL5'))
    and ISNULL(IL5RunRateOnetime, -999) <> 0 and  ISNULL(TotalOnetime, -999) = 0

END
GO

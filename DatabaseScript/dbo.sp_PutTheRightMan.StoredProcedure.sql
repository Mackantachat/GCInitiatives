/****** Object:  StoredProcedure [dbo].[sp_PutTheRightMan]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_PutTheRightMan]
@InitiativeID NVARCHAR(255) = '',
@Email NVARCHAR(255) = ''

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	select * from v_Initiatives where 1 = 0

	return 0
END
GO

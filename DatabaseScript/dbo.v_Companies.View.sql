/****** Object:  View [dbo].[v_Companies]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[v_Companies]
AS
SELECT        CompanyName, CompanyShortTxt
FROM            dbo.Owners
WHERE        (CompanyName IS NOT NULL)
GROUP BY CompanyName, CompanyShortTxt
GO

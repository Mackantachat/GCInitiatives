/****** Object:  UserDefinedFunction [dbo].[HtmlEncode]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[HtmlEncode]
(
    @UnEncoded as Nvarchar(500)
)
RETURNS varchar(500)
AS
BEGIN
  DECLARE @Encoded as varchar(500)

  --order is important here. Replace the amp first, then the lt and gt. 
  --otherwise the &lt will become &amp;lt; 
  RETURN (
      Replace(
        Replace(
          Replace(@UnEncoded,'&','&amp;'),
        '<', '&lt;'),
      '>', '&gt;')
      )
  --RETURN (SELECT @Encoded)
END
GO

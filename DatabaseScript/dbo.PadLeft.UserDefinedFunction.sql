/****** Object:  UserDefinedFunction [dbo].[PadLeft]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE FUNCTION [dbo].[PadLeft]
		(@TextToPad 	 	VARCHAR(8000),
		 @CharacterToPad	VARCHAR(1),
		 @NumberToPad	 	INT)
RETURNS		VARCHAR(8000)
AS
BEGIN
	DECLARE	@OutputText VARCHAR(8000)
	


    
        DECLARE @reversed NVARCHAR(300) = (SELECT REVERSE(@TextToPad))
        IF (LEN(SUBSTRING(@reversed, 0, CHARINDEX('-', @reversed))) = 5 AND LEN(@TextToPad) > 15)
        BEGIN
              SET @TextToPad = REVERSE(
                        REPLACE(
                        @reversed,
                        SUBSTRING(@reversed, 0, CHARINDEX('-', @reversed) + 1),
                        SUBSTRING(
                            SUBSTRING(@reversed, 0, CHARINDEX('-', @reversed) + 1),
                            0,
                            LEN(SUBSTRING(@reversed, 0, CHARINDEX('-', @reversed) + 1)) -2
                        ) + '-'
                        )
                    )
        END





	-- Create a string with the maximum number of padded characters followed
	-- by the text that we want to pad
	SET		@OutputText = REPLICATE(@CharacterToPad, @NumberToPad) + @TextToPad
	
	-- Take the right X characters to simulate the padding
	RETURN	RIGHT(@OutputText, @NumberToPad)
END
GO

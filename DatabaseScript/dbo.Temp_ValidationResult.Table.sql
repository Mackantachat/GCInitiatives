/****** Object:  Table [dbo].[Temp_ValidationResult]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Temp_ValidationResult](
	[Initiative_No] [varchar](100) NULL,
	[Plant] [varchar](100) NULL,
	[Validate_Header] [varchar](100) NULL,
	[Validate_Out_of_Range] [varchar](100) NULL,
	[Validate_found_100] [varchar](100) NULL
) ON [PRIMARY]
GO

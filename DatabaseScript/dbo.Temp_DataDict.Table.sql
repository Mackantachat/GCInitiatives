/****** Object:  Table [dbo].[Temp_DataDict]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Temp_DataDict](
	[Table] [nvarchar](255) NOT NULL,
	[Field] [nvarchar](255) NULL,
	[Type] [nvarchar](255) NULL,
	[Description] [nvarchar](255) NULL,
	[PK] [nvarchar](255) NULL,
	[FK] [nvarchar](255) NULL,
	[Allow Nulls] [nvarchar](255) NULL,
	[Note] [nvarchar](255) NULL
) ON [PRIMARY]
GO

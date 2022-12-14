/****** Object:  Table [dbo].[Manpowers]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Manpowers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ResourceNeededId] [int] NULL,
	[Position] [nvarchar](max) NULL,
	[AmountPerson] [int] NULL,
	[Remark] [nvarchar](max) NULL,
 CONSTRAINT [PK_Manpowers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Lands]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lands](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ResourceNeededId] [int] NULL,
	[Location] [nvarchar](max) NULL,
	[Amount] [decimal](18, 3) NULL,
	[StartDate] [datetime2](7) NULL,
	[Remark] [nvarchar](max) NULL,
	[Unit] [nvarchar](max) NULL,
 CONSTRAINT [PK_Lands] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

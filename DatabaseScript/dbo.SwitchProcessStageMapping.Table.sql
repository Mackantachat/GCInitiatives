/****** Object:  Table [dbo].[SwitchProcessStageMapping]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SwitchProcessStageMapping](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OldProcess] [nvarchar](max) NULL,
	[OldStage] [nvarchar](max) NULL,
	[NewProcess] [nvarchar](max) NULL,
	[NewStage] [nvarchar](max) NULL,
 CONSTRAINT [PK_SwitchProcessStageMapping] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

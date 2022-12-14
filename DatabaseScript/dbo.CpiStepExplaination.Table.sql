/****** Object:  Table [dbo].[CpiStepExplaination]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CpiStepExplaination](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[StepTitle] [nvarchar](max) NULL,
	[Start] [datetime2](7) NOT NULL,
	[Finish] [datetime2](7) NOT NULL,
	[ResponsibleBy] [nvarchar](max) NULL,
 CONSTRAINT [PK_CpiStepExplaination] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

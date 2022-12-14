/****** Object:  Table [dbo].[CimLookback]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CimLookback](
	[CimLookbackId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectLookbackId] [int] NULL,
	[CimLookbackType] [nvarchar](max) NULL,
	[Aspect] [nvarchar](max) NULL,
	[Approve] [nvarchar](max) NULL,
	[Actual] [nvarchar](max) NULL,
	[DifferenceNote] [nvarchar](max) NULL,
	[BusinessPlan] [nvarchar](max) NULL,
	[ResponsiblePerson] [nvarchar](max) NULL,
 CONSTRAINT [PK_CimLookback] PRIMARY KEY CLUSTERED 
(
	[CimLookbackId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

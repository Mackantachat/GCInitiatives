/****** Object:  Table [dbo].[CustomReportParameter]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomReportParameter](
	[RunningID] [int] IDENTITY(1,1) NOT NULL,
	[ReportID] [int] NULL,
	[Sequence] [int] NULL,
	[ParameterName] [nvarchar](max) NULL,
	[ParameterField] [nvarchar](max) NULL,
	[FilterCondition] [nvarchar](max) NULL,
	[ParameterType] [nvarchar](max) NULL,
	[Required] [nvarchar](max) NULL,
	[DefaultValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_CustomReportParameter] PRIMARY KEY CLUSTERED 
(
	[RunningID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

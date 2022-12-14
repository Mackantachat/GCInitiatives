/****** Object:  Table [dbo].[CustomReportDetail]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomReportDetail](
	[RunningID] [int] IDENTITY(1,1) NOT NULL,
	[ReportID] [int] NULL,
	[FieldName] [nvarchar](max) NULL,
	[AggregateFunction] [nvarchar](max) NULL,
	[Axis] [nvarchar](max) NULL,
	[Sequence] [int] NULL,
	[ColorCode] [nvarchar](max) NULL,
 CONSTRAINT [PK_CustomReportDetail] PRIMARY KEY CLUSTERED 
(
	[RunningID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[CustomReportHeader]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomReportHeader](
	[RunningID] [int] IDENTITY(1,1) NOT NULL,
	[ReportID] [int] NULL,
	[ReportCode] [nvarchar](max) NULL,
	[ReportName] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[GraphType] [nvarchar](max) NULL,
	[X_AxisLabel] [nvarchar](max) NULL,
	[Y_AxisLabel] [nvarchar](max) NULL,
	[OtherTypeLabel] [nvarchar](max) NULL,
	[CreateUser] [nvarchar](max) NULL,
	[CreateDate] [datetime2](7) NULL,
	[UpdateUser] [nvarchar](max) NULL,
	[UpdateDate] [datetime2](7) NULL,
	[StageType] [nvarchar](max) NULL,
	[isAccumulate] [bit] NULL,
	[SystemReportType] [nvarchar](max) NULL,
 CONSTRAINT [PK_CustomReportHeader] PRIMARY KEY CLUSTERED 
(
	[RunningID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

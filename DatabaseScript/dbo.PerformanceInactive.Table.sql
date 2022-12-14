/****** Object:  Table [dbo].[PerformanceInactive]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PerformanceInactive](
	[PerformanceInactiveId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[InitiativeCode] [nvarchar](max) NULL,
	[POC] [bit] NULL,
	[OutstandingItems] [bit] NULL,
	[HighlightWork] [bit] NULL,
	[CLSD] [bit] NULL,
	[BenefitTracking] [bit] NULL,
	[FromDate] [datetime2](7) NULL,
	[ToDate] [datetime2](7) NULL,
 CONSTRAINT [PK_PerformanceInactive] PRIMARY KEY CLUSTERED 
(
	[PerformanceInactiveId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

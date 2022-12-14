/****** Object:  Table [dbo].[Setting]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Setting](
	[SettingId] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeCodeFormat] [nvarchar](max) NULL,
	[PeriodForKeeping] [int] NULL,
	[IsAvailablePeriodAnnual] [bit] NULL,
	[StartPeriodAnnual] [datetime2](7) NULL,
	[FinishPeriodAnnual] [datetime2](7) NULL,
	[IsAvailablePeriodMid] [bit] NULL,
	[StartPeriodMid] [datetime2](7) NULL,
	[FinishPeriodMid] [datetime2](7) NULL,
	[IsAvailableBudgetPool] [bit] NULL,
	[StartPeriodBudgetPool] [datetime2](7) NULL,
	[FinishPeriodBudgetPool] [datetime2](7) NULL,
	[IsActiveITBudgetSurvey] [bit] NULL,
	[StartPeriodIT] [datetime2](7) NULL,
	[FinishPeriodIT] [datetime2](7) NULL,
	[IL4TrackingPeriod] [int] NULL,
	[OneTimeBenefit] [decimal](18, 2) NULL,
 CONSTRAINT [PK_Setting] PRIMARY KEY CLUSTERED 
(
	[SettingId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

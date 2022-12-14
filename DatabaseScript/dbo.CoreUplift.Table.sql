/****** Object:  Table [dbo].[CoreUplift]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CoreUplift](
	[CoreUpliftId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectLookbackId] [int] NULL,
	[Economics] [nvarchar](max) NULL,
	[EstimatedPlaned] [nvarchar](max) NULL,
	[Actual] [nvarchar](max) NULL,
	[WhyDifference] [nvarchar](max) NULL,
	[Remark] [nvarchar](max) NULL,
	[Comment] [nvarchar](max) NULL,
 CONSTRAINT [PK_CoreUplift] PRIMARY KEY CLUSTERED 
(
	[CoreUpliftId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

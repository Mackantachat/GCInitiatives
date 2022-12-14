/****** Object:  Table [dbo].[ProjectImpact]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectImpact](
	[ProjectImpactId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectLookbackId] [int] NULL,
	[Situation] [nvarchar](max) NULL,
	[Before] [nvarchar](max) NULL,
	[Target] [nvarchar](max) NULL,
	[After] [nvarchar](max) NULL,
 CONSTRAINT [PK_ProjectImpact] PRIMARY KEY CLUSTERED 
(
	[ProjectImpactId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

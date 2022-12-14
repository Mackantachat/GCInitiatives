/****** Object:  Table [dbo].[ProjectImpactWork]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectImpactWork](
	[ProjectImpactWorkId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectLookbackId] [int] NULL,
	[WhatWorked] [nvarchar](max) NULL,
	[WhatDidNotWork] [nvarchar](max) NULL,
 CONSTRAINT [PK_ProjectImpactWork] PRIMARY KEY CLUSTERED 
(
	[ProjectImpactWorkId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

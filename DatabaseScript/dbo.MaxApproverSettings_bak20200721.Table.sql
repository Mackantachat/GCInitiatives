/****** Object:  Table [dbo].[MaxApproverSettings_bak20200721]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaxApproverSettings_bak20200721](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkstreamType] [nvarchar](max) NULL,
	[WorkstreamValue] [nvarchar](max) NULL,
	[Indicator] [nvarchar](max) NULL,
	[ApproverEmail] [nvarchar](max) NULL,
	[Order] [int] NULL,
 CONSTRAINT [PK_MaxApproverSettings_bak] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

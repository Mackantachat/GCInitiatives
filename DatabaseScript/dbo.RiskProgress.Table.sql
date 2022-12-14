/****** Object:  Table [dbo].[RiskProgress]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RiskProgress](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RiskId] [int] NOT NULL,
	[ActionNo] [int] NOT NULL,
	[ActionDescription] [nvarchar](max) NULL,
	[DueDate] [datetime2](7) NULL,
	[ActualCompletingDate] [datetime2](7) NULL,
	[Responsible] [nvarchar](max) NULL,
	[Status] [nvarchar](max) NULL,
	[ActionDueStatus] [nvarchar](max) NULL,
	[Remark] [nvarchar](max) NULL,
 CONSTRAINT [PK_RiskProgress] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

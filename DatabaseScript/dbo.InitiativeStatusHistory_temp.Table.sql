/****** Object:  Table [dbo].[InitiativeStatusHistory_temp]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeStatusHistory_temp](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[Stage] [nvarchar](max) NULL,
	[Status] [nvarchar](max) NULL,
	[Comment] [nvarchar](max) NULL,
	[ActionBy] [nvarchar](max) NULL,
	[ActionDate] [nvarchar](max) NULL,
	[LastSubmittedDate] [datetime2](7) NULL,
	[SubType] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

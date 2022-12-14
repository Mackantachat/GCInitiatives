/****** Object:  Table [dbo].[InitiativeStatusHistory]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeStatusHistory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[Stage] [nvarchar](max) NULL,
	[Status] [nvarchar](max) NULL,
	[Comment] [nvarchar](max) NULL,
	[ActionBy] [nvarchar](max) NULL,
	[ActionDate] [nvarchar](max) NULL,
	[LastSubmittedDate] [datetime2](7) NULL,
	[SubType] [nvarchar](max) NULL,
 CONSTRAINT [PK_InitiativeStatusHistory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_InitiativeStatusHistory_DA2A5754D476F7CEC63CFE1A84776EF8]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_InitiativeStatusHistory_DA2A5754D476F7CEC63CFE1A84776EF8] ON [dbo].[InitiativeStatusHistory]
(
	[InitiativeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

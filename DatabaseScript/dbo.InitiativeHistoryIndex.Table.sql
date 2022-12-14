/****** Object:  Table [dbo].[InitiativeHistoryIndex]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeHistoryIndex](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeCode] [nvarchar](max) NULL,
	[Stage] [nvarchar](max) NULL,
	[Status] [nvarchar](max) NULL,
	[SubmittedBy] [nvarchar](max) NULL,
	[SubmittedDate] [datetime2](7) NULL,
	[Comment] [nvarchar](max) NULL,
	[InitiativeIdHistory] [int] NOT NULL,
	[InitiativeIdMain] [int] NOT NULL,
 CONSTRAINT [PK_InitiativeHistoryIndex] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[InitiativeHistoryIndex] ADD  DEFAULT ((0)) FOR [InitiativeIdHistory]
GO
ALTER TABLE [dbo].[InitiativeHistoryIndex] ADD  DEFAULT ((0)) FOR [InitiativeIdMain]
GO

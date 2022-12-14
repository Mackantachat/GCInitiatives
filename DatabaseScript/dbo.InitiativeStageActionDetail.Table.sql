/****** Object:  Table [dbo].[InitiativeStageActionDetail]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InitiativeStageActionDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeStageDetailId] [int] NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[ActionType] [nvarchar](max) NULL,
	[ActionBy] [nvarchar](max) NULL,
 CONSTRAINT [PK_InitiativeStageActionDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [nci_wi_InitiativeStageActionDetail_17679CBAA801C5739D0AA64E42466E5D]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_InitiativeStageActionDetail_17679CBAA801C5739D0AA64E42466E5D] ON [dbo].[InitiativeStageActionDetail]
(
	[InitiativeStageDetailId] ASC
)
INCLUDE([ActionBy],[ActionType]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

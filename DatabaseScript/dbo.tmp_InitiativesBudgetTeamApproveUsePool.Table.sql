/****** Object:  Table [dbo].[tmp_InitiativesBudgetTeamApproveUsePool]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tmp_InitiativesBudgetTeamApproveUsePool](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NULL,
	[InitiativeCode] [nvarchar](300) NULL
) ON [PRIMARY]
GO

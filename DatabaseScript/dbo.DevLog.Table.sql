/****** Object:  Table [dbo].[DevLog]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DevLog](
	[LogDateTime] [datetime] NOT NULL,
	[ProcessName] [varchar](50) NOT NULL,
	[Details] [varchar](500) NULL,
	[InitiativeId] [varchar](20) NULL,
	[IsValidate] [varchar](1) NULL
) ON [PRIMARY]
GO

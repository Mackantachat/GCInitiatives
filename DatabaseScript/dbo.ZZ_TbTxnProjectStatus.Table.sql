/****** Object:  Table [dbo].[ZZ_TbTxnProjectStatus]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectStatus](
	[ProjectID] [int] NOT NULL,
	[ProjectStatusID] [int] NOT NULL,
	[CancelDate] [datetime] NULL,
	[CompleteDate] [datetime] NULL
) ON [PRIMARY]
GO

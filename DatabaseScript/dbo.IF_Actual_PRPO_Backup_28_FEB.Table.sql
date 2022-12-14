/****** Object:  Table [dbo].[IF_Actual_PRPO_Backup_28_FEB]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IF_Actual_PRPO_Backup_28_FEB](
	[Load_Date] [datetime] NULL,
	[Project_Definition_Key] [nvarchar](256) NULL,
	[Period] [nvarchar](256) NULL,
	[Plan_Amount] [decimal](18, 0) NULL,
	[Actual] [decimal](18, 0) NULL,
	[PR] [decimal](18, 0) NULL,
	[PO] [decimal](18, 0) NULL,
	[Budget_Amount] [decimal](18, 0) NULL,
	[PR_Snapshot] [decimal](18, 0) NULL,
	[PO_Snapshot] [decimal](18, 0) NULL,
	[UpdateDate] [datetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[IF_Actual_PRPO_Backup_28_FEB] ADD  DEFAULT (getdate()) FOR [Load_Date]
GO
ALTER TABLE [dbo].[IF_Actual_PRPO_Backup_28_FEB] ADD  DEFAULT (getdate()) FOR [UpdateDate]
GO

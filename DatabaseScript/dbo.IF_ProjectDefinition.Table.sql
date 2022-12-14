/****** Object:  Table [dbo].[IF_ProjectDefinition]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IF_ProjectDefinition](
	[Load_Date] [datetime] NULL,
	[UpdateDate] [datetime] NULL,
	[Project_Definition_Key] [nvarchar](256) NULL,
	[CreatedOn] [datetime] NULL,
	[ProjectReleaseDate] [datetime] NULL,
	[CapitalizedDate] [datetime] NULL,
	[ProjectTECODate] [datetime] NULL,
	[ProjectCloseDate] [datetime] NULL,
	[ProjectFlagForDel] [datetime] NULL,
	[ProjectDeleteDate] [datetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[IF_ProjectDefinition] ADD  DEFAULT (getdate()) FOR [Load_Date]
GO
ALTER TABLE [dbo].[IF_ProjectDefinition] ADD  DEFAULT (getdate()) FOR [UpdateDate]
GO

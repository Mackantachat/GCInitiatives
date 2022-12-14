/****** Object:  Table [dbo].[Audits]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Audits](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ChangeSetId] [int] NOT NULL,
	[InitiativeCode] [nvarchar](50) NULL,
	[ActionType] [nvarchar](50) NULL,
	[TableName] [nvarchar](50) NULL,
	[PK] [nvarchar](50) NULL,
	[FieldName] [nvarchar](100) NULL,
	[OldValue] [nvarchar](max) NULL,
	[NewValue] [nvarchar](max) NULL,
	[ActionDate] [datetime2](7) NULL,
	[ActionBy] [nvarchar](100) NULL,
	[CommentBy] [nvarchar](100) NULL,
	[CommentDate] [datetime2](7) NULL,
	[CommentDetail] [nvarchar](1000) NULL,
	[CommentByName] [nvarchar](100) NULL,
 CONSTRAINT [PK_Audits] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_Audits_5EE12EAA8097C0EE63A5D4716D9B665C]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_Audits_5EE12EAA8097C0EE63A5D4716D9B665C] ON [dbo].[Audits]
(
	[InitiativeCode] ASC,
	[ActionType] ASC
)
INCLUDE([ActionBy],[ActionDate],[ChangeSetId],[CommentBy],[CommentByName],[CommentDate],[CommentDetail],[FieldName],[NewValue],[OldValue],[PK],[TableName]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

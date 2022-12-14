/****** Object:  Table [dbo].[DimMaxHandsover]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DimMaxHandsover](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InitiativeId] [int] NOT NULL,
	[IsDeliverables] [bit] NULL,
	[IsCommunicationOrTraining] [bit] NULL,
	[IsAllIssueClosed] [bit] NULL,
	[IsOperationSupport] [bit] NULL,
	[IsOther] [bit] NULL,
	[CommentDeliverables] [nvarchar](max) NULL,
	[CommentCommunicationOrTraining] [nvarchar](max) NULL,
	[CommentAllIssueClosed] [nvarchar](max) NULL,
	[CommentOperationSupport] [nvarchar](max) NULL,
	[CommentOther] [nvarchar](max) NULL,
	[LicenseOrSubscriptionFee] [decimal](18, 2) NULL,
	[SupportFee] [decimal](18, 2) NULL,
	[StartDate] [datetime2](7) NULL,
	[FinishDate] [datetime2](7) NULL,
	[IsAcceptHandover] [bit] NULL,
	[AcceptDate] [datetime2](7) NULL,
	[EngineerEmail] [bit] NULL,
	[HandoverforIT] [nvarchar](max) NULL,
	[IsRequestITHandover] [bit] NULL,
 CONSTRAINT [PK_DimMaxHandsover] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ZZ_TbTxnWorkFlowStep]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnWorkFlowStep](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[WorkFlowName] [nvarchar](100) NOT NULL,
	[Order] [int] NOT NULL,
	[Status] [nvarchar](1) NULL,
	[ActivityGroup] [nvarchar](200) NULL,
	[ActivityName] [nvarchar](100) NULL,
	[ActorName] [nvarchar](100) NULL,
	[ActorType] [nvarchar](50) NULL,
	[ActorValue] [nvarchar](30) NULL,
	[CanEdit] [bit] NULL,
	[CanOverride] [bit] NULL,
	[Checker] [bit] NULL,
	[CreateApproveNo] [bit] NULL,
	[EmployeeName] [nvarchar](100) NULL,
	[Explicit] [bit] NULL,
	[MatchedRuleId] [nvarchar](100) NULL,
	[Optional] [bit] NULL,
	[Reason] [nvarchar](max) NULL,
	[TimeStamp] [datetime] NULL,
	[UpdateType] [nvarchar](10) NULL,
	[WorkFlowType] [nvarchar](1) NULL,
 CONSTRAINT [PK__TbTxnWor__57BF5B5E5B0E7E4A] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[ItemNo] ASC,
	[WorkFlowName] ASC,
	[Order] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnWorkFlowStep]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnWorkFlowSte__6B2FD77A] FOREIGN KEY([ProjectId], [WorkFlowName], [ItemNo])
REFERENCES [dbo].[ZZ_TbTxnProjectRequest] ([ProjectID], [WorkFlowName], [ItemNo])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ZZ_TbTxnWorkFlowStep] CHECK CONSTRAINT [FK__TbTxnWorkFlowSte__6B2FD77A]
GO

/****** Object:  Table [dbo].[ZZ_TbTxnBudgetSpent]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnBudgetSpent](
	[CalYearMonth] [nvarchar](50) NOT NULL,
	[AppropriationRequestNo] [nvarchar](255) NOT NULL,
	[ProjectNo] [nvarchar](255) NULL,
	[SystemStatus] [nvarchar](255) NULL,
	[PlanPOC] [nvarchar](255) NULL,
	[ActualPOC] [nvarchar](255) NULL,
	[OriginalBudget] [nvarchar](255) NULL,
	[RevisedBudget] [nvarchar](255) NULL,
	[TotalActual] [nvarchar](255) NULL,
	[PRCommitment] [nvarchar](255) NULL,
	[POCommitment] [nvarchar](255) NULL,
	[OutstandingItem] [nvarchar](255) NULL,
	[ContingnecyCost] [nvarchar](255) NULL,
	[Currency] [nvarchar](255) NULL,
	[CurrencyType] [nvarchar](255) NULL,
	[PS_CAPDate] [nvarchar](255) NULL,
	[PS_LockDate] [nvarchar](255) NULL,
	[PS_CreateDate] [nvarchar](255) NULL,
	[PS_ReleaseDate] [nvarchar](255) NULL,
	[PS_TECODate] [nvarchar](255) NULL,
	[PS_CLSDDate] [nvarchar](255) NULL,
	[PS_ActualFinishDate] [nvarchar](255) NULL,
	[PS_FlagforDeletionDate] [nvarchar](255) NULL,
	[PS_DeletionDate] [nvarchar](255) NULL,
	[IM_CreateOn] [nvarchar](255) NULL,
	[IM_CreateDate] [nvarchar](255) NULL,
	[IM_ReleaseDate] [nvarchar](255) NULL,
	[IM_TECODate] [nvarchar](255) NULL,
	[IM_CloseDate] [nvarchar](255) NULL,
	[IM_FlagforDeletionDate] [nvarchar](255) NULL,
	[IM_DeleteDate] [nvarchar](255) NULL,
	[IM_ForApprovalDate] [nvarchar](255) NULL,
	[IM_RejectedDate] [nvarchar](255) NULL,
	[IM_ApprovedDate] [nvarchar](255) NULL,
 CONSTRAINT [PK_TbTxnBudgetSpent] PRIMARY KEY CLUSTERED 
(
	[CalYearMonth] ASC,
	[AppropriationRequestNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

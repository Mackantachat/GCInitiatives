/****** Object:  Table [dbo].[X_TbTxnGateInfo ]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[X_TbTxnGateInfo ](
	[ProjectID] [int] NULL,
	[GateID] [int] NULL,
	[VACDate1] [datetime] NULL,
	[VACStatus1] [nvarchar](max) NULL,
	[VACDate2] [datetime] NULL,
	[VACStatus2] [nvarchar](max) NULL,
	[VACDate3] [datetime] NULL,
	[VACStatus3] [nvarchar](max) NULL,
	[VACCL] [nvarchar](max) NULL,
	[VACDeliverable] [nvarchar](max) NULL,
	[BudgetRequest] [float] NULL,
	[OPEXBudget1] [float] NULL,
	[OPEXBudget2] [float] NULL,
	[OPEXEvident] [nvarchar](max) NULL,
	[CAPEXBudget1] [float] NULL,
	[CAPEXBudget2] [float] NULL,
	[TieInBudget] [float] NULL,
	[PICDate1] [datetime] NULL,
	[PICStatus1] [nvarchar](max) NULL,
	[PICDate2] [datetime] NULL,
	[PICStatus2] [nvarchar](max) NULL,
	[PICDate3] [datetime] NULL,
	[PICStatus3] [nvarchar](max) NULL,
	[Presentation] [nvarchar](max) NULL,
	[IER] [nvarchar](max) NULL,
	[ProjectCharter] [nvarchar](max) NULL,
	[MOM] [nvarchar](max) NULL,
	[Note] [nvarchar](max) NULL,
	[IsSimplify] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

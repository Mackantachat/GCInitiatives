/****** Object:  Table [dbo].[ZZ_TbTxnGateInfo]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnGateInfo](
	[ProjectID] [int] NULL,
	[GateID] [int] NULL,
	[VACDate1] [datetime2](0) NULL,
	[VACStatus1] [nvarchar](50) NULL,
	[VACDate2] [datetime2](0) NULL,
	[VACStatus2] [nvarchar](50) NULL,
	[VACDate3] [datetime2](0) NULL,
	[VACStatus3] [nvarchar](50) NULL,
	[VACCL] [nvarchar](1000) NULL,
	[VACDeliverable] [nvarchar](1000) NULL,
	[BudgetRequest] [decimal](18, 2) NULL,
	[OPEXBudget1] [decimal](18, 2) NULL,
	[OPEXBudget2] [decimal](18, 2) NULL,
	[OPEXEvident] [nvarchar](1000) NULL,
	[CAPEXBudget1] [decimal](18, 2) NULL,
	[CAPEXBudget2] [decimal](18, 2) NULL,
	[TieInBudget] [decimal](18, 2) NULL,
	[PICDate1] [datetime2](0) NULL,
	[PICStatus1] [nvarchar](50) NULL,
	[PICDate2] [datetime2](0) NULL,
	[PICStatus2] [nvarchar](50) NULL,
	[PICDate3] [datetime2](0) NULL,
	[PICStatus3] [nvarchar](50) NULL,
	[Presentation] [nvarchar](1000) NULL,
	[IER] [nvarchar](1000) NULL,
	[ProjectCharter] [nvarchar](1000) NULL,
	[MOM] [nvarchar](1000) NULL,
	[Note] [nvarchar](2000) NULL,
	[IsSimplify] [bit] NULL
) ON [PRIMARY]
GO

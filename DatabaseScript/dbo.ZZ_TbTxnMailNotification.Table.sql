/****** Object:  Table [dbo].[ZZ_TbTxnMailNotification]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnMailNotification](
	[ProjectID] [int] NOT NULL,
	[WorkFlowName] [nvarchar](100) NOT NULL,
	[SendMailStatus] [nvarchar](40) NOT NULL,
	[SendMailCount] [int] NULL,
	[Timestamp] [datetime] NOT NULL,
	[NextTime] [datetime] NULL,
	[Recipient] [nvarchar](1000) NULL,
	[CCRecipient] [nvarchar](1000) NULL,
 CONSTRAINT [PK__TbTxnMai__725ED80F3118447E] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[WorkFlowName] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ZZ_TbTxnProjectRequest]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnProjectRequest](
	[ProjectID] [int] NOT NULL,
	[WorkFlowName] [nvarchar](100) NOT NULL,
	[RequestStatus] [nvarchar](40) NULL,
	[SubmitBy] [nvarchar](100) NULL,
	[SubmitedOn] [datetime] NULL,
	[LastChangedBy] [varchar](30) NULL,
	[LastChangedOn] [datetime] NULL,
	[PublishBy] [nvarchar](100) NULL,
	[PublishOn] [datetime] NULL,
	[ItemNo] [int] NOT NULL,
 CONSTRAINT [PK__TbTxnPro__725ED80F2022C2A6] PRIMARY KEY CLUSTERED 
(
	[ProjectID] ASC,
	[WorkFlowName] ASC,
	[ItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

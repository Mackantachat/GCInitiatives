/****** Object:  Table [dbo].[IncomingFileData]    Script Date: 9/3/2021 9:18:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IncomingFileData](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FileId] [int] NULL,
	[FileName] [nvarchar](100) NULL,
	[Row] [int] NULL,
	[CreatedDate] [datetime2](7) NULL,
	[Mark] [nvarchar](100) NULL,
	[Column1] [nvarchar](100) NULL,
	[Column2] [nvarchar](100) NULL,
	[Column3] [nvarchar](100) NULL,
	[Column4] [nvarchar](100) NULL,
	[Column5] [nvarchar](100) NULL,
	[Column6] [nvarchar](100) NULL,
	[Column7] [nvarchar](100) NULL,
	[Column8] [nvarchar](100) NULL,
	[Column9] [nvarchar](100) NULL,
	[Column10] [nvarchar](100) NULL,
	[Column11] [nvarchar](100) NULL,
	[Column12] [nvarchar](100) NULL,
	[Column13] [nvarchar](100) NULL,
	[Column14] [nvarchar](100) NULL,
	[Column15] [nvarchar](100) NULL,
	[Column16] [nvarchar](100) NULL,
	[Column17] [nvarchar](100) NULL,
	[Column18] [nvarchar](100) NULL,
	[Column19] [nvarchar](100) NULL,
	[Column20] [nvarchar](100) NULL,
	[Column21] [nvarchar](100) NULL,
	[Column22] [nvarchar](100) NULL,
	[Column23] [nvarchar](100) NULL,
	[Column24] [nvarchar](100) NULL,
	[Column25] [nvarchar](100) NULL,
	[Column26] [nvarchar](100) NULL,
	[Column27] [nvarchar](100) NULL,
	[Column28] [nvarchar](100) NULL,
	[Column29] [nvarchar](100) NULL,
	[Column30] [nvarchar](100) NULL,
	[DirectoryPath] [nvarchar](100) NULL,
 CONSTRAINT [PK_IncomingFileData_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_IncomingFilData]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [IX_IncomingFilData] ON [dbo].[IncomingFileData]
(
	[FileName] ASC,
	[CreatedDate] ASC,
	[Column2] ASC,
	[Column11] ASC
)
INCLUDE([Column1],[Column4],[Column6],[Column30],[FileId],[Mark]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_IncomingFileData_055490708D43A9E5307B268F96035DB4]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_IncomingFileData_055490708D43A9E5307B268F96035DB4] ON [dbo].[IncomingFileData]
(
	[FileName] ASC,
	[Mark] ASC,
	[Column1] ASC
)
INCLUDE([Column2],[Column3],[Column4]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [nci_wi_IncomingFileData_47D820DA1D03A9EB47CFA5E722208DFE]    Script Date: 9/3/2021 9:18:17 PM ******/
CREATE NONCLUSTERED INDEX [nci_wi_IncomingFileData_47D820DA1D03A9EB47CFA5E722208DFE] ON [dbo].[IncomingFileData]
(
	[FileName] ASC
)
INCLUDE([Column11],[Column2],[CreatedDate]) WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ZZ_TbTxnCIMLessonLearn]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnCIMLessonLearn](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[ConsiderationAreaGroup] [nvarchar](100) NOT NULL,
	[ConsiderationArea] [nvarchar](100) NOT NULL,
	[LessonLearn] [nvarchar](1000) NULL,
	[Factor] [nvarchar](3) NULL,
	[ConsiderationAreaOtherText] [nvarchar](100) NULL,
 CONSTRAINT [PK__TbTxnCIM__78EEEC8828D80438] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[ItemNo] ASC,
	[ConsiderationAreaGroup] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnCIMLessonLearn]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnCIML__Facto__3A8CA01F] FOREIGN KEY([Factor])
REFERENCES [dbo].[ZZ_TbMstFactor] ([FactorId])
GO
ALTER TABLE [dbo].[ZZ_TbTxnCIMLessonLearn] CHECK CONSTRAINT [FK__TbTxnCIML__Facto__3A8CA01F]
GO

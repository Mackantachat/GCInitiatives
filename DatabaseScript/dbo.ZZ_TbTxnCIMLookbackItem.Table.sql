/****** Object:  Table [dbo].[ZZ_TbTxnCIMLookbackItem]    Script Date: 9/3/2021 9:18:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZZ_TbTxnCIMLookbackItem](
	[ProjectId] [int] NOT NULL,
	[ItemNo] [int] NOT NULL,
	[AspectGroup] [nvarchar](100) NOT NULL,
	[Aspect] [nvarchar](1000) NOT NULL,
	[IndentLevel] [int] NOT NULL,
	[Approve] [nvarchar](1000) NULL,
	[Actual] [nvarchar](1000) NULL,
	[Note] [nvarchar](1000) NULL,
	[BusinessPlan] [nvarchar](1000) NULL,
	[MidCycle] [nvarchar](1000) NULL,
	[ResponsiblePerson] [nvarchar](60) NULL,
	[AspectGroupId] [int] NOT NULL,
	[FormType] [nvarchar](10) NOT NULL,
	[ApproveCurrency] [nvarchar](20) NULL,
	[ActualCurrency] [nvarchar](20) NULL,
	[AspectDataType] [nvarchar](2) NULL,
	[AspectFlag] [bit] NULL,
	[UserAddNew] [bit] NULL,
	[Required] [bit] NULL,
	[AspectOrder] [int] NOT NULL,
 CONSTRAINT [PK__TbTxnCIM__213D670E544C7222] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC,
	[ItemNo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZZ_TbTxnCIMLookbackItem] ADD  DEFAULT ((0)) FOR [AspectFlag]
GO
ALTER TABLE [dbo].[ZZ_TbTxnCIMLookbackItem] ADD  DEFAULT ((0)) FOR [UserAddNew]
GO
ALTER TABLE [dbo].[ZZ_TbTxnCIMLookbackItem] ADD  DEFAULT ((0)) FOR [Required]
GO
ALTER TABLE [dbo].[ZZ_TbTxnCIMLookbackItem]  WITH CHECK ADD  CONSTRAINT [FK__TbTxnCIMLookback__3C74E891] FOREIGN KEY([AspectGroupId], [FormType])
REFERENCES [dbo].[ZZ_TbMstCIMLookbackAspectGroup] ([Order], [FormType])
GO
ALTER TABLE [dbo].[ZZ_TbTxnCIMLookbackItem] CHECK CONSTRAINT [FK__TbTxnCIMLookback__3C74E891]
GO

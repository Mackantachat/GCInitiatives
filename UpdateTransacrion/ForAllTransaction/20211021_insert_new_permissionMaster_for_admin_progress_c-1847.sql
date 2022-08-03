INSERT INTO [dbo].[PermissionMaster]
           ([PermissionName]
           ,[Description])
     VALUES
           ('InActive Email Menu'
           ,'InActive Email Menu')


INSERT INTO [dbo].[RoleSettingDetail]
           ([PageId]
           ,[SectionId]
           ,[FieldName]
           ,[IsEnable]
           ,[PermissionMasterId])
     VALUES
           ('INACTIVE-EMAIL'
           ,'ACCESS'
           ,null
           ,1
           ,73)
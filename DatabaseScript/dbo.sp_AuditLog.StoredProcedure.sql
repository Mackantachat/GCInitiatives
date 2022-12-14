/****** Object:  StoredProcedure [dbo].[sp_AuditLog]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO












 
CREATE PROCEDURE [dbo].[sp_AuditLog]
(	    @InitiativeId INT 
	  ,@HistInitiativeId INT   
	  ,@TableName NVARCHAR(255) 
	  ,@ForeignField NVARCHAR(255)  
)
AS
BEGIN
      
--      ALTER PROCEDURE [dbo].[sp_AuditLog]
--(	    @InitiativeId INT 
--	  ,@HistInitiativeId INT   
--	  ,@TableName NVARCHAR(255) 
--	  ,@ForeignField NVARCHAR(255)  
--)


         -- Insert statements for procedure here
    --------------------------------------------  -- for strategy
            UPDATE a SET
                a.ActionResult = NULL
            FROM 
                InitiativeActions a
                LEFT JOIN Initiatives ini ON ini.Id = a.InitiativeId
            WHERE 
                (ISNULL(ActionResult, '') IN ('updateprogress'))   --- temporary add updateprogress for strategy
                AND ini.InitiativeType = 'strategy'
     --------------------------------------------------



DECLARE @SQLCommand NVARCHAR(MAX)  
DECLARE @InitiativeCode NVARCHAR(255) = '2020-044254'  
DECLARE @ActionType NVARCHAR(255) = 'UPDATE'  
DECLARE @ActionDate  DateTime = '2012-01-01' 
DECLARE @ActionBy NVARCHAR(255) = 'thammatad.a@frontiscompany.com' 
DECLARE @PK NVARCHAR(255) = 'Id' 


SELECT 
 @InitiativeCode = Initiatives.InitiativeCode
,@ActionDate = Initiatives.UpdatedDate
,@ActionBy = Initiatives.UpdatedBy
FROM Initiatives
WHERE ID = @InitiativeId
;

  
IF  @HistInitiativeId IS NULL    
     BEGIN SET @ActionType = 'INSERT' END 
ELSE BEGIN SET @ActionType = 'UPDATE' END   
 
 SELECT  

 @SQLCommand =
 STRING_AGG(
 CAST(
' 
INSERT INTO [dbo].[Audits]
           ([ChangeSetId]
           ,[InitiativeCode]
           ,[ActionType]
           ,[TableName]
           ,[PK]
           ,[FieldName]
           ,[OldValue]
           ,[NewValue]
           ,[ActionDate]
           ,[ActionBy] ) '  +

' SELECT     '+
'0 AS ChangeSetId   '  +
', '''+@InitiativeCode+''' AS InitiativeCode     '+
', '''+@ActionType+''' AS ActionType     '+
','''+@TableName+''' AS TableName     '+
','''+@PK+''' AS PK     '+
','''+ c.[Name] +''' AS FiledName     '+
',H.'+c.[Name]+' AS OldValue      '+
',I.'+c.[Name]+' AS NewValue     '+
','''+Convert(nvarchar(255),@ActionDate,20 ) +''' AS ActionDate     '+
','''+@ActionBy+''' AS ActionBy      '+
'FROM '+@TableName+' I LEFT JOIN      '+
''+@TableName+' H ON H.'+@ForeignField+' = '+ Convert(nvarchar(255),@HistInitiativeId )  +    
' ' + 'WHERE I.'+@ForeignField+' = ' +   Convert(nvarchar(255),@InitiativeId )   + ' ; '  + CHAR(10) + CHAR(13) 


as NVARCHAR(MAX)) ,' ; ') 

FROM sys.columns c
inner join sys.tables t on c.object_id = t.object_id
WHERE t.name = @tablename



EXEC (@SQLCommand)

print @SQLCommand
print @InitiativeId
print @HistInitiativeId
print @TableName
print @ForeignField
          
print @InitiativeCode
print @ActionType
print @ActionDate
print @ActionBy
print @PK

END
GO

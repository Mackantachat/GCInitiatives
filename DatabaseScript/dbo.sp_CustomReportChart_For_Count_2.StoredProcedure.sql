/****** Object:  StoredProcedure [dbo].[sp_CustomReportChart_For_Count_2]    Script Date: 9/3/2021 9:18:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[sp_CustomReportChart_For_Count_2]
AS

SELECT '03 IL5 (Sub-Workstream)' AS ReportName,
       '' AS ReportCode,
       '' AS [Description],
       'BarStacked' AS GraphType,
       'Sub Workstream' AS X_Label,
       'Benefit Amount' AS Y_Label,
       '' AS OtherTypeLabel ,
       ([Sub-Workstream_1]) AS [X_Sub-Workstream_1],
       SUM(CASE
               WHEN ([IL5]) = -9999 THEN 0
               ELSE ([IL5])
           END) AS [Y_IL5],
       SUM(CASE
               WHEN ([SIL5]) = -9999 THEN 0
               ELSE ([SIL5])
           END) AS [Y_SIL5],
       SUM(CASE
               WHEN ([Unconverted_IL4]) = -9999 THEN 0
               ELSE ([Unconverted_IL4])
           END) AS [Y_Unconverted_IL4],

      -- COUNT(CASE
       --          WHEN ([Unconverted_IL4]) = -9999 THEN NULL
       --          ELSE 1
      --       END) AS [Y_Unconverted_IL4Count 11],

		 COUNT(CASE
               WHEN ([Unconverted_IL4]) = -9999 THEN NULL
			   --WHEN ([Sub-Workstream_1]='Procurement' AND [IL0-IL2] = 0 AND [Unconverted_IL4]=0 ) THEN NULL
			   --WHEN ([SIL5_Achievement] IS NOT NULL ) THEN NULL
               ELSE ([Unconverted_IL4])
           END) AS [Y_Unconverted_IL4Count]


FROM v_DataGraphEnhanced v
LEFT JOIN
  (SELECT DISTINCT SubWorkstream1 AS val,
                   CLevelOrder,
                   SubWorkstream1Order AS mainOrder
   FROM SubWorkstreams) w ON w.val = v.[Sub-Workstream_1]
WHERE ISNULL([Initiative_ID], '') NOT IN (
                                            (SELECT dbo.fn_CustomReportParamDecoder(VALUE)
                                             FROM STRING_SPLIT('0000-002580', ',')))
  --AND ISNULL([Target_to_IL5_Date_C], '') <= '2021-12-31'
  AND ISNULL([Initiative_Type], '') NOT IN (
                                              (SELECT dbo.fn_CustomReportParamDecoder(VALUE)
                                               FROM STRING_SPLIT('MTPI,Enhancement', ',')))
  AND ISNULL([Workstream], '') NOT IN (
                                         (SELECT dbo.fn_CustomReportParamDecoder(VALUE)
                                          FROM STRING_SPLIT('GCME,Health', ',')))
  AND ISNULL([Stage_Gate], '') NOT IN (
                                         (SELECT dbo.fn_CustomReportParamDecoder(VALUE)
                                          FROM STRING_SPLIT('Cancelled', ',')))
  AND [SIL5_Achievement] IS  NULL

										 -- AND [Unconverted_IL4] <> 0.000000
GROUP BY ([Sub-Workstream_1])
ORDER BY MAX(CLevelOrder),
         MAX(mainOrder),
         [X_Sub-Workstream_1],
         [Y_IL5],
         [Y_SIL5],
         [Y_Unconverted_IL4]
         

GO

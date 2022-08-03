UPDATE ini SET CapexTabStatus = 2
FROM v_Initiatives ini
INNER JOIN InitiativeStageDetail sd ON ini.id = sd.InitiativeId AND ini.Stage = sd.CurrentStage AND ini.Status = sd.CurrentStatus
INNER JOIN ProgressHeader ph ON ph.InitiativeId = ini.id
WHERE sd.Sequence > 15 AND ini.Status NOT LIKE '%cancel%' AND ph.WbsNo IS NOT NULL 
AND ISNULL(ini.CapexTabStatus,0) < 2  
AND InitiativeType='dim'

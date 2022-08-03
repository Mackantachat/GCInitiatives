update cap set BudgetYear = 2021
from CapexInformations cap 
where InitiativeId in (select id from v_Initiatives where InitiativeCode = '2021-010714')
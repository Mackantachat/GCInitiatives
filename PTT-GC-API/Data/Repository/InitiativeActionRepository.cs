using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Repository
{
    public class InitiativeActionRepository : InitiativeActionInterface
    {
        private readonly DataContext _context;
        private readonly InitiativeInterface _initiativeRepo;
        public InitiativeActionRepository(DataContext context, InitiativeInterface initiativeRepo)
        {
            _context = context;
            _initiativeRepo = initiativeRepo;
        }
        public async Task<IEnumerable<InitiativeAction>> GetInitiativeAction(int id)
        {          

            
                var flowType = await _initiativeRepo.GetFlowTypeOfInitiative(id);
                var initiative = await _context.Initiatives.Where(i => i.Id.Equals(id)).FirstOrDefaultAsync();
                var initiativeStage = await _context.InitiativeStage.Where(i => i.InitiativeId.Equals(id) && i.FlowType.Equals(flowType)).FirstOrDefaultAsync();

                var stageToWhere = "";
                var statusToWhere = "";

                if ((!string.IsNullOrEmpty(flowType) && flowType.Equals("initiative")) || initiativeStage == null)
                {
                    stageToWhere = initiative.Stage;
                    statusToWhere = initiative.Status;
                }
                else
                {
                    stageToWhere = initiativeStage.Stage;
                    statusToWhere = initiativeStage.Status;
                }

                return await _context.InitiativeActions.Where(i => i.InitiativeId == id 
                && string.IsNullOrEmpty(i.ConditionType)
                && i.Stage.Equals(stageToWhere) 
                && i.Status.Equals(statusToWhere)
                && i.IsInactive != true 
                && string.IsNullOrEmpty(i.ActionResult)
                && i.FlowType.Equals(flowType)
                ).ToListAsync();
            

        }
        public async Task <bool> GetStageMaster(string type,string process, string stage)
        {
            if(type == "switch")
            {
                var getStage = await _context.StageMaster.Where(x => x.Event == "createnew" 
                && x.Process == process && x.CurrentStage == stage && x.SwitchProcessStage != null && x.SwitchProcessStatus != null).CountAsync();
                if (getStage > 0)
                {
                    return await Task.FromResult(true);
                }
                else
                {
                    return await Task.FromResult(false);
                }
            }
            else
            {
                var getStage = await _context.StageMaster.Where(x => x.Event == "createnew" 
                && x.Process == process && x.CurrentStage == stage && x.IsCreateType == true).CountAsync();
                if (getStage > 0)
                {
                    return await Task.FromResult(true);
                }
                else
                {
                    return await Task.FromResult(false);
                }
            }
           
        }
       public async Task <List<string>> GetSwitchProcessList(string type, string stage)
        {
            List<string> processList = new List<string>();
            if(type != null)
            {
                processList = await _context.SwitchProcessStageMapping.Where(x => x.OldProcess == type && x.OldStage == stage).Select(s => s.NewProcess).ToListAsync();
                
            }
            return processList;
        }
       
    }
}
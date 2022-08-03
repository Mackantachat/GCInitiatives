using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.InitiativeAction;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InitiativeActionController : ControllerBase
    {
        private readonly InitiativeActionInterface _repository;
        public InitiativeActionController(InitiativeActionInterface repository)
        {
            _repository = repository;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInitiativeAction(int id)
        {
            return Ok(await _repository.GetInitiativeAction(id));
        }

        [HttpPost("GetStageMaster")]
        public async Task<IActionResult> GetStageMaster(StageMasterCriteria stageMasterCriteria)
        {
            var a = await _repository.GetStageMaster(stageMasterCriteria.Type, stageMasterCriteria.Process, stageMasterCriteria.Stage);
            return Ok(a); // 123
        }
        
        [HttpPost("GetSwitchProcessList")]
        public async Task<IActionResult> GetSwitchProcessList(StageMasterCriteria stageMasterCriteria)
        {
            var a = await _repository.GetSwitchProcessList(stageMasterCriteria.Type,stageMasterCriteria.Stage);
            return Ok(a); // 123
        }
    }
}
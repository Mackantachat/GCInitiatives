using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StrategyController : ControllerBase
    {
        private readonly StrategyInterface _repository;

        public StrategyController(StrategyInterface repository)
        {
            _repository = repository;
        }
        [HttpGet("{strategicObjectiveId}")]
        public async Task<IActionResult> GetList(int strategicObjectiveId)
        {
            return Ok(await _repository.GetList(strategicObjectiveId));
        }
    }
}
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TypeOfBenefitController : ControllerBase
    {
        private readonly TypeOfBenefitInterface _repository;

        public TypeOfBenefitController(TypeOfBenefitInterface repository)
        {
            _repository = repository;
        }

        [HttpGet("RecurringAndOneTime")]
        public async Task<IActionResult> GetListRecurringAndOneTime()
        {
            return Ok(await _repository.GetListRecurringAndOneTime());
        }
        [HttpGet("ImplementationCost")]
        public async Task<IActionResult> GetListImplementationCost()
        {
            return Ok(await _repository.GetListImplementationCost());
        }
    }
}
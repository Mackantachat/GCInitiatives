using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.MaxApprover;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MaxApproverController : ControllerBase
    {
        private readonly MaxApproverInterface _repository;
        public MaxApproverController(MaxApproverInterface repository)
        {
            _repository = repository;
        }

        [HttpPost("Workstream")]
        public async Task<IActionResult> GetWorkstreamList(Workstream Workstream)
        {
            return Ok(await _repository.GetWorkstreamList(Workstream));
        }

        [HttpPost("SubWorkstream")]
        public async Task<IActionResult> GetSubWorkstream(Workstream Workstream)
        {
            return Ok(await _repository.GetSubWorkstream(Workstream));
        }

        [HttpGet("WorkstreamLead/{id}")]
        public async Task<IActionResult> GetWorkstreamLead(int id)
        {
            return Ok(await _repository.GetWorkstreamLead(id));
        }

        [HttpPost("WorkstreamLead/{id}")]
        public async Task<IActionResult> CreateWorkstreamLead(int id, WorkstreamLead Workstream)
        {
            return Ok(await _repository.CreateWorkstreamLead(id, Workstream));
        }

        [HttpPost("Sponsor/{id}")]
        public async Task<IActionResult> CreateSponsor(int id, [FromBody]string[] form)
        {
            return Ok(await _repository.CreateSponsor(id, form));
        }

        [HttpPost("Finance/{id}")]
        public async Task<IActionResult> CreateFinance(int id, [FromBody]string[] form)
        {
            return Ok(await _repository.CreateFinance(id, form));
        }

        [HttpPost("CFO/{id}")]
        public async Task<IActionResult> CreateCFO(int id, [FromBody]string[] form)
        {
            return Ok(await _repository.CreateCFO(id, form));
        }

        [HttpPost("CTO/{id}")]
        public async Task<IActionResult> CreateCTO(int id, [FromBody]string[] form)
        {
            return Ok(await _repository.CreateCTO(id, form));
        }

        [HttpPost("TOTeam/{id}")]
        public async Task<IActionResult> CreateTOTeam(int id, [FromBody]string[] form)
        {
            return Ok(await _repository.CreateTOTeam(id, form));
        }

        [HttpPost("TfBtTO/{id}")]
        public async Task<IActionResult> CreateTfBtTO(int id, [FromBody]string[] form)
        {
            return Ok(await _repository.CreateTfBtTO(id, form));
        }

        [HttpPost("TOFinanceIL4/{id}")]
        public async Task<IActionResult> CreateTOFinanceIL4(int id, [FromBody]string[] form)
        {
            return Ok(await _repository.CreateTOFinanceIL4(id, form));
        }

        [HttpPost("TOFinanceIL5/{id}")]
        public async Task<IActionResult> CreateTOFinanceIL5(int id, [FromBody]string[] form)
        {
            return Ok(await _repository.CreateTOFinanceIL5(id, form));
        }

        [HttpPost("FinanceExpert/{id}")]
        public async Task<IActionResult> CreateFinanceExpert(int id, [FromBody]string[] form)
        {
            return Ok(await _repository.CreateFinanceExpert(id, form));
        }
    }
}
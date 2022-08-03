using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.StatusTracking;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StatusTrackingController : ControllerBase
    {
        private readonly StatusTrackingInterface _repository;
        public StatusTrackingController(StatusTrackingInterface repository)
        {
            _repository = repository;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStatusTracking(int id)
        {
            return Ok(await _repository.GetList(id));
        }

        [HttpPost("ApproveComment/{id}")]
        public async Task<IActionResult> GetApproveComment(int id, ApproveComment ApproveComment)
        {
            return Ok(await _repository.GetApproveComment(id, ApproveComment));
        }

        [HttpPost("HistoryStatus/{id}")]
        public async Task<IActionResult> GetHistoryStatus(int id, HistoryStatus HistoryStatus)
        {
            var result = await _repository.GetHistoryStatus(id, HistoryStatus);
            return Ok(result);
        }

        [HttpGet("HistoryStatus/{id}")]
        public async Task<IActionResult> GetHistoryStatusList(int id)
        {
            return Ok(await _repository.GetHistoryStatusList(id));
        }
    }
}
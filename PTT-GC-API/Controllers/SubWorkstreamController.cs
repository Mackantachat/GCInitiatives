using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubWorkstreamController : ControllerBase
    {
        private readonly SubWorkstreamInterface _repository;
        public SubWorkstreamController(SubWorkstreamInterface repository)
        {
            _repository = repository;
        }
        [HttpGet()]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _repository.GetAll());
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetList(string name)
        {
            return Ok(await _repository.GetList(name));
        }

        [HttpGet("one/{name}")]
        public async Task<IActionResult> GetSubWorkstream1(string name)
        {
            return Ok(await _repository.GetSubWorkstream1(name));
        }
    }
}
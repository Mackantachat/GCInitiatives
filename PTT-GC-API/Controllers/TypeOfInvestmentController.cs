using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TypeOfInvestmentController : ControllerBase
    {
        private readonly TypeOfInvestmentInterface _repository;

        public TypeOfInvestmentController(TypeOfInvestmentInterface repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            return Ok(await _repository.GetList());
        }
    }
}
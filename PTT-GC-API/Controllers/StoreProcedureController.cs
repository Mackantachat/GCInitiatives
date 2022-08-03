using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using System;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreProcedureController : ControllerBase
    {
        private readonly StoreProcedureInterface _repository;

        public StoreProcedureController(StoreProcedureInterface repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody]string value)
        {
            string response = await _repository.Execute(value);
            return Ok(new { result = response });
        }
    }
}
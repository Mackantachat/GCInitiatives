using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoolBudgetFromController : ControllerBase
    {
        private readonly PoolBudgetInterface _repository;

        public PoolBudgetFromController(PoolBudgetInterface repository)
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
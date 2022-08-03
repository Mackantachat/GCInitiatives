using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private readonly CurrencyInterface _Currency;
        public CurrencyController(CurrencyInterface Currency)
        {
            _Currency = Currency;
        }
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            return Ok(await _Currency.GetList());
        }
    }
}
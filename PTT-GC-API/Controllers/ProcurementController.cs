using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProcurementController : ControllerBase
    {
        private readonly ProcurementInterface _repository;
        public ProcurementController(ProcurementInterface repository)
        {
            _repository = repository;
        }

        [HttpGet("getProcurementCategory")]
        public async Task<IActionResult> GetProcurementCategory()
        {
            return Ok(await _repository.GetProcurementCategory());
        }

        [HttpGet("getProcurementSubCategory")]
        public async Task<IActionResult> GetProcurementSubCategory()
        {
            return Ok(await _repository.GetProcurementSubCategory());
        }

        [HttpGet("getProcurementLever")]
        public async Task<IActionResult> GetProcurementLever()
        {
            return Ok(await _repository.GetProcurementLever());
        }

    }
}
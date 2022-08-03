using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.TempHRWebService;

namespace PTT_GC_API.Controllers
{
   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HRWebServiceController : Controller
    {
        private readonly HRWebServiceInterface _repository;
        public HRWebServiceController(HRWebServiceInterface repository)
        {
            _repository = repository;
        }

        [HttpGet("getCompany")]
        public async Task<IActionResult> GetCompany()
        {
            //  return Ok(await _repository.GetList());
            var addOthers = new List<string>();
            addOthers.Add("Others");
            var company = await _repository.GetList();
            var aa = company.ToList().Where(i => i.CompanyName != null).OrderBy(o=>o.CompanyName).Select(o => o.CompanyName).Distinct().Union(addOthers);
            return Ok(aa.ToList());
        }

        [HttpGet("getPositionLevel30")]
        public async Task<IActionResult> GetPositionLevel30()
        {
            var plv30 = await _repository.GetList();
            var aa = plv30.ToList().OrderBy(o => o.SystemName).Where(p=>p.PositionLevel == "30").Select(o => o.SystemName).Distinct();
            return Ok(aa.ToList());
        }

        [HttpGet("getPositionLevel40")]
        public async Task<IActionResult> GetPositionLevel40()
        {
            var plv30 = await _repository.GetList();
            var aa = plv30.ToList().OrderBy(o => o.SystemName).Where(p => p.PositionLevel == "40").Select(o => o.SystemName).Distinct();
            return Ok(aa.ToList());
        }
    }
}
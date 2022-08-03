using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Kri;
using PTT_GC_API.Services.Kri;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KriController : ControllerBase
    {
        private readonly IKriService _kriService;

        public KriController(IKriService kriService)
        {
            _kriService = kriService;
        }

        [HttpPost("InsertKriData")]
        public IActionResult InsertKriData([FromBody] KriModelData model)
        {
            var result = _kriService.InsertKriModel(model);
            return Ok(result);
        }

        [HttpPut("UpdateKri")]
        public IActionResult UpdateKri([FromBody] KriModelData model)
        {
            var result = _kriService.UpdateKriModel(model);
            return Ok(result);
        }

        [HttpDelete("DeleteKriData/{initiativeId}")]
        public IActionResult DeleteKriData(int initiativeId)
        {
            var result = _kriService.DeleteKriModel(initiativeId);
            return Ok(result);
        }

        [HttpGet("GetKri/{initiativeId}/{year}")]
        public IActionResult GetKri(int initiativeId,int year)
        {
            //var model = new KriModelData
            //{
            //    KriForms = new Kri
            //    {
            //        MitigationModels = new Models.KRI.KriMitigation(),
            //        ProgressDetails = new Models.KRI.KriProgressDetail(),
            //        KriData = new List<Models.KRI.KriData>(),
            //    }
            //};
            //model.KriForms.KriData.Add(new Models.KRI.KriData());
            //return Ok(model);
            var result = _kriService.GetKriModelData(initiativeId,year);
            return Ok(result);
        }

        [HttpDelete("DeleteKriData/{initiativeId}/{sequence}")]
        public IActionResult DeleteKriDataBySequence(int initiativeId, int sequence)
        {
            var result = _kriService.RemoveKriData(initiativeId,sequence);
            return Ok(result);
        }

        [HttpPost("UpdateStatus/{initiativeId}/{status}")]
        public IActionResult UpdateStatus(int initiativeId, string status)
        {
            var result = _kriService.ChangeStatus(initiativeId, status);
            return Ok(result);
        }
    }
}
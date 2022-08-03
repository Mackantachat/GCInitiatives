using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.BestPractice;
using PTT_GC_API.Models.BestPractice;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BestPracticeController : Controller
    {
        IBestPracticeRepository _repository;
        public BestPracticeController(IBestPracticeRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("Insert")]
        public IActionResult InsertBestPractice([FromBody]BestPracticeModelData bestPracticeModelData)
        {
            var result = _repository.InsertBestPractice(bestPracticeModelData);
            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public IActionResult GetBestPractice(int id)
        {
            //BestPracticeModelData t = new BestPracticeModelData();
            //t.ContactModel = new List<Models.BestPractice.Contact>();
            //t.ContactModel.Add(new PTT_GC_API.Models.BestPractice.Contact());
            //t.MileStoneModel = new List<Models.Initiative.Milestone>();
            //t.MileStoneModel.Add(new PTT_GC_API.Models.Initiative.Milestone());
            //t.ProjectReferenceModel = new List<ProjectReferenceModel>();
            //t.ProjectReferenceModel.Add(new ProjectReferenceModel());

            //return Ok(t);
            var result = _repository.GetBestPractice(id);
            return Ok(result);
        }

        [HttpPut("Update")]
        public IActionResult UpdateBestPractice(BestPracticeModelData model)
        {
            var result=_repository.UpdateBestPractice(model);
            return Ok(result);
        }
    }
}

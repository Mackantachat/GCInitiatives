using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Plant;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly PlantInterface _repository;

        public PlantController(PlantInterface repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            //var addOthers = new List<Plant>();
            //addOthers.Add(new Plant { Id = 9999,PlantId = "P9999", PlantTitle = "Others" });
            var Plants = await _repository.GetList();
            //return Ok(Plants.Union(addOthers));
            return Ok(Plants);
        }
    }
}
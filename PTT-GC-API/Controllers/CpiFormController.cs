using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Models.Forms.Cpi;
using PTT_GC_API.Services;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CpiFormController : ControllerBase
    {
        private readonly ICpiFormService _cpiFormService;
        public CpiFormController(ICpiFormService cpiFormService)
        {
            _cpiFormService = cpiFormService;
        }

        [HttpGet("GetCpiForm/{initiativeId}")]
        public IActionResult GetCpiForm(int initiativeId)
        {
            try
            {
                var result = _cpiFormService.GetCpiForm(initiativeId).GetAwaiter().GetResult();
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("CreateCpiForm")]
        public async Task<IActionResult> InsertCpiForm([FromBody] CpiForms forms)
        {
            var result = await _cpiFormService.InsertCpiDetailForm(forms);
            return Ok(result);
        }

        [HttpPut("UpdateCpiForm")]
        public IActionResult UpdateCpiForm([FromBody] CpiForms forms)
        {
            var result = _cpiFormService.UpdateCpiDetailForm(forms).GetAwaiter().GetResult();
            return Ok(result);
        }

        [HttpPut("UpdateOnlyLessonLearn")]
        public IActionResult UpdateOnlyLessonLearn([FromBody] List<Models.LessonLearned.LessonsLearned> forms)
        {
            return Ok(_cpiFormService.UpdateOnlyLessonLearn(forms).GetAwaiter().GetResult());
        }
    }
}

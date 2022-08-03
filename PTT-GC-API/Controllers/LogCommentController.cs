using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Audit;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LogCommentController :ControllerBase
    {
        private readonly LogCommentInterface _repository;
        private readonly IMapper _mapper;

        public LogCommentController(LogCommentInterface repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> LogComment(int id, LogComment LogComment)
        {
            var Audit = await _repository.GetAudit(id);
            _mapper.Map(LogComment, Audit);
            await _repository.Save();            
            return NoContent();
        }
    }
}
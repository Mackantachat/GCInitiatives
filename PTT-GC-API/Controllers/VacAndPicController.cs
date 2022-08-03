using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.VacPic;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VacAndPicController : ControllerBase
    {
        private readonly VacAndPicInterface _repository;

        public VacAndPicController(VacAndPicInterface repository)
        {
            _repository = repository;
        }

        [HttpGet("getVacTable")]
        public async Task<IActionResult> GetVacTable()
        {
            var initiativesData = await _repository.GetVacAll();
            return Ok(initiativesData);
        }        

        [HttpGet("getVacTable/{id}")]
        public async Task<IActionResult> GetVacTableById(int id)
        {
            var initiativesData = await _repository.GetVac(id);
            return Ok(initiativesData);
        }

        [HttpPost("CreatePic")]
        public async Task<IActionResult> CreatePic(PicListFront picListFront)
        {
            var createPic = await _repository.AddPic(picListFront);
            return Ok(createPic);
        }

        [HttpPost("UpdatePic")]
        public async Task<IActionResult> UpdatePic(PicListFront picListFront)
        {
            var updatePic = await _repository.UpdatePic(picListFront);
            return Ok(updatePic);
        }


        [HttpGet("GetPicAll")]
        public async Task<IActionResult> GetPicAll()
        {
            var initiativesData = await _repository.GetPicAll();
            return Ok(initiativesData);
        }

        [HttpGet("GetPicById/{id}")]
        public async Task<IActionResult> GetPicById(int id)
        {
            var initiativesData = await _repository.GetPicById(id);
            return Ok(initiativesData);
        }

        [HttpGet("GetPicByInitiativeId/{id}")]
        public async Task<IActionResult> GetPicByInitiativeId(int id)
        {
            var initiativesData = await _repository.GetPicByInitiativeId(id);
            return Ok(initiativesData);
        }

        [HttpPost("CreateVac")]
        public async Task<IActionResult> CreateVac(VacListFront vacListFront)
        {
            var createVac = await _repository.AddVac(vacListFront);
            return Ok(createVac);
        }

        [HttpPost("UpdateVac")]
        public async Task<IActionResult> UpdateVac(VacListFront vacListFront)
        {
            var updateVac = await _repository.UpdateVac(vacListFront);
            return Ok(updateVac);
        }

        [HttpGet("GetVacById/{vacId}")]
        public async Task<IActionResult> GetVacById(int vacId)
        {
            var getVacById = await _repository.GetVacById(vacId);
            return Ok(getVacById);
        }

        [HttpGet("GetVacByInitiativeId/{initiativeId}")]
        public async Task<IActionResult> GetVacByInitiativeId(int initiativeId)
        {
            var getVacByInitiativeId = await _repository.GetVacByInitiativeId(initiativeId);
            return Ok(getVacByInitiativeId);
        }


        [HttpPost("Remove/{type}/{vacPicId}")]
        public async Task<IActionResult> RemoveVacPic(string type,int vacPicId)
        {
            var removeVacPic = await _repository.RemoveVacPic(vacPicId,type);
            return Ok(removeVacPic);
        }

        [HttpGet("GetInitiativeMemberList/{initiativeId}")]
        public async Task<IActionResult> GetInitiativeMemberList(int initiativeId)
        {
            var getVacByInitiativeId = await _repository.GetInitiativeMemberList(initiativeId);
            return Ok(getVacByInitiativeId);
        }

    }
}
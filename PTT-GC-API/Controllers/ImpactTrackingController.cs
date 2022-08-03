using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ImpactTracking;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ImpactTrackingController : ControllerBase
    {
        private readonly ImpactTrackingInterface _repository;
        private readonly InitiativeInterface _initiativeRepository;
        private readonly IMapper _mapper;
        public ImpactTrackingController(ImpactTrackingInterface repository, IMapper mapper, InitiativeInterface initiativeRepository)
        {
            _repository = repository;
            _initiativeRepository = initiativeRepository;
            _mapper = mapper;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateImpactTracking(int id, ImpactTrackingCreate impactTrackingCreate)
        {
            impactTrackingCreate.InitiativeId = id;
            var CreateImpactTracking = _mapper.Map<ImpactTracking>(impactTrackingCreate);
            _repository.Add(CreateImpactTracking);
            await _repository.Save();
            return Ok(CreateImpactTracking);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateImpactTracking(int id, ImpactTracking impactTrackingUpdate)
        {
            //var Impact = await _repository.GetImpactTracking(id);
            //impactTrackingUpdate.SIL4Achievement = Impact.SIL4Achievement;
            //impactTrackingUpdate.SIL5Achievement = Impact.SIL5Achievement;
            //impactTrackingUpdate.LastSubmittedSIL4Date = Impact.LastSubmittedSIL4Date;
            //impactTrackingUpdate.LastSubmittedSIL5Date = Impact.LastSubmittedSIL5Date;
            ////_mapper.Map(impactTrackingUpdate, Impact);
            _repository.Update(impactTrackingUpdate);
            await _repository.Save();

            //Impact.TotalRecurring = await _repository.GetTotalRecurring(id);
            //Impact.TotalOnetime = await _repository.GetTotalOnetime(id);

            //var initiative = await _initiativeRepository.GetInitiative(id);
            //if (Impact.TotalRecurring == null && Impact.TotalOnetime == null)
            //{
            //    initiative.BenefitAmount = null;
            //}
            //else
            //{
            //    initiative.BenefitAmount = Impact.TotalRecurring ?? 0 + Impact.TotalOnetime ?? 0;
            //}

            //await _repository.Save();

            //await _initiativeRepository.RunStoreProcedureFixValueMissing(id); //temporary solution to fix data missing!!!

            return Ok(impactTrackingUpdate);
        }

        [HttpPut("ContactIO/{id}")]
        public async Task<IActionResult> ImpactTrackingContactIO(int id, ImpactTrackingContactIO ImpactTrackingContactIO)
        {
            var impact = await _repository.GetImpactTracking(id);
            impact.ContactIO   = ImpactTrackingContactIO.ContactIO;
            impact.ContactIOBy = ImpactTrackingContactIO.ContactIOBy;
            _repository.Update(impact);
            await _repository.Save();
            await _initiativeRepository.CallMicrosoftFlow_SendMail(id, "comment"); // case 5 - every comment send to owner / creator
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImpactTracking(int id)
        {
            var Impact = await _repository.GetImpactTracking(id);
            var impactTracking = _mapper.Map<ImpactTrackingDetail>(Impact);
            return Ok(impactTracking);
        }

        [HttpGet("TotalRecurringOneTime/{id}")]
        public async Task<IActionResult> TotalRecurringOneTime(int id)
        {
            var Impact = await _repository.GetImpactTracking(id);
            decimal? result;
            if (Impact == null) {
                result = 0;
            } else {
                result = Impact.TotalOnetime + Impact.TotalRecurring;
            }
            return Ok(result);
        }

        [HttpGet("TotalCostOPEX/{id}")]
        public async Task<IActionResult> TotalCostOPEX(int id)
        {
            var Impact = await _repository.GetImpactTracking(id);
            decimal? result;
            if (Impact == null) {
                result = 0;
            } else {
                result = Impact.TotalCostOPEX;
            }
            return Ok(result);
        }

        [HttpPost("CreateFirstRunRate/{id}")]
        public async Task<IActionResult> CreateFirstRunRate(int id, FirstRunRateCreate firstRunRateCreate)
        {
            return Ok(await _repository.CreateFirstRunRate(id, firstRunRateCreate));
        }

        [HttpGet("GetFirstRunRate/{id}")]
        public async Task<IActionResult> GetFirstRunRate(int id)
        {
            return Ok(await _repository.GetFirstRunRate(id));
        }

        [HttpPost("CreateImpiemantCost/{id}")]
        public async Task<IActionResult> CreateImpiemantCost (int id, ImpiemantCostCreate impiemantCostCreate)
        {
            return Ok(await _repository.CreateImpiemantCost(id, impiemantCostCreate));
        }

        [HttpDelete("DeleteImpiemantCost/{id}")]
        public async Task<IActionResult> DeleteImpiemantCost (int id)
        {
            await _repository.DeleteImpiemantCost(id);
            return NoContent();
        }

        [HttpGet("GetImpiemantCost/{id}")]
        public async Task<IActionResult> GetImpiemantCost(int id)
        {
            return Ok(await _repository.GetImpiemantCost(id));
        }

        [HttpPost("CreateIndirect/{id}")]
        public async Task<IActionResult> CreateIndirect (int id, IndirectCreate IndirectCreate)
        {
            return Ok(await _repository.CreateIndirect(id, IndirectCreate));
        }

        [HttpGet("GetIndirect/{id}")]
        public async Task<IActionResult> GetIndirect(int id)
        {
            return Ok(await _repository.GetIndirect(id));
        }

        [HttpPost("CreateTypeOfBenefit/{id}")]
        public async Task<IActionResult> CreateTypeOfBenefit(int id, TypeBenefitCreate typeBenefitCreate)
        {
            return Ok(await _repository.CreateTypeOfBenefit(id, typeBenefitCreate));
        }

        [HttpGet("GetTypeOfBenefit/{id}")]
        public async Task<IActionResult> GetTypeOfBenefit(int id)
        {
            return Ok(await _repository.GetTypeOfBenefit(id));
        }

        [HttpPost("CreateShareBenefitWorkstream/{id}")]
        public async Task<IActionResult> CreateWorkstream(int id, CreateWorkstream CreateWorkstream)
        {
            await _repository.CreateWorkstream(id, CreateWorkstream);
            return StatusCode(201);
        }

        [HttpDelete("DeleteShareBenefitWorkstream/{id}")]
        public async Task<IActionResult> DeleteShareBenefitWorkstream (int id)
        {
            await _repository.DeleteShareBenefitWorkstream(id);
            return NoContent();
        }

        [HttpGet("GetImpactAllTracking/{id}")]
        public async Task<IActionResult> GetImpactAllTracking(int id)
        {
            var Impact = await _repository.GetImpactAllTracking(id);
            return Ok(Impact);
        }

        [HttpPost("CreateImpactAllTracking/{actionType}/{id}")]
        public async Task<IActionResult> CreateImpactAllTracking(string actionType, int id, ImpactTrackingCreate impactTrackingCreate)
        {
            impactTrackingCreate.Id = 0;
            impactTrackingCreate.InitiativeId = id;
            var CreateImpactTracking = await _repository.CreateImpactAllTracking(impactTrackingCreate,actionType);
            return Ok(CreateImpactTracking);
        }

        [HttpPut("UpdateImpactAllTracking/{actionType}/{id}")]
        public async Task<IActionResult> UpdateImpactAllTracking(string actionType, int id, ImpactTrackingCreate impactTrackingUpdate)
        {           
            var impactTrackingUpdateReturn = await _repository.UpdateImpactAllTracking(impactTrackingUpdate,actionType);
            return Ok(impactTrackingUpdateReturn);
        }
    }
}
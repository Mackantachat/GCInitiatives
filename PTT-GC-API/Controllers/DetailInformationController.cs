using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.DetailMaxInformation;
using PTT_GC_API.Models.DetailInformation;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DetailInformationController : ControllerBase
    {
        private readonly DetailInformationInterface _repository;
        private readonly IMapper _mapper;
        public DetailInformationController(DetailInformationInterface repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateDetailInformation(int id, DetailInformationFront CreateDetailInformation)
        {
            DateTime now = DateTime.Now;
            CreateDetailInformation.InitiativeId = id;

            // var DetailInformation = _mapper.Map<DetailInformation_Old>(CreateDetailInformation);
            var detailinformation = _mapper.Map<DetailInformation_Old>(CreateDetailInformation);
            detailinformation.SponsorEvp = CreateDetailInformation.ProjectSponsor;
            _repository.Add(detailinformation);

            //add team Support and Comment
            if (CreateDetailInformation.TeamSupports != null)
            {
                await _repository.CreateTeamSupports(id, CreateDetailInformation.TeamSupports);
            }

            if (CreateDetailInformation.TeamSupportComments != null)
            {
                await _repository.CreateTeamSupportComments(id, CreateDetailInformation.TeamSupportComments);
            }
            await _repository.Save();
            return Ok(detailinformation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDetailInformation(int id, DetailInformationFront UpdateDetailInformation)
        {
            UpdateDetailInformation.InitiativeId = id;
            var detailinformation = _mapper.Map<DetailInformation_Old>(UpdateDetailInformation);
            detailinformation.SponsorEvp = UpdateDetailInformation.ProjectSponsor;
            _repository.Update(detailinformation);

            //add team Support and Comment
            if (UpdateDetailInformation.TeamSupports != null)
            {
                await _repository.CreateTeamSupports(id, UpdateDetailInformation.TeamSupports);
            }

            if (UpdateDetailInformation.TeamSupportComments != null)
            {
                await _repository.CreateTeamSupportComments(id, UpdateDetailInformation.TeamSupportComments);
            }
            await _repository.Save();
            return Ok(detailinformation);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetailInformation(int id)
        {
            var List = await _repository.GetDetailInformation(id);
            if (List == null)
            {
                return Ok();
            }
            var DetailInformation = _mapper.Map<DetailInformationFront>(List);
            List<TeamSupports> teamSupports = await _repository.GetTeamSupports(id);
            List<TeamSupportComments> teamSupportComments = await _repository.GetTeamSupportComments(id);

            if (DetailInformation != null && List != null)
            {
                DetailInformation.ProjectSponsor = List.SponsorEvp;
            }

            if(teamSupports  != null)
            {
                List<string> teams = new List<string>();
                foreach (var entity in teamSupports)
                {
                    teams.Add(entity.TeamSupportName);
                }
                DetailInformation.TeamSupports = teams;
            }
            else
            {
                DetailInformation.TeamSupports = new List<string>();
            }

            if(teamSupportComments != null)
            {
                DetailInformation.TeamSupportComments = teamSupportComments;
            }
            else
            {
                DetailInformation.TeamSupportComments = new List<TeamSupportComments>();
            }

            return Ok(DetailInformation);
        }

        [HttpPost("CreateKpi/{id}")]
        public async Task<IActionResult> CreateKpiDetailInformation(int id, CreateKpiDetailInformation CreateKpiDetailInformation)
        {
            await _repository.CreateKpiDetailInformation(id, CreateKpiDetailInformation);
            return StatusCode(201);
        }

        //-----------------------------------------------------
        [HttpPost("CreateDetailPimGate/{id}")]
        public async Task<IActionResult> CreateDetailPimGate(PimGateCreate pg, int id)
        {
            var x = await _repository.CreateDetailPimGate(pg, id);
            return Ok(x);
        }

        [HttpPut("UpdateDetailPimGate/{id}")]
        public async Task<IActionResult> UpdateDetailPimGate(PimGateCreate pg, int id)
        {
            var x = await _repository.UpdateDetailPimGate(pg, id);
            return Ok(x);
        }

        [HttpGet("GetDetailPimGate/{id}/{gate}")]
        public async Task<IActionResult> GetDetailPimGate(int id, int gate)
        {
            var x = await _repository.GetDetailPimGate(id, gate);
            return Ok(x);
        }

        [HttpPost("UpdateHighlightWork/{id}")]
        public async Task<IActionResult> UpdateHighlightWork(int id, HighlightWork data)
        {
            var x = await _repository.UpdateHighlightWork(id, data);
            return Ok(x);
        }
        [HttpDelete("DeleteTeamSupportComment/{id}")]
        public async Task<IActionResult> DeleteTeamSupportComment(int id)
        {
            var x = await _repository.DeleteTeamSupportComment(id);
            return Ok(x);
        }
        [HttpPost("SendEmailTeamSupport/{id}")]
        public async Task<IActionResult> SendEmailTeamSupport(int id)
        {
            await _repository.SendEmailTeamSupport(id);
            return Ok();
        }
        [HttpGet("ShowPimGate/{id}")]
        public async Task<IActionResult> ShowPimGate(int id)
        {
           var gateConfig = await _repository.ShowPimGate(id);
            return Ok(gateConfig);
        }
    }
}
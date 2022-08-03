using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Setting;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingController : ControllerBase
    {
        private readonly SettingInterface _repository;
        private readonly IMapper _mapper;
        public SettingController(SettingInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;

        }
        [Route("GetSetting")]
        [HttpGet]
        public async Task<IActionResult> GetSetting([FromQuery] SettingParams SettingParams)
        {
            var initiativesData = await _repository.GetSetting(SettingParams);
            var initiatives = _mapper.Map<IEnumerable<Setting>>(initiativesData);
            Response.AddPagination(initiativesData.CurrentPage, initiativesData.PageSize, initiativesData.TotalCount, initiativesData.TotalPages);
            return Ok(initiatives);
        }

        [Route("GetInitiativeSetting")]
        [HttpGet]
        public async Task<IActionResult> GetInitiativeSetting()
        {
            var setting = await _repository.GetInitiativeSetting();
            SetDateWitOutTime(setting);
            return Ok(setting);
        }

        [Route("CreateSetting")]
        [HttpPost]
        public async Task<IActionResult> CreatePerformanceInactive(Setting settingdata)
        {
            try
            {
                SetDateWitOutTime(settingdata);
                var setting = _mapper.Map<Setting>(settingdata);
                _repository.Add(setting);
                await _repository.Save();
                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }

        [Route("UpdateSetting")]
        [HttpPost]
        public async Task<IActionResult> UpdatePerformanceInactive(Setting SettingUpdate)
        {
            try
            {

                var id = SettingUpdate.SettingId;
                var DataSettingUpdate = await _repository.GetSetting(id);
                if (DataSettingUpdate == null)
                {
                    return Ok("Not insert");
                }
                // DataSettingUpdate.InitiativeCodeFormat = SettingUpdate.InitiativeCodeFormat.ToString();
                DataSettingUpdate.PeriodForKeeping = SettingUpdate.PeriodForKeeping;
                DataSettingUpdate.IsAvailablePeriodAnnual = SettingUpdate.IsAvailablePeriodAnnual;              
                DataSettingUpdate.StartPeriodAnnual = SettingUpdate.StartPeriodAnnual.HasValue ? SettingUpdate.StartPeriodAnnual.Value.ToLocalTime().Date :(DateTime?)null;               
                DataSettingUpdate.FinishPeriodAnnual = SettingUpdate.FinishPeriodAnnual.HasValue? SettingUpdate.FinishPeriodAnnual.Value.ToLocalTime().Date : (DateTime?)null;
                DataSettingUpdate.IsAvailablePeriodMid = SettingUpdate.IsAvailablePeriodMid;
                DataSettingUpdate.StartPeriodMid =  SettingUpdate.StartPeriodMid.HasValue ? SettingUpdate.StartPeriodMid.Value.ToLocalTime().Date : (DateTime?)null;
                DataSettingUpdate.FinishPeriodMid =  SettingUpdate.FinishPeriodMid.HasValue ? SettingUpdate.FinishPeriodMid.Value.ToLocalTime().Date : (DateTime?)null;
                DataSettingUpdate.IsAvailableBudgetPool = SettingUpdate.IsAvailableBudgetPool;
                DataSettingUpdate.StartPeriodBudgetPool =  SettingUpdate.StartPeriodBudgetPool.HasValue ? SettingUpdate.StartPeriodBudgetPool.Value.ToLocalTime().Date : (DateTime?)null;
                DataSettingUpdate.FinishPeriodBudgetPool =  SettingUpdate.FinishPeriodBudgetPool.HasValue ? SettingUpdate.FinishPeriodBudgetPool.Value.ToLocalTime().Date : (DateTime?)null;
                DataSettingUpdate.IsActiveITBudgetSurvey = SettingUpdate.IsActiveITBudgetSurvey;
                DataSettingUpdate.StartPeriodIT = SettingUpdate.StartPeriodIT.HasValue ? SettingUpdate.StartPeriodIT.Value.ToLocalTime().Date : (DateTime?)null;
                DataSettingUpdate.FinishPeriodIT =  SettingUpdate.FinishPeriodIT.HasValue ? SettingUpdate.FinishPeriodIT.Value.ToLocalTime().Date : (DateTime?)null;
                DataSettingUpdate.IL4TrackingPeriod = SettingUpdate.IL4TrackingPeriod;
                DataSettingUpdate.OneTimeBenefit = SettingUpdate.OneTimeBenefit;
                SetDateWitOutTime(DataSettingUpdate);
                _repository.Update(DataSettingUpdate);
                await _repository.Save();
                return Ok("SUCCESS");
            }
            catch (Exception ex)
            {
                return Ok("ERROR");
            }
        }
        public void SetDateWitOutTime(Setting settingdata)
        {
            settingdata.StartPeriodAnnual = settingdata.StartPeriodAnnual.Value.Date;
            settingdata.FinishPeriodAnnual = settingdata.FinishPeriodAnnual.Value.Date;
            settingdata.StartPeriodBudgetPool = settingdata.StartPeriodBudgetPool.Value.Date;
            settingdata.FinishPeriodBudgetPool = settingdata.FinishPeriodBudgetPool.Value.Date;
            settingdata.StartPeriodIT = settingdata.StartPeriodIT.Value.Date;
            settingdata.FinishPeriodIT = settingdata.FinishPeriodIT.Value.Date;
            settingdata.StartPeriodMid = settingdata.StartPeriodMid.Value.Date;
            settingdata.FinishPeriodMid = settingdata.FinishPeriodMid.Value.Date;
        }

    }

}

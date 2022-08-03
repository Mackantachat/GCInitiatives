using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.Initiative;
using Xunit;

namespace XUnitTestInitiatives
{
    public class UnitTestInitiative
    {
        private readonly InitiativeInterface _repository;
        private readonly IMapper _mapper;
        public UnitTestInitiative(InitiativeInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        private async Task<string> InitiativeCode()
        {
            DateTime now = DateTime.Now;
            var Year = now.Year;
            string code;
            if (await _repository.Any())
            {
                var last = await _repository.LastInitiative();
                string[] words = last.InitiativeCode.Split('/');
                int lastCode = Int32.Parse(words[0]);
                int InitiativeId = ++lastCode;
                code = InitiativeId.ToString("D6") + "/" + Year.ToString();
            }
            else
            {
                code = "000001/" + Year.ToString();
            }
            return code;
        }


        InitiativeCreate initiativeCreate;
        InitiativeParams InitiativeParams;

        [Fact] // Create
        public async void CreateInitiative()
        {
            initiativeCreate.InitiativeCode = await InitiativeCode();
            var initiative = _mapper.Map<Initiative>(initiativeCreate);
            _repository.Add(initiative);
            await _repository.Save();
            // return Ok(initiative);
        }

        [Fact] // Get & Search
        public async void GetInitiatives()
        {
            var initiativesData = await _repository.GetInitiatives(InitiativeParams);
            var initiatives     = _mapper.Map<IEnumerable<InitiativeList>>(initiativesData);
            // return Ok(initiatives);
        }
    }
}
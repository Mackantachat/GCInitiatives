using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.Initiative;
using System;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Extensions.Options;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.CapexInformation;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailCapexsController : ControllerBase
    {
        private readonly DetailCapexsInterface _DetailCapexs;
        private readonly IMapper _mapper;

        public DetailCapexsController(DetailCapexsInterface DetailCapexs, IMapper mapper)
        {
            _DetailCapexs = DetailCapexs;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateDetailCapex(DetailCapexsCreate DetailCapexs)
        {
            var DetailCapex = _mapper.Map<DetailCapex>(DetailCapexs);
            _DetailCapexs.Add(DetailCapex);
            await _DetailCapexs.Save();            
            return Ok(DetailCapex);
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Master;
using PTT_GC_API.Dtos.Owner;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Permission;
using PTT_GC_API.Models.Role;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        private readonly MasterDataInterface _repository;
        private readonly IMapper _mapper;
        public MasterController(MasterDataInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        [Route("GetOwner")]
        public async Task<IActionResult> GetOwner([FromQuery] PagingParam Param)
        {
            var ropositoryData = await _repository.GetOwner(Param);
            var mapperData = _mapper.Map<IEnumerable<OwnerList>>(ropositoryData);
            Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
            return Ok(ropositoryData);
        }

        [HttpGet]
        [Route("GetAction")]
        public async Task<IActionResult> GetAction([FromQuery] PagingParam Param)
        {
            var ropositoryData = await _repository.GetAction(Param);
            var mapperData = _mapper.Map<IEnumerable<ActionList>>(ropositoryData);
            Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
            return Ok(ropositoryData);
        }

        [HttpGet]
        [Route("GetRoleDetail")]
        public async Task<IActionResult> GetRoleDetail([FromQuery] PagingParam Param)
        {
            var ropositoryData = await _repository.GetRoleDetail(Param);
            var mapperData = _mapper.Map<IEnumerable<RoleList>>(ropositoryData);
            Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
            return Ok(ropositoryData);
        }

        [HttpGet]
        [Route("GetRoleDetailById/{id}")]
        public async Task<IActionResult> GetRoleDetailById(int id)
        {
            var ropositoryData = await _repository.GetRoleDetailById(id);
            var mapperData = _mapper.Map<RoleMasterModel>(ropositoryData);
            return Ok(ropositoryData);
        }

        [HttpGet]
        [Route("GetPermissionMaster")]
        public async Task<IActionResult> GetPermissionMaster([FromQuery] PagingParam Params)
        {
            var ropositoryData = await _repository.GetPermissionMaster(Params);
            var mapperData = _mapper.Map<IEnumerable<PermissionMaster>>(ropositoryData);
            Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
            return Ok(ropositoryData);
        }


        [HttpGet]
        [Route("GetScreenObject")]
        public async Task<IActionResult> GetScreenObject([FromQuery] PagingParam Params)
        {
            var ropositoryData = await _repository.GetScreenObject(Params);
            var mapperData = _mapper.Map<IEnumerable<ScreenObjectList>>(ropositoryData);
            Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
            return Ok(ropositoryData);
        }

        [HttpGet]
        [Route("GetUserRole")]
        public async Task<IActionResult> GetUserRole([FromQuery] string email)
        {
            var ropositoryData = await _repository.GetUserRole(email);
            var mapperData = _mapper.Map<IEnumerable<UserRoleList>>(ropositoryData);
            Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
            return Ok(ropositoryData);
        }

        [HttpGet]
        [Route("GetBU")]
        public async Task<IActionResult> GetBU()
        {
            var ropositoryData = await _repository.GetBU();
            var mapperData = _mapper.Map<IEnumerable<BU>>(ropositoryData);
            Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
            return Ok(ropositoryData);
        }

        [HttpGet]
        [Route("GetPosition")]
        public async Task<IActionResult> GetPosition()
        {
            var ropositoryData = await _repository.GetPosition();
            var mapperData = _mapper.Map<IEnumerable<Position>>(ropositoryData);
            Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
            return Ok(ropositoryData);
        }

        [HttpGet]
        [Route("GetWorkStream")]
        public async Task<IActionResult> GetWorkStream()
        {
            var ropositoryData = await _repository.GetWorkStream();
            var mapperData = _mapper.Map<IEnumerable<WorkStream2>>(ropositoryData);
            Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
            return Ok(ropositoryData);
        }

        //[HttpGet]
        //[Route("GetPoolType")]
        //public async Task<IActionResult> GetPoolType()
        //{
        //    var ropositoryData = await _repository.GetPoolType();
        //    var mapperData = _mapper.Map<IEnumerable<PoolType>>(ropositoryData);
        //    Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
        //    return Ok(ropositoryData);
        //}

        //[HttpGet]
        //[Route("GetCompany")]
        //public async Task<IActionResult> GetCompany()
        //{
        //    var ropositoryData = await _repository.GetCompany();
        //    var mapperData = _mapper.Map<IEnumerable<Company>>(ropositoryData);
        //    Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
        //    return Ok(ropositoryData);
        //}

        //[HttpGet]
        //[Route("GetOrganization")]
        //public async Task<IActionResult> GetOrganization()
        //{
        //    var ropositoryData = await _repository.GetOrganization();
        //    var mapperData = _mapper.Map<IEnumerable<Organization>>(ropositoryData);
        //    Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
        //    return Ok(ropositoryData);
        //}

        //[HttpGet]
        //[Route("GetStateGate")]
        //public async Task<IActionResult> GetStateGate()
        //{
        //    var ropositoryData = await _repository.GetStateGate();
        //    var mapperData = _mapper.Map<IEnumerable<StateGate>>(ropositoryData);
        //    Response.AddPagination(ropositoryData.CurrentPage, ropositoryData.PageSize, ropositoryData.TotalCount, ropositoryData.TotalPages);
        //    return Ok(ropositoryData);
        //}

        [HttpPost]
        [Route("CreateRoleDetail")]
        public async Task<IActionResult> CreateRoleDetail(RoleDetail Param)
        {
            var ropositoryData = await _repository.CreateRoleDetail(Param);
            var mapperData = _mapper.Map<List<RoleScreen>>(ropositoryData);
            return Created("CreateRoleDetail", ropositoryData);
        }

        [HttpPost]
        [Route("SaveRoleDetail")]
        public async Task<IActionResult> SaveRoleDetail(RoleMasterModel Param)
        {
            var ropositoryData = await _repository.SaveRoleDetail(Param);
            var mapperData = _mapper.Map<List<RoleScreen>>(ropositoryData);
            return Ok(ropositoryData);
        }
    }
}

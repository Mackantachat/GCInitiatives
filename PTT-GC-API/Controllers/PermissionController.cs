using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Permission;
using PTT_GC_API.Services.Permission;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly PermissionInterface _repository;
        private readonly IPermissionService _permissionService;

        public PermissionController(PermissionInterface repository, IPermissionService permissionService)
        {
            _repository = repository;
            _permissionService = permissionService;
        }
        //[AllowAnonymous]
        [HttpPost("Overview")]
        public async Task<IActionResult> CheckOverviewPermission(Overview overview)
        {
            var result = await _repository.CheckOverviewPermission(overview);
            return Ok(result);
        }

        //[AllowAnonymous]
        [HttpPost("Dashboard")]
        public async Task<IActionResult> CheckDashboardPermission(Dashboard dashboard)
        {
            var result = await _repository.CheckDashboardPermission(dashboard);
            return Ok(result);
        }
        
        //[AllowAnonymous]
        [HttpPost("Setting")]
        public async Task<IActionResult> CheckSettingPermission(Setting setting)
        {
            var result = await _repository.CheckSettingPermission(setting);
            return Ok(result);
        }

        [HttpGet("checksectionname")]
        public async Task<IActionResult> checksectionname(string email, string page, int initiativeId)
        {
            //CheckPermission cp = new CheckPermission();
            //cp.Email = "akrapon.s@frontiscompany.com";
            //cp.Page = "impact";
            //var aa = new List<string> { "1", "2", "3", cp.Email, cp.Page };

            var initiativesData = await _repository.GetListPermission(email, page, initiativeId);

            return Ok(initiativesData);
        }


        [HttpGet("checkpermission")]
        public async Task<IActionResult> checkpermission(string email, string page, int initiativeId)
        { 
            var permissionData = await _repository.GetListPermission(email, page, initiativeId); 
            return Ok(permissionData);
        }

        public class RolesParams
        { 
            public string Email { get; set; }
            public int? Id { get; set; }
        }
        
        public class PermissionParams
        { 
            public string Email { get; set; }
        }

        // Implement Real Permission
        [HttpPost("GetRolesDetailList")]
        public async Task<IActionResult> GetRolesDetailList(RolesParams rp)
        {
            var permissionData = await _repository.GetRolesDetailList(rp.Email, rp.Id == null ? 0 : rp.Id);
            return Ok(permissionData);
        }

        [HttpGet("checkAccesspagespermission")]
        public async Task<IActionResult> checkAccesspagespermission(string email)
        {
            var permissionData = await _repository.Checkpermission(email, null, "Access", null);
            return Ok(permissionData);
        }

        [HttpPost("GetPermissionsByEmail")]
        public async Task<IActionResult> GetPermissionsByEmail(PermissionParams permissionParams)
        {
            var permissionData = await _permissionService.GetPermissionsByEmail(permissionParams.Email);
            return Ok(permissionData);
        }


    }
}
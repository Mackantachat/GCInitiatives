using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.User;

namespace PTT_GC_API.Controllers
{
    // [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserInterface _repository;
        private readonly IMapper _mapper;
        public UserController(UserInterface repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var usersData = await _repository.GetUsers();
            var users = _mapper.Map<IEnumerable<UserList>>(usersData);
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> GetUser([FromBody]UserName user)
        {
            var userData = await _repository.GetUserName(user.Username);
            if (userData.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var information = _mapper.Map<UserDetail>(userData);
            return Ok(information);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(int id, [FromBody]UserEdit userEdit)
        {
            var userData = await _repository.GetUser(id);
            var user = _mapper.Map(userEdit, userData);
            if (await _repository.Save()) return NoContent();
            return BadRequest();
        }
    }
}
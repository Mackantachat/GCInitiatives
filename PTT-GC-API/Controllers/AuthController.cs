using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.User;
using PTT_GC_API.Models.User;
using PTT_GC_API.Helpers;
using System;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace PTT_GC_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthInterface _repository;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(AuthInterface repository, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _repository = repository;
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegister userRegister)
        {
            userRegister.Username = userRegister.Username.ToLower();
            if (await _repository.UserExists(userRegister.Username))
                return BadRequest("Username already exists");

            var userCreate = _mapper.Map<User>(userRegister);

            var createdUser = await _repository.Register(userCreate, userRegister.Password);

            var user = _mapper.Map<UserDetail>(createdUser);

            return Ok(user);
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLogin userLogin)
        {
            var userRepository = await _repository.Login(userLogin.Username.ToLower(), userLogin.Password);

            if (userRepository == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userRepository.Id.ToString()),
                new Claim(ClaimTypes.Name, userRepository.Username),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:SecretKey").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserList>(userRepository);

            return Ok(new { token = tokenHandler.WriteToken(token), user.Username });
        }
        [AllowAnonymous]
        [HttpPost("userExists")]
        public async Task<bool> UserExists(UserExists userExists)
        {
            userExists.Username = userExists.Username.ToLower();
            if (await _repository.UserExists(userExists.Username)) return true;
            return false;
        }
    }
}
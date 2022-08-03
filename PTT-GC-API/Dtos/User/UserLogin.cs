using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Dtos.User
{
    public class UserLogin
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
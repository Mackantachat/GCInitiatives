using System;
using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Dtos.User
{
    public class UserRegister
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public UserRegister()
        {
            Created    = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}
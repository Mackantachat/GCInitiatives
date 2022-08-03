using System;
using System.Collections.Generic;
using PTT_GC_API.Models.User;

namespace PTT_GC_API.Dtos.User
{
    public class UserDetail
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
    }
}
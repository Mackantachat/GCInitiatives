using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Permission
{
    public class UserManagement
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public bool? IsIgnoreHrWebService { get; set; }
    }
}

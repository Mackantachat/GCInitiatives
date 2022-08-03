using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Role
{
    public class UserManagement2
    {
        [Key]
        public int UserManagementId { get; set; }
        public string EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
        public string BU { get; set; }
        public string Email { get; set; }
        public string Workstream { get; set; }
        public string Remark { get; set; }
    }
}

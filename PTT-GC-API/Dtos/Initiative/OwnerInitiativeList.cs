using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Initiative
{
    public class OwnerInitiativeList
    {
        public string EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string OwnerName { get; set; }
        public string PositionTextEN { get; set; }
        public string BUText { get; set; }
        public string WorkstreamTitle { get; set; }
        public string RoleName { get; set; }
        public string CreateOn { get; set; }
        public string Remark { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.DetailInformation
{
    public class TeamSupportComments
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public string EmployeeID { get; set; }
        public string TeamSupportName { get; set; }
        public string Comment { get; set; }
    }
}

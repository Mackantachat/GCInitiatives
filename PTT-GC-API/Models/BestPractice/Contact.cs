using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.BestPractice
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public int ContactNo { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}

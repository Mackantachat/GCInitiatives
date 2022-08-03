using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.IF
{
    public class InterfaceActionLog
    {
        [Key]
        public int Id { get; set; }
        public int? InitiativeId { get; set; }
        public DateTime? ActionDate { get; set; }
        public string InterfaceType { get; set; }
        public string InterfaceAction { get; set; }
        public string ResponseData { get; set; }
    }
}

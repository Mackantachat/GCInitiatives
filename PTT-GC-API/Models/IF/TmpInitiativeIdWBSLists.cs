using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.IF
{
    public class TmpInitiativeIdWBSLists
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public string Mark { get; set; }
    }
}

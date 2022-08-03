using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models
{
    public class TmpInitiativeCodeIF
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string IFType { get; set; }
        public int InitiativeId { get; set; }
        public DateTime? CreatedDate { get; set; }
        [StringLength(100)]
        public string Remark { get; set; }

    }
}

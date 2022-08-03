using PTT_GC_API.Dtos.Kri;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.KRI
{
    public class KriModel
    {
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public bool IsDeleted { get; set; }
        public int Year { get; set; }
        public string Status { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Owner { get; set; }
    }
}

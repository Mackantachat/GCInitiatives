using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.KRI
{
    public class KriMitigation
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public int Year { get; set; }
        public string MitigationMonth1 { get; set; }
        public string MitigationMonth2 { get; set; }
        public string MitigationMonth3 { get; set; }
        public string MitigationMonth4 { get; set; }
        public string MitigationMonth5 { get; set; }
        public string MitigationMonth6 { get; set; }
        public string MitigationMonth7 { get; set; }
        public string MitigationMonth8 { get; set; }
        public string MitigationMonth9 { get; set; }
        public string MitigationMonth10 { get; set; }
        public string MitigationMonth11 { get; set; }
        public string MitigationMonth12 { get; set; }
    }
}

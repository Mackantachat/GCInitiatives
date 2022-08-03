using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models
{
    public class RiskKRI
    {
        [Key]
        public int Id { get; set; }
        public int RiskId { get; set; }
        public int KriNo { get; set; }
        public string KriTarget { get; set; }
        public string KriTolerance { get; set; }
        public string KriStatus { get; set; }
        public string KriProgress { get; set; }
        public bool IsDeleted { get; set; }
    }
}

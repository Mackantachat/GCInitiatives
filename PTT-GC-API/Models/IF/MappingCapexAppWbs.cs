using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.IF
{
    public class MappingCapexAppWbs
    {
        [Key]
        public int Id { get; set; }
        public DateTime? GeneratedDate { get; set; }
        public string InitiativeCAPEXNo { get; set; }
        public int? RevisionNo { get; set; }
        public string AppRequestNumber { get; set; }
        public DateTime? AppRequestCreatedOn { get; set; }
        public string WBSNo { get; set; }
        public DateTime? WBSCreatedOn { get; set; }
        public int? CompanyCode { get; set; }
        public string IMPosition { get; set; }
        public int ApprovedYear { get; set; }
        public bool? DistributedToWBS { get; set; }
        public bool? SentEmail { get; set; }
        public DateTime? ChangedOn { get; set; }
        public string ChangedBy { get; set; }
    }
}

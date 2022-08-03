using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.DimMaxHandover
{
    public class DimMaxHandover
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        // Checkbox Part
        public bool? IsDeliverables { get; set; }
        public bool? IsCommunicationOrTraining { get; set; }
        public bool? IsAllIssueClosed { get; set; }
        public bool? IsOperationSupport { get; set; }
        public bool? IsOther { get; set; }
        public string CommentDeliverables { get; set; }
        public string CommentCommunicationOrTraining { get; set; }
        public string CommentAllIssueClosed { get; set; }
        public string CommentOperationSupport { get; set; }
        public string CommentOther { get; set; }

        // On-going Project Cost
        [Column(TypeName = "decimal(18,2)")]
        public decimal? LicenseOrSubscriptionFee { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? SupportFee { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? FinishDate { get; set; }

        public bool? IsAcceptHandover { get; set; }
        public DateTime? AcceptDate { get; set; }

        public bool? EngineerEmail { get; set; }
        public string HandoverforIT { get; set; }
        public bool? IsRequestITHandover { get; set; }
    }
}

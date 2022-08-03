using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.VacPic
{
    public class InitiativeMember
    {
        [Key]
        public int InitiativeMemberId { get; set; }
        public int VacPicId { get; set; }
        public string MemberType { get; set; } // pic, vac
        public int InitiativeId { get; set; }
        public string InitiativeCode { get; set; }
        public string Name { get; set; }
        public string OwnerName { get; set; }
        public string InitiativeType { get; set; }
        public string Plant { get; set; }
        public string EmocNo { get; set; }
        public string Gate { get; set; }
        public string Presentation { get; set; }
        public string Pdd { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? OverallCostEst { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? RequestCapex { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? CostEstCapexType { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? RequestOpex { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? FxExchange { get; set; }
        public string CostEstOpexType { get; set; }
        public string Result { get; set; }
        public string Stage { get; set; }
        public string Process { get; set; }
        public string InitiativeStatus { get; set; }

    }
}

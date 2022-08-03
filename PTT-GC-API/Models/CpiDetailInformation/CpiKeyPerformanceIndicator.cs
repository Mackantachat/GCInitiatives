using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Models.CpiDetailInformationData
{
    public class CpiKeyPerformanceIndicator
    {
        [Key]
        public int Id { get; set;}
        public int InitiativeId { get; set; }
        [StringLength(500)]
        public string KpiTitle { get; set; }

        //[Column(TypeName = "decimal(18,2)")]
        //public decimal? Baseline { get; set; }
        //[Column(TypeName = "decimal(18,2)")]
        //public decimal? Target { get; set; }

      
        public string Baseline { get; set; }
        public string Target { get; set; }




        public string Unit { get; set; }
        [StringLength(500)]
        public string Remark { get; set; }
        
    }
}

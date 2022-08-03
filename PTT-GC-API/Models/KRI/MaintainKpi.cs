using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.KRI
{
    public class MaintainKpi
    {
        [Key]
        public int KpiMaintainId { get; set; }
        public int? InitiativeId { get; set; }
        //[MaxLength(200)]
        public string KpiName { get; set; }
        //[MaxLength(200)]
        public string ScoreText1 { get; set; }
        public int? ScoreLevel1 { get; set; }
        //[MaxLength(200)]
        public string ScoreText2 { get; set; }
        public int? ScoreLevel2 { get; set; }
        //[MaxLength(200)]
        public string ScoreText3 { get; set; }
        public int? ScoreLevel3 { get; set; }
        //[MaxLength(200)]
        public string ScoreText4 { get; set; }
        public int? ScoreLevel4 { get; set; }
        //[MaxLength(200)]
        public string ScoreText5 { get; set; }
        public int? ScoreLevel5 { get; set; }
        [MaxLength(4)]
        public string Year { get; set; }
        public bool? IsActive { get; set; }

    }
}

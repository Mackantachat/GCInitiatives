using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Kri
{
    public class MaintainKpiDetail
    {
        public int KpiMaintainId { get; set; }
        public int? InitiativeId { get; set; }
        public string KpiName { get; set; }
        public string ScoreText1 { get; set; }
        public int? ScoreLevel1 { get; set; }
        public string ScoreText2 { get; set; }
        public int? ScoreLevel2 { get; set; }
        public string ScoreText3 { get; set; }
        public int? ScoreLevel3 { get; set; }
        public string ScoreText4 { get; set; }
        public int? ScoreLevel4 { get; set; }
        public string ScoreText5 { get; set; }
        public int? ScoreLevel5 { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.KRI
{
    public class KriDetailMonth
    {
        [Key]
        public int KriDetailMonthId { get; set; }
        public int? KpiMaintainId { get; set; }
        public int? InitiativeId { get; set; }
        [MaxLength(4)]
        public string Year { get; set; }
        [MaxLength(20)]
        public string KriType { get; set; }
        //[MaxLength(300)]
        public string KriDetail { get; set; }

       
        public int? JanScore { get; set; }
        //[MaxLength(50)]
        public string JanColor { get; set; }

        public int? FebScore { get; set; }
        //[MaxLength(50)]
        public string FebColor { get; set; }

        public int? MarScore { get; set; }
        //[MaxLength(50)]
        public string MarColor { get; set; }

        public int? AprScore { get; set; }
        //[MaxLength(50)]
        public string AprColor { get; set; }

        public int? MayScore { get; set; }
        //[MaxLength(50)]
        public string MayColor { get; set; }

        public int? JunScore { get; set; }
        //[MaxLength(50)]
        public string JunColor { get; set; }

        public int? JulScore { get; set; }
        //[MaxLength(50)]
        public string JulColor { get; set; }

        public int? AugScore { get; set; }
        //[MaxLength(50)]
        public string AugColor { get; set; }

        public int? SepScore { get; set; }
        //[MaxLength(50)]
        public string SepColor { get; set; }

        public int? OctScore { get; set; }
        //[MaxLength(50)]
        public string OctColor { get; set; }

        public int? NovScore { get; set; }
        //[MaxLength(50)]
        public string NovColor { get; set; }

        public int? DecScore { get; set; }
        //[MaxLength(50)]
        public string DecColor { get; set; }

        public int? KriOrder { get; set; }
        public bool? IsAction { get; set; }

        //[MaxLength(300)]
        public string ExecutionKri { get; set; }
        //[MaxLength(300)]
        public string Target1 { get; set; }
        //[MaxLength(300)]
        public string Target2 { get; set; }
        //[MaxLength(300)]
        public string Target3 { get; set; }


    }
}

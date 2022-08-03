using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.KRI
{
    public class KriProgressDetail
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public int Year { get; set; }
        public string ProgressDetailMonth1 { get; set; }
        public string ProgressDetailMonth2 { get; set; }
        public string ProgressDetailMonth3 { get; set; }
        public string ProgressDetailMonth4 { get; set; }
        public string ProgressDetailMonth5 { get; set; }
        public string ProgressDetailMonth6 { get; set; }
        public string ProgressDetailMonth7 { get; set; }
        public string ProgressDetailMonth8 { get; set; }
        public string ProgressDetailMonth9 { get; set; }
        public string ProgressDetailMonth10 { get; set; }
        public string ProgressDetailMonth11 { get; set; }
        public string ProgressDetailMonth12 { get; set; }
    }
}

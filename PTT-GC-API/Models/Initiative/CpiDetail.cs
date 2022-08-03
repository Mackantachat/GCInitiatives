using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Initiative
{
    public class CpiDetail
    {
        [Key]
        public int CpiDetailId { get; set; }
        public int? InitiativeId { get; set; }

        //Initiative Detail
        [StringLength(150)]
        public string SourceofImprovement { get; set; }  //Dropdown
        [StringLength(150)]
        public string TypeOfCpi { get; set; } //Dropdown
        [StringLength(150)]
        public string TypeOfPerformance { get; set; } //Dropdown

        //Background from General's Page
        //Objective from General's Page
        // Key Performance Indicator
        [StringLength(150)]
        public string AnalysisTool { get; set; } //Dropdown
        [StringLength(150)]
        public string RootCause { get; set; } //Dropdown

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualCapexThb { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualOpexThb { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBenefitThb { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.BestPractice
{
    public class BestPracticeModel
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public bool IsBestPracticeRequired { get; set; }
        public string KnowledgeType { get; set; }
        public string SharedTo { get; set; }
        public bool IsPublishToOpex { get; set; }
        public string SharedPracticeType { get; set; }
        public string Title { get; set; }
        public string KnowledgeOwner { get; set; }
        public string Company { get; set; }
        //public string Plant { get; set; }
        //public string Organization { get; set; }
        public bool IsDigitalization { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? YearOfBestPractice { get; set; }
        public int? LifeTimeOfProject { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? Investment { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? ProjectCost { get; set; }
        public string AbstractSummary { get; set; }
        public string AbstractDetails { get; set; }
        public string Objective { get; set; }
        //[Column(TypeName = "decimal(18,3)")]
        public string BenefitDescription { get; set; }
        public string KnowledgeTheme { get; set; }
        public string EnterpriseKeyword { get; set; }
        public string CaptureMethod { get; set; }
        public string CaptureMethodNote { get; set; }
        public string TargetGroupNote { get; set; }
        public string ApplyFrom { get; set; }
        public string ApplyFromOpEx { get; set; }
        public string BusinessLine { get; set; }
        public string ProjectType { get; set; }
        public string OemsElement { get; set; }
        public string Application { get; set; }
        public string OperationFunction { get; set; }
        public string OperationUnit { get; set; }
        public string EquipmentType { get; set; }
        public string ProductGroup { get; set; }
        public string Plant { get; set; }
        public string Organization { get; set; }
    }
}

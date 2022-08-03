using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Models.CpiDetailInformationData
{
    public class CpiDetailInformation
    {
        [Key]
        public int Id { get; set; }
        public int InitiativeId { get; set; }
        public string SourceOfImprovement { get; set; }
        public string TypeOfCpi { get; set; }
        public string AnalysisTool { get; set; }
        public string OtherTool { get; set; }
        public string PhnBuPillar { get; set; }
        public string TypeOfPhn { get; set; }
        public string RootCause { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedBudgetOpex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EstimatedBenefitSavings { get; set; }
        public string EstimatedBenefitCalculationDetails { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBudgetOpex { get; set; }
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualBudgetSavings { get; set; }
        public string ActualBenefitCalculationDetails { get; set; }
        public string LookbackText { get; set; }
    }
}

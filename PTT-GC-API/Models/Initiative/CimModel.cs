using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Initiative
{
    public class CimModel
    {
        [Key]
        public int Id { get; set; }
        public string InitiativeYear { get; set; }
        public string StrategicObjective { get; set; } //CIM
        public string Strategy { get; set; } //CIM
        public string EntryMode { get; set; } //CIM
        public string EntryModeSpecify { get; set; } //CIM
        public string Geography { get; set; } //CIM
        public string GeographySpecify { get; set; } //CIM
        public bool? RequireBOD1 { get; set; } //CIM
        public DateTime? BOD1 { get; set; } //CIM
        public DateTime? BOD2 { get; set; } //CIM
        public bool? RequireProject { get; set; } //CIM
        public string ProjectDirector { get; set; } //CIM
        public string ProjectDmManager { get; set; } //CIM
        public string ProjectEngineer { get; set; } //CIM
        public string ProcessEngineer { get; set; } //CIM
        public string MgrOfProcessEngineer { get; set; } //CIM
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Irr { get; set; } //CIM
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Npv { get; set; } //CIM
        [MaxLength(500)]
        public string FX { get; set; } //CIM
        [MaxLength(10)]
        public string FirstBudgetYear { get; set; } //CIM
        public string Manager { get; set; } //CIM
        public string ProjectManager { get; set; } //CIM
        // ------------------- Detail --------------------------- //
        public string ProductionProcess { get; set; } //CIM //CIM
        public string ListOfEquipment { get; set; } //CIM //CIM //CIM //CIM
        public string Comparison { get; set; } //CIM //CIM //CIM //CIM
        public string OtherInvestment { get; set; } //CIM //CIM
        public string OthersStrategic { get; set; } //CIM //CIM //CIM //CIM
        public string KeySuccessFactor { get; set; } //CIM //CIM
        public string SynergyBenefit { get; set; } //CIM //CIM
        public string MarketOverview { get; set; } //CIM //CIM
        public string PotentialCustomer { get; set; } //CIM //CIM
        public string SalesPlan { get; set; } //CIM //CIM
        public string SourceOfFeedback { get; set; } //CIM //CIM
        public string OtherBusiness { get; set; } //CIM //CIM

        public string SafetyIndex { get; set; } //CIM //CIM
        public string CorporateImageIndex { get; set; } //CIM //CIM
        public string OtherQuality { get; set; } //CIM //CIM
        public string Note { get; set; }
        public int InitiativeId { get; set; }
    }
}

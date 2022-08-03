using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Castle.MicroKernel.SubSystems.Conversion;
using PTT_GC_API.Models.ImpactTracking;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.TypeOfBenefit;

namespace PTT_GC_API.Dtos.ImpactTracking
{
    public class ImpactTrackingAll
    {
        public int Id { get; set; }
        public string FinancialImpactArea { get; set; }
        public bool HaveShareBenefit { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL4RunRateRecurring { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5RunRateRecurring { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL4RunRateOnetime { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5RunRateOnetime { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5FixedFxRecurring { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5FloatFxRecurring { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5FixedFxOnetime { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? IL5FloatFxOnetime { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? TotalRecurring { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? TotalOnetime { get; set; }
        public DateTime? FirstRunRateMonth { get; set; }
        public bool AutoCalculate { get; set; }
        public bool IndirectBenefit { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Explanation { get; set; }
        public bool ImpiemantCost { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? TotalCostOPEX { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string ToComment { get; set; }
        public string Remark1 { get; set; }
        public string Remark2 { get; set; }
        public string Remark3 { get; set; }
        public string Remark4 { get; set; }
        public string Remark5 { get; set; }
        public int InitiativeId { get; set; }
        public string InitiativeCode { get; set; }
        public string SIL4Achievement { get; set; }
        public string SIL5Achievement { get; set; }
        public string ContactIO { get; set; }
        public DateTime? LastApprovedIL4Date { get; set; }
        public DateTime? LastApprovedIL5Date { get; set; }
        public string ContactIOBy { get; set; }
        public DateTime? FirstApprovedIL4Date { get; set; }
        public DateTime? LastSubmittedSIL4Date { get; set; }
        public DateTime? LastSubmittedSIL5Date { get; set; }
        public List<ImpactTypeOfBenefits> FirstRunrates { get; set; }
        public List<ImpactTypeOfBenefits> FirstRunrateTotal { get; set; }
        public List<ImpactTypeOfBenefits> ImpiemantCosts { get; set; }
        public List<ImpactTypeOfBenefits> IndirectBenefits { get; set; }
        public List<ImpactTypeOfBenefits> TypeBenefits { get; set; }
        public List<ImpactTypeOfBenefits> TypeBenefitTotal { get; set; }
        public DetailInformation_Old  DetailInformation { get; set; }
        public List<TypeOfBenefit> RecurringAndOneTime { get; set; }
        public List<ShareBenefitWorkstream> ShareBenefit { get; set; }
    }

    public class ImpactTypeOfBenefits
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string ImpactTypeOfBenefitTable { get; set; }
        [StringLength(100)]
        public string TypeOfBenefit { get; set; }
        [StringLength(100)]
        public string VersionPrice { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? FixedFX { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? RunRate { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month1 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month2 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month3 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month4 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month5 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month6 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month7 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month8 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month9 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month10 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month11 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month12 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month13 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month14 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month15 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month16 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month17 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month18 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month19 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month20 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month21 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month22 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month23 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month24 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month25 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month26 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month27 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month28 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month29 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month30 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month31 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month32 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month33 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month34 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month35 { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal? Month36 { get; set; }
        public int InitiativeId { get; set; }
        [StringLength(50)]
        public string InitiativeCode { get; set; }
        [StringLength(100)]
        public string CurrencyFloatFx { get; set; }
        public int? OrderIndex { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal? RunrateForSumTotal { get; set; }
    }
}

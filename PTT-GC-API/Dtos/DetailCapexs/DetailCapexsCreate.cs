using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PTT_GC_API.Dtos.Initiative
{
    public class DetailCapexsCreate
    {
        //Approved Detail
        public string VicePresidentOfOwner { get; set; }
        public string VpDepartment { get; set; }
        public string DivisionManagerOfOwner { get; set; }
        public string DmDepartment { get; set; }

        //Invesment Framework
        public string ProductionProcess { get; set; }
        public string ComparisonWithOther { get; set; }
        public string OtherInvestment { get; set; }

        //Strategic Analysis
        public string KeySuccessFactor { get; set; }
        public string SynergyBenefit { get; set; }
        public string OtherStrategic { get; set; }

        //Business Analysis
        public string MarketOverview { get; set; }
        public string PotentialCustomer { get; set; }
        public string SalesPlan { get; set; }
        public string SourceOfFeedstock { get; set; }
        public string OtherBusiness { get; set; }

        //Quality Index
        public string SafetyIndex { get; set; }
        public string CorporateImageIndex { get; set; }
        public string OtherQuality { get; set; }

        //Return Of Investment
        public string BaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackBaseCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaBaseCase { get; set; }

        public string OptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackOptimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaOptimisticCase { get; set; }
        public string PessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ProjectIrrPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? NpvPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PaybackPessimisticCase { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? EbitdaPessimisticCase { get; set; }

        public string UsefulLife { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? DepreciationCost { get; set; }

        //ตาราง KpisCapex
        public string KpisRemark { get; set; }
    }
}
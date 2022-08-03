using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Initiative
{
    public class CalculateRamDetail
    {
        public string Plant { get; set; }
        public string Likelihood { get; set; }
        public string Consequence { get; set; }
    }

    public class CalculateJFactorDetail
    {
        public string Plant { get; set; }
        public decimal? BaseRisk { get; set; }
        public decimal? RiskOfAlt { get; set; }
        public decimal? RiskReduction { get; set; }
        public decimal? PotentialConCost { get; set; }
        public string AnnualLikelihood { get; set; }
        public decimal? AnnualLikelihoodRatio { get; set; }
        public string ExposureFactor { get; set; }
        public decimal? ExposureFactorRatio { get; set; }
        public decimal? Probability { get; set; }
        public string Effectiveness { get; set; }
        public decimal? EffectivenessRatio { get; set; }
        public decimal? ProductionLoss { get; set; }
        public decimal? EconomicPenalties { get; set; }
        public decimal? EconomicBenefits { get; set; }
        public decimal? OpexPenaltiesCost { get; set; }
        public decimal? JustifiableCost { get; set; }
        public decimal? CostEstCapex { get; set; }
        public decimal? FxExchange { get; set; }
    }
}

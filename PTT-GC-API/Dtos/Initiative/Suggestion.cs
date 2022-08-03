namespace PTT_GC_API.Dtos.Initiative
{
    public class Suggestion
    {
        public bool RequestCapex { get; set; }
        public string TypeOfInvestment { get; set; }
        public string Ram { get; set; }
        public double? JFactor= null;
        public double? CostEstCapex = null;
        public double? Irr  = null;
        public string TypeBenefit { get; set; }
        public double? PayBackPeriod = null;
        public string BudgetType { get; set; }
        public string CostEstCapexType { get; set; }
        public bool InvolveItDigital { get; set; }
        public string BudgetSource { get; set; }
        public float? FxExchange { get; set; }
    }
}
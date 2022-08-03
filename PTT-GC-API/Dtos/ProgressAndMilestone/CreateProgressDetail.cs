using PTT_GC_API.Models.ProgressAndMilestone;
using System;
using System.Collections.Generic;

namespace PTT_GC_API.Dtos.ProgressAndMilestone
{
    public class CreateProgressDetail
    {
        public List<ProgressDetail> details { get; set; }
    }

    public class CostSpendingYearModel
    {
        public string[] Year { get; set; }
        public List<CostSpendingYearArray> CostSpendingYearArray { get; set; }
    }

    public class CostSpendingYearArray
    {
        public string Type { get; set; }
        public decimal?[] Cost { get; set; }

        public static implicit operator List<object>(CostSpendingYearArray v)
        {
            throw new NotImplementedException();
        }
    }
}
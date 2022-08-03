using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Lookback
{
    public class PimGateAndTotalCost
    {
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal? OverallCapex { get; set; } // 1, 2, 3
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualSendingCost { get; set; }  // 2

    }
}

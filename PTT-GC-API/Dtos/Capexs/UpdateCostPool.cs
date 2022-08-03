using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Capexs
{
    public class UpdateCostPool
    {
        [Column(TypeName = "decimal(18,2)")]
        public decimal? AvailableBudget { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? SpendingActual { get; set; }
    }
}

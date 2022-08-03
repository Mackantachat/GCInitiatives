using PTT_GC_API.Models.PoolBudget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface PoolBudgetInterface
    {
        Task<IEnumerable<PoolBudgetFrom>> GetList();
    }
}

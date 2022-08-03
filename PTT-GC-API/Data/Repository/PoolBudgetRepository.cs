using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.PoolBudget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class PoolBudgetRepository : PoolBudgetInterface
    {
        private readonly DataContext _context;
        public PoolBudgetRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<PoolBudgetFrom>> GetList()
        {
            return await _context.PoolBudgetFrom.ToListAsync();
        }
    }
}

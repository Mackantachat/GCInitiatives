using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Strategy;

namespace PTT_GC_API.Data.Repository
{
    public class StrategyRepository : StrategyInterface
    {
        private readonly DataContext _context;
        public StrategyRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Strategy>> GetList(int strategicObjectiveId)
        {
            var strategies = await _context.Strategies.Where(s => s.StrategicObjectiveId == strategicObjectiveId).ToListAsync();
            return strategies;
        }
    }
}
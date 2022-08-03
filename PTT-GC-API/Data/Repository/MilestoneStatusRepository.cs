using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Milestone;

namespace PTT_GC_API.Data.Repository
{
    public class MilestoneStatusRepository : MilestoneStatusInterface
    {
        private readonly DataContext _context;
        public MilestoneStatusRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<MilestoneStatus>> GetList()
        {
            return await _context.MilestoneStatuses.ToListAsync();
        }
    }
}
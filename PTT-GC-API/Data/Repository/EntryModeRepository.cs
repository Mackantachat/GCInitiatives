using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.EntryMode;

namespace PTT_GC_API.Data.Repository
{
    public class EntryModeRepository : EntryModeInterface
    {
        private readonly DataContext _context;
        public EntryModeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<EntryMode>> GetList()
        {
            return await _context.EntryModes.ToListAsync();
        }
    }
}
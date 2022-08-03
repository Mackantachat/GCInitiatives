using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.DetailInformation;

namespace PTT_GC_API.Data.Repository
{
    public class FrequencyRepository : FrequencyInterface
    {
        private readonly DataContext _context;
        public FrequencyRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Frequency>> GetList()
        {
            return await _context.Frequencies.ToListAsync();
        }
    }
}
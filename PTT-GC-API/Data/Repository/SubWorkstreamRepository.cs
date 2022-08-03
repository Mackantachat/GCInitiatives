using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.DetailInformation;

namespace PTT_GC_API.Data.Repository
{
    public class SubWorkstreamRepository : SubWorkstreamInterface
    {
        private readonly DataContext _context;
        public SubWorkstreamRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<string>> GetAll()
        {
            return await _context.SubWorkstreams.Select(m => m.SubWorkstream1).Distinct().ToListAsync();
        }

        public async Task<IEnumerable<SubWorkstream>> GetList(string name)
        {
            return await _context.SubWorkstreams.Where(s => s.WorkStreamTitle == name).OrderBy(s => s.SubWorkstream2).ThenBy(i=>i.Subworkstream2Order).ToListAsync();
        }

        public async Task<IEnumerable<string>> GetSubWorkstream1(string name)
        {
            return await _context.SubWorkstreams.Where(b => b.WorkStreamTitle == name).Select(d => d.SubWorkstream1).Distinct().OrderBy(d => d).ToListAsync();
        }
    }
}
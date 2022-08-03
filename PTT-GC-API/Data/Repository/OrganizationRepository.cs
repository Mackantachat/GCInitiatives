using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Organization;

namespace PTT_GC_API.Data.Repository
{
    public class OrganizationRepository : OrganizationInterface
    {
        private readonly DataContext _context;
        public OrganizationRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Organization>> GetList()
        {
            return await _context.Organizations.OrderBy(o => o.OrganizationTitle).ToListAsync();
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.CoDeveloper;

namespace PTT_GC_API.Data.Repository
{
    public class CoDeveloperRepository : CoDeveloperInterface
    {
        private readonly DataContext _context;
        public CoDeveloperRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<CoDeveloper>> GetList([FromQuery]CoDeveloperParams CoDeveloperParams)
        {

            var  coDevelopers= _context.CoDevelopers.AsQueryable();

            if (!string.IsNullOrEmpty(CoDeveloperParams.Text))
            {
                // coDevelopers = coDevelopers.Where(c => c.CoDeveloperName.StartsWith(CoDeveloperParams.Text));
                coDevelopers = coDevelopers.Where(c => c.CoDeveloperName.Contains(CoDeveloperParams.Text));
            }

            coDevelopers = coDevelopers.OrderBy(c => c.CoDeveloperName).Take(50);

            await coDevelopers.ToListAsync();

            return coDevelopers;
        }
    }
}
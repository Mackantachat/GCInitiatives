using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.DetailInformation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class ProcurementRepository : ProcurementInterface
    {
        private readonly DataContext _context;
        public ProcurementRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Procurement>> GetProcurementCategory()
        {
            var get = await _context.Procurements.Where(o => o.ProcurementType == "Category").OrderBy(i=>i.ProcurementName).ToListAsync();
            return get;
        }
        public async Task<IEnumerable<Procurement>> GetProcurementSubCategory()
        {
            var get = await _context.Procurements.Where(o => o.ProcurementType == "Sub-Category").OrderBy(i => i.ProcurementName).ToListAsync();
            return get;
        }
        public async Task<IEnumerable<Procurement>> GetProcurementLever()
        {
            var get = await _context.Procurements.Where(o => o.ProcurementType == "Lever").OrderBy(i => i.ProcurementName).ToListAsync();
            return get;
        }
    }
}

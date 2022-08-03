using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.DimMaxHandover;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class HandoverRepository : IHandoverRepository
    {
        private readonly DataContext _context;
        public HandoverRepository(DataContext context)
        {
            _context = context;
        }
        public int CreateHandover(DimMaxHandover model)
        {
            try
            {
                _context.DimMaxHandsover.Add(model);
                _context.SaveChanges();
                var handover = _context.DimMaxHandsover.Where((x) => x.InitiativeId == model.InitiativeId).FirstOrDefault();
                return handover.Id;
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public async Task<DimMaxHandover> GetHandover(int initiativeId)
        {
            return await _context.DimMaxHandsover.FirstOrDefaultAsync(x => x.InitiativeId == initiativeId);
        }

        public bool UpdateHandover(DimMaxHandover model)
        {
            try
            {
                _context.Update(model);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}

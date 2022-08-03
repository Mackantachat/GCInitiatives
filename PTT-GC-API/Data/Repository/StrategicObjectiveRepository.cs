using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Strategy;

namespace PTT_GC_API.Data.Repository
{
    public class StrategicObjectiveRepository : StrategicObjectiveInterface
    {
        private readonly DataContext _context;
        public StrategicObjectiveRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<StrategicObjective>> GetList(string year)
        {
            return await _context.StrategicObjectives.Where(s => s.Year == year).ToListAsync();
        }
        //GetStrategicObjectiveYear
        public string GetStrategicObjectiveYear()
        {
           return (from max in _context.StrategicObjectives
                    where !String.IsNullOrEmpty(max.Year)
                    select Convert.ToInt32(max.Year)).Max().ToString();
        }
    }
}
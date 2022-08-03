using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.TypeOfBenefit;

namespace PTT_GC_API.Data.Repository
{
    public class TypeOfBenefitRepository : TypeOfBenefitInterface
    {
        private readonly DataContext _context;
        public TypeOfBenefitRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TypeOfBenefit>> GetListRecurringAndOneTime()
        {
            var typeOfBenefits = await _context.TypeOfBenefits
            .Where(t => (t.TypeOfBenefitGroup == "Recurring" || t.TypeOfBenefitGroup == "One time"))
            .ToListAsync();
            return typeOfBenefits;
        }

        public async Task<IEnumerable<TypeOfBenefit>> GetListImplementationCost()
        {
            var typeOfBenefits = await _context.TypeOfBenefits
            .Where(t => (t.TypeOfBenefitGroup == "Implementation Cost"))
            .ToListAsync();
            return typeOfBenefits;
        }
    }
}
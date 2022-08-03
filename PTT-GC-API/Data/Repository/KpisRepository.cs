using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.DetailInformation;
using PTT_GC_API.Models.EMOCs;
using AutoMapper;
namespace PTT_GC_API.Data.Repository
{
    public class KpisRepository : KpisInterface
    {
        //private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly KpisInterface _kpisRepo;
        public KpisRepository(DataContext context)
        {
           // _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<Kpis>> GetList()
        {
            return await _context.Kpises.ToListAsync();
        }
        //public bool InsertKpis(MaintainKpi maintainKpi)
        //{
        //    return true;
        //}
        //public virtual void AddRange(IEnumerable<MaintainKpi> entities)
        //{
        //    _context.AddRange(entities);
        //    _context.SaveChanges();
        //}

        //public async Task<List<MaintainKpi>> GetMaintainKpi()
        //{
        //   // var a = from a in _context.Initiatives.wh
        //    return null;
        //}
    }
}
using AutoMapper;
using PTT_GC_API.Models.IF;
using System.Collections.Generic;
using System.Linq;

namespace PTT_GC_API.Data.Repository
{
    public interface IIFMOCTransactionRepository
    {
        public List<IF_MOCTransaction> GetEmocStatusByIniitiativeId(int initiativeId);
    }
    public class IFMOCTransactionRepository : IIFMOCTransactionRepository
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public IFMOCTransactionRepository(DataContext context, IMapper mapper)
        {
            this._context = context;
            _mapper = mapper;
        }

        public List<IF_MOCTransaction> GetEmocStatusByIniitiativeId(int initiativeId)
        {
            return (from mainPlants in _context.MainPlant.Where(x => x.InitiativeId == initiativeId)
                    join ifMOCTransaction in _context.IF_MOCTransaction
                    on mainPlants.EmocNo equals ifMOCTransaction.MOCNo
                    select ifMOCTransaction).ToList();
        }
    }
}

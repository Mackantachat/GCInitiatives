using AutoMapper;
using PTT_GC_API.Models.IF;
using System.Collections.Generic;
using System.Linq;

namespace PTT_GC_API.Data.Repository
{
    public interface IIFProjectDefinitionRepository
    {
        public IF_ProjectDefinition GetSAPStatusByInitiativeId(int initiativeId);
    }
    public class IFProjectDefinitionRepository : IIFProjectDefinitionRepository
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public IFProjectDefinitionRepository(DataContext context, IMapper mapper)
        {
            this._context = context;
            _mapper = mapper;
        }

        public IF_ProjectDefinition GetSAPStatusByInitiativeId(int initiativeId)
        {
            return (from progressHeaders in _context.ProgressHeader.Where(x => x.InitiativeId == initiativeId)
                    join ifProjectDefinition in _context.IF_ProjectDefinition
                    on progressHeaders.WbsNo equals ifProjectDefinition.Project_Definition_Key
                    select ifProjectDefinition).FirstOrDefault();
        }
    }
}

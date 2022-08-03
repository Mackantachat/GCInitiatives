using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Outstanding;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PTT_GC_API.Services.Outstanding
{
    public class OutstandingService : IOutstandingService
    {
        private readonly IOutstandingRepository _repository;
        public OutstandingService(IOutstandingRepository repository)
        {
            _repository = repository;
        }
        public bool DeleteOutstandingByInitiativeId(int InitiativeId)
        {
            var result = _repository.DeleteOutstandingByInitiativeId(InitiativeId);
            return result;
        }

        public bool DeleteOutstandingDataById(int Id)
        {
            var result = _repository.DeleteOutstandingDataById(Id);
            return result;
        }

        public bool DeleteOutstandingModel(OutstandingForm outstandingFrontModel)
        {
            var result = _repository.DeleteOutstandingModel(outstandingFrontModel);
            return result;
        }

        public OutstandingForm GetOutstandingForm(int initiativeId,int year,int month)
        {
            var result = _repository.GetOutstandingForm(initiativeId, year,month);
            return result;
        }
        
        public List<OutstandingForm> GetAllOutstanding(int initiativeId)
        {
            var result = _repository.GetAllOutstanding(initiativeId);
            return result;
        }

        public List<OutstandingYear> GetOutstandingFormByYear(int initiativeId, int year)
        {
            var result = _repository.GetOutstandingFormByYear(initiativeId, year);
            return result;
        }

        public bool InsertOutstandingModel(OutstandingForm outstandingFrontModel)
        {
            var result = _repository.InsertOutstandingModel(outstandingFrontModel);
            return result;
        }
        
        public async Task<bool> InsertOutstandingDataModel(OutstandingForm[] outstandingFrontModel)
        {
            var result = await _repository.InsertOutstandingDataModel(outstandingFrontModel);
            return result;
        }

        public List<OutstandingForm> UpdateOutstandingModel(OutstandingForm outstandingFrontModel)
        {
            var result = _repository.UpdateOutstandingModel(outstandingFrontModel);
            return result;
        }
    }
}

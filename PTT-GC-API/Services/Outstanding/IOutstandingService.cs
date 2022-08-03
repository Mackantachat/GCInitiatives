using PTT_GC_API.Dtos.Outstanding;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PTT_GC_API.Services.Outstanding
{
    public interface IOutstandingService
    {
        public OutstandingForm GetOutstandingForm(int initiativeId,int year,int month);
        public List<OutstandingForm> GetAllOutstanding(int initiativeId);
        public bool InsertOutstandingModel(OutstandingForm outstandingFrontModel);
        public Task<bool> InsertOutstandingDataModel(OutstandingForm[] outstandingFrontModel);
        public List<OutstandingForm> UpdateOutstandingModel(OutstandingForm outstandingFrontModel);
        public bool DeleteOutstandingModel(OutstandingForm outstandingFrontModel);
        public bool DeleteOutstandingDataById(int Id);
        public bool DeleteOutstandingByInitiativeId(int InitiativeId);
        public List<OutstandingYear> GetOutstandingFormByYear(int initiativeId, int year);
    }
}

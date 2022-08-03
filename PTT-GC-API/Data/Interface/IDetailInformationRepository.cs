using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.Initiative;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IDetailInformationRepository
    {
        public Task<int> InsertDetailInformation(NewDetailInformationModel detailInformation,int initiativeId);
        public Task<NewDetailInformationModel> GetDetailInformation(int initiativeId, string type);
        public Task<int> UpdateDetailInformation(NewDetailInformationModel newDetailInformation);
        public Task<bool> DeleteDetailInformation(NewDetailInformationModel detailInformationModel);
        public Task<bool> DeleteDetailInformation(int initiativeId);
    }
}

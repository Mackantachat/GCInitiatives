using PTT_GC_API.Dtos.CpiDetailInformationDtos;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface ICpiDetailInformationRepository
    {
        public CpiDetailInformationModel GetCpiDetailInformation(int initiativeId);
        public Task<int> InsertCpiDetailInformation(CpiDetailInformationModel detailInformationModel);
        public Task<int> UpdateCpiDetailInformation(CpiDetailInformationModel cpiDetailInformationModel);
        public int DeleteCpiDetailInformation(int initiativeId);
    }
}

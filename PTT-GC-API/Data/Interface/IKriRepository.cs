using PTT_GC_API.Dtos.Kri;

namespace PTT_GC_API.Data.Interface
{
    public interface IKriRepository
    {
        public KriModelData GetKriModelData(int initiativeId, int year);
        public bool InsertKriModel(KriModelData model);
        public KriModelData UpdateKriModel(KriModelData model);
        public bool DeleteKriModel(int initiativeId);
        public bool RemoveKriData(int initiativeId, int sequence);
        public bool ChangeStatus(int initiativeId,string status);
    }
}

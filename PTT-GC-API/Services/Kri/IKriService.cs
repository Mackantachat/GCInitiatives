using PTT_GC_API.Dtos.Kri;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Services.Kri
{
    public interface IKriService
    {
        public KriModelData GetKriModelData(int initiativeId, int year);
        public bool InsertKriModel(KriModelData model);
        public KriModelData UpdateKriModel(KriModelData model);
        public bool DeleteKriModel(int initiativeId);
        public bool RemoveKriData(int initiativeId, int sequence);
        public bool ChangeStatus(int initiativeId, string status);
    }
}

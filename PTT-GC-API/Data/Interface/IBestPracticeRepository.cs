using PTT_GC_API.Dtos.BestPractice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IBestPracticeRepository
    {
        public bool InsertBestPractice(BestPracticeModelData model);
        public BestPracticeModelData GetBestPractice(int initiativeID);
        public bool UpdateBestPractice(BestPracticeModelData model);
        public bool DeleteBestPracticeModel(int initiativeId);
        //public bool testNewUpdate(BestPracticeModelData model);
    }
}

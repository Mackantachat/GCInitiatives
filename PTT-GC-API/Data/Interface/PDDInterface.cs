using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface PDDInterface
    {
        Task<int> CreateFolderPDD(int id);
        decimal GetCostCapexFromInitiative(Initiative initiative);
        Task CallMicrosoftFlow_CreatePDD(int id);
    }
}

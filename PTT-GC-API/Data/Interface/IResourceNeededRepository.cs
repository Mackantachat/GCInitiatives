using DocumentFormat.OpenXml.EMMA;
using PTT_GC_API.Dtos.ResourceNeededFormsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IResourceNeededRepository
    {
        public Task<int> InsertResourceNeededData(ResourceFormsModelData modelData);
        public Task<ResourceFormsModelData> GetResourceModelData(int initiativeId);
        public Task<ResourceFormsModelData> GetLastInsertModelData();
        public Task<bool> UpdateResource(ResourceFormsModelData modelData, int resourceNeededId);
        public bool DeleteResource(ResourceFormsModelData modelData);
        public bool DeleteResourceById(int id);
     }
}

using DocumentFormat.OpenXml.EMMA;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Models.EMOCs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface EmocInterface
    {
        Task<CreateMoCResult> CreateEmoc(int id);
        Task<List<MainPlant>> CreateMainPlant(int id,List<MainPlant> data);
        Task<List<MainPlant>> CreateEmoc(int id,List<MainPlant> data);
        Task<List<MainPlant>> GetMainPlant(int id);
        Task<int> DeleteMainPlant(int id);
    }
}

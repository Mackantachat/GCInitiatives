using PTT_GC_API.API.Helpers;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.Setting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface SettingInterface
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<bool> Any();
        Task<Setting> LastSetting();
        Task<PagedList<Setting>> GetSetting(SettingParams SettingParams);
        Task<Setting> GetInitiativeSetting();

        Task<Setting> GetSetting(int id);

    }
}

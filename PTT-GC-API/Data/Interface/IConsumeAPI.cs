using Castle.Components.DictionaryAdapter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IConsumeAPI
    {
        Task<List<T>> GetDataFromApi<T>(string URLType, object bodyPostValue);
    }
}

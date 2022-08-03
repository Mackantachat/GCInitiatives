using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NPOI.SS.Formula.Functions;
using PTT_GC_API.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class ConsumeAPIRepository : IConsumeAPI
    {
        private readonly DataContext _context;
        private readonly IHttpClientFactory _clientFactory;
        public ConsumeAPIRepository(DataContext context, IHttpClientFactory clientFactory)
        {
            _context = context;
            _clientFactory = clientFactory;
        }
        public async Task<List<T>> GetDataFromApi<T>(string URLType, object body)
        {
            string urlFlow = "";
            List<object> dataReturn = new List<object>();
            var context_url = await _context.URLTables.Where(i => i.URLType == URLType).ToListAsync();
            if (context_url.Any())
            {
                StringContent stringContent = null;
                if (body != null)
                {
                    stringContent = new StringContent(
                        JsonConvert.SerializeObject(new
                        {
                            body
                        })
               , Encoding.UTF8, "application/json");
                }

                urlFlow = context_url.FirstOrDefault().URL;
                HttpClient client = _clientFactory.CreateClient();
                HttpResponseMessage response = await client.PostAsync(urlFlow, stringContent);

                if (response.IsSuccessStatusCode)
                {
                    string responseString = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<List<T>>(responseString);
                }
            }

            return new List<T> { };
        }
    }
}

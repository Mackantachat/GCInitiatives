using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Models.CommonData;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            this.AddRange(items);
        }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize, IQueryable<CommonData> commondata = null)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            //replace stage name by oat 2020-10-29
            //CommonData dataStages;
            //if (typeof(T) == typeof(Initiative))
            //{
            //    var newitems = items.Cast<Initiative>().ToList();
            //    foreach (var entity in newitems)
            //    {
            //        dataStages = await commondata.Where(i =>
            //        i.Attribute08 != null
            //        && i.Attribute05 == entity.InitiativeType
            //        && i.Attribute06 == entity.InitiativeSubType
            //        && i.Attribute01 == entity.Stage
            //        ).FirstOrDefaultAsync();

            //        if (dataStages != null)
            //            entity.Stage = dataStages.Attribute08;
            //    }

            //    return new PagedList<T>(newitems.Cast<T>().ToList(), count, pageNumber, pageSize);
            //}
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }

        public static async Task<PagedList<T>> CreateAsync(List<T> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }

        public static async Task<PagedList<T>> CreateListsAsync(List<T> source,int count, int pageNumber, int pageSize)
        {
            //var count = source.Count();
            var items = source.ToList();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }

        public static PagedList<T> CreateAsyncAsList(List<T> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
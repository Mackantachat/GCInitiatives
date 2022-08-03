using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.User;
using System;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.CapexInformation;

namespace PTT_GC_API.Data.Repository
{
    public class DetailCapexsRepository : DetailCapexsInterface
    {
        private readonly DataContext _context;
        public DetailCapexsRepository(DataContext context)
        {
            _context = context;
        }

        public async void Add<T>(T entity) where T : class
        {
            await _context.AddAsync(entity);
        }
        public async Task<bool> Any()
        {
            return await _context.Initiatives.AnyAsync();
        }
        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
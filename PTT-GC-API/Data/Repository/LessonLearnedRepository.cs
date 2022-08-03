using AutoMapper;
using DocumentFormat.OpenXml.Drawing.Charts;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.LessonLearned;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class LessonLearnedRepository : ILessonLearnedRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;


        public LessonLearnedRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<LessonsLearned>> GetLessonLearned(int initiativeId)
        {
            var listLessonLearned = await _context.LessonsLearned.Where(x => x.InitiativeId == initiativeId).ToListAsync();
            return listLessonLearned;
        }
        
        public async Task<LessonsLearned> GetLessonLearnedById(int id)
        {
            var listLessonLearned = await _context.LessonsLearned.Where(x => x.Id == id).FirstOrDefaultAsync();
            return listLessonLearned;
        }

        public async Task<bool> InsertLessonLearned(List<LessonsLearned> lessonsLearned)
        {
            foreach (var items in lessonsLearned)
            {
                items.Id = 0;
                await _context.LessonsLearned.AddAsync(items);
            }
            _context.SaveChanges();

            return true;
        }
        public async Task<bool> InsertLessonLearned(List<LessonsLearned> lessonsLearned,int initiativeId)
        {
            var data = _context.LessonsLearned.Where(x => x.InitiativeId == initiativeId).ToList();
            foreach(var item in data)
            {
                _context.LessonsLearned.Remove(item);
            }
            _context.SaveChanges();

            foreach (var items in lessonsLearned)
            {
                items.Id = 0;
                await _context.LessonsLearned.AddAsync(items);
            }
            _context.SaveChanges();

            return true;
        }

        public async Task<int> InsertLessonLearnedById(LessonsLearned lessonsLearned, int initiativeId)
        {
            lessonsLearned.Id = 0;
            await _context.LessonsLearned.AddAsync(lessonsLearned);
            //insert attatchFile
            _context.SaveChanges();
            var lastId = await _context.LessonsLearned.Where(x => x.InitiativeId == initiativeId).OrderByDescending(o=>o.Id).FirstOrDefaultAsync();
            return lastId.Id;
        }


        public async Task<int> UpdateLessonLearnedById(LessonsLearned lessonsLearned,int initiativeId)
        {
            var data = await _context.LessonsLearned.Where(x => x.InitiativeId == initiativeId && x.Id == lessonsLearned.Id).FirstOrDefaultAsync();
            if (data == null)
            {
                return 0;
            }

            _mapper.Map(lessonsLearned, data);
            //var LessonsLearneData = _mapper.Map<LessonsLearned>(data);
            _context.LessonsLearned.Update(data);
            return await _context.SaveChangesAsync();
        }
        
        public async Task<int> DeleteLessonLearnedById(int lessonLearnId)
        {
            var data = await _context.LessonsLearned.Where(x =>  x.Id == lessonLearnId).FirstOrDefaultAsync();
            if (data == null)
            {
                return 0;
            }
            return await _context.SaveChangesAsync();
        }

        public Task<int> UpdateLessonLearned(List<LessonsLearned> lessonsLearned)
        {
            _context.LessonsLearned.UpdateRange(lessonsLearned);
            return _context.SaveChangesAsync();
        }

        public bool DeleteByInitiativeId(int initiativeId)
        {
            var listRemove = _context.LessonsLearned.Where(x => x.InitiativeId == initiativeId).ToList();
            _context.LessonsLearned.RemoveRange(listRemove);
            _context.SaveChanges();
            return true;
        }

        public async Task<bool> DeleteOneById(int Id)
        {
            var item = await _context.LessonsLearned.Where(x => x.Id == Id).FirstOrDefaultAsync();
            if (item != null)
            {
                _context.LessonsLearned.Remove(item);
               await  _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}

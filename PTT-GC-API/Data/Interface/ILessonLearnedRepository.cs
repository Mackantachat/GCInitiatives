using PTT_GC_API.Models.LessonLearned;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface ILessonLearnedRepository
    {
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        public Task<List<LessonsLearned>> GetLessonLearned(int initiativeId);
        public Task<LessonsLearned> GetLessonLearnedById(int id);
        public Task<bool> InsertLessonLearned(List<LessonsLearned> lessonsLearned);
        public Task<bool> InsertLessonLearned(List<LessonsLearned> lessonsLearned,int initiativeId);
        public Task<int> InsertLessonLearnedById(LessonsLearned lessonsLearned,int initiativeId);
        public Task<int> UpdateLessonLearnedById(LessonsLearned lessonsLearned,int initiativeId);
        public Task<int> DeleteLessonLearnedById(int lessonLearnId);
        public Task<int> UpdateLessonLearned(List<LessonsLearned> lessonsLearned);
        public bool DeleteByInitiativeId(int initiativeId);
        public Task<bool> DeleteOneById(int Id);
    }
}

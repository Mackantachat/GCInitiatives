using PTT_GC_API.Models.Forms.Cpi;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PTT_GC_API.Services
{
    public interface ICpiFormService
    {
        public Task<int> InsertCpiDetailForm(CpiForms forms);
        public Task<bool> UpdateCpiDetailForm(CpiForms forms);
        public Task<CpiFormsFront> GetCpiForm(int initiativeId);
        public Task<bool> DeleteCpiForms(int initiativeId);
        public Task<int> UpdateOnlyLessonLearn(List<Models.LessonLearned.LessonsLearned> forms);
    }
}

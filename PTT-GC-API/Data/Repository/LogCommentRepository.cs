using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Repository
{
    public class LogCommentRepository : LogCommentInterface
    {
        private readonly DataContext _context;

        public LogCommentRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Audit> GetAudit(int id)
        {
            return await _context.Audits.FirstOrDefaultAsync(i => i.Id == id);
        }
    }
}
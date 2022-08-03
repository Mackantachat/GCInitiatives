using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.User;

namespace PTT_GC_API.Data.Repository
{
    public class UserRepository : UserInterface
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<User> GetUser(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(i => i.Id == id);
        }
        public async Task<User> GetUserName(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(i => i.Username == username);
        }
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
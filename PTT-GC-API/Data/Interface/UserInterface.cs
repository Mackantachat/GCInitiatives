using System.Collections.Generic;
using System.Threading.Tasks;
using PTT_GC_API.Dtos.User;
using PTT_GC_API.Models.User;

namespace PTT_GC_API.Data.Interface
{
    public interface UserInterface
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> Save();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<User> GetUserName(string username);
    }
}
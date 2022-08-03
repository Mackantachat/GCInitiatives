using System.Threading.Tasks;
using PTT_GC_API.Models.User;

namespace PTT_GC_API.Data.Interface
{
    public interface AuthInterface
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}
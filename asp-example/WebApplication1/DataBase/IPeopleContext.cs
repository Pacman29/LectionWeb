using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.DataBase
{
    public interface IPeopleContext
    {
        DbSet<Users> Users { get; set; }
        Task<int> SaveChangesAsync();
    }
}
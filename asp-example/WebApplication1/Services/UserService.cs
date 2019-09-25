using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebApplication1.DataBase;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class UserService : IUserService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public UserService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public async Task<List<User>> GetAllAsync()
        {
            using(var scope = _scopeFactory.CreateScope())
            {
                var peopleContext = scope.ServiceProvider.GetRequiredService<IPeopleContext>();
                return await peopleContext.Users.Select(user => user.ToUserModel()).ToListAsync();
            }

        }

        public async Task AddUserAsync(User user)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var peopleContext = scope.ServiceProvider.GetRequiredService<IPeopleContext>();
                var result = await peopleContext.Users.AddAsync(Users.FromUserModel(user));
                if (result.State == EntityState.Added)
                    await peopleContext.SaveChangesAsync();
            }
                
        }
    }
}
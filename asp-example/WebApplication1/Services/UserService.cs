using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.DataBase;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class UserService : IUserService
    {
        private readonly IPeopleContext _peopleContext;
        
        public UserService()
        {
            _peopleContext = new PeopleContext();
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _peopleContext.Users.Select(user => user.ToUserModel()).ToListAsync();
        }

        public async Task AddUserAsync(User user)
        {
            var result = await _peopleContext.Users.AddAsync(Users.FromUserModel(user));
            if (result.State == EntityState.Added)
                await _peopleContext.SaveChangesAsync();
        }
    }
}
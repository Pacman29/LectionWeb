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
        public UserService()
        {
            this.PeopleContext = new peopleContext();
        }

        private peopleContext PeopleContext { get; set; }


        public async Task<List<User>> GetAllAsync()
        {
            return await PeopleContext.Users.Select(user => user.ToUserModel()).ToListAsync();
        }

        public async Task AddUserAsync(User user)
        {
            var result = await PeopleContext.Users.AddAsync(Users.FromUserModel(user));
            if (result.State == EntityState.Added)
                await PeopleContext.SaveChangesAsync();
        }
    }
}
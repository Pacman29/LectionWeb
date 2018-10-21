using System;
using System.Collections.Generic;
using WebApplication1.Models;

namespace WebApplication1.DataBase
{
    public partial class Users
    {
        public static Users FromUserModel(User user)
        {
            return new Users()
            {
                Name = user.Name,
                Status = user.Status,
                Email = user.Email,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
        }
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public User ToUserModel()
        {
            return new User()
            {
                Email = this.Email,
                Name = this.Name,
                Status = this.Status
            };
        }
    }
}

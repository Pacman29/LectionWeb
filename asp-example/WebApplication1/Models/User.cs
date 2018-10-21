using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class User
    {
        [Display(Name = "User name")]
        [Required(ErrorMessage = "Please enter user name")]
        public string Name { get; set; }
        [Display(Name = "User status")]
        [Required(ErrorMessage = "Please enter user status")]
        public string Status { get; set; }
        [Display(Name = "User email")]
        [Required(ErrorMessage = "Please enter user email")]
        public string Email { get; set; }
    }

    public class UserViewModel
    {
        public User User { get; set; }
        public List<User> UsersList { get; set; }
    }
}
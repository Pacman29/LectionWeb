using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    public class UsersController : Controller
    {
        public UsersController(IUserService userService)
        {
            this.UserService = userService;
        }

        private IUserService UserService { get; set; }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var users = await UserService.GetAllAsync();
            return View(new UserViewModel()
            {
                UsersList = users
            });
        }

        [HttpPost]
        public async Task<RedirectToActionResult> New([FromForm] User user)
        {
            await UserService.AddUserAsync(user);
            return RedirectToAction("Index");
        }
    }
}
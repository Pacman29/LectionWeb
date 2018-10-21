using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        
        public UsersController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var users = await _userService.GetAllAsync();
            return View(new UserViewModel()
            {
                UsersList = users
            });
        }

        [HttpPost]
        public async Task<RedirectToActionResult> New([FromForm] User user)
        {
            await _userService.AddUserAsync(user);
            return RedirectToAction("Index");
        }
    }
}
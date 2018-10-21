using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class UsersController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return
            View();
        }
    }
}
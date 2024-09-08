using Microsoft.AspNetCore.Mvc;

namespace GoGiftWebsite.Areas.gpanel.Controllers
{
    [Area("gpanel")]
    public class PageController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

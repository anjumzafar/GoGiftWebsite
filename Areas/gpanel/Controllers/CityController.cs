using Microsoft.AspNetCore.Mvc;
using GoGiftWebsite.Areas.gpanel.Models;
using GoGiftWebsite.Areas.gpanel.Data;
using Microsoft.AspNetCore.Authorization;

namespace GoGiftWebsite.Areas.gpanel.Controllers
{
    [Area("gpanel")]
    [Authorize]
    public class CityController : Controller
    {
        private ApplicationDbContext Context { get; }

        public CityController(ApplicationDbContext _context)
        {
            Context = _context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            List<TblCity> City = Context.City.ToList();
            return Json(Context.City.ToList());
        }

        [HttpPost]
        public JsonResult Add(TblCity objCity)
        {
            Context.City.Add(objCity);
            Context.SaveChanges();
            return Json(true);
        }
        public JsonResult GetbyID(int ID)
        {
            var CityList = Context.City.ToList().Find(x => x.CityID.Equals(ID));
            return Json(CityList);
        }
        public JsonResult Update(TblCity objCity)
        {
            Context.City.Update(objCity);
            Context.SaveChanges();
            return Json(true);
        }
        public JsonResult CityAction(int ID)
        {
            var OriginalCity = Context.City.FirstOrDefault(c => c.CityID == ID);
            OriginalCity.IsActive = !OriginalCity.IsActive;
            Context.SaveChanges();
            return Json(true);

        }
    }
}

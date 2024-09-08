using GoGiftWebsite.Areas.gpanel.Data;
using GoGiftWebsite.Areas.gpanel.Models;
using Microsoft.AspNetCore.Mvc;

namespace GoGiftWebsite.Areas.gpanel.Controllers
{
    [Area("gpanel")]
    public class EmailTemplateController : Controller
    {
        private ApplicationDbContext Context { get; }
        public EmailTemplateController(ApplicationDbContext _context)
        {
            Context = _context;
        }
        public IActionResult Index()
        {
            string script = "FillFormatAndDataInListPage();";
            //  return JavaScript(script);
            ViewBag.JavaScriptFunction = script;
            return View();
        }
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create(TblEmailTemplates objEmailTemplate)
        {
            Context.EmailTemplate.Add(objEmailTemplate);
            Context.SaveChanges();
            return Index();
        }

        [HttpGet]
        public IActionResult Edit(int ID)
        {
            return View(Context.EmailTemplate.Find(ID));
        }

        public JsonResult List()
        {
            return Json(Context.EmailTemplate.ToList());
        }

        //public JsonResult Add(EmailTemplates objEmailTemplate)
        //{
        //    Context.EmailTemplate.Add(objEmailTemplate);
        //    Context.SaveChanges();
        //    return Json(true);
        //}
        //public JsonResult GetbyID(int ID)
        //{
        //    var EmailTemplateList = Context.EmailTemplate.ToList().Find(x => x.EmailTemplateID.Equals(ID));
        //    return Json(EmailTemplateList);
        //}
        [HttpPost]
        public IActionResult Edit(TblEmailTemplates objEmailTemplate)
        {
            Context.EmailTemplate.Update(objEmailTemplate);
            Context.SaveChanges();
            return RedirectToAction("Index");
            //return View();
        }

        public JsonResult EmailTemplateAction(int ID)
        {
            var OriginalEmailTemplate = Context.EmailTemplate.FirstOrDefault(c => c.EmailTemplateID == ID);
            OriginalEmailTemplate.IsActive = !OriginalEmailTemplate.IsActive;
            Context.SaveChanges();
            return Json(true);
        }

    }
}

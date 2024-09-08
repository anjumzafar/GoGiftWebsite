using GoGiftWebsite.Areas.gpanel.Data;
using GoGiftWebsite.Areas.gpanel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace GoGiftWebsite.Areas.gpanel.Controllers
{
    [Area("gpanel")]
    [Authorize]
    public class PromotionalCodeController : Controller
    {
        private ApplicationDbContext Context { get; }
        public PromotionalCodeController(ApplicationDbContext _context)
        {
            Context = _context;
           // Context.PromotionalCode.Include(u => u.DDValue).ToList();
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            //List<PromotionalCodes> PromotionalCode = Context.PromotionalCode.ToList();
            return Json(Context.PromotionalCode.Include(u => u.TblDDValue).ToList());
        }

        [HttpPost]
        public JsonResult Add(TblPromotionalCodes objPromotionalCode)
        {
            Context.PromotionalCode.Add(objPromotionalCode);
            Context.SaveChanges();
            return Json(true);
        }
        public JsonResult GetbyID(int ID)
        {
            var PromotionalCodeList = Context.PromotionalCode.ToList().Find(x => x.PromotionalCodeID.Equals(ID));
            return Json(PromotionalCodeList);
        }
        public JsonResult Update(TblPromotionalCodes objPromotionalCode)
        {
            Context.PromotionalCode.Update(objPromotionalCode);
            Context.SaveChanges();
            return Json(true);
        }
        public JsonResult Delete(int ID)
        {
            var OriginalPromotionalCode = Context.PromotionalCode.First(c => c.PromotionalCodeID == ID);
            Context.PromotionalCode.Remove(OriginalPromotionalCode);
            Context.SaveChanges();
            return Json(true);
        }
        public JsonResult PromotionalCodeAction(int ID)
        {
            var OriginalPromotionalCode = Context.PromotionalCode.FirstOrDefault(c => c.PromotionalCodeID == ID);
            OriginalPromotionalCode.IsActive = !OriginalPromotionalCode.IsActive;
            Context.SaveChanges();
            return Json(true);

        }

        public JsonResult DDValueList()
        {
            string DDKey = "PromotionalType";
            int DropDownKey = Context.DropDown.ToList().Find(x => x.DropDownKey == DDKey).DropDownID;
            var DDValueList = Context.DDValue.ToList().FindAll(x => x.DropDownID == DropDownKey);
            return Json(DDValueList);
        }
        // NonAction method can not used as like ActionMethod.
        // This is used for processing and functionalities purpose.
        [NonAction]
        public SelectList ToSelectList(List<TblDDValues> lstDDValue)
        {
            List<SelectListItem> list = new List<SelectListItem>();

            foreach (TblDDValues item in lstDDValue)
            {
                list.Add(new SelectListItem()
                {
                    Text = item.DDValue,
                    Value = Convert.ToString(item.DDValueID)
                });
            }

            return new SelectList(list, "Value", "Text");
        }

    }
}

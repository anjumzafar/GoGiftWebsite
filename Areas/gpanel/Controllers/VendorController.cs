using GoGiftWebsite.Areas.gpanel.Data;
using GoGiftWebsite.Areas.gpanel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GoGiftWebsite.Areas.gpanel.Controllers
{
    [Area("gpanel")]
    [Authorize]
    public class VendorController : Controller
    {
        private ApplicationDbContext Context { get; }
        public VendorController(ApplicationDbContext _context)
        {
            Context = _context;
        }

        public IActionResult Index()
        {
            return View();
        }

        //[HttpPost]
        //public IActionResult Index(string customerName)
        //{
        //    List<Customer> customers = this.Context.SearchCustomers(customerName).ToList();
        //    return View(customers);
        //}
        //This controller is called by JQuery to Load DataTable with Customer data
        public JsonResult List()
        {
            // List<Customer> customers = Context.Customers.ToList();
            return Json(Context.Vendor.ToList());
        }

        [HttpPost]
        public JsonResult Add(TblVendors objVendor)
        {
            Context.Vendor.Add(objVendor);
            Context.SaveChanges();
            return Json(true);
        }
        public JsonResult GetbyID(int ID)
        {
            var VendorList = Context.Vendor.ToList().Find(x => x.VendorID.Equals(ID));
            return Json(VendorList);
        }
        public JsonResult Update(TblVendors objVendor)
        {
            Context.Vendor.Update(objVendor);
            Context.SaveChanges();
            return Json(true);
        }
        //public JsonResult ResetPassword(tblCustomer cst)
        //{
        //    return Json(objCustomer.ResetPassword(cst), new Newtonsoft.Json.JsonSerializerSettings());
        //}


        public JsonResult VendorAction(int ID)
        {
            var OriginalVendor = Context.Vendor.FirstOrDefault(c => c.VendorID == ID);
            OriginalVendor.IsActive = !OriginalVendor.IsActive;
            Context.SaveChanges();
            return Json(true);
        }
    }
}

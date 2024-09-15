using Microsoft.AspNetCore.Mvc;
using GoGiftWebsite.Areas.gpanel.Data;
using GoGiftWebsite.Areas.gpanel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;


namespace GoGiftWebsite.Areas.gpanel.Controllers
{
    [Area("gpanel")]
    [Authorize]
    public class CustomerController : Controller
    {
            private ApplicationDbContext Context { get; }

            public CustomerController(ApplicationDbContext _context)
            {
                Context = _context;
            }

            public IActionResult Index()
            {
                return View();
            }

        public IActionResult Details(int  ID)
        {
            var CustomerList = Context.Customer.ToList().Find(x => x.CustomerID.Equals(ID));
            return View(CustomerList);
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
                return Json(Context.Customer.ToList());
            }
        public JsonResult PointList(int ID)
        {
            List<TblCustomerPoint> PointList = Context.CustomerPoint
                .Include(u => u.TblDDValue)
                .Include(p => p.TblCustomer)
                .ToList();
            return Json(PointList);
        }

        public JsonResult RecipientAddressList(int ID)
        {
            return Json(Context.CustomerRecipientAddress.ToList().Where(x => x.CustomerID.Equals(ID)));
        }

        [HttpPost]
            public JsonResult Add(TblCustomers objCustomer)
            {
                Context.Customer.Add(objCustomer);
                Context.SaveChanges();
                return Json(true);
            }
            public JsonResult GetbyID(int ID)
            {
                var CustomerList = Context.Customer.ToList().Find(x => x.CustomerID.Equals(ID));
                return Json(CustomerList);
            }
            public JsonResult Update(TblCustomers objCustomer)
            {
                Context.Customer.Update(objCustomer);
                Context.SaveChanges();
                return Json(true);
            }
            //public JsonResult ResetPassword(tblCustomer cst)
            //{
            //    return Json(objCustomer.ResetPassword(cst), new Newtonsoft.Json.JsonSerializerSettings());
            //}


            public JsonResult CustomerAction(int ID)
            {
                var OriginalCustomer = Context.Customer.FirstOrDefault(c => c.CustomerID == ID);
                OriginalCustomer.IsActive = !OriginalCustomer.IsActive;
                Context.SaveChanges();
                return Json(true);
            }
        }
    }


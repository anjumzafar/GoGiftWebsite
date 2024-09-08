using Microsoft.AspNetCore.Mvc;
using GoGiftWebsite.Areas.gpanel.Models;
using System.Security.Claims;
using GoGiftWebsite.Areas.gpanel.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace GoGiftWebsite.Areas.gpanel.Controllers
{
    [Area("gpanel")]
    public class AccessController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public  IActionResult Login(TblUsers objUser)
        {
            if(objUser.EmailID == "admin@gogift.in" && objUser.Password == "1234")
            {
                List<Claim> claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.NameIdentifier, objUser.EmailID),
                    new Claim("OtherProperties", "Example Role")
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, 
                    CookieAuthenticationDefaults.AuthenticationScheme);
                AuthenticationProperties properties = new AuthenticationProperties()
                {
                    AllowRefresh = true,
                    IsPersistent = false
                    //IsPersistent = objUser.KeepLoggedIn
                };
                 HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, 
                    new ClaimsPrincipal(claimsIdentity), properties);
               //return RedirectToAction("Index", "Dashboard", new { Area = "gpanel" });
               return RedirectToAction("Index", "Dashboard", new { Area = "gpanel" });
                // return RedirectToPage("/Dashboard/Index", new { area = "gpanel" });
                //Redirect using Route Value
                //var routeValue = new RouteValueDictionary(new
                //{
                //    action = "Index",
                //    controller = "Dashboard",
                //    area = "gpanel"
                //});
                //return RedirectToRoute(routeValue);
            }
            ViewData["ValidateMessage"] = "User Not Found";
            return View();
        }

        //public JsonResult Login(TblUsers objUser)
        //{
        //    clsLogin objLogin = new clsLogin();

        //    return Json(objLogin.LoginBHDPanel(objUser), JsonRequestBehavior.AllowGet);
        //}


        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Access");
        }
    }
}


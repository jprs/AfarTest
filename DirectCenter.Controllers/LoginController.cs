using System;
using System.Web;
using System.Web.Mvc;

namespace DirectCenter.Controllers
{
    public class LoginController : Controller
    {

        public ActionResult Index()
        {
            return View("Login");
        }
    }
}
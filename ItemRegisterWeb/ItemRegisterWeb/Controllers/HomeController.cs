using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;
using ItemRegisterWeb.Models;
using ItemRegisterWeb.Code;
using System.Net;
using System.Web.Script.Serialization;

namespace ItemRegisterWeb.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {

        public JsonResult SearchBike(String serialNo)
        {
            var item = new DAL.DataClassesDataContext().items.Where(i => i.serial_no == serialNo).SingleOrDefault();

            return Json(new { Found = item != null });
        }

        public JsonResult DeleteBike(int id)
        {
            if (ContextManager.Current.UserKey == null)
                return Json(new { Success = true, LoggedIn = false });
            else
            {
                var context = new DAL.DataClassesDataContext();
                var item = context.items.Where(i => i.id == id && i.user_key == ContextManager.Current.UserKey).SingleOrDefault();

                context.items.DeleteOnSubmit(item);
                context.SubmitChanges();

                HttpContext.Application["totalNumberOfBikesRegistered"] = Convert.ToInt32(HttpContext.Application["totalNumberOfBikesRegistered"]) - 1;

                return Json(new { Success = true, LoggedIn = true });
            }
        }

        public JsonResult StoreBike(item item)
        {
            if (ContextManager.Current.UserKey == null)
                return Json(new { Success = true, LoggedIn = false });
            else
            {
                var context = new DAL.DataClassesDataContext();
                //var item = new DAL.DataClassesDataContext().items.Where(i => i.serial_no == serialNo).SingleOrDefault();
                item.user_key = ContextManager.Current.UserKey;
                context.items.InsertOnSubmit(item);
                context.SubmitChanges();

                HttpContext.Application["totalNumberOfBikesRegistered"] = Convert.ToInt32(HttpContext.Application["totalNumberOfBikesRegistered"]) + 1;

                return Json(new { Success = true, LoggedIn = true });
            }
        }

        public JsonResult ReportBike(reported_item item)
        {
            if (ContextManager.Current.UserKey == null)
                return Json(new { Success = true, LoggedIn = false });
            else
            {
                var context = new DAL.DataClassesDataContext();
                //var item = new DAL.DataClassesDataContext().items.Where(i => i.serial_no == serialNo).SingleOrDefault();
                item.user_key = ContextManager.Current.UserKey;
                context.reported_items.InsertOnSubmit(item);
                context.SubmitChanges();

                //HttpContext.Application["totalNumberOfBikesRegistered"] = Convert.ToInt32(HttpContext.Application["totalNumberOfBikesRegistered"]) + 1;

                return Json(new { Success = true, LoggedIn = true });
            }
        }

        public ActionResult ShowReportBikeControl()
        {
            if (ContextManager.Current.UserKey == null)
                return View("LogInControl");

            return View("ReportBikeControl");
        }

        public ActionResult ShowMyBikesControl()
        {
            if (ContextManager.Current.UserKey == null)
                return View("LogInControl");

            return View("MyBikesControl", new MyBikesModel { Bikes = new DAL.DataClassesDataContext().items.Where(b => b.user_key == ContextManager.Current.UserKey).ToList() });
        }

        public ActionResult ReloadBikeList()
        {
            if (ContextManager.Current.UserKey == null)
                return View("LogInControl");

            return View("BikeListControl", new MyBikesModel { Bikes = new DAL.DataClassesDataContext().items.Where(b => b.user_key == ContextManager.Current.UserKey).ToList() });
        }

        public ActionResult LogIn()
        {
            String appID = "284089591635942";
            String appSecret = "9720ce33c63a2637e2b4bca3d74d4ea8";
            String url = "https://graph.facebook.com/oauth/authorize?client_id=" + appID + "&redirect_uri=http://cykel.ihedge.dk/Home/LogIn/&reponse_type=token";

            if (!String.IsNullOrEmpty(Request["access_token"]))
            {
                ContextManager.Current.AccessToken = Request["access_token"];
                Session["AccessToken"] = ContextManager.Current.AccessToken;

                return Redirect("ffff");
            }
            else
            {
                if (!String.IsNullOrEmpty(Request["code"]))
                    ContextManager.Current.AccessCode = Request["code"];

                if (ContextManager.Current.AccessCode != null)
                {
                    String accessTokenURL = "https://graph.facebook.com/oauth/access_token?client_id=" + appID + "&redirect_uri=http://cykel.ihedge.dk/Home/LogIn/&scope=email&client_secret=" + appSecret + "&code=" + ContextManager.Current.AccessCode;
                    
                    WebClient client = new WebClient();
                    String data = client.DownloadString(accessTokenURL);
                    Uri myUri = new Uri("http://cykel.ihedge.dk?" + data);
                    ContextManager.Current.AccessToken = HttpUtility.ParseQueryString(myUri.Query).Get("access_token");
                    Session["AccessToken"] = ContextManager.Current.AccessToken;

                    client = new WebClient();
                    data = client.DownloadString("https://graph.facebook.com/me?access_token=" + ContextManager.Current.AccessToken);

                    var javaScriptSerializer = new JavaScriptSerializer();
                    ContextManager.Current.FaceBookData = javaScriptSerializer.Deserialize<Dictionary<String, Object>>(data);
                    ContextManager.Current.UserKey = ContextManager.Current.FaceBookData["id"].ToString();

                    return Redirect("/Home/");
                }
                else
                {
                    return Redirect(url);
                }
            }
        }


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using System.Net;

namespace ItemRegisterWeb.Code
{
    public class ContextManager
    {
        public String UserKey { get; set; }
        public Dictionary<String, Object> FaceBookData { get; set; }
        public String AccessCode { get; set; }
        public String AccessToken { get; set; }
        public int NumberOfDetectives
        {
            get
            {
                return new DAL.DataClassesDataContext().reported_items.Select(ri => ri.user_key).Distinct().Count();
            }
        }

        public ContextManager()
        {
        }

        private static HttpSessionState Session
        {
            get
            {
                return HttpContext.Current.Session;
            }
        }

        public static ContextManager Current
        {
            get
            {
                Object contextManagerObj = Session["ContextManager"];
                if (contextManagerObj == null)
                {
                    contextManagerObj = new ContextManager();
                    Session["ContextManager"] = contextManagerObj;
                }

                return (ContextManager)contextManagerObj;
            }
        }
    }
}
